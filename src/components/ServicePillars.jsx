import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, Zap, Bot, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServicePillars.css';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
    {
        id: "growth",
        title: "Growth Automation",
        subtitle: "Lead Nurturing",
        description: "Never lose a lead. Simple automations like email sequences and lead nurturing to keep your audience engaged without manual effort.",
        icon: Target,
        gradient: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)", // Warm/Growth
    },
    {
        id: "ops",
        title: "Operations Autopilot",
        subtitle: "End-to-End Workflows",
        description: "Complex, multi-step workflows that connect your entire stack. Automate invoices, data syncing, and project management seamlessly.",
        icon: Zap,
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", // Electric/Ops
    },
    {
        id: "ai",
        title: "AI Staff",
        subtitle: "Custom Agents",
        description: "Customer support bots that actually know your business. 24/7 intelligent responses that feel human and solve problems.",
        icon: Bot,
        gradient: "linear-gradient(135deg, #a855f7 0%, #ff4d4d 100%)", // Premium/AI
    }
];

const ServicePillars = () => {
    const [activeId, setActiveId] = useState(null);
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Stagger entrance of pillars
            gsap.from(cardsRef.current, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: ".pillars-container",
                    start: "top 80%"
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e) => {
        cardsRef.current.forEach((card) => {
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);

            // Calculate relative position for icon refraction/border
            const iconWrapper = card.querySelector('.pillar-icon-wrapper');
            if (iconWrapper) {
                const iconRect = iconWrapper.getBoundingClientRect();
                const iconX = e.clientX - iconRect.left;
                const iconY = e.clientY - iconRect.top;

                card.style.setProperty("--icon-mouse-x", `${iconX}px`);
                card.style.setProperty("--icon-mouse-y", `${iconY}px`);
            }
        });
    };

    return (
        <section className="service-pillars-section" ref={sectionRef} onMouseMove={handleMouseMove}>
            <div className="service-header" ref={headerRef}>
                <h2 className="service-title">
                    SERVICE <span className="service-highlight">PILLARS</span>
                </h2>
                <p className="service-subtitle">
                    Modern automation solutions to scale your business without scaling headcount.
                </p>
            </div>

            <div className="pillars-container">
                {pillars.map((pillar, index) => (
                    <div
                        key={pillar.id}
                        className={`pillar-card ${activeId === pillar.id ? 'active' : ''}`}
                        onMouseEnter={() => setActiveId(pillar.id)}
                        onMouseLeave={() => setActiveId(null)}
                        ref={el => cardsRef.current[index] = el}
                    >
                        {/* Background removed as per request */}
                        <div className="pillar-content">
                            <div className="pillar-icon-wrapper">
                                <div className="pillar-icon-border-active"></div>
                                <pillar.icon size={32} strokeWidth={1.5} />
                            </div>

                            <div className="pillar-info">
                                <span className="pillar-subtitle">{pillar.subtitle}</span>
                                <h3 className="pillar-title">{pillar.title}</h3>
                                <p className="pillar-description">
                                    {pillar.description}
                                </p>
                                <Link to="/discovery-call" className="pillar-action">
                                    <span>Get Started</span>
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServicePillars;
