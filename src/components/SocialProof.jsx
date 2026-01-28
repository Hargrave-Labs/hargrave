import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './SocialProof.css';

const techStack = [
    "n8n", "Zapier", "HubSpot", "OpenAI", "Anthropic", "LangChain",
    "Pinecone", "Make", "Relevance AI", "Twilio",
    "Supabase", "Salesforce", "UiPath"
];

const SocialProof = () => {
    const marqueeRef = useRef(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        const totalWidth = marquee.scrollWidth / 2; // Assuming duplicated content

        gsap.to(marquee, {
            x: -totalWidth,
            duration: 60,
            ease: "none",
            repeat: -1,
        });
    }, []);

    return (
        <section className="social-proof">
            <p className="social-label">POWERED BY BEST-IN-CLASS TECHNOLOGY</p>
            <div className="marquee-container">
                <div className="marquee-track" ref={marqueeRef}>
                    {/* Duplicate for seamless loop */}
                    {[...techStack, ...techStack, ...techStack].map((tech, index) => (
                        <div key={index} className="tech-logo">
                            {tech}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
