import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

import project1 from '../assets/project_1.png';
import project2 from '../assets/project_2.png';
import project3 from '../assets/project_3.png';
import project4 from '../assets/project_4.png';
import project5 from '../assets/project_5.png';
import project6 from '../assets/project_6.png';
import project7 from '../assets/project_7.png';
import project8 from '../assets/project_8.png';
import project9 from '../assets/project_9.png';

const projects = [
  {
    id: 1,
    title: 'Premium Residential Shingle',
    location: 'Austin, TX',
    material: 'Architectural Shingles',
    time: '2 Days',
    image: project1,
    categories: ['residential', 'replacement'],
    isLarge: true,
  },
  {
    id: 2,
    title: 'Storm Damage Restoration',
    location: 'Georgetown, TX',
    material: 'Slate Grey Asphalt',
    time: '1 Day',
    image: project2,
    categories: ['residential', 'storm'],
  },
  {
    id: 3,
    title: 'Commercial Roof Coating',
    location: 'Round Rock, TX',
    material: 'TPO & Silicon',
    time: '4 Days',
    image: project3,
    categories: ['commercial'],
  },
  {
    id: 4,
    title: 'Modern Standing Seam Metal',
    location: 'Lakeway, TX',
    material: 'Premium Metal',
    time: '3 Days',
    image: project4,
    categories: ['residential', 'replacement'],
  },
  {
    id: 5,
    title: 'Complete Roof Replacement',
    location: 'Pflugerville, TX',
    material: 'Slate Shingle',
    time: '2 Days',
    image: project5,
    categories: ['residential', 'replacement'],
  },
  {
    id: 6,
    title: 'Executive Office Complex',
    location: 'West Lake Hills, TX',
    material: 'Architectural Slate',
    time: '3 Days',
    image: project6,
    categories: ['commercial'],
  },
  {
    id: 7,
    title: 'Hail Damage Recovery',
    location: 'Cedar Park, TX',
    material: 'Impact Resistant Shingles',
    time: '2 Days',
    image: project7,
    categories: ['residential', 'storm'],
  },
  {
    id: 8,
    title: 'Retail Center TPO Retrofit',
    location: 'North Austin, TX',
    material: 'Cool Roof TPO',
    time: '5 Days',
    image: project8,
    categories: ['commercial'],
  },
  {
    id: 9,
    title: 'Wind Storm Restructure',
    location: 'Leander, TX',
    material: 'Slate Grey Shingles',
    time: '2 Days',
    image: project9,
    categories: ['residential', 'storm'],
  },
];

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Residential', value: 'residential' },
  { label: 'Replacement', value: 'replacement' },
  { label: 'Storm Restoration', value: 'storm' },
  { label: 'Commercial', value: 'commercial' },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.categories.includes(activeFilter);
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prevIndex) => 
      prevIndex === 0 ? filteredProjects.length - 1 : prevIndex! - 1
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prevIndex) => 
      prevIndex === filteredProjects.length - 1 ? 0 : prevIndex! + 1
    );
  };

  return (
    <>
      <section className="gallery-section" id="gallery">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow scroll-reveal">PORTFOLIO</span>
            <h2 className="section-title scroll-reveal">Roofs We\'re Proud<br />to Put Our Name On.</h2>
          </div>

          {/* Filter Segmented Controls */}
          <div className="gallery-filters scroll-reveal">
            {filters.map((filter) => (
              <button
                key={filter.value}
                className={`filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Bento Grid with Framer Motion Layout Transitions */}
          <motion.div layout className="gallery-bento-grid" id="gallery-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                  className={`gallery-item ${project.isLarge ? 'item-large' : ''} scroll-reveal`}
                  onClick={() => openLightbox(idx)}
                >
                  <div className="gallery-img-wrapper">
                    <img src={project.image} alt={project.title} loading="lazy" />
                  </div>
                  <div className="gallery-info-panel glass-card">
                    <div className="gallery-info-header">
                      <span>{project.location}</span>
                      <h3>{project.title}</h3>
                    </div>
                    <div className="gallery-info-meta">
                      <span>Material: {project.material}</span>
                      <span>Time: {project.time}</span>
                    </div>
                  </div>
                  <div className="gallery-zoom-badge glass-card">
                    <Maximize2 size={16} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
          >
            {/* Close */}
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close Lightbox">
              <X size={24} />
            </button>

            {/* Prev Navigation */}
            <button className="lightbox-nav nav-prev" onClick={handlePrev} aria-label="Previous Image">
              <ChevronLeft size={24} />
            </button>

            {/* Slide content */}
            <motion.div 
              key={lightboxIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={filteredProjects[lightboxIndex].image} 
                alt={filteredProjects[lightboxIndex].title} 
              />
              <div className="lightbox-details-bar glass-card">
                <div>
                  <span className="light-loc">{filteredProjects[lightboxIndex].location}</span>
                  <h3>{filteredProjects[lightboxIndex].title}</h3>
                </div>
                <div className="light-meta">
                  <span><strong>Material:</strong> {filteredProjects[lightboxIndex].material}</span>
                  <span><strong>Duration:</strong> {filteredProjects[lightboxIndex].time}</span>
                </div>
              </div>
            </motion.div>

            {/* Next Navigation */}
            <button className="lightbox-nav nav-next" onClick={handleNext} aria-label="Next Image">
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
