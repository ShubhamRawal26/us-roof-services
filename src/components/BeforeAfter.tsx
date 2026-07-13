import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import beforeRoof from '../assets/before_roof.png';
import afterRoof from '../assets/after_roof.png';

export default function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = (x / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, pct)));
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <section className="transformation-section" id="transformation">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow scroll-reveal">THE RESULTS</span>
          <h2 className="section-title scroll-reveal">See the Difference<br />Craftsmanship Makes.</h2>
          <p className="section-desc scroll-reveal">Slide to compare a weather-worn roof with a newly completed SummitShield structural system.</p>
        </div>

        {/* Comparison Slider Box */}
        <div ref={containerRef} className="slider-box-container scroll-reveal">
          <div className="comparison-slider">
            
            {/* Before image (underneath) */}
            <div className="image-before">
              <img src={beforeRoof} alt="Damaged shingle roof before replacement" loading="lazy" />
              <div className="slider-label label-before glass-card">BEFORE</div>
            </div>
            
            {/* After image (clipped overlay) */}
            <div 
              className="image-after-overlay" 
              style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            >
              <img src={afterRoof} alt="Pristine modern roof after replacement" loading="lazy" />
              <div className="slider-label label-after glass-card">AFTER</div>
            </div>
            
            {/* Slider Handle */}
            <div 
              className="slider-handle" 
              style={{ left: `${sliderPos}%` }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              role="slider"
              aria-valuenow={sliderPos}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Drag slider to compare before and after"
            >
              <div className="handle-line"></div>
              <div className="handle-button glass-card">
                <ArrowLeftRight size={18} className="text-navy" />
              </div>
              <div className="handle-line"></div>
            </div>
            
          </div>

          {/* Meta Details Panel */}
          <div className="transformation-details glass-card">
            <div className="detail-item">
              <span className="detail-title">Project Type</span>
              <span className="detail-val">Residential Replacement</span>
            </div>
            <div className="detail-item">
              <span className="detail-title">Location</span>
              <span className="detail-val">Austin, Texas</span>
            </div>
            <div className="detail-item">
              <span className="detail-title">Material</span>
              <span className="detail-val">Architectural Asphalt Shingles</span>
            </div>
            <div className="detail-item">
              <span className="detail-title">Completion</span>
              <span className="detail-val">2 Days</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
