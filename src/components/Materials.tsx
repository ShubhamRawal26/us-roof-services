import React from 'react';
import materialShingles from '../assets/material_shingles.png';
import materialMetal from '../assets/material_metal.png';
import materialTile from '../assets/material_tile.png';

const materialsData = [
  {
    id: 1,
    title: 'Architectural Shingles',
    badge: 'Popular',
    desc: 'Multi-dimensional laminate asphalt shingles offering class-leading wind resistance, beautiful depth, and excellent value for traditional American suburban homes.',
    image: materialShingles,
    specs: [
      { label: 'Expected Lifespan', val: '25-30 Years', width: '70%' },
      { label: 'Severe Weather Defense', val: 'Class 3 Impact', width: '65%' },
      { label: 'Maintenance Requirements', val: 'Low', width: '30%' },
    ],
  },
  {
    id: 2,
    title: 'Standing Seam Metal',
    badge: 'High Durability',
    badgeClass: 'badge-premium',
    desc: 'Interlocking vertical metal panels. Extremely reflective, fireproof, and highly rated against hail. Ideal for contemporary architectural elevations and solar mounts.',
    image: materialMetal,
    specs: [
      { label: 'Expected Lifespan', val: '50+ Years', width: '95%' },
      { label: 'Severe Weather Defense', val: 'Class 4 Impact (Highest)', width: '95%' },
      { label: 'Maintenance Requirements', val: 'Very Low', width: '15%' },
    ],
  },
  {
    id: 3,
    title: 'Clay & Concrete Tile',
    badge: 'Traditional',
    desc: 'Beautiful Southwestern aesthetics. Naturally insulating, heavy, and impervious to fire. Ideal for stucco facades and Spanish revival architecture in Central Texas.',
    image: materialTile,
    specs: [
      { label: 'Expected Lifespan', val: '50-100 Years', width: '90%' },
      { label: 'Severe Weather Defense', val: 'Excellent Wind Rating', width: '80%' },
      { label: 'Maintenance Requirements', val: 'Medium', width: '50%' },
    ],
  },
];

export default function Materials() {
  return (
    <section className="materials-section" id="materials">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow scroll-reveal">OUR MATERIALS</span>
          <h2 className="section-title scroll-reveal">Premium Materials.<br />Proven Performance.</h2>
          <p className="section-desc scroll-reveal">We offer a curated selection of roofing options tailored for Texas weather conditions.</p>
        </div>

        {/* Materials List */}
        <div className="materials-list">
          {materialsData.map((material) => (
            <div key={material.id} className="material-horizontal-card glass-card scroll-reveal">
              <div className="material-img-col">
                <img src={material.image} alt={material.title} loading="lazy" />
              </div>
              <div className="material-text-col">
                <div className="m-card-header">
                  <h3>{material.title}</h3>
                  <span className={`m-badge ${material.badgeClass || ''}`}>{material.badge}</span>
                </div>
                <p className="m-desc">{material.desc}</p>
              </div>
              <div className="m-specs">
                {material.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="spec-bar-wrapper">
                    <div className="spec-label">
                      <span>{spec.label}</span>
                      <span><strong>{spec.val}</strong></span>
                    </div>
                    <div className="spec-track">
                      <div className="spec-fill" style={{ width: spec.width }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
