import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';
import './FAQ.css';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        question: "Will AI replace my team?",
        answer: "No. AI is an accelerator, not a replacement. We build systems that handle repetitive, low-value tasks like data entry and lead qualification, freeing your team to focus on strategy, relationships, and closing deals."
    },
    {
        question: "How fast can we launch?",
        answer: "We typically go from audit to live deployment in under 4 weeks. Our modular 'plug-and-play' systems allow us to deploy core infrastructure quickly while customizing specific workflows to your needs."
    },
    {
        question: "Is our data secure?",
        answer: "Absolutely. We prioritize enterprise-grade security. Our systems support SOC2 compliance, use end-to-end encryption, and operate within your existing secure environments (like your private cloud) whenever possible."
    },
    {
        question: "What's the ROI timeframe?",
        answer: "Most clients see positive ROI within the first 60 days. By automating manual labor and recapturing lost leads, the efficiency gains and revenue uplift are usually immediate and measurable."
    },
    {
        question: "Do we need technical skills?",
        answer: "Zero. We build 'done-for-you' systems. You don't need to write code or manage servers. We provide full onboarding, training, and ongoing support to ensure your team is comfortable from Day 1."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const sectionRef = useRef(null);
    const faqRefs = useRef([]);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".faq-header-content", {
                opacity: 0,
                y: 30,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%", // Trigger earlier
                }
            });

            // Ensure refs are valid
            const validFaqRefs = faqRefs.current.filter(el => el !== null);

            // Animation restored with fromTo for reliability
            gsap.fromTo(validFaqRefs,
                {
                    y: 50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Handle accordion animation
    useEffect(() => {
        faqRefs.current.forEach((el, index) => {
            if (!el) return;
            const content = el.querySelector('.faq-answer-wrapper');
            const icon = el.querySelector('.faq-icon');

            if (activeIndex === index) {
                gsap.to(content, { height: 'auto', opacity: 1, duration: 0.4, ease: "power2.out" });
                gsap.to(icon, { rotation: 180, duration: 0.3 });
                el.classList.add('active');
            } else {
                gsap.to(content, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
                gsap.to(icon, { rotation: 0, duration: 0.3 });
                el.classList.remove('active');
            }
        });
    }, [activeIndex]);

    const handleMouseMove = (e) => {
        faqRefs.current.forEach((card) => {
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);

            // Calculate relative position for icon refraction
            const iconWrapper = card.querySelector('.faq-icon-wrapper');
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
        <section className="faq-section" ref={sectionRef} onMouseMove={handleMouseMove}>
            <div className="faq-header">
                <div className="faq-header-content">
                    <h2 className="faq-title">FREQUENTLY ASKED <span className="faq-highlight">QUESTIONS</span></h2>
                    <p className="faq-subtitle">Common questions about automating your business.</p>
                </div>
            </div>

            <div className="faq-list">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="faq-item"
                        ref={el => faqRefs.current[index] = el}
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="faq-question">
                            <h3>{faq.question}</h3>
                            <div className="faq-icon-wrapper">
                                <div className="faq-icon-border-active"></div>
                                <Plus className="faq-icon" size={20} />
                            </div>
                        </div>
                        <div className="faq-answer-wrapper">
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
