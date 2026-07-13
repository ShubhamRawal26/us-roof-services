import React from 'react';
import { ArrowUpRight, ShieldCheck, Mail, MapPin, Phone } from 'lucide-react';
import ctaBackground from '../assets/cta_background.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      {/* CTA Banner Area with CTA Background */}
      <div className="cta-banner-container container">
        <div className="cta-banner-card glass-card scroll-reveal">
          <div 
            className="cta-bg-image" 
            style={{ backgroundImage: `url(${ctaBackground})` }}
          ></div>
          <div className="cta-overlay"></div>
          
          <div className="cta-content">
            <span className="cta-eyebrow">READY TO PROTECT YOUR HOME?</span>
            <h2 className="cta-title">Upgrade to a SummitShield Roof.</h2>
            <p className="cta-text">Contact us today to schedule your complimentary structural roof inspection. Our certified local specialists provide clear photo assessments with zero sales pressure.</p>
            <a href="#estimate" className="btn btn-primary btn-large cta-btn magnetic-btn">
              <span>Book My Free Inspection</span>
              <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Bottom */}
      <div className="footer-main">
        <div className="container footer-grid">
          
          {/* Col 1: Brand Info */}
          <div className="footer-col-brand">
            <div className="footer-logo">
              <svg viewBox="0 0 100 100" width="28" height="28" fill="none" stroke="#1473E6" strokeWidth="9" strokeLinejoin="round">
                <path d="M15 80 L50 20 L85 80 Z" />
                <path d="M30 80 L50 45 L70 80" stroke="#FF6B35" strokeWidth="7" />
              </svg>
              <span>SUMMIT<strong>SHIELD</strong></span>
            </div>
            <p className="footer-brand-desc">SummitShield Roofing is Central Texas' premier provider of high-performance residential and commercial roofing systems. Built on trust, craftsmanship, and lifetime support.</p>
            <div className="footer-badges">
              <div className="footer-badge glass-card">
                <ShieldCheck size={14} className="text-blue" />
                <span>Certified Installer</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services Quick Links */}
          <div className="footer-col-links">
            <h4>Roofing Services</h4>
            <ul>
              <li><a href="#services">Residential Replacement</a></li>
              <li><a href="#services">Emergency Storm Repair</a></li>
              <li><a href="#services">Commercial Coatings</a></li>
              <li><a href="#services">Precision Roof Repair</a></li>
              <li><a href="#services">Drone Roof Inspection</a></li>
            </ul>
          </div>

          {/* Col 3: Company Quick Links */}
          <div className="footer-col-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#why-us">The Standard</a></li>
              <li><a href="#gallery">Recent Portfolio</a></li>
              <li><a href="#materials">Roofing Materials</a></li>
              <li><a href="#service-areas">Dispatch Areas</a></li>
              <li><a href="#estimate">Free Estimator</a></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="footer-col-contact">
            <h4>Contact Info</h4>
            <ul className="footer-contact-details">
              <li>
                <Phone size={16} />
                <span>(512) 555-ROOF (7663)</span>
              </li>
              <li>
                <Mail size={16} />
                <span>contact@summitshieldroofing.com</span>
              </li>
              <li>
                <MapPin size={16} />
                <span>109 Congress Ave, Suite 300<br />Austin, TX 78701</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright strip */}
        <div className="footer-copyright-strip">
          <div className="container copyright-container">
            <p>&copy; {currentYear} SummitShield Roofing. All rights reserved. Locally owned & operated in Austin, Texas.</p>
            <div className="copyright-links">
              <a href="#">Privacy Policy</a>
              <span>&bull;</span>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
