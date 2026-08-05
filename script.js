// ==========================================================================
// Custom Cursor
// ==========================================================================
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Add a slight delay to the outline for a smooth trailing effect
    cursorOutline.animate({
      left: `${posX}px`,
      top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
  });

  // Add hover effect for clickable elements
  const interactables = document.querySelectorAll('a, button, input, textarea');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });
}

// ==========================================================================
// Navbar Scroll Effect
// ==========================================================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ==========================================================================
// Mobile Menu Toggle
// ==========================================================================
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn && navLinks) {
  mobileBtn.addEventListener('click', () => {
    mobileBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      mobileBtn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// ==========================================================================
// Intersection Observer for Scroll Animations
// ==========================================================================
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Handle stat number counting if it's a stat item
      if (entry.target.classList.contains('stats-container')) {
        const counters = entry.target.querySelectorAll('.stat-number[data-target]');
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 2000; // ms
          const increment = target / (duration / 16); // 60fps
          
          let current = 0;
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.innerText = Math.ceil(current) + "+";
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = target + "+";
            }
          };
          updateCounter();
          // Remove attribute so it doesn't trigger again
          counter.removeAttribute('data-target'); 
        });
      }
      
      // Optional: unobserve if you only want the animation to happen once
      // observer.unobserve(entry.target); 
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up, .fade-left, .fade-right, .stats-container').forEach(el => {
  observer.observe(el);
});

// ==========================================================================
// Smooth Scroll
// ==========================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==========================================================================
// Form Submission Logic
// ==========================================================================
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.querySelector('span').innerText;
    
    submitBtn.querySelector('span').innerText = 'Sending...';
    submitBtn.style.opacity = '0.7';
    submitBtn.style.pointerEvents = 'none';

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        submitBtn.querySelector('span').innerText = 'Message Sent!';
        submitBtn.style.background = '#10b981'; // Success green
        form.reset();
        setTimeout(() => {
          submitBtn.querySelector('span').innerText = originalText;
          submitBtn.style.background = '';
          submitBtn.style.opacity = '1';
          submitBtn.style.pointerEvents = 'all';
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      submitBtn.querySelector('span').innerText = 'Error! Try Again';
      submitBtn.style.background = '#ef4444'; // Error red
      setTimeout(() => {
        submitBtn.querySelector('span').innerText = originalText;
        submitBtn.style.background = '';
        submitBtn.style.opacity = '1';
        submitBtn.style.pointerEvents = 'all';
      }, 3000);
    }
  });
}