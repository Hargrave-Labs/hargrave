import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, FileSpreadsheet, DatabaseZap } from 'lucide-react';
import './ProblemStatement.css';

gsap.registerPlugin(ScrollTrigger);

const painPoints = [
    {
        icon: Clock,
        title: "Lead Response Lag",
        description: "78% of deals go to the first vendor to respond. If you're manually processing leads, you're already too late.",
        stat: "5 min",
        statLabel: "Response Threshold"
    },
    {
        icon: FileSpreadsheet,
        title: "The Invoice Grind",
        description: "Manually generating invoices and reconciling payments burns hours of focus time and introduces costly errors.",
        stat: "10+ hrs",
        statLabel: "Lost Weekly"
    },
    {
        icon: DatabaseZap,
        title: "Data Silos",
        description: "Copy-pasting data between CRMs, forms, and spreadsheets fragments your business intelligence.",
        stat: "100%",
        statLabel: "Error Prone"
    }
];

const ProblemStatement = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const [activeCard, setActiveCard] = useState(null);

    useEffect(() => {
        // Entrance Animation
        const ctx = gsap.context(() => {
            gsap.from(cardsRef.current, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",

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

            // Icon relative coords
            const iconWrapper = card.querySelector('.card-icon-wrapper');
            if (iconWrapper) {
                const iconRect = iconWrapper.getBoundingClientRect();
                card.style.setProperty("--icon-mouse-x", `${e.clientX - iconRect.left}px`);
                card.style.setProperty("--icon-mouse-y", `${e.clientY - iconRect.top}px`);
            }
        });
    };

    return (
        <section className="problem-section" ref={sectionRef} onMouseMove={handleMouseMove}>
            <div className="problem-header">
                <h2 className="section-title">INEFFICIENCY IS <span className="text-highlight">EXPENSIVE</span></h2>
                <p className="section-subtitle">The hidden costs of manual workflows are bleeding your bottom line.</p>
            </div>

            <div className="cards-grid">
                {painPoints.map((point, i) => (
                    <div
                        key={i}
                        className={`spotlight-card ${activeCard === i ? 'active' : ''}`}
                        ref={el => cardsRef.current[i] = el}
                        onClick={() => setActiveCard(activeCard === i ? null : i)}
                    >
                        <div className="card-content">
                            <div className="card-icon-wrapper">
                                <div className="card-icon-border-active"></div>
                                <point.icon size={32} className="card-icon" />
                            </div>
                            <h3 className="card-title">{point.title}</h3>
                            <p className="card-description">{point.description}</p>

                            <div className="card-stat">
                                <span className="stat-value">{point.stat}</span>
                                <span className="stat-label">{point.statLabel}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProblemStatement;
