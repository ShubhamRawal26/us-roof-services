import React from 'react';
import { PhoneCall } from 'lucide-react';

export default function Emergency() {
  return (
    <section className="emergency-banner" id="emergency">
      <div className="emergency-bg-glow"></div>
      <div className="weather-overlay-lines"></div>
      <div className="container emergency-container">
        <div className="emergency-content scroll-reveal">
          <div className="emergency-badge">
            <span className="pulse-dot"></span>
            <span>URGENT ASSISTANCE</span>
          </div>
          <h2 className="emergency-title">Roof Damage Can't Wait.</h2>
          <p className="emergency-text">
            Active leak, structural storm damage, or fallen limbs? Don't wait for the next rainfall. Our emergency roofing crews are active in the area and ready to tarp, secure, and inspect your property.
          </p>
          <div className="emergency-actions">
            <a href="tel:5125557663" className="btn btn-primary btn-large btn-orange magnetic-btn">
              <PhoneCall size={20} />
              <span>Call (512) 555-ROOF</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
