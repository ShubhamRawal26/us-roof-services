import React from 'react';
import { Home, Wrench, RefreshCw, CloudLightning, Building2, ClipboardCheck, ArrowRight } from 'lucide-react';

import serviceResidential from '../assets/service_residential.png';
import serviceRepair from '../assets/service_repair.png';
import serviceReplacement from '../assets/service_replacement.png';
import serviceStorm from '../assets/service_storm.png';
import serviceCommercial from '../assets/service_commercial.png';
import serviceInspection from '../assets/service_inspection.png';

const servicesData = [
  {
    id: 1,
    title: 'Residential Roofing',
    desc: 'Premium roofing systems designed to protect and elevate your home\'s longevity.',
    image: serviceResidential,
    icon: Home,
    gradientClass: 's-gradient-1',
  },
  {
    id: 2,
    title: 'Roof Repair',
    desc: 'Fast, precise repairs for leaks, wind storm damage, and aging roofing materials.',
    image: serviceRepair,
    icon: Wrench,
    gradientClass: 's-gradient-2',
  },
  {
    id: 3,
    title: 'Roof Replacement',
    desc: 'Complete, high-performance roof replacements with a lifetime workmanship warranty.',
    image: serviceReplacement,
    icon: RefreshCw,
    gradientClass: 's-gradient-3',
  },
  {
    id: 4,
    title: 'Storm Damage Repair',
    desc: 'Rapid storm assessment and insurance assistance to restore your peace of mind.',
    image: serviceStorm,
    icon: CloudLightning,
    gradientClass: 's-gradient-4',
  },
  {
    id: 5,
    title: 'Commercial Roofing',
    desc: 'Reliable roofing solutions and flat roof coatings engineered for commercial properties.',
    image: serviceCommercial,
    icon: Building2,
    gradientClass: 's-gradient-5',
  },
  {
    id: 6,
    title: 'Roof Inspection',
    desc: 'Detailed professional inspections with clear photo reports and transparent advice.',
    image: serviceInspection,
    icon: ClipboardCheck,
    gradientClass: 's-gradient-6',
  },
];

export default function Services() {
  return (
    <section className="services-section" id="services">
      <div className="container">
        {/* Header */}
        <div className="section-header text-center">
          <span className="section-eyebrow scroll-reveal">WHAT WE DO</span>
          <h2 className="section-title scroll-reveal">Complete Roofing Care.<br />One Trusted Team.</h2>
          <p className="section-desc scroll-reveal">From urgent repairs to complete roof transformations, our specialists deliver precision at every level.</p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {servicesData.map((service) => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className="service-card glass-card scroll-reveal">
                <div className="card-glow-overlay"></div>
                <div className="service-image-container">
                  <img src={service.image} alt={service.title} loading="lazy" />
                </div>
                <div className={`service-icon-wrapper ${service.gradientClass}`}>
                  <IconComponent size={24} className="s-icon" />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
                <a href="#estimate" className="service-learn-more">
                  <span>Get Started</span>
                  <ArrowRight size={16} className="arrow" />
                </a>
              </div>
            );
          })}
        </div>

        {/* View All Services CTA */}
        <div className="services-cta text-center scroll-reveal">
          <a href="#estimate" className="btn btn-secondary">
            <span>Schedule an Inspection</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
