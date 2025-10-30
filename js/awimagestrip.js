/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License version 3.0
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
 */

document.addEventListener('DOMContentLoaded', function() {
  const containers = document.querySelectorAll('.awimagestrip-container');

  containers.forEach(function(container) {
    const grid = container.querySelector('.awimagestrip-grid');
    const slides = container.querySelectorAll('.awimagestrip-slide');

    if (!grid || slides.length === 0) {
      return;
    }

    // Read configuration from data attributes
    const speed = parseInt(container.dataset.speed) || 5000;
    const pauseOnHover = container.dataset.pauseOnHover === 'hover';

    let currentIndex = 0;
    let autoplayInterval = null;
    let isPaused = false;

    /**
     * Scroll to a specific slide
     */
    function scrollToSlide(index) {
      const slideWidth = slides[0].offsetWidth;
      grid.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
      currentIndex = index;
    }

    /**
     * Go to next slide
     */
    function nextSlide() {
      if (currentIndex < slides.length - 1) {
        scrollToSlide(currentIndex + 1);
      } else {
        // Loop back to first slide
        scrollToSlide(0);
      }
    }

    /**
     * Start autoplay
     */
    function startAutoplay() {
      if (autoplayInterval) {
        return;
      }
      autoplayInterval = setInterval(function() {
        if (!isPaused) {
          nextSlide();
        }
      }, speed);
    }

    /**
     * Stop autoplay
     */
    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    }

    /**
     * Pause autoplay (used for hover)
     */
    function pauseAutoplay() {
      isPaused = true;
    }

    /**
     * Resume autoplay (used for hover)
     */
    function resumeAutoplay() {
      isPaused = false;
    }

    /**
     * Update current index based on scroll position
     * Useful when user manually scrolls
     */
    function updateCurrentIndex() {
      const slideWidth = slides[0].offsetWidth;
      const scrollLeft = grid.scrollLeft;
      const newIndex = Math.round(scrollLeft / slideWidth);

      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < slides.length) {
        currentIndex = newIndex;
      }
    }

    // Listen to scroll events to track manual navigation
    let scrollTimeout;
    grid.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateCurrentIndex, 150);
    });

    // Pause on hover if configured
    if (pauseOnHover) {
      container.addEventListener('mouseenter', pauseAutoplay);
      container.addEventListener('mouseleave', resumeAutoplay);
    }

    // Start autoplay
    startAutoplay();

    // Stop autoplay when page is hidden (battery optimization)
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });
  });
});
