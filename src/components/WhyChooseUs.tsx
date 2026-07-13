import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Award, Layers, DollarSign, UserCheck, Sparkles, Check } from 'lucide-react';
import whyChooseUsImg from '../assets/why_choose_us.png';

const features = [
  {
    id: 1,
    title: 'Licensed & Fully Insured',
    desc: 'Complete coverage for your safety, peace of mind, and property protection during building.',
    icon: Shield,
    iconColor: 'text-blue',
  },
  {
    id: 2,
    title: 'Lifetime Workmanship Warranty',
    desc: 'We back our craftsmanship for life. If there\'s an issue with our work, we\'ll fix it immediately.',
    icon: Award,
    iconColor: 'text-success',
  },
  {
    id: 3,
    title: 'Premium Roofing Materials',
    desc: 'We source only top-tier materials from Owens Corning, GAF, and CertainTeed for maximum durability.',
    icon: Layers,
    iconColor: 'text-blue',
  },
  {
    id: 4,
    title: 'Transparent, Upfront Pricing',
    desc: 'Detailed breakdowns with zero hidden fees. You\'ll know exactly what you are paying for before we start.',
    icon: DollarSign,
    iconColor: 'text-orange',
  },
  {
    id: 5,
    title: 'Dedicated Project Manager',
    desc: 'A single point of contact overseeing every nail, cleaning sweep, and scheduling update on site.',
    icon: UserCheck,
    iconColor: 'text-blue',
  },
  {
    id: 6,
    title: 'Clean Jobsite Promise',
    desc: 'We use heavy-duty protective tarps and magnetic nail sweeps to leave your property completely spotless.',
    icon: Sparkles,
    iconColor: 'text-success',
  },
];

const steps = [
  {
    num: '01',
    title: 'Free Roof Inspection',
    desc: 'Schedule a convenient property inspection. We look for storm wear, leaks, shingle degradation, and flashing integrity.',
    align: 'left',
  },
  {
    num: '02',
    title: 'Clear Assessment',
    desc: 'Receive a comprehensive report with photo evidence, material recommendations, and a transparent, itemized estimate.',
    align: 'right',
  },
  {
    num: '03',
    title: 'Precision Installation',
    desc: 'Our certified roofing crews protect your gardens, strip the old roof, repair underlying deck boards, and build your new shingle system.',
    align: 'left',
  },
  {
    num: '04',
    title: 'Final Quality Audit',
    desc: 'We run a multi-point quality check, sweep the grounds for nails using magnet rollers, and leave your property looking better than before.',
    align: 'right',
  },
];

export default function WhyChooseUs() {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Framer Motion timeline drawing animations
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });
  
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      {/* Why Choose Us Grid */}
      <section className="why-us-section" id="why-us">
        <div className="container why-us-grid">
          {/* Left Sticky Panel */}
          <div className="why-us-sticky">
            <span className="section-eyebrow">THE STANDARD</span>
            <h2 className="why-us-headline">Roofing Done<br />Differently.</h2>
            <p className="why-us-text">No high-pressure sales. No shortcuts. Just clear guidance, premium American materials, and professional craftsmanship built to protect your investment.</p>
            <div className="why-us-image-wrapper">
              <img src={whyChooseUsImg} alt="SummitShield Professional Contractor" loading="lazy" />
            </div>
            <a href="#estimate" className="btn btn-primary magnetic-btn">
              <span>Get Started Today</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          {/* Right Cards List */}
          <div className="why-us-cards-list">
            {features.map((feat) => {
              const IconComp = feat.icon;
              return (
                <div key={feat.id} className="why-card glass-card scroll-reveal">
                  <div className={`why-card-icon ${feat.iconColor}`}>
                    <IconComp size={24} />
                  </div>
                  <div className="why-card-body">
                    <h3>{feat.title}</h3>
                    <p>{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic Roofing Process Section */}
      <section className="process-section" id="process">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow scroll-reveal">OUR PROCESS</span>
            <h2 className="section-title scroll-reveal">From First Call<br />to Final Nail.</h2>
            <p className="section-desc scroll-reveal">A seamless, clear journey designed to give you peace of mind and an incredible new roof.</p>
          </div>

          {/* Timeline Scroll Tracker */}
          <div ref={timelineRef} className="process-timeline-container">
            <svg className="timeline-svg" viewBox="0 0 100 800" preserveAspectRatio="none">
              <path d="M 50 0 L 50 800" stroke="#E9EEF5" strokeWidth="4" strokeDasharray="8 8" fill="none" />
              <motion.path 
                d="M 50 0 L 50 800" 
                stroke="#1473E6" 
                strokeWidth="4" 
                fill="none"
                style={{ pathLength }}
              />
            </svg>

            {steps.map((step, index) => (
              <div key={index} className={`process-step step-${step.align} scroll-reveal`}>
                <div className="step-orb-wrapper">
                  <div className="step-orb glass-card">{step.num}</div>
                </div>
                <div className="step-card glass-card">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
