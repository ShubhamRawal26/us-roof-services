import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  to: number;
  duration?: number;
  decimals?: number;
}

function CountUp({ to, duration = 1.5, decimals = 0 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' });

  useEffect(() => {
    if (!isInView) return;
    
    const start = 0;
    const end = to;
    const totalMs = duration * 1000;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / totalMs, 1);
      
      // Easing: easeOutQuad
      const easedProgress = progress * (2 - progress);
      const current = start + easedProgress * (end - start);
      
      setCount(current);
      if (progress >= 1) {
        clearInterval(timer);
      }
    }, 16); // ~60fps updates

    return () => clearInterval(timer);
  }, [isInView, to, duration]);

  return <span ref={ref}>{count.toFixed(decimals)}</span>;
}

export default function Stats() {
  return (
    <section className="stats-section" id="stats">
      <div className="container">
        <div className="stats-glass-container glass-card scroll-reveal">
          
          <div className="stat-col">
            <div className="stat-num">
              <CountUp to={15} />+
            </div>
            <p className="stat-label">Years of Excellence</p>
          </div>
          
          <div className="stat-divider"></div>
          
          <div className="stat-col">
            <div className="stat-num">
              <CountUp to={3500} />+
            </div>
            <p className="stat-label">Roofs Completed</p>
          </div>
          
          <div className="stat-divider"></div>
          
          <div className="stat-col">
            <div className="stat-num">
              <CountUp to={4.9} decimals={1} />★
            </div>
            <p className="stat-label">Customer Rating</p>
          </div>
          
          <div className="stat-divider"></div>
          
          <div className="stat-col">
            <div className="stat-num text-orange">24/7</div>
            <p className="stat-label">Emergency Support</p>
          </div>

        </div>
      </div>
    </section>
  );
}
