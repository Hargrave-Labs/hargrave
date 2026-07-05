import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '../hooks/useGSAP';
import { GrainOverlay } from './ui/GrainOverlay';
import { AuroraShader } from './ui/AuroraShader';

const serif = "'Instrument Serif', 'Times New Roman', Georgia, serif";

interface IntroOverlayProps {
  /** Fired ONSTART of the curtain lift — hands off to the hero timeline while the curtain is still clearing. */
  onComplete: () => void;
  /** Fired once the full sequence (including the curtain lift) has actually finished, so the parent can unmount. */
  onExited: () => void;
}

export function IntroOverlay({ onComplete, onExited }: IntroOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Lock body scroll for the duration of the intro; always restored on unmount.
  useLayoutEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.set('.intro-wordmark', { yPercent: 110 });
      gsap.set('.intro-period', { opacity: 0, scale: 0.5, transformOrigin: 'left center' });

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          sessionStorage.setItem('hl-intro', '1');
          onExited();
        },
      });

      tl.to('.intro-wordmark', { yPercent: 0, duration: 0.8, ease: 'expo.out' }, 0.15)
        // The period snaps in with a tiny overshoot (transform-only, no reflow).
        .to('.intro-period', { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(3)' }, 0.72)
        .to(
          ref.current,
          {
            yPercent: -100,
            duration: 0.95,
            ease: 'expo.inOut',
            onStart: () => {
              if (ref.current) ref.current.style.pointerEvents = 'none';
              onComplete();
            },
          },
          1.35
        );
    },
    [],
    ref
  );

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#080a09]"
      style={{ WebkitTransform: 'translateZ(0)' }}
      aria-hidden="true"
    >
      {/* Living aurora behind the wordmark — the same green world the curtain lifts to reveal.
          gated={false} lets the glow fill the whole frame (no headline-protection dark zone),
          which reads far more dramatic behind the centered wordmark. It's a uniform flag, so
          it costs nothing extra on the GPU. */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,#060706_0%,#0a0c0b_60%,#080a09_100%)]" />
      <AuroraShader className="z-0" gated={false} />
      <GrainOverlay />
      {/* Centered dark pool so the white wordmark stays crisp over the glow. */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            'radial-gradient(48% 44% at 50% 52%, rgba(4,6,5,0.82) 0%, rgba(4,6,5,0.34) 52%, rgba(4,6,5,0) 80%)',
        }}
      />
      <div className="relative z-10 overflow-hidden">
        <span
          className="intro-wordmark inline-block font-normal"
          style={{
            fontFamily: serif,
            fontWeight: 400,
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            letterSpacing: '-0.018em',
            lineHeight: 1.05,
            color: '#f4f5f2',
          }}
        >
          Hargrave Labs
          <span className="intro-period text-emerald-300/90">.</span>
        </span>
      </div>
    </div>
  );
}
