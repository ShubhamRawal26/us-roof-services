import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, CheckCircle2, ChevronRight, ChevronLeft, ArrowRight, Loader2 } from 'lucide-react';

type RoofType = 'shingles' | 'metal' | 'tile' | 'flat';

const pricingRates: Record<RoofType, number> = {
  shingles: 5.5,
  metal: 8.5,
  tile: 12.0,
  flat: 7.0,
};

export default function EstimateWizard() {
  const [step, setStep] = useState(1);
  const [roofType, setRoofType] = useState<RoofType>('shingles');
  const [roofSize, setRoofSize] = useState(2000);
  const [hasLeak, setHasLeak] = useState<boolean | null>(null);
  
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNextStep = () => {
    if (step === 3 && hasLeak === null) {
      alert('Please select whether your roof is currently leaking.');
      return;
    }
    
    if (step === 4) {
      // Validate step 4 inputs
      const errors: Record<string, string> = {};
      if (!contactInfo.firstName.trim()) errors.firstName = 'First name is required.';
      if (!contactInfo.lastName.trim()) errors.lastName = 'Last name is required.';
      if (!contactInfo.email.trim() || !/\S+@\S+\.\S+/.test(contactInfo.email)) {
        errors.email = 'Please enter a valid email address.';
      }
      if (!contactInfo.phone.trim() || contactInfo.phone.replace(/\D/g, '').length < 10) {
        errors.phone = 'Please enter a valid 10-digit phone number.';
      }

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
      setFormErrors({});
      
      // Simulate form submission transition
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(5);
      }, 1500);
      return;
    }
    
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Calculate pricing
  const calculateEstimate = () => {
    const rate = pricingRates[roofType];
    const base = roofSize * rate;
    const leakFee = hasLeak ? 950 : 0;
    const total = base + leakFee;
    
    const low = Math.round(total * 0.92);
    const high = Math.round(total * 1.08);

    return {
      low: low.toLocaleString(),
      high: high.toLocaleString(),
    };
  };

  const { low, high } = calculateEstimate();

  return (
    <section className="estimate-section" id="estimate">
      <div className="container container-medium">
        <div className="section-header text-center">
          <span className="section-eyebrow scroll-reveal">GET A QUOTE</span>
          <h2 className="section-title scroll-reveal">Your Better Roof Starts Here.</h2>
          <p className="section-desc scroll-reveal">Tell us a little about your property. We'll handle the rest.</p>
        </div>

        {/* Wizard Panel */}
        <div className="wizard-glass-panel glass-card scroll-reveal">
          
          {/* Progress Indicator */}
          <div className="wizard-progress-bar">
            {Array.from({ length: 4 }).map((_, i) => (
              <React.Fragment key={i}>
                <div className={`progress-dot ${step > i ? 'active' : ''} ${step === i + 1 ? 'current' : ''}`}>
                  {step > i + 1 ? '✔' : i + 1}
                </div>
                {i < 3 && <div className={`progress-line-segment ${step > i + 1 ? 'active' : ''}`}></div>}
              </React.Fragment>
            ))}
          </div>

          <div className="wizard-steps-container">
            <AnimatePresence mode="wait">
              
              {/* Step 1: Roof Type */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="wizard-step-node"
                >
                  <h3 className="wizard-step-title text-center">Select your current roof material:</h3>
                  <div className="wizard-options-grid">
                    {(['shingles', 'metal', 'tile', 'flat'] as RoofType[]).map((type) => (
                      <div
                        key={type}
                        className={`wizard-opt-card glass-card ${roofType === type ? 'active' : ''}`}
                        onClick={() => setRoofType(type)}
                      >
                        <Home size={32} className="opt-icon" />
                        <h4>{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
                        <span className="opt-meta">
                          {type === 'shingles' && 'Owens Corning & GAF'}
                          {type === 'metal' && 'Standing Seam Metal'}
                          {type === 'tile' && 'Traditional Terracotta'}
                          {type === 'flat' && 'TPO Cool Roof Coating'}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Roof Size */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="wizard-step-node"
                >
                  <h3 className="wizard-step-title text-center">Estimate your roof size (Sq Ft):</h3>
                  <div className="slider-input-container">
                    <div className="slider-numeric-display">{roofSize} <span>SQ FT</span></div>
                    <input
                      type="range"
                      min="1000"
                      max="5000"
                      step="100"
                      value={roofSize}
                      onChange={(e) => setRoofSize(Number(e.target.value))}
                      className="wizard-range-slider"
                    />
                    <div className="slider-range-limits">
                      <span>1,000 Sq Ft</span>
                      <span>5,000 Sq Ft</span>
                    </div>
                    <div className="slider-helper-text">
                      *Average US residential roof is around 2,000 Sq Ft.
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Leaking Status */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="wizard-step-node"
                >
                  <h3 className="wizard-step-title text-center">Is the roof currently leaking or damaged?</h3>
                  <div className="wizard-leak-options">
                    <div 
                      className={`leak-opt-btn glass-card ${hasLeak === true ? 'active-yes' : ''}`}
                      onClick={() => setHasLeak(true)}
                    >
                      <span>Yes, Leaking/Active Damage</span>
                    </div>
                    <div 
                      className={`leak-opt-btn glass-card ${hasLeak === false ? 'active-no' : ''}`}
                      onClick={() => setHasLeak(false)}
                    >
                      <span>No, Normal Wear or Remodel</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Contact details */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="wizard-step-node"
                >
                  <h3 className="wizard-step-title text-center">Where should we send your estimate?</h3>
                  {isSubmitting ? (
                    <div className="wizard-submitting-loader">
                      <Loader2 className="animate-spin text-blue" size={48} />
                      <p>Calculating custom roof dimensions and pricing options...</p>
                    </div>
                  ) : (
                    <div className="wizard-form-grid">
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          placeholder="John"
                          value={contactInfo.firstName}
                          onChange={(e) => setContactInfo({ ...contactInfo, firstName: e.target.value })}
                          className={formErrors.firstName ? 'error-input' : ''}
                        />
                        {formErrors.firstName && <span className="error-text">{formErrors.firstName}</span>}
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          placeholder="Doe"
                          value={contactInfo.lastName}
                          onChange={(e) => setContactInfo({ ...contactInfo, lastName: e.target.value })}
                          className={formErrors.lastName ? 'error-input' : ''}
                        />
                        {formErrors.lastName && <span className="error-text">{formErrors.lastName}</span>}
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          placeholder="johndoe@example.com"
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                          className={formErrors.email ? 'error-input' : ''}
                        />
                        {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          placeholder="(512) 555-0199"
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                          className={formErrors.phone ? 'error-input' : ''}
                        />
                        {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 5: Success estimate display */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', damping: 20 }}
                  className="wizard-step-node success-step text-center"
                >
                  <CheckCircle2 size={56} className="text-success mx-auto mb-4" />
                  <h2>Calculation Complete!</h2>
                  <p className="success-thank-you">Thank you, {contactInfo.firstName}. We've compiled your preliminary roof replacement estimate range below.</p>
                  
                  <div className="pricing-estimate-panel glass-card">
                    <span className="est-title">Estimated Range</span>
                    <div className="est-price">${low} - ${high}</div>
                    <p className="est-meta">Based on {roofSize} Sq Ft of {roofType.charAt(0).toUpperCase() + roofType.slice(1)} roofing in Central Texas.</p>
                  </div>

                  <div className="success-footer-actions">
                    <button onClick={() => setStep(1)} className="btn btn-secondary">
                      <span>Recalculate</span>
                    </button>
                    <a href="tel:5125557663" className="btn btn-primary">
                      <span>Schedule Inspector</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Action buttons (Footer) */}
          {step < 5 && !isSubmitting && (
            <div className="wizard-actions-footer">
              {step > 1 ? (
                <button onClick={handlePrevStep} className="btn btn-secondary btn-wizard-back">
                  <ChevronLeft size={16} />
                  <span>Back</span>
                </button>
              ) : (
                <div></div>
              )}
              <button onClick={handleNextStep} className="btn btn-primary btn-wizard-next">
                <span>{step === 4 ? 'Submit Request' : 'Continue'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
