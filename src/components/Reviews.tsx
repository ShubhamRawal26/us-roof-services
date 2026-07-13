import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, ArrowRightLeft } from 'lucide-react';

const reviewsData = [
  {
    id: 1,
    name: 'David K.',
    location: 'Austin, TX',
    service: 'Replacement',
    text: 'SummitShield replaced our storm-damaged roof in under 48 hours. From the initial drone inspection to the final sweep for stray nails, the process was seamless. The glassmorphic interface on their site made quoting a breeze too.',
  },
  {
    id: 2,
    name: 'Sarah T.',
    location: 'Round Rock, TX',
    service: 'Emergency Repair',
    text: 'After a severe limb fell on our roof, they dispatched a crew in under 90 minutes. They got the tarp secured before the next downpour started. Truly lifesaving emergency services. Highly recommend to anyone in Central Texas!',
  },
  {
    id: 3,
    name: 'James L.',
    location: 'Cedar Park, TX',
    service: 'Inspection',
    text: 'Very transparent company. The inspector showed me exactly what was wrong on his iPad, outlined three options, and never pressured me. The crew cleaned up so well I didn\'t find a single nail.',
  },
];

export default function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const updateConstraints = () => {
      if (trackRef.current) {
        const width = trackRef.current.scrollWidth - trackRef.current.offsetWidth;
        setDragConstraints({ left: -width - 24, right: 0 });
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow scroll-reveal">TESTIMONIALS</span>
          <h2 className="section-title scroll-reveal">Trusted by Hundreds<br />of Texas Homeowners.</h2>
        </div>

        {/* Carousel Outer container */}
        <div className="reviews-carousel-container scroll-reveal">
          <motion.div 
            ref={trackRef}
            drag="x"
            dragConstraints={dragConstraints}
            className="reviews-carousel-track"
            style={{ cursor: 'grab' }}
            whileDrag={{ cursor: 'grabbing' }}
          >
            {reviewsData.map((review) => (
              <div key={review.id} className="review-card glass-card">
                <div className="stars-row">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={18} fill="#FF6B35" stroke="none" />
                  ))}
                </div>
                <p className="review-quote">"{review.text}"</p>
                <div className="review-author">
                  <div className="author-details">
                    <strong>{review.name}</strong>
                    <span>{review.location} &bull; {review.service}</span>
                  </div>
                  <div className="verified-badge">
                    <ShieldCheck size={14} className="text-success" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Drag Indicators */}
          <div className="carousel-indicators-bar">
            <div className="carousel-drag-tip">
              <ArrowRightLeft size={16} />
              <span>Swipe or drag cards to scroll</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
