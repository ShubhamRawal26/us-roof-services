/**
 * SummitShield Roofing - Premium Interactivity Script
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. GLOBAL CURSOR GLOW
  // ==========================================================================
  const cursorGlow = document.getElementById('cursor-glow');
  
  if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });

    document.addEventListener('mouseenter', () => {
      cursorGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
    });

    // Expand cursor glow over interactive buttons
    const interactiveElements = document.querySelectorAll('a, button, .option-select-card, .gallery-item, .city-selector-badge');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorGlow.style.width = '450px';
        cursorGlow.style.height = '450px';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(20, 115, 230, 0.12) 0%, rgba(20, 115, 230, 0) 70%)';
      });

      el.addEventListener('mouseleave', () => {
        cursorGlow.style.width = '300px';
        cursorGlow.style.height = '300px';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(20, 115, 230, 0.08) 0%, rgba(20, 115, 230, 0) 70%)';
      });
    });
  }

  // Card cursor coordinates for border glows (Services grid)
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });


  // ==========================================================================
  // 2. PREMIUM PAGE LOADER
  // ==========================================================================
  const pageLoader = document.getElementById('page-loader');
  const loaderProgress = document.getElementById('loader-progress-fill');
  
  if (pageLoader && loaderProgress) {
    let progress = 0;
    
    // Simulate loading fill
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Lift and fade loader screen
        setTimeout(() => {
          pageLoader.classList.add('fade-out');
        }, 300);
      }
      loaderProgress.style.width = `${progress}%`;
    }, 80);
  } else {
    // Fallback if elements not present
    if (pageLoader) pageLoader.classList.add('fade-out');
  }


  // ==========================================================================
  // 3. FLOATING NAVIGATION BAR & ACTIVE PILL TRACKER
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const activePill = document.getElementById('nav-active-pill');

  // Shrink Nav Bar on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Update nav active pill background position
  function updateActivePill(link) {
    if (!activePill || !link) return;
    const linkRect = link.getBoundingClientRect();
    const menuRect = navMenu.getBoundingClientRect();
    
    activePill.style.width = `${linkRect.width}px`;
    activePill.style.height = `${linkRect.height}px`;
    activePill.style.left = `${linkRect.left - menuRect.left}px`;
    activePill.style.top = `${linkRect.top - menuRect.top}px`;
    activePill.style.opacity = '1';
  }

  // Initialize Active Pill Position on hover/active states
  const activeLink = document.querySelector('.nav-link.active');
  if (activeLink) {
    // Wait for fonts/layout to settle
    setTimeout(() => updateActivePill(activeLink), 500);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Smooth slide to target element
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Adjust for floating navigation height
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const targetRect = targetSection.getBoundingClientRect().top;
        const targetPosition = targetRect - bodyRect - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }

      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      updateActivePill(link);
    });

    // Hover moves the pill background softly
    link.addEventListener('mouseenter', () => {
      updateActivePill(link);
    });
  });

  // Return pill background to current active item on mouse leave nav area
  if (navMenu) {
    navMenu.addEventListener('mouseleave', () => {
      const currentActive = document.querySelector('.nav-link.active');
      if (currentActive) {
        updateActivePill(currentActive);
      } else {
        activePill.style.opacity = '0';
      }
    });
  }

  // Active state scroll tracking
  const sections = document.querySelectorAll('section');
  const scrollOffset = 150;

  window.addEventListener('scroll', () => {
    let currentId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - scrollOffset;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentId = `#${section.getAttribute('id')}`;
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === currentId) {
          link.classList.add('active');
          updateActivePill(link);
        } else {
          link.classList.remove('active');
        }
      });
    }
  }, { passive: true });

  // Mobile menu toggle logic
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('active');

        // Smooth scroll to target
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const targetRect = targetSection.getBoundingClientRect().top;
          const targetPosition = targetRect - bodyRect - offset;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      });
    });

    // Close mobile menu if clicked outside
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    });
  }


  // ==========================================================================
  // 4. HERO PARALLAX FLOATING CARDS & MAGNETIC BUTTONS
  // ==========================================================================
  const heroSection = document.getElementById('hero');
  const parallaxCards = document.querySelectorAll('.parallax-card');

  if (heroSection && parallaxCards.length > 0) {
    heroSection.addEventListener('mousemove', (e) => {
      const { width, height } = heroSection.getBoundingClientRect();
      const mouseX = e.clientX - width / 2;
      const mouseY = e.clientY - height / 2;

      parallaxCards.forEach(card => {
        const speed = parseFloat(card.getAttribute('data-speed')) || 1;
        const shiftX = (mouseX * speed) / 45;
        const shiftY = (mouseY * speed) / 45;
        card.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
      });
    });
  }

  // Magnetic Button Effect
  const magneticButtons = document.querySelectorAll('.magnetic-btn');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const btnX = rect.left + rect.width / 2;
      const btnY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - btnX;
      const mouseY = e.clientY - btnY;

      // Magnetic pull limit (50px distance threshold)
      const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      if (distance < 60) {
        // Translate button face slightly toward coordinates
        const pullFactor = 0.25;
        btn.style.transform = `translate(${mouseX * pullFactor}px, ${mouseY * pullFactor}px)`;
        const span = btn.querySelector('span');
        if (span) {
          span.style.transform = `translate(${mouseX * 0.1}px, ${mouseY * 0.1}px)`;
        }
      }
    });

    btn.addEventListener('mouseleave', () => {
      // Re-align button face
      btn.style.transform = '';
      const span = btn.querySelector('span');
      if (span) span.style.transform = '';
    });
  });


  // ==========================================================================
  // 5. SCROLL REVEALS & STATISTICS STRIP COUNTER ANIMATIONS
  // ==========================================================================
  const scrollElements = document.querySelectorAll('.scroll-reveal');
  
  const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        elementObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  scrollElements.forEach(el => elementObserver.observe(el));

  // Numbers Count Up Animation
  const statsContainer = document.querySelector('.stats-glass-container');
  const statColumns = document.querySelectorAll('.stat-col');

  if (statsContainer && statColumns.length > 0) {
    const startCountAnimation = (element) => {
      const countTarget = parseFloat(element.getAttribute('data-count-target'));
      const decimals = parseInt(element.getAttribute('data-decimals')) || 0;
      const counterSpan = element.querySelector('.counter');
      
      if (!counterSpan || isNaN(countTarget)) return;

      let start = 0;
      const duration = 2000; // ms
      const startTime = performance.now();

      const animateStep = (timestamp) => {
        const progress = Math.min((timestamp - startTime) / duration, 1);
        // Easing out quadratic
        const easedProgress = progress * (2 - progress);
        const currentVal = easedProgress * countTarget;

        counterSpan.textContent = currentVal.toFixed(decimals);

        if (progress < 1) {
          requestAnimationFrame(animateStep);
        } else {
          counterSpan.textContent = countTarget.toFixed(decimals);
        }
      };

      requestAnimationFrame(animateStep);
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statColumns.forEach(col => startCountAnimation(col));
          statsObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });

    statsObserver.observe(statsContainer);
  }


  // ==========================================================================
  // 6. BEFORE & AFTER IMAGE TRANSFORMATION COMPARISON SLIDER
  // ==========================================================================
  const slider = document.getElementById('comparison-slider');
  const afterOverlay = document.getElementById('image-after-overlay');
  const handle = document.getElementById('slider-handle');

  if (slider && afterOverlay && handle) {
    let isDragging = false;

    const setSliderPosition = (x) => {
      const rect = slider.getBoundingClientRect();
      let position = ((x - rect.left) / rect.width) * 100;
      
      // Boundaries checks
      if (position < 0) position = 0;
      if (position > 100) position = 100;

      handle.style.left = `${position}%`;
      afterOverlay.style.clipPath = `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`;
    };

    // Mouse Listeners
    handle.addEventListener('mousedown', () => { isDragging = true; });
    window.addEventListener('mouseup', () => { isDragging = false; });
    
    slider.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.clientX);
    });

    // Touch Listeners
    handle.addEventListener('touchstart', () => { isDragging = true; });
    window.addEventListener('touchend', () => { isDragging = false; });
    
    slider.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches[0]) {
        setSliderPosition(e.touches[0].clientX);
      }
    });

    // Quick click set position
    slider.addEventListener('click', (e) => {
      if (e.target !== handle && !handle.contains(e.target)) {
        setSliderPosition(e.clientX);
      }
    });
  }


  // ==========================================================================
  // 7. ROOFING PROCESS CONNECTOR LINE ANIMATION
  // ==========================================================================
  const processTimeline = document.querySelector('.process-timeline-container');
  const timelinePathDraw = document.getElementById('timeline-path-draw');
  const processSteps = document.querySelectorAll('.process-step');

  if (processTimeline && timelinePathDraw) {
    const handleTimelineScroll = () => {
      const rect = processTimeline.getBoundingClientRect();
      const winHeight = window.innerHeight;
      
      // Timeline progress calculations
      // Starts when center of timeline container enters bottom of screen
      const startOffset = winHeight - 150;
      const relativeTop = rect.top - startOffset;
      const totalHeight = rect.height - 200;
      
      let progress = -relativeTop / totalHeight;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      // Adjust stroke-dashoffset (total length is 800)
      const totalLength = 800;
      const offsetVal = totalLength - (progress * totalLength);
      timelinePathDraw.style.strokeDashoffset = offsetVal;

      // Activate steps as line meets their positions
      processSteps.forEach((step, idx) => {
        const stepRect = step.getBoundingClientRect();
        const stepCenter = stepRect.top + stepRect.height / 2;
        // Step activates if timeline hits its coordinates
        if (stepCenter < winHeight - 120) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', handleTimelineScroll, { passive: true });
    // Initial call
    setTimeout(handleTimelineScroll, 600);
  }


  // ==========================================================================
  // 8. PROJECT GALLERY BENTO GRID WITH CATEGORY FILTERS & LIGHTBOX
  // ==========================================================================
  const filterFilters = document.getElementById('gallery-filters');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  // Bento Category Filter
  if (filterFilters && filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filterVal = btn.getAttribute('data-filter');
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        galleryItems.forEach(item => {
          const categories = item.getAttribute('data-category').split(' ');
          if (filterVal === 'all' || categories.includes(filterVal)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 400);
          }
        });
      });
    });
  }

  // Lightbox functionality
  let currentImgIndex = 0;
  let activeGalleryItems = [];

  function updateActiveGalleryList() {
    activeGalleryItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
  }

  function openLightbox(index) {
    updateActiveGalleryList();
    if (activeGalleryItems.length === 0) return;
    
    currentImgIndex = index;
    const src = activeGalleryItems[currentImgIndex].getAttribute('data-src');
    const imgAlt = activeGalleryItems[currentImgIndex].querySelector('img').getAttribute('alt');
    
    lightboxImg.setAttribute('src', src);
    lightboxImg.setAttribute('alt', imgAlt);
    lightbox.classList.add('active');
  }

  function showPrevImage() {
    if (activeGalleryItems.length <= 1) return;
    currentImgIndex = (currentImgIndex - 1 + activeGalleryItems.length) % activeGalleryItems.length;
    const src = activeGalleryItems[currentImgIndex].getAttribute('data-src');
    lightboxImg.setAttribute('src', src);
  }

  function showNextImage() {
    if (activeGalleryItems.length <= 1) return;
    currentImgIndex = (currentImgIndex + 1) % activeGalleryItems.length;
    const src = activeGalleryItems[currentImgIndex].getAttribute('data-src');
    lightboxImg.setAttribute('src', src);
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      updateActiveGalleryList();
      const activeIdx = activeGalleryItems.indexOf(item);
      openLightbox(activeIdx);
    });
  });

  if (lightbox) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });

    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      showPrevImage();
    });

    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      showNextImage();
    });

    // Close lightbox on clicking backdrop
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });

    // Keyboard support
    window.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') lightbox.classList.remove('active');
      if (e.key === 'ArrowLeft') showPrevImage();
      if (e.key === 'ArrowRight') showNextImage();
    });
  }


  // ==========================================================================
  // 9. SERVICE AREA INTERACTIVE MAP PINS
  // ==========================================================================
  const mapPins = document.querySelectorAll('.map-pin-g');
  const cityBadges = document.querySelectorAll('.city-selector-badge');
  const mapInfoCard = document.getElementById('map-info-card');
  const mapInfoCityName = document.getElementById('map-info-city');
  const mapInfoCityStat = document.getElementById('map-info-stat');

  // Service database metrics
  const cityMetrics = {
    'austin': { name: 'Austin Office', stat: 'Average Response: 1 Hour' },
    'round-rock': { name: 'Round Rock Office', stat: 'Average Response: 1.5 Hours' },
    'cedar-park': { name: 'Cedar Park Office', stat: 'Average Response: 1.5 Hours' },
    'georgetown': { name: 'Georgetown Region', stat: 'Average Response: 2 Hours' },
    'pflugerville': { name: 'Pflugerville Crew', stat: 'Average Response: 1.5 Hours' },
    'leander': { name: 'Leander Region', stat: 'Average Response: 2 Hours' }
  };

  function updateMapState(cityId) {
    // Update map pins highlighted class
    mapPins.forEach(pin => {
      if (pin.getAttribute('data-city') === cityId) {
        pin.classList.add('active');
      } else {
        pin.classList.remove('active');
      }
    });

    // Update left text lists badges active highlight
    cityBadges.forEach(badge => {
      if (badge.getAttribute('data-city') === cityId) {
        badge.classList.add('active');
      } else {
        badge.classList.remove('active');
      }
    });

    // Update custom overlay details
    const metric = cityMetrics[cityId];
    if (metric && mapInfoCard) {
      mapInfoCityName.textContent = metric.name;
      mapInfoCityStat.textContent = metric.stat;
    }
  }

  // Bind city selection buttons click event
  cityBadges.forEach(badge => {
    badge.addEventListener('click', () => {
      const cityId = badge.getAttribute('data-city');
      updateMapState(cityId);
    });
  });

  // Bind SVG Map pin elements hover event
  mapPins.forEach(pin => {
    pin.addEventListener('mouseenter', () => {
      const cityId = pin.getAttribute('data-city');
      updateMapState(cityId);
    });
  });

  // Local Zip checking tool
  const zipCheckBtn = document.getElementById('zip-check-btn');
  const zipCodeField = document.getElementById('zip-code-field');
  const zipResultText = document.getElementById('zip-result-message');

  // Austin Area standard service zip codes array
  const serviceZips = [
    '78701', '78702', '78703', '78704', '78705', '78741', '78745', '78746', 
    '78664', '78665', '78681', '78613', '78626', '78628', '78660', '78641', 
    '78738', '78759'
  ];

  if (zipCheckBtn && zipCodeField && zipResultText) {
    zipCheckBtn.addEventListener('click', () => {
      const val = zipCodeField.value.trim();
      if (!val || val.length !== 5 || isNaN(val)) {
        zipResultText.style.color = 'var(--color-orange)';
        zipResultText.textContent = 'Please enter a valid 5-digit ZIP code.';
        return;
      }

      if (serviceZips.includes(val)) {
        zipResultText.style.color = 'var(--color-success)';
        zipResultText.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" style="display:inline-block; vertical-align:middle; margin-right:4px;"><polyline points="20 6 9 17 4 12"/></svg> Yes! We serve your area. Daily crews are active near you.`;
      } else {
        zipResultText.style.color = 'var(--text-secondary)';
        zipResultText.textContent = `Zip ${val} is outside our immediate service grid. Call us to confirm.`;
      }
    });

    zipCodeField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        zipCheckBtn.click();
      }
    });
  }


  // ==========================================================================
  // 10. MULTI-STEP CONVERSION ESTIMATE FORM STATE HANDLER
  // ==========================================================================
  const form = document.getElementById('multi-step-form');
  const formSteps = document.querySelectorAll('.form-step');
  const progressFill = document.getElementById('form-progress-fill');
  const progressText = document.getElementById('step-progress-text');
  const successBox = document.getElementById('form-success-box');
  const fileInput = document.getElementById('form-file');
  const uploadLabel = document.getElementById('upload-status-label');

  let currentStep = 1;
  const totalSteps = 5;

  // File Upload status label update
  if (fileInput && uploadLabel) {
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        uploadLabel.textContent = `Attached: ${fileInput.files[0].name}`;
        uploadLabel.style.color = 'var(--color-success)';
      } else {
        uploadLabel.textContent = 'Upload roof photo (Optional)';
        uploadLabel.style.color = '';
      }
    });
  }

  function validateStep(stepNum) {
    const activeStepContainer = document.querySelector(`.form-step[data-step="${stepNum}"]`);
    if (!activeStepContainer) return true;

    const requiredFields = activeStepContainer.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      const group = field.closest('.input-field-group');
      
      // Simple validations
      if (field.id === 'form-zip') {
        const val = field.value.trim();
        if (val.length !== 5 || isNaN(val)) {
          isValid = false;
          if (group) group.classList.add('has-error');
        } else {
          if (group) group.classList.remove('has-error');
        }
      } else if (field.id === 'form-email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
          isValid = false;
          if (group) group.classList.add('has-error');
        } else {
          if (group) group.classList.remove('has-error');
        }
      } else if (field.id === 'form-phone') {
        const val = field.value.replace(/\D/g, '');
        if (val.length < 10) {
          isValid = false;
          if (group) group.classList.add('has-error');
        } else {
          if (group) group.classList.remove('has-error');
        }
      } else {
        if (!field.value.trim()) {
          isValid = false;
          if (group) group.classList.add('has-error');
        } else {
          if (group) group.classList.remove('has-error');
        }
      }
    });

    return isValid;
  }

  function navigateToStep(stepNum, direction = 'next') {
    const activeStep = document.querySelector('.form-step.active');
    const targetStep = document.querySelector(`.form-step[data-step="${stepNum}"]`);
    
    if (!targetStep || !activeStep) return;

    // Apply animation classes based on directions
    activeStep.className = 'form-step'; // Reset step states
    targetStep.className = 'form-step active';
    
    if (direction === 'next') {
      targetStep.classList.add('slide-left');
    } else {
      targetStep.classList.add('slide-right');
    }

    currentStep = stepNum;

    // Update progression visual indicators
    const progressPct = (currentStep / totalSteps) * 100;
    if (progressFill) progressFill.style.width = `${progressPct}%`;
    if (progressText) progressText.textContent = `Step ${currentStep} of ${totalSteps}`;
  }

  // Bind Form navigation buttons
  document.querySelectorAll('.btn-next').forEach(btn => {
    btn.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        navigateToStep(currentStep + 1, 'next');
      }
    });
  });

  document.querySelectorAll('.btn-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateToStep(currentStep - 1, 'prev');
    });
  });

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (validateStep(5)) {
        // Mocking submit endpoint trigger
        form.style.display = 'none';
        
        // Hide progress block
        const indicator = document.querySelector('.form-progress-indicator');
        if (indicator) indicator.style.display = 'none';

        if (successBox) {
          successBox.classList.add('active');
        }
      }
    });
  }

  // Reset form functionality
  const resetBtn = document.getElementById('form-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (form) {
        form.reset();
        form.style.display = 'block';
      }
      
      const indicator = document.querySelector('.form-progress-indicator');
      if (indicator) indicator.style.display = 'block';
      
      if (successBox) successBox.classList.remove('active');
      if (uploadLabel) {
        uploadLabel.textContent = 'Upload roof photo (Optional)';
        uploadLabel.style.color = '';
      }

      navigateToStep(1, 'prev');
    });
  }


  // ==========================================================================
  // 11. FAQ ACCORDION TRANSITIONS
  // ==========================================================================
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      const contentId = trigger.getAttribute('aria-controls');
      const content = document.getElementById(contentId);
      
      // Toggle current trigger
      trigger.setAttribute('aria-expanded', !expanded);
      
      if (content) {
        if (!expanded) {
          content.style.maxHeight = `${content.scrollHeight}px`;
        } else {
          content.style.maxHeight = '0';
        }
      }
    });

    // Close on blur or select next for keyboard friendliness
    trigger.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        trigger.click();
      }
    });
  });


  // ==========================================================================
  // 12. DRAGGABLE REVIEWS CAROUSEL WITH SWIPE AND TOUCH SUPPORT
  // ==========================================================================
  const carousel = document.getElementById('reviews-carousel');
  let isDown = false;
  let startX;
  let scrollLeft;

  if (carousel) {
    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.classList.add('active');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.classList.remove('active');
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.classList.remove('active');
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.5; // multiplier for drag speed
      carousel.scrollLeft = scrollLeft - walk;
    });
  }


  // ==========================================================================
  // 13. BACK-TO-TOP BUTTON CIRCULAR SCROLL PROGRESS INDICATOR
  // ==========================================================================
  const backToTopBtn = document.getElementById('back-to-top');
  const progressCircle = document.getElementById('back-to-top-progress');

  if (backToTopBtn && progressCircle) {
    const totalLength = 113; // 2 * PI * R where R=18 (113.097)

    const updateScrollProgress = () => {
      const scrollPosition = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight <= 0) return;

      const progress = scrollPosition / docHeight;
      const drawLength = totalLength - (progress * totalLength);

      // Update stroke-dashoffset of circle
      progressCircle.style.strokeDashoffset = drawLength;

      // Toggle visible class on btn
      if (scrollPosition > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
