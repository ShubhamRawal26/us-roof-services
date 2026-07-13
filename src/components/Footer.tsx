import React, { useEffect, useState } from 'react';
import ctaBackground from '../assets/cta_background.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [strokeOffset, setStrokeOffset] = useState(113); // 2 * PI * R where R=18
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScrollProgress = () => {
      const scrollPosition = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const progress = scrollPosition / docHeight;
      const drawLength = 113 - (progress * 113);
      setStrokeOffset(drawLength);

      if (scrollPosition > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Final CTA Section */}
      <section className="final-cta-section">
        <div 
          className="cta-bg-image" 
          style={{ backgroundImage: `url(${ctaBackground})` }}
        ></div>
        <div className="cta-overlay-glow"></div>
        <div className="container cta-container scroll-reveal">
          <h2>Your Home Deserves a Roof Built to Last.</h2>
          <p>Schedule your free roof inspection today and experience roofing without the pressure, confusion, or shortcuts.</p>
          
          <div className="cta-buttons-row">
            <a href="#estimate" className="btn btn-primary btn-large magnetic-btn">Get My Free Inspection</a>
            <a href="tel:5125557663" className="btn btn-secondary btn-large magnetic-btn">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>Call (512) 555-ROOF</span>
            </a>
          </div>

          <div className="cta-trust-items">
            <div className="trust-item">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>No Obligation</span>
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>Free Digital Assessment</span>
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>Honest Recommendations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="luxury-footer">
        <div className="container footer-grid">
          {/* Info Column */}
          <div className="footer-info-col">
            <a href="#hero" className="footer-logo">
              <svg viewBox="0 0 100 100" className="logo-icon">
                <path d="M15 55 L50 25 L85 55" fill="none" stroke="#1473E6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M30 50 L30 68 C30 78, 50 85, 50 85 C50 85, 70 78, 70 68 L70 50" fill="none" stroke="#0B1F3A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="logo-text">SummitShield</span>
            </a>
            <p className="footer-tagline">Built Above. Trusted Beyond.</p>
            <p className="footer-desc">Premium residential and commercial roofing services built around meticulous craftsmanship, complete transparency, and long-term protection for your family.</p>
            
            {/* Social Icons */}
            <div className="footer-socials">
              <a href="#" aria-label="SummitShield Facebook" className="social-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" aria-label="SummitShield Instagram" className="social-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" aria-label="SummitShield LinkedIn" className="social-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="footer-links-col">
            <h4>SERVICES</h4>
            <ul>
              <li><a href="#services">Residential Roofing</a></li>
              <li><a href="#services">Roof Repair</a></li>
              <li><a href="#services">Roof Replacement</a></li>
              <li><a href="#services">Storm Restoration</a></li>
              <li><a href="#services">Commercial Roofing</a></li>
              <li><a href="#services">Roof Inspection</a></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="footer-links-col">
            <h4>COMPANY</h4>
            <ul>
              <li><a href="#transformation">About Us</a></li>
              <li><a href="#process">Our Process</a></li>
              <li><a href="#gallery">Projects</a></li>
              <li><a href="#reviews">Reviews</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#estimate">Careers</a></li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div className="footer-links-col">
            <h4>SERVICE AREAS</h4>
            <ul>
              <li><a href="#service-areas">Austin, TX</a></li>
              <li><a href="#service-areas">Round Rock, TX</a></li>
              <li><a href="#service-areas">Cedar Park, TX</a></li>
              <li><a href="#service-areas">Georgetown, TX</a></li>
              <li><a href="#service-areas">Pflugerville, TX</a></li>
              <li><a href="#service-areas">Leander, TX</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyrights row */}
        <div className="container footer-bottom">
          <p className="copyright">&copy; {currentYear} SummitShield Roofing. All Rights Reserved. &bull; Licensed &amp; Fully Insured</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Accessibility Statement</a>
          </div>
        </div>
      </footer>

      {/* Floating Actions Widgets */}
      {/* Desktop Float Estimate Pill */}
      <div className="floating-estimate-pill scroll-reveal" id="floating-estimate-pill">
        <a href="#estimate">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          <span>Free Estimate</span>
        </a>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="mobile-sticky-bar" id="mobile-sticky-bar">
        <a href="tel:5125557663" className="mobile-bar-btn phone-btn">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span>Call Now</span>
        </a>
        <a href="#estimate" className="mobile-bar-btn estimate-btn">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          <span>Free Estimate</span>
        </a>
      </div>

      {/* Back to Top Circle */}
      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`} 
        id="back-to-top" 
        aria-label="Scroll Back to Top"
        onClick={handleBackToTop}
      >
        <svg className="progress-circle-svg" width="44" height="44" viewBox="0 0 44 44">
          <circle className="progress-bg" cx="22" cy="22" r="18" fill="none" stroke="rgba(20, 115, 230, 0.1)" strokeWidth="3"/>
          <circle 
            className="progress-bar-draw" 
            id="back-to-top-progress" 
            cx="22" 
            cy="22" 
            r="18" 
            fill="none" 
            stroke="#1473E6" 
            strokeWidth="3" 
            strokeDasharray="113" 
            style={{ strokeDashoffset: strokeOffset }}
          />
        </svg>
        <div className="arrow-up-wrapper">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </div>
      </button>
    </>
  );
}
