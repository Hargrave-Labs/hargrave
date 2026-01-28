import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';
import './CTA.css';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
    const sectionRef = useRef(null);
    const panelRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    end: "top 25%",

                }
            });

            tl.fromTo(panelRef.current,
                {
                    y: 100,
                    opacity: 0,
                    rotateX: 10
                },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 1.2,
                    ease: "power4.out"
                }
            )
                .fromTo([titleRef.current, textRef.current, btnRef.current],
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power2.out"
                    },
                    "-=0.8"
                );

            // Mouse movement effect on the panel
            const handleMouseMove = (e) => {
                if (!panelRef.current) return;
                const { left, top, width, height } = panelRef.current.getBoundingClientRect();
                const x = (e.clientX - left) / width - 0.5;
                const y = (e.clientY - top) / height - 0.5;

                gsap.to(panelRef.current, {
                    rotationY: x * 5,
                    rotationX: -y * 5,
                    duration: 0.5,
                    ease: "power1.out"
                });
            };

            const handleMouseLeave = () => {
                if (!panelRef.current) return;
                gsap.to(panelRef.current, {
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.5,
                    ease: "power1.out"
                });
            };

            sectionRef.current.addEventListener('mousemove', handleMouseMove);
            sectionRef.current.addEventListener('mouseleave', handleMouseLeave);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="cta-section" ref={sectionRef}>
            <div className="cta-background-glow"></div>

            <div className="cta-container">
                <div className="cta-glass-panel" ref={panelRef}>
                    {/* Background Shapes */}
                    <div className="cta-shape shape-1"></div>
                    <div className="cta-shape shape-2"></div>

                    <div className="cta-content">
                        <h2 className="cta-title" ref={titleRef}>
                            Ready to take
                            <span className="cta-highlight-colored"> your next steps?</span>
                        </h2>

                        <p className="cta-description" ref={textRef}>
                            Stop letting manual tasks slow you down. Claim your free discovery call and unlock your business's true potential today.
                        </p>

                        <div className="cta-button-wrapper" ref={btnRef}>
                            <Link to="/discovery-call" className="cta-button">
                                Claim Free Discovery Call
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
