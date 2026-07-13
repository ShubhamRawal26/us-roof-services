import React, { useEffect } from 'react';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import BeforeAfter from './components/BeforeAfter';
import WhyChooseUs from './components/WhyChooseUs';
import Portfolio from './components/Portfolio';
import Materials from './components/Materials';
import Emergency from './components/Emergency';
import ServiceArea from './components/ServiceArea';
import EstimateWizard from './components/EstimateWizard';
import Reviews from './components/Reviews';
import Footer from './components/Footer';

export default function App() {
  // Global Scroll Reveal Observer
  useEffect(() => {
    const handleScrollAnimation = () => {
      const scrollElements = document.querySelectorAll('.scroll-reveal');
      scrollElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isInView = rect.top <= (window.innerHeight || document.documentElement.clientHeight) / 1.15;
        if (isInView) {
          el.classList.add('revealed');
        }
      });
    };

    // Initial checks at multiple intervals to capture layout states during and after preloader unmounting
    setTimeout(handleScrollAnimation, 100);
    setTimeout(handleScrollAnimation, 600);
    setTimeout(handleScrollAnimation, 1300);
    setTimeout(handleScrollAnimation, 1800);

    window.addEventListener('scroll', handleScrollAnimation);
    return () => window.removeEventListener('scroll', handleScrollAnimation);
  }, []);

  return (
    <div className="app-root-container">
      {/* Premium macOS loading experience */}
      <Preloader />

      {/* Glass navigation header */}
      <Header />

      {/* Page sections */}
      <main>
        <Hero />
        <Stats />
        <Services />
        <BeforeAfter />
        <WhyChooseUs />
        <Portfolio />
        <Materials />
        <Emergency />
        <ServiceArea />
        <EstimateWizard />
        <Reviews />
      </main>

      {/* Brand promotional footer */}
      <Footer />
    </div>
  );
}
