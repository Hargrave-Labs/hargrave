import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ThemeController from '../components/ThemeController';
import Cal, { getCalApi } from "@calcom/embed-react";
import gsap from 'gsap';
import './DiscoveryCall.css';

const DiscoveryCall = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({});
            cal("ui", { "theme": "dark", "styles": { "branding": { "brandColor": "#8b5cf6" } }, "hideEventTypeDetails": false, "layout": "column_view" });
        })();

        // Animation for entrance
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
        );
    }, []);

    return (
        <>
            <ThemeController />
            <Navbar />
            <div className="discovery-page-wrapper">
                <div className="discovery-background-glow"></div>
                <div className="discovery-container" ref={containerRef}>
                    <div className="discovery-header">
                        <h1 className="discovery-title">Claim Your <span className="text-gradient">Free Discovery Call</span></h1>
                        <p className="discovery-subtitle">
                            Schedule a time below to discuss how we can automate your workflow and elevate your business.
                        </p>
                    </div>

                    <div className="calendar-wrapper">
                        <Cal
                            calLink="chris-patrick-hargrave/30min"
                            style={{ width: "100%", height: "100%", overflow: "scroll" }}
                            config={{ layout: 'column_view', theme: 'dark' }}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DiscoveryCall;
