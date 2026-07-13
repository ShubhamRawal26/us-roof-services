import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Play, ArrowUpRight, Clock, Shield, ZoomIn } from 'lucide-react';
import heroBackground from '../assets/hero_background.png';

export default function Hero() {
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.clientX) / 60;
      const y = (window.innerHeight / 2 - e.clientY) / 60;

      if (card1Ref.current) card1Ref.current.style.transform = `translate(${x * 1.8}px, ${y * 1.8}px)`;
      if (card2Ref.current) card2Ref.current.style.transform = `translate(${x * -1.2}px, ${y * -1.2}px)`;
      if (card3Ref.current) card3Ref.current.style.transform = `translate(${x * 1.4}px, ${y * 1.4}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero-section" id="home">
      {/* Background with import binding */}
      <div 
        className="hero-background" 
        style={{ backgroundImage: `url(${heroBackground})` }}
      ></div>
      <div className="hero-overlay"></div>
      <div className="hero-radial-glow"></div>

      <div className="container hero-container">
        <div className="hero-content">
          {/* Trust Badge */}
          <div className="glass-trust-badge scroll-reveal">
            <ShieldCheck size={16} className="shield-check-icon" strokeWidth={2.5} />
            <span>Licensed &bull; Insured &bull; Locally Trusted</span>
          </div>

          {/* Headline */}
          <h1 className="hero-title scroll-reveal">
            Your Roof.<br />
            <span className="gradient-text">Our Reputation.</span>
          </h1>

          {/* Supporting text */}
          <p className="hero-subtitle scroll-reveal">
            Premium roofing solutions engineered to protect your home, elevate its value, and stand strong through every season.
          </p>

          {/* CTA buttons */}
          <div className="hero-actions scroll-reveal">
            <a href="#estimate" className="btn btn-primary btn-large magnetic-btn">
              <span>Get My Free Roof Estimate</span>
              <ArrowUpRight size={20} className="arrow-icon" />
            </a>
            <a href="#gallery" className="btn btn-secondary btn-large magnetic-btn">
              <Play size={20} className="play-icon" fill="currentColor" />
              <span>Explore Our Work</span>
            </a>
          </div>

          {/* Customer Rating */}
          <div className="hero-ratings scroll-reveal">
            <div className="avatar-group">
              <div className="avatar" style={{ backgroundColor: '#EAF5FF', color: '#1473E6' }}>JD</div>
              <div className="avatar" style={{ backgroundColor: '#FEE4E2', color: '#D92D20' }}>MS</div>
              <div className="avatar" style={{ backgroundColor: '#ECFDF3', color: '#039855' }}>TB</div>
              <div className="avatar" style={{ backgroundColor: '#F7F9FC', color: '#101828' }}>+8</div>
            </div>
            <div className="rating-text">
              <div className="stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" className="star-svg">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <span><strong>4.9/5</strong> from 850+ Homeowners</span>
            </div>
          </div>
        </div>

        {/* Floating Info Cards with Parallax refs */}
        <div className="hero-parallax-wrapper">
          <div ref={card1Ref} className="parallax-card p-card-1 glass-card" style={{ transition: 'transform 0.1s ease-out' }}>
            <div className="p-card-icon emergency">
              <Clock size={20} />
            </div>
            <div className="p-card-content">
              <h4>24/7 Response</h4>
              <p>Urgent storm assistance</p>
            </div>
          </div>

          <div ref={card2Ref} className="parallax-card p-card-2 glass-card" style={{ transition: 'transform 0.1s ease-out' }}>
            <div className="p-card-icon warranty">
              <Shield size={20} />
            </div>
            <div className="p-card-content">
              <h4>Lifetime Warranty</h4>
              <p>Unmatched workmanship</p>
            </div>
          </div>

          <div ref={card3Ref} className="parallax-card p-card-3 glass-card" style={{ transition: 'transform 0.1s ease-out' }}>
            <div className="p-card-icon inspection">
              <ZoomIn size={20} />
            </div>
            <div className="p-card-content">
              <h4>Free Inspection</h4>
              <p>No obligation assessment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a href="#stats" className="hero-scroll-indicator" aria-label="Scroll Down">
        <div className="mouse-shape">
          <div className="wheel"></div>
        </div>
      </a>
    </section>
  );
}
