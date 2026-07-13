import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, AlertCircle } from 'lucide-react';

const cities = [
  { id: 'austin', name: 'Austin', response: '1 Hour', address: 'Austin Main Office', activeCrews: 8 },
  { id: 'round-rock', name: 'Round Rock', response: '1.5 Hours', address: 'Round Rock Service Center', activeCrews: 4 },
  { id: 'cedar-park', name: 'Cedar Park', response: '1.5 Hours', address: 'Cedar Park Dispatch', activeCrews: 3 },
  { id: 'georgetown', name: 'Georgetown', response: '2 Hours', address: 'Georgetown Branch', activeCrews: 2 },
  { id: 'pflugerville', name: 'Pflugerville', response: '1.5 Hours', address: 'Pflugerville Dispatch', activeCrews: 3 },
  { id: 'leander', name: 'Leander', response: '2 Hours', address: 'Leander Hub', activeCrews: 2 },
];

const VALID_ZIPS = ['78701', '78702', '78759', '78745', '78746', '78664', '78681', '78613', '78626', '78628', '78660', '78641', '78645'];

export default function ServiceArea() {
  const [activeCity, setActiveCity] = useState(cities[0]);
  const [zipInput, setZipInput] = useState('');
  const [zipFeedback, setZipFeedback] = useState<{ status: 'success' | 'error' | null; msg: string }>({
    status: null,
    msg: '',
  });

  const handleCitySelect = (cityId: string) => {
    const matched = cities.find((c) => c.id === cityId);
    if (matched) setActiveCity(matched);
  };

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipInput.trim();
    if (cleanZip.length !== 5 || isNaN(Number(cleanZip))) {
      setZipFeedback({
        status: 'error',
        msg: 'Please enter a valid 5-digit ZIP code.',
      });
      return;
    }

    if (VALID_ZIPS.includes(cleanZip)) {
      setZipFeedback({
        status: 'success',
        msg: `✔ We service ${cleanZip}! Active crews are currently dispatched nearby.`,
      });
    } else {
      setZipFeedback({
        status: 'error',
        msg: `✖ Sorry, ${cleanZip} is outside our current dispatch area. Contact us for special exceptions.`,
      });
    }
  };

  return (
    <section className="area-section" id="service-areas">
      <div className="container area-grid">
        {/* Service Cities Detail */}
        <div className="area-text scroll-reveal">
          <span className="section-eyebrow">OUR REGION</span>
          <h2 className="section-title">Proudly Roofing<br />Central Texas.</h2>
          <p className="section-desc">We dispatch certified crews daily across Austin and its surrounding residential communities. Choose a region below to verify quick response times.</p>
          
          <div className="cities-selector-list">
            {cities.map((city) => (
              <div 
                key={city.id}
                className={`city-selector-badge ${activeCity.id === city.id ? 'active' : ''}`}
                onClick={() => handleCitySelect(city.id)}
              >
                {city.name}
              </div>
            ))}
          </div>

          {/* Zip code check widget */}
          <div className="zip-check-box glass-card">
            <h4>Verify Service to your ZIP code:</h4>
            <form onSubmit={handleZipCheck} className="zip-input-row">
              <input 
                type="text" 
                placeholder="Enter 5-Digit ZIP" 
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value)}
                maxLength={5}
              />
              <button type="submit" className="btn btn-primary">Check</button>
            </form>
            {zipFeedback.status && (
              <div className={`zip-result ${zipFeedback.status}`}>
                {zipFeedback.status === 'success' ? (
                  <CheckCircle2 size={16} className="inline mr-1" />
                ) : (
                  <AlertCircle size={16} className="inline mr-1" />
                )}
                <span>{zipFeedback.msg}</span>
              </div>
            )}
          </div>
        </div>

        {/* Styled Interactive Map SVG */}
        <div className="area-map-container glass-card scroll-reveal">
          <div className="map-grid-pattern"></div>
          
          <svg viewBox="0 0 500 500" className="abstract-map-svg">
            {/* Roads */}
            <path d="M 50 150 Q 250 200 450 150" stroke="rgba(20, 115, 230, 0.15)" strokeWidth="3" fill="none"/>
            <path d="M 100 400 Q 250 250 400 100" stroke="rgba(20, 115, 230, 0.2)" strokeWidth="4" fill="none"/>
            <path d="M 250 50 L 250 450" stroke="rgba(20, 115, 230, 0.15)" strokeDasharray="6 6" strokeWidth="2" fill="none"/>
            
            {/* Concentric rings */}
            <circle cx="250" cy="250" r="180" fill="none" stroke="rgba(20, 115, 230, 0.05)" strokeWidth="2"/>
            <circle cx="250" cy="250" r="100" fill="none" stroke="rgba(20, 115, 230, 0.05)" strokeWidth="2"/>

            {/* Pins */}
            {/* Austin Pin (Center) */}
            <g className={`map-pin-g ${activeCity.id === 'austin' ? 'active' : ''}`} onClick={() => handleCitySelect('austin')}>
              <circle cx="250" cy="250" r="18" className="pin-pulse-circle"/>
              <path d="M250 238c-6.6 0-12 5.4-12 12 0 9 12 22 12 22s12-13 12-22c0-6.6-5.4-12-12-12zm0 16.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z" fill="#1473E6"/>
              <text x="250" y="225" textAnchor="middle" className="map-pin-text">Austin</text>
            </g>

            {/* Round Rock Pin */}
            <g className={`map-pin-g ${activeCity.id === 'round-rock' ? 'active' : ''}`} onClick={() => handleCitySelect('round-rock')}>
              <circle cx="280" cy="180" r="14" className="pin-pulse-circle"/>
              <path d="M280 170c-5.5 0-10 4.5-10 10 0 7.5 10 18.3 10 18.3s10-10.8 10-18.3c0-5.5-4.5-10-10-10zm0 13.8c-2 0-3.8-1.7-3.8-3.8s1.7-3.8 3.8-3.8 3.8 1.7 3.8 3.8-1.7 3.8-3.8 3.8z" fill="#0B1F3A"/>
              <text x="280" y="158" textAnchor="middle" className="map-pin-text">Round Rock</text>
            </g>

            {/* Cedar Park Pin */}
            <g className={`map-pin-g ${activeCity.id === 'cedar-park' ? 'active' : ''}`} onClick={() => handleCitySelect('cedar-park')}>
              <circle cx="160" cy="190" r="14" className="pin-pulse-circle"/>
              <path d="M160 180c-5.5 0-10 4.5-10 10 0 7.5 10 18.3 10 18.3s10-10.8 10-18.3c0-5.5-4.5-10-10-10zm0 13.8c-2 0-3.8-1.7-3.8-3.8s1.7-3.8 3.8-3.8 3.8 1.7 3.8 3.8-1.7 3.8-3.8 3.8z" fill="#0B1F3A"/>
              <text x="160" y="178" textAnchor="middle" className="map-pin-text">Cedar Park</text>
            </g>

            {/* Georgetown Pin */}
            <g className={`map-pin-g ${activeCity.id === 'georgetown' ? 'active' : ''}`} onClick={() => handleCitySelect('georgetown')}>
              <circle cx="220" cy="110" r="14" className="pin-pulse-circle"/>
              <path d="M220 100c-5.5 0-10 4.5-10 10 0 7.5 10 18.3 10 18.3s10-10.8 10-18.3c0-5.5-4.5-10-10-10zm0 13.8c-2 0-3.8-1.7-3.8-3.8s1.7-3.8 3.8-3.8 3.8 1.7 3.8 3.8-1.7 3.8-3.8 3.8z" fill="#0B1F3A"/>
              <text x="220" y="88" textAnchor="middle" className="map-pin-text">Georgetown</text>
            </g>

            {/* Pflugerville Pin */}
            <g className={`map-pin-g ${activeCity.id === 'pflugerville' ? 'active' : ''}`} onClick={() => handleCitySelect('pflugerville')}>
              <circle cx="340" cy="230" r="14" className="pin-pulse-circle"/>
              <path d="M340 220c-5.5 0-10 4.5-10 10 0 7.5 10 18.3 10 18.3s10-10.8 10-18.3c0-5.5-4.5-10-10-10zm0 13.8c-2 0-3.8-1.7-3.8-3.8s1.7-3.8 3.8-3.8 3.8 1.7 3.8 3.8-1.7 3.8-3.8 3.8z" fill="#0B1F3A"/>
              <text x="340" y="208" text-anchor="middle" className="map-pin-text">Pflugerville</text>
            </g>

            {/* Leander Pin */}
            <g className={`map-pin-g ${activeCity.id === 'leander' ? 'active' : ''}`} onClick={() => handleCitySelect('leander')}>
              <circle cx="120" cy="140" r="14" className="pin-pulse-circle"/>
              <path d="M120 130c-5.5 0-10 4.5-10 10 0 7.5 10 18.3 10 18.3s10-10.8 10-18.3c0-5.5-4.5-10-10-10zm0 13.8c-2 0-3.8-1.7-3.8-3.8s1.7-3.8 3.8-3.8 3.8 1.7 3.8 3.8-1.7 3.8-3.8 3.8z" fill="#0B1F3A"/>
              <text x="120" y="118" text-anchor="middle" className="map-pin-text">Leander</text>
            </g>
          </svg>

          {/* Info Card Popover inside Map Container */}
          <div className="map-hover-details glass-card" style={{ display: 'block', pointerEvents: 'none' }}>
            <h4 id="map-info-city">{activeCity.name} Office</h4>
            <p id="map-info-stat">Average Response: {activeCity.response}</p>
            <span className="active-badge">{activeCity.activeCrews} Active Crews Nearby</span>
          </div>
        </div>
      </div>
    </section>
  );
}
