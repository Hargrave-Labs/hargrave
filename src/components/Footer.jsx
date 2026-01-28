import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const element = document.querySelector(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="footer-logo">HARGRAVE LABS</div>
                        <p className="footer-tagline">Intelligence, Automated.</p>
                    </div>
                    <div className="footer-links-group">
                        <div className="footer-column">
                            <h4>Agency</h4>
                            <a href="#services" onClick={(e) => scrollToSection(e, '.service-pillars-section')}>Services</a>
                            <a href="#problems" onClick={(e) => scrollToSection(e, '.problem-section')}>Why Automate</a>
                            <a href="#faq" onClick={(e) => scrollToSection(e, '.faq-section')}>FAQ</a>
                        </div>
                        <div className="footer-column">
                            <h4>Get Started</h4>
                            <Link to="/discovery-call">Free Discovery Call</Link>
                            <a href="mailto:hello@hargravelabs.com">Contact Us</a>
                        </div>
                        <div className="footer-column">
                            <h4>Connect</h4>
                            <a href="https://twitter.com/hargravelabs" target="_blank" rel="noreferrer">Twitter</a>
                            <a href="https://linkedin.com/company/hargravelabs" target="_blank" rel="noreferrer">LinkedIn</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Hargrave Labs. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
