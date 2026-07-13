import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="page-loader"
        >
          <div className="loader-content">
            <svg viewBox="0 0 100 100" className="loader-svg">
              <path d="M10 80 L50 20 L90 80 Z" fill="none" stroke="#1473E6" stroke-width="5" stroke-linejoin="round" className="loader-path-base"/>
              <path d="M10 80 L50 20 L90 80 Z" fill="none" stroke="#FF6B35" stroke-width="5.5" stroke-linejoin="round" className="loader-path-fill"/>
            </svg>
            <div className="loader-logo">SUMMIT<span>SHIELD</span></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
