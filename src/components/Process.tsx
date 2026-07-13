import React, { useEffect, useRef, useState } from 'react';

export default function Process() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [strokeOffset, setStrokeOffset] = useState(800);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !pathRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const winHeight = window.innerHeight;

      // Timeline progress calculations
      const startOffset = winHeight - 150;
      const relativeTop = rect.top - startOffset;
      const totalHeight = rect.height - 200;

      let progress = -relativeTop / totalHeight;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      const totalLength = 800;
      const offsetVal = totalLength - (progress * totalLength);
      setStrokeOffset(offsetVal);

      // Activate steps as line meets their positions
      const steps = timelineRef.current.querySelectorAll('.process-step');
      steps.forEach((step) => {
        const stepRect = step.getBoundingClientRect();
        const stepCenter = stepRect.top + stepRect.height / 2;
        if (stepCenter < winHeight - 120) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    setTimeout(handleScroll, 600);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="process-section" id="process">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow scroll-reveal">OUR PROCESS</span>
          <h2 className="section-title scroll-reveal">From First Call<br />to Final Nail.</h2>
          <p className="section-desc scroll-reveal">A seamless, clear journey designed to give you peace of mind and an incredible new roof.</p>
        </div>

        {/* Timeline Wrapper */}
        <div ref={timelineRef} className="process-timeline-container">
          {/* SVG Progress Line Connector */}
          <svg className="timeline-svg" id="timeline-svg" viewBox="0 0 100 800" preserveAspectRatio="none">
            <path id="timeline-path" d="M 50 0 L 50 800" stroke="#E9EEF5" strokeWidth="4" strokeDasharray="8 8" fill="none"/>
            <path 
              ref={pathRef}
              id="timeline-path-draw" 
              d="M 50 0 L 50 800" 
              stroke="#1473E6" 
              strokeWidth="4" 
              fill="none"
              style={{ strokeDashoffset: strokeOffset }}
            />
          </svg>

          {/* Step 1 */}
          <div className="process-step step-left scroll-reveal">
            <div className="step-orb-wrapper">
              <div className="step-orb glass-card">01</div>
            </div>
            <div className="step-card glass-card">
              <h3>Free Roof Inspection</h3>
              <p>Schedule a convenient property inspection. We look for storm wear, leaks, shingle degradation, and flashing integrity.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="process-step step-right scroll-reveal">
            <div className="step-orb-wrapper">
              <div className="step-orb glass-card">02</div>
            </div>
            <div className="step-card glass-card">
              <h3>Clear Assessment</h3>
              <p>Receive a comprehensive report with photo evidence, material recommendations, and a transparent, itemized estimate.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="process-step step-left scroll-reveal">
            <div className="step-orb-wrapper">
              <div className="step-orb glass-card">03</div>
            </div>
            <div className="step-card glass-card">
              <h3>Precision Installation</h3>
              <p>Our certified roofing crews protect your gardens, strip the old roof, repair underlying deck boards, and build your new shingle system.</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="process-step step-right scroll-reveal">
            <div className="step-orb-wrapper">
              <div className="step-orb glass-card">04</div>
            </div>
            <div className="step-card glass-card">
              <h3>Final Quality Audit</h3>
              <p>We run a multi-point quality check, sweep the grounds for nails using magnet rollers, and leave your property looking better than before.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
