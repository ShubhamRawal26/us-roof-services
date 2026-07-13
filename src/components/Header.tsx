import React, { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('#hero');
  const [pillStyle, setPillStyle] = useState<React.CSSProperties>({ opacity: 0 });

  // Update scrolled state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active pill position
  const updatePillPosition = (targetId: string) => {
    const linkEl = document.querySelector(`.nav-link[href="${targetId}"]`);
    const menuEl = document.getElementById('nav-menu');
    const pillEl = document.getElementById('nav-active-pill');
    if (linkEl && menuEl && pillEl) {
      const linkRect = linkEl.getBoundingClientRect();
      const menuRect = menuEl.getBoundingClientRect();
      setPillStyle({
        width: `${linkRect.width}px`,
        height: `${linkRect.height}px`,
        left: `${linkRect.left - menuRect.left}px`,
        top: `${linkRect.top - menuRect.top}px`,
        opacity: 1,
      });
    }
  };

  // Scroll spy to update active link
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = document.querySelectorAll('section');
      const scrollOffset = 150;
      let currentId = '';

      sections.forEach(section => {
        const id = section.getAttribute('id');
        if (!id) return;
        const sectionTop = section.offsetTop - scrollOffset;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentId = `#${id}`;
        }
      });

      if (currentId) {
        setActiveTab(currentId);
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    // Run once on load to position the pill
    setTimeout(handleScrollSpy, 600);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Recalculate pill on activeTab change
  useEffect(() => {
    updatePillPosition(activeTab);
  }, [activeTab]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => {
      updatePillPosition(activeTab);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const targetRect = targetSection.getBoundingClientRect().top;
      const targetPosition = targetRect - bodyRect - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }

    setActiveTab(targetId);
  };

  return (
    <>
      <header className={`navbar-container ${isScrolled ? 'scrolled' : ''}`} id="navbar">
        <nav className="navbar-glass">
          <a 
            href="#hero" 
            className="nav-logo" 
            aria-label="SummitShield Home"
            onClick={(e) => handleLinkClick(e, '#hero')}
          >
            <svg viewBox="0 0 100 100" className="logo-icon">
              <path d="M15 55 L50 25 L85 55" fill="none" stroke="#1473E6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M30 50 L30 68 C30 78, 50 85, 50 85 C50 85, 70 78, 70 68 L70 50" fill="none" stroke="#0B1F3A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="logo-text">SummitShield</span>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="nav-menu" id="nav-menu" onMouseLeave={() => updatePillPosition(activeTab)}>
            <div className="nav-pill-active" id="nav-active-pill" style={pillStyle}></div>
            <li className="nav-item">
              <a 
                href="#hero" 
                className={`nav-link ${activeTab === '#hero' ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, '#hero')}
                onMouseEnter={() => updatePillPosition('#hero')}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#services" 
                className={`nav-link ${activeTab === '#services' ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, '#services')}
                onMouseEnter={() => updatePillPosition('#services')}
              >
                Services
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#transformation" 
                className={`nav-link ${activeTab === '#transformation' ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, '#transformation')}
                onMouseEnter={() => updatePillPosition('#transformation')}
              >
                Why Us
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#gallery" 
                className={`nav-link ${activeTab === '#gallery' ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, '#gallery')}
                onMouseEnter={() => updatePillPosition('#gallery')}
              >
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#reviews" 
                className={`nav-link ${activeTab === '#reviews' ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, '#reviews')}
                onMouseEnter={() => updatePillPosition('#reviews')}
              >
                Reviews
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#faq" 
                className={`nav-link ${activeTab === '#faq' ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, '#faq')}
                onMouseEnter={() => updatePillPosition('#faq')}
              >
                FAQ
              </a>
            </li>
          </ul>

          {/* Right Contact CTA */}
          <div className="nav-cta-wrapper">
            <a href="tel:5125557663" className="nav-phone-link">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="phone-svg">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span className="phone-text">(512) 555-ROOF</span>
            </a>
            <a href="#estimate" className="btn btn-primary magnetic-btn" onClick={(e) => handleLinkClick(e, '#estimate')}>
              <span>Get Free Estimate</span>
            </a>
          </div>

          {/* Mobile hamburger menu */}
          <button 
            className={`nav-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
            id="nav-toggle"
            aria-label="Toggle Navigation Menu" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>
        </nav>
      </header>

      {/* Mobile Navigation Panel */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} id="mobile-menu-overlay">
        <div className="mobile-menu-glass">
          <ul className="mobile-menu-links">
            <li><a href="#hero" className="mobile-nav-link" onClick={(e) => handleLinkClick(e, '#hero')}>Home</a></li>
            <li><a href="#services" className="mobile-nav-link" onClick={(e) => handleLinkClick(e, '#services')}>Services</a></li>
            <li><a href="#transformation" className="mobile-nav-link" onClick={(e) => handleLinkClick(e, '#transformation')}>Why Us</a></li>
            <li><a href="#gallery" className="mobile-nav-link" onClick={(e) => handleLinkClick(e, '#gallery')}>Projects</a></li>
            <li><a href="#reviews" className="mobile-nav-link" onClick={(e) => handleLinkClick(e, '#reviews')}>Reviews</a></li>
            <li><a href="#faq" className="mobile-nav-link" onClick={(e) => handleLinkClick(e, '#faq')}>FAQ</a></li>
          </ul>
          <div className="mobile-menu-cta">
            <a href="tel:5125557663" className="mobile-phone-cta" onClick={() => setIsMobileMenuOpen(false)}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>(512) 555-ROOF</span>
            </a>
            <a href="#estimate" className="btn btn-primary" onClick={(e) => handleLinkClick(e, '#estimate')}>Get Free Estimate</a>
          </div>
        </div>
      </div>
    </>
  );
}
