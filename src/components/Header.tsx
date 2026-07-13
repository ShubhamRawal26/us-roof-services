import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ShieldAlert } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <div className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
        <header className="navbar-glass">
          <div className="container nav-container">
            {/* Logo */}
            <a href="#home" className="nav-logo" onClick={closeMenu}>
              <svg viewBox="0 0 100 100" width="28" height="28" fill="none" stroke="#1473E6" strokeWidth="9" strokeLinejoin="round" className="logo-svg">
                <path d="M15 80 L50 20 L85 80 Z" />
                <path d="M30 80 L50 45 L70 80" stroke="#FF6B35" strokeWidth="7" />
              </svg>
              <div className="logo-text">
                <span>SUMMIT</span>SHIELD
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="nav-menu">
              <a href="#services" className="nav-link">Services</a>
              <a href="#why-us" className="nav-link">The Standard</a>
              <a href="#gallery" className="nav-link">Portfolio</a>
              <a href="#materials" className="nav-link">Materials</a>
              <a href="#service-areas" className="nav-link">Regions</a>
            </nav>

            {/* Action buttons */}
            <div className="nav-cta-wrapper">
              <a href="tel:5125557663" className="phone-badge">
                <Phone size={14} className="phone-icon" fill="currentColor" />
                <span>(512) 555-ROOF</span>
              </a>
              <a href="#estimate" className="btn btn-primary">
                <span>Get Estimate</span>
              </a>
            </div>

            {/* Mobile hamburger menu */}
            <button 
              className="nav-toggle" 
              aria-label="Toggle Navigation Menu" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Glass Drawer Menu */}
      <div className={`mobile-menu-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-backdrop" onClick={closeMenu}></div>
        <nav className="mobile-drawer-nav glass-card">
          <div className="drawer-header">
            <span className="drawer-logo">SUMMIT<span>SHIELD</span></span>
            <button className="drawer-close" onClick={closeMenu}>
              <X size={22} />
            </button>
          </div>
          <div className="drawer-links">
            <a href="#services" className="drawer-link" onClick={closeMenu}>Services</a>
            <a href="#why-us" className="drawer-link" onClick={closeMenu}>The Standard</a>
            <a href="#gallery" className="drawer-link" onClick={closeMenu}>Portfolio</a>
            <a href="#materials" className="drawer-link" onClick={closeMenu}>Materials</a>
            <a href="#service-areas" className="drawer-link" onClick={closeMenu}>Regions</a>
            <a href="#estimate" className="drawer-link drawer-cta" onClick={closeMenu}>Get Estimate</a>
          </div>
          <div className="drawer-footer">
            <a href="tel:5125557663" className="drawer-phone">
              <Phone size={16} />
              <span>(512) 555-ROOF</span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
