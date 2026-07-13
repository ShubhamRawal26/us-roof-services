import React, { useState } from 'react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    {
      q: "How do I know if my roof needs to be replaced?",
      a: "Key warning signs include: curled or buckled shingle edges, missing shingles in structural valleys, granule bald spots in gutters, water stains on ceilings/attic decks, or any roofing system older than 20-25 years. We recommend scheduling our free inspection to document the exact health score of your shingles."
    },
    {
      q: "How long does a roof replacement take?",
      a: "Most standard residential roof replacements are completed in 1 to 2 days. Complex roof architectures, larger commercial squares, or severe storm damage repairs may require 3 to 4 days. Weather conditions also impact schedules, but our crews seal the property securely each afternoon."
    },
    {
      q: "Do you offer free roof inspections?",
      a: "Yes. Our comprehensive visual assessments are 100% free of cost and obligation. We document all findings on our iPads, including photos of roof tiles, vent collars, flashing details, and storm markings, giving you transparent advice to make informed decisions."
    },
    {
      q: "Can you help after storm damage?",
      a: "Absolutely. We specialize in storm restoration. We will conduct an immediate assessment to document the hail or wind impact, assist with structural details needed by your insurance carrier, and provide full documentation support to facilitate your claim processing."
    },
    {
      q: "What roofing materials do you install?",
      a: "We work with architectural asphalt shingles (standard, impact-resistant), modern standing seam metal systems, traditional clay/concrete tiles, low-slope flat roof materials (TPO, silicone coatings), and premium synthetic slate. All sourced from top American manufacturing brands."
    },
    {
      q: "Do you provide workmanship warranties?",
      a: "Yes. We offer an industry-leading lifetime workmanship warranty on our full replacements. This is backed by our certifications with major manufacturers, certifying our installations meet high standards. If structural issues ever arise due to installation, we cover repairs fully."
    },
    {
      q: "Will you clean up after the project?",
      a: "We take cleanup seriously. We protect landscaping with heavy-duty tarps, clean up debris constantly, and run professional magnetic rollers across your entire driveway, lawn, and walkways twice to collect every stray nail before signing off."
    }
  ];

  return (
    <section className="faq-section" id="faq">
      <div className="container container-medium">
        <div className="section-header text-center">
          <span className="section-eyebrow scroll-reveal">QUESTIONS?</span>
          <h2 className="section-title scroll-reveal">Roofing Questions,<br />Clearly Answered.</h2>
        </div>

        {/* FAQ Container */}
        <div className="faq-accordion-list scroll-reveal">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="accordion-item glass-card">
                <button 
                  className="accordion-trigger" 
                  aria-expanded={isOpen} 
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <span>{item.q}</span>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="plus-icon">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </button>
                <div 
                  className="accordion-content" 
                  style={{ maxHeight: isOpen ? '250px' : '0px' }}
                >
                  <div className="accordion-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
