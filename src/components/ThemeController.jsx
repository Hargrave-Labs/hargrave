import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ThemeController = () => {
    useEffect(() => {
        // We want to animate the CSS variable --theme-color on the root element
        // from Purple (#a855f7) to Red (#ff4d4d) based on scroll position.

        // The unique requirement is that GSAP usually animates properties, 
        // but animating a CSS variable requires a specific approach or using CSSPlugin.
        // Fortunately, GSAP can tween CSS variables on the root.

        const root = document.documentElement;

        const ctx = gsap.context(() => {
            // Hero -> Problem: Purple/Blue -> Red/Yellow
            gsap.fromTo(root,
                {
                    "--theme-color": "#a855f7",
                    "--theme-secondary-color": "#3b82f6"
                },
                {
                    "--theme-color": "#ff4d4d",
                    "--theme-secondary-color": "#f9cb28",
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".problem-section",
                        // Start transitioning as the section is about to enter (85% down viewport)
                        start: "top 85%",
                        // Finish transitioning when the section header is near the center
                        end: "top 20%",
                        scrub: 1, // Add slight smoothed scrub for premium feel
                    }
                }
            );

            // Problem -> Service Pillars: Red/Yellow -> Purple/Blue
            gsap.fromTo(root,
                {
                    "--theme-color": "#ff4d4d",
                    "--theme-secondary-color": "#f9cb28"
                },
                {
                    "--theme-color": "#a855f7",
                    "--theme-secondary-color": "#3b82f6",
                    ease: "none",
                    immediateRender: false, // Prevent this from overwriting the initial state
                    scrollTrigger: {
                        trigger: ".service-pillars-section",
                        start: "top 80%",
                        end: "top 20%",
                        scrub: 1,
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return null; // Logic only component
};

export default ThemeController;
