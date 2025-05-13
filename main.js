document.addEventListener('DOMContentLoaded', function() {
  // Existing fade-in for sections
  const sections = document.querySelectorAll('.fade-in-section');

  const sectionObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Stop observing once it's visible
      }
    });
  }, sectionObserverOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // Skill bar and percentage animation
  const skillSection = document.querySelector('#skills');

  const skillObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% of the skill section is visible
  };

  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Start animations for skill items
        animateSkills();
        observer.unobserve(entry.target); // Stop observing once triggered
      }
    });
  }, skillObserverOptions);

  if (skillSection) {
    skillObserver.observe(skillSection);
  }

  function animateSkills() {
    const skillItems = document.querySelectorAll('#skills .skill-item');

    skillItems.forEach(item => {
      const progressBar = item.querySelector('.progress-bar');
      const percentageSpan = item.querySelector('.skill-percentage');
      const targetProgress = parseInt(progressBar.getAttribute('data-progress'), 10);

      // Animate progress bar
      requestAnimationFrame(() => {
        progressBar.style.width = targetProgress + '%';
      });

      // Animate percentage number
      let currentProgress = 0;
      const duration = 1500; // Animation duration in milliseconds
      const increment = targetProgress / (duration / 16); // Assuming ~60fps

      function updatePercentage() {
        currentProgress += increment;
        if (currentProgress < targetProgress) {
          percentageSpan.textContent = Math.round(currentProgress) + '%';
          requestAnimationFrame(updatePercentage);
        } else {
          percentageSpan.textContent = targetProgress + '%';
        }
      }
      updatePercentage();
    });
  }
});