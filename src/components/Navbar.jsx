import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import './Navbar.css';

const Navbar = () => {
    const navRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
        );
    }, []);

    return (
        <nav className="navbar" ref={navRef}>
            <div className="nav-container">
                <Link to="/" className="nav-logo">HARGRAVE LABS</Link>

                <Link to="/discovery-call" className="nav-cta">Claim Free Discovery Call</Link>
            </div>
        </nav>
    );
};

export default Navbar;
