import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import './Hero.css';

gsap.registerPlugin(MotionPathPlugin);

const Hero = () => {
    const masterTl = useRef(null);
    const backgroundRef = useRef(null);
    const titleRef = useRef(null);
    const taglineRef = useRef(null);
    const cardWrapperRef = useRef(null);
    const pathLinesRef = useRef([]);
    const orbsRef = useRef([]);

    useEffect(() => {
        // GSAP Master Timeline
        masterTl.current = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Initial States (set via CSS mostly, but reinforcing here if needed)
        // Actually, prompt says to set initial states in CSS.
        // We will assume CSS handles the initial hidden states.

        // 1. Background Atmosphere (Infinite Loop)
        gsap.to(backgroundRef.current, {
            xPercent: -10,
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // 2. Typography Reveal (T=0.2s)
        masterTl.current
            .to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 1
            }, 0.2)
            .to(taglineRef.current, {
                opacity: 1,
                y: 0,
                duration: 1
            }, "-=0.8");

        // 3. Glass Card Materializes (T=0.8s)
        masterTl.current.to(cardWrapperRef.current, {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "expo.out"
        }, 0.8);

        // 4. Neural Connection (Drawing the lines) (T=1.5s)
        // Ensure pathLinesRef.current is populated
        if (pathLinesRef.current.length > 0) {
            masterTl.current.to(pathLinesRef.current, {
                strokeDashoffset: 0,
                duration: 2,
                ease: "power2.inOut",
                stagger: 0.1
            }, 1.5);
        }

        // 5. Data Flow Ignition (T=2.0s)
        // Animate orbs along the path
        // We'll use a simple loop for the orbs moving down mostly
        if (orbsRef.current.length > 0) {
            // Start independent loop for orbs
            // We defer this slightly to match the T=2.0s start relative to the timeline?
            // Actually, let's just start it at T=2.0s in the timeline using a call or simply separate logic
            // The prompt says "T=2.0s" implies part of the sequence logic, usually.
            // But loops are best separate.

            // Let's us a delayed call or just start it.
            gsap.delayedCall(2.0, () => {
                orbsRef.current.forEach((orb, i) => {
                    gsap.set(orb, { opacity: 1 });
                    // Simulate path movement. Since we don't have the exact path data easily usable without specific SVG complexity,
                    // we will animate y and some x to simulate flow along the lines.
                    // Assuming lines go top to bottom.

                    // For a more robust effect without MotionPath plugin complex configuration (getting path data from DOM elements),
                    // we can just stick to a visual approximation or use motionPath if we had the path data string.
                    // We will use a rough approximation: Top of card -> Bottom of screen.

                    const tl = gsap.timeline({ repeat: -1, delay: i * 0.5 });
                    tl.fromTo(orb,
                        { y: -300, opacity: 0 },
                        { y: 400, opacity: 1, duration: 0.5, ease: "none" }
                    ).to(orb,
                        { y: 800, opacity: 0, duration: 2, ease: "none" } // Fade out at end
                    );
                });
            });
        }

        return () => {
            if (masterTl.current) masterTl.current.kill();
        };
    }, []);

    const addToPathLines = (el) => {
        if (el && !pathLinesRef.current.includes(el)) {
            pathLinesRef.current.push(el);
        }
    };

    const addToOrbs = (el) => {
        if (el && !orbsRef.current.includes(el)) {
            orbsRef.current.push(el);
        }
    };

    return (
        <div className="hero-container">
            {/* 1. Background Atmosphere */}
            <div className="background-wrapper" ref={backgroundRef}>
                <div className="wave-gradient"></div>
            </div>

            <div className="content-container">
                {/* 2. Typography */}
                <div className="typography-container">
                    <h1 className="hero-title" ref={titleRef}>HARGRAVE LABS</h1>
                    <p className="hero-tagline" ref={taglineRef}>We build the systems that build your business.</p>
                </div>

                {/* 3. Glass Interface */}
                <div className="glass-card-wrapper" ref={cardWrapperRef}>
                    <div className="glass-card">
                        {/* Card Content placeholders */}
                        <div className="card-header">
                            <div className="dot"></div>
                            <div className="line"></div>
                        </div>
                        <div className="card-body">
                            <div className="status-indicator">
                                <div className="status-dot"></div>
                                <span>START FLOW</span>
                            </div>
                        </div>
                    </div>

                    {/* 4. Neural Pathways (SVG) */}
                    <div className="svg-overlay">
                        <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="neural-svg">
                            {/* Defs for glows */}
                            <defs>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#a855f7" />
                                    <stop offset="100%" stopColor="#3b82f6" />
                                </linearGradient>
                            </defs>

                            {/* Paths forming the "H" and flowing down */}
                            {/* Left vertical of H */}
                            <path
                                ref={addToPathLines}
                                d="M360 200 L360 300 C360 350 300 350 300 400 L300 600"
                                stroke="url(#lineGradient)"
                                strokeWidth="6"
                                strokeLinecap="round"
                                className="path-line"
                            />
                            {/* Right vertical of H - connected */}
                            <path
                                ref={addToPathLines}
                                d="M440 200 L440 300 C440 350 500 350 500 400 L500 600"
                                stroke="url(#lineGradient)"
                                strokeWidth="6"
                                strokeLinecap="round"
                                className="path-line"
                            />
                            {/* Crossbar connection/flow */}
                            <path
                                ref={addToPathLines}
                                d="M360 250 C400 250 400 250 440 250"
                                stroke="url(#lineGradient)"
                                strokeWidth="6"
                                strokeLinecap="round"
                                className="path-line"
                            />

                            {/* Extra flowing lines for aesthetics */}
                            <path
                                ref={addToPathLines}
                                d="M380 200 L380 280 C380 380 200 400 200 600"
                                stroke="url(#lineGradient)"
                                strokeWidth="3"
                                className="path-line"
                                opacity="0.6"
                            />
                            <path
                                ref={addToPathLines}
                                d="M420 200 L420 280 C420 380 600 400 600 600"
                                stroke="url(#lineGradient)"
                                strokeWidth="3"
                                className="path-line"
                                opacity="0.6"
                            />

                            {/* Data Orbs - Positioned initially at start of paths */}
                            <circle ref={addToOrbs} cx="360" cy="200" r="5" fill="#fff" className="data-orb" />
                            <circle ref={addToOrbs} cx="440" cy="200" r="5" fill="#fff" className="data-orb" />
                            <circle ref={addToOrbs} cx="380" cy="200" r="3" fill="#fff" className="data-orb" />
                            <circle ref={addToOrbs} cx="420" cy="200" r="3" fill="#fff" className="data-orb" />

                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
