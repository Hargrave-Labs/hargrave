import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

interface AuroraShaderProps {
  /** Extra classes for positioning; parent controls stacking (z-index). */
  className?: string;
  /**
   * When true (default), the top-left content zone is kept near-black so a
   * headline stays readable over the aurora. When false, the glow fills the
   * whole frame edge-to-edge (used by the intro, where the wordmark is
   * knocked out of the green as dark negative space).
   */
  gated?: boolean;
}

const VERTEX_SOURCE = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// Luminous emerald/teal/cyan-mint "aurora" over a near-black base.
// Domain-warped fbm gives the field an organic, cloud-like flow; a hard
// gate (independent of the noise field) keeps the top-left, where the
// headline sits, close to black for text contrast, while opening fully to
// the right and bottom so the light can sweep up and across the frame.
const FRAGMENT_SOURCE = `#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_dpr;
uniform float u_gate;
uniform int u_octaves;
uniform float u_mobile;

out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 0.5;
  // Fixed loop bound (GLSL wants a constant) with an early-out at the
  // device-chosen octave count: mobile runs fewer octaves for less per-pixel
  // work, desktop runs the full 5 for fine detail.
  for (int i = 0; i < 5; i++) {
    if (i >= u_octaves) break;
    value += amp * noise(p);
    p *= 2.02;
    amp *= 0.5;
  }
  return value;
}

// Classic domain-warped fbm (two layers of feedback) for a liquid, drifting
// cloud field rather than static blobs. Time coefficients are tuned so the
// ribbons visibly morph over a ~3s window while staying slow and premium.
vec2 warpField(vec2 p, float t) {
  vec2 q = vec2(
    fbm(p + t * 0.032),
    fbm(p + vec2(5.2, 1.3) - t * 0.024)
  );
  vec2 r = vec2(
    fbm(p + 3.6 * q + vec2(1.7, 9.2) + t * 0.021),
    fbm(p + 3.6 * q + vec2(8.3, 2.8) - t * 0.029)
  );
  return r;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 1.7;

  float t = u_time;

  // Slow overall rotation for a gentle, always-morphing drift.
  float ang = t * 0.014;
  mat2 rot = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
  vec2 pr = rot * p;

  // Gentle global parallax pull toward the cursor (damped on the JS side).
  vec2 mouseOffset = (u_mouse - 0.5) * 0.32;
  pr += mouseOffset;

  // Liquid drift so the aurora flows rather than breathing in place. Mobile
  // drifts a bit faster so the flow is clearly visible on a small screen.
  vec2 drift = vec2(t * 0.07, -t * 0.052) * mix(1.0, 1.3, u_mobile);
  vec2 flow = pr + drift;

  // --- Cursor stir ----------------------------------------------------
  // A soft radial swirl plus a small outward push, centered on the pointer
  // and computed in the SAME field space the noise is sampled in, so the
  // ribbons wind around and part like a liquid exactly where the cursor is.
  // The exp() falloff keeps it local: only the pointer's neighbourhood
  // reacts, the rest of the frame keeps its calm drift. Cheap on GPU
  // (verified 60fps on M1). Tuning knobs: SWIRL (1.4), PUSH (0.15), reach
  // (the 2.2 inside exp — smaller = wider halo).
  vec2 pm = rot * ((u_mouse - 0.5) * vec2(aspect, 1.0) * 1.7) + mouseOffset + drift;
  vec2 toMouse = flow - pm;
  float mInfl = exp(-dot(toMouse, toMouse) * 2.2);
  float swirl = mInfl * 1.4;
  float cs = cos(swirl);
  float sn = sin(swirl);
  flow = pm + mat2(cs, -sn, sn, cs) * toMouse + normalize(toMouse + vec2(1e-4)) * (mInfl * 0.15);

  vec2 warped = warpField(flow, t);

  float field1 = fbm(flow + warped * 2.05);
  float field2 = fbm(flow * 1.35 - warped * 1.5 + 8.0);

  // fbm output clusters near its mean, so the floor only needs to move a
  // little to broaden the glow — moving it too far turns almost the whole
  // field "on" and flattens the ribbons into a solid wall. These keep the
  // upper-tail selectivity (only above-mean values ignite) while reaching
  // full brightness sooner than the original pass, for a punchier glow.
  float blobA = smoothstep(0.36, 0.82, field1);
  float blobB = smoothstep(0.40, 0.86, field2);

  // --- Headline protection --------------------------------------------
  // Hard gate, independent of the noise field, that keeps the top-left
  // content zone (~left 55% / top 70%, where the eyebrow, headline and
  // subhead sit) close to black, and opens fully toward the right side
  // and bottom so the aurora can sweep up and across. uv.y is 1.0 at the
  // TOP of the frame (WebGL fragcoord convention), so "top 70%" is
  // uv.y > 0.3. Both terms are 0 for the entire protected box (x <= 0.55,
  // y >= 0.3), guaranteeing a dark floor there regardless of field value.
  // On mobile the green reaches a little further left and a little higher up
  // the bottom, so a pool of flowing aurora sits below the CTAs and along the
  // right — but the top-left headline/subhead zone stays protected for contrast.
  float openRight = smoothstep(mix(0.55, 0.50, u_mobile), 0.74, uv.x);
  float openBottom = 1.0 - smoothstep(0.06, mix(0.30, 0.36, u_mobile), uv.y);
  float openGate = max(openRight, openBottom);
  float shade = mix(0.02, 1.0, openGate);
  // u_gate = 0 disables the protection entirely for a full-bleed glow: the
  // intro fills the whole frame with light and knocks the wordmark out of it.
  shade = mix(1.0, shade, u_gate);
  blobA *= shade;
  blobB *= shade * 0.88;

  vec3 base = mix(vec3(0.0196, 0.0275, 0.0235), vec3(0.0392, 0.0471, 0.0431), uv.y);

  // Spectral shift across the flow: emerald -> teal -> cool cyan-mint,
  // tied directly to field1's own value so brightness and hue co-vary —
  // dim ribbon edges read warmer emerald, bright cores read cool cyan-mint.
  float spectral = smoothstep(0.30, 0.80, field1);
  vec3 cEmerald = vec3(0.0627, 0.7255, 0.5059);  // #10b981
  vec3 cTeal = vec3(0.1765, 0.8314, 0.7490);     // #2dd4bf
  vec3 cCyanMint = vec3(0.3686, 0.9176, 0.8314); // #5eead4
  vec3 spectralColor = mix(cEmerald, cTeal, smoothstep(0.0, 0.5, spectral));
  spectralColor = mix(spectralColor, cCyanMint, smoothstep(0.5, 1.0, spectral));

  vec3 auroraMain = spectralColor * blobA * 0.95 + cTeal * blobB * 0.62;
  auroraMain = clamp(auroraMain, 0.0, 1.05);

  vec3 color = 1.0 - (1.0 - base) * (1.0 - auroraMain);

  // Luminous cores: pow()-sharpened peaks of the field isolated into a
  // handful of bright, bloom-y "light source" hotspots, screen-blended on
  // top of the main aurora. Gated by the same headline-protection shade so
  // no hotspot can ever appear behind the text. The steep power keeps this
  // selective to true peaks rather than the whole ribbon.
  float corePeak = max(field1, field2 * 0.9);
  float bloom = pow(clamp(corePeak, 0.0, 1.0), 6.0);
  bloom = smoothstep(0.06, 0.32, bloom) * shade;
  vec3 hotA = vec3(0.4314, 0.9059, 0.7176); // #6ee7b7
  vec3 hotB = vec3(0.3686, 0.9176, 0.8314); // #5eead4
  vec3 hotColor = mix(hotA, hotB, smoothstep(0.3, 0.85, spectral));
  vec3 bloomHighlight = clamp(hotColor * bloom * 1.0, 0.0, 1.0);
  color = 1.0 - (1.0 - color) * (1.0 - bloomHighlight);

  // Vignette: darken the far edges/corners for a cinematic falloff,
  // recentered so the brightened right-side sweep isn't clipped.
  vec2 vc = (uv - vec2(0.58, 0.52)) * vec2(aspect, 1.15);
  float vig = 1.0 - smoothstep(0.4, 1.5, length(vc));
  color *= mix(0.72, 1.0, vig);

  // Faint dither to prevent banding on dark tones (grain-sized in CSS px).
  float dither = (hash(gl_FragCoord.xy / u_dpr + fract(t)) - 0.5) * (1.4 / 255.0);
  color += dither;

  outColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

// A time value chosen for a balanced, premium-looking single frame when
// prefers-reduced-motion is set.
const STATIC_TIME = 24.0;

function compileShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('[AuroraShader] shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext): WebGLProgram | null {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SOURCE);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SOURCE);
  if (!vertexShader || !fragmentShader) {
    if (vertexShader) gl.deleteShader(vertexShader);
    if (fragmentShader) gl.deleteShader(fragmentShader);
    return null;
  }

  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn('[AuroraShader] program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

export function AuroraShader({ className, gated = true }: AuroraShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [supported, setSupported] = useState(true);
  const pendingTeardownRef = useRef<{ timer: number; destroy: () => void } | null>(null);
  // Read live inside the render loop without re-running the (StrictMode-aware)
  // setup effect; the value is constant per mount in practice.
  const gatedRef = useRef(gated);
  gatedRef.current = gated;

  useEffect(() => {
    // React StrictMode double-invokes effects in dev: mount -> cleanup ->
    // mount again, synchronously, with no real unmount in between. A
    // WebGL context that has been told to lose itself can never be
    // restored on that same <canvas> (getContext keeps returning the same,
    // now-dead, context). So instead of tearing down destructively in the
    // cleanup, defer it by one tick; if this effect fires again before
    // that tick runs (the StrictMode remount), cancel the pending teardown
    // and let the still-alive context/loop/listeners keep running instead
    // of recreating anything.
    const pending = pendingTeardownRef.current;
    if (pending) {
      window.clearTimeout(pending.timer);
      pendingTeardownRef.current = null;
      return () => {
        pendingTeardownRef.current = { timer: window.setTimeout(pending.destroy, 0), destroy: pending.destroy };
      };
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Mobile GPUs are a fraction of a desktop's and phones run at DPR 2-3, so the
    // same shader that's trivial on a laptop can cook a phone. On mobile we render
    // at DPR 1, draw at ~30fps, and use fewer noise octaves — a ~6x cut in GPU work.
    const isMobile = window.matchMedia('(max-width: 1023px)').matches;
    const maxDpr = isMobile ? 1 : 1.5;
    const octaves = isMobile ? 3 : 5;
    const minFrameMs = isMobile ? 25 : 0; // ~40fps on mobile for smoother flow

    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    });

    if (!gl) {
      console.warn('[AuroraShader] WebGL2 is not supported; falling back to CSS background.');
      setSupported(false);
      return;
    }

    const program = createProgram(gl);
    if (!program) {
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      setSupported(false);
      return;
    }

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    const vao = gl.createVertexArray();
    const buffer = gl.createBuffer();
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const uMouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const uDprLoc = gl.getUniformLocation(program, 'u_dpr');
    const uGateLoc = gl.getUniformLocation(program, 'u_gate');
    const uOctavesLoc = gl.getUniformLocation(program, 'u_octaves');
    const uMobileLoc = gl.getUniformLocation(program, 'u_mobile');

    let dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    let needsResize = true;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl!.viewport(0, 0, canvas.width, canvas.height);
    }

    const mouseTarget: [number, number] = [0.5, 0.5];
    const mouseCurrent: [number, number] = [0.5, 0.5];

    function drawFrame(timeSec: number) {
      if (needsResize) {
        resize();
        needsResize = false;
      }
      gl!.useProgram(program);
      gl!.uniform1f(uTimeLoc, timeSec);
      gl!.uniform2f(uResolutionLoc, canvas!.width, canvas!.height);
      gl!.uniform2f(uMouseLoc, mouseCurrent[0], mouseCurrent[1]);
      gl!.uniform1f(uDprLoc, dpr);
      gl!.uniform1f(uGateLoc, gatedRef.current ? 1.0 : 0.0);
      gl!.uniform1i(uOctavesLoc, octaves);
      gl!.uniform1f(uMobileLoc, isMobile ? 1.0 : 0.0);
      gl!.bindVertexArray(vao);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    }

    let rafId = 0;
    let disposed = false;
    let isIntersecting = true;
    let isDocVisible = !document.hidden;

    const shouldRun = () => !disposed && !reducedMotion && isIntersecting && isDocVisible;

    const startTimeMs = performance.now();
    let lastFrameMs = -Infinity;

    function loop(nowMs: number) {
      rafId = 0;
      if (!shouldRun()) return;
      // Keep the rAF chain alive at display rate, but only actually draw once
      // minFrameMs has elapsed (0 on desktop = every frame, ~33ms on mobile = 30fps).
      rafId = requestAnimationFrame(loop);
      if (nowMs - lastFrameMs < minFrameMs) return;
      lastFrameMs = nowMs;
      mouseCurrent[0] += (mouseTarget[0] - mouseCurrent[0]) * 0.085;
      mouseCurrent[1] += (mouseTarget[1] - mouseCurrent[1]) * 0.085;
      drawFrame((nowMs - startTimeMs) / 1000);
    }

    function ensureLoop() {
      if (rafId === 0 && shouldRun()) {
        rafId = requestAnimationFrame(loop);
      }
    }

    function stopLoop() {
      if (rafId !== 0) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }

    let resizeRaf = 0;
    const resizeObserver = new ResizeObserver(() => {
      needsResize = true;
      if (reducedMotion) {
        // No rAF loop is running; coalesce onto the next animation frame
        // and redraw the single static frame at the new size.
        if (resizeRaf) cancelAnimationFrame(resizeRaf);
        resizeRaf = requestAnimationFrame(() => {
          resizeRaf = 0;
          drawFrame(STATIC_TIME);
        });
      }
    });
    resizeObserver.observe(canvas);

    let intersectionObserver: IntersectionObserver | null = null;
    const handleVisibilityChange = () => {
      isDocVisible = !document.hidden;
      if (shouldRun()) ensureLoop();
      else stopLoop();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      mouseTarget[0] = (e.clientX - rect.left) / rect.width;
      mouseTarget[1] = 1 - (e.clientY - rect.top) / rect.height;
    };

    // First frame.
    drawFrame(reducedMotion ? STATIC_TIME : 0);

    if (!reducedMotion) {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          isIntersecting = entries.some((entry) => entry.isIntersecting);
          if (shouldRun()) ensureLoop();
          else stopLoop();
        },
        { threshold: 0 }
      );
      intersectionObserver.observe(canvas);

      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      ensureLoop();
    }

    const destroy = () => {
      disposed = true;
      stopLoop();
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('mousemove', handleMouseMove);
      gl.deleteBuffer(buffer);
      if (vao) gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };

    return () => {
      pendingTeardownRef.current = { timer: window.setTimeout(destroy, 0), destroy };
    };
  }, []);

  // Graceful fallback when WebGL2 is unavailable (hardware acceleration off,
  // older device, lost context): slow-drifting blurred green blobs instead of
  // a dead dark hero, so it still reads as a living aurora. Placement mirrors
  // the shader — right/bottom-biased when gated (headline stays clear), fuller
  // and more centered when not. The global prefers-reduced-motion rule freezes
  // the drift for motion-sensitive users.
  if (!supported) {
    const blobs = gated
      ? [
          {
            background:
              'radial-gradient(42% 42% at 80% 74%, rgba(16,185,129,0.42) 0%, transparent 62%)',
            animation: 'aurora-drift-a 26s ease-in-out infinite alternate',
            blur: 40,
          },
          {
            background:
              'radial-gradient(46% 46% at 96% 98%, rgba(94,234,212,0.30) 0%, transparent 60%), radial-gradient(36% 36% at 66% 42%, rgba(45,212,191,0.24) 0%, transparent 58%)',
            animation: 'aurora-drift-b 34s ease-in-out infinite alternate',
            blur: 52,
          },
        ]
      : [
          {
            background:
              'radial-gradient(55% 55% at 60% 55%, rgba(16,185,129,0.40) 0%, transparent 62%)',
            animation: 'aurora-drift-a 26s ease-in-out infinite alternate',
            blur: 46,
          },
          {
            background:
              'radial-gradient(50% 50% at 32% 68%, rgba(45,212,191,0.26) 0%, transparent 60%), radial-gradient(45% 45% at 88% 32%, rgba(94,234,212,0.24) 0%, transparent 58%)',
            animation: 'aurora-drift-b 34s ease-in-out infinite alternate',
            blur: 54,
          },
        ];
    return (
      <div
        aria-hidden="true"
        className={cn('absolute inset-0 block overflow-hidden pointer-events-none', className)}
      >
        {blobs.map((blob, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              inset: '-25%',
              background: blob.background,
              filter: `blur(${blob.blur}px)`,
              animation: blob.animation,
              willChange: 'transform',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('absolute inset-0 block h-full w-full pointer-events-none', className)}
    />
  );
}
