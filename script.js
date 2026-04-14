// Navbar scroll effect
window.addEventListener('scroll', () => {
	const navbar = document.getElementById('navbar');
	if (window.scrollY > 50) {
		navbar.classList.add('scrolled');
	} else {
		navbar.classList.remove('scrolled');
	}
});

// Intersection Observer for fade-in animations
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
		}
	});
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
	observer.observe(el);
});

// Form submission with Formspree
document.getElementById('contactForm').addEventListener('submit', async (e) => {
	e.preventDefault();

	const form = e.target;
	const submitButton = form.querySelector('.btn-submit');
	const originalText = submitButton.textContent;

	// Disable button and show loading
	submitButton.disabled = true;
	submitButton.textContent = 'Sending...';

	try {
		const formData = new FormData(form);
		const response = await fetch('https://formspree.io/f/xnjnkyly', {
			method: 'POST',
			body: formData,
			headers: {
				'Accept': 'application/json'
			}
		});

		if (response.ok) {
			alert('Thank you for your message! We will get back to you shortly.');
			form.reset();
		} else {
			throw new Error('Form submission failed');
		}
	} catch (error) {
		alert('Oops! There was a problem submitting your form. Please try again or contact us directly.');
		console.error('Form submission error:', error);
	} finally {
		// Re-enable button and restore text
		submitButton.disabled = false;
		submitButton.textContent = originalText;
	}
});

// Mobile menu toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
	const navLinks = document.querySelector('.nav-links');
	const mobileBtn = document.querySelector('.mobile-menu-btn');
	navLinks.classList.toggle('active');
	mobileBtn.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
	link.addEventListener('click', () => {
		document.querySelector('.nav-links').classList.remove('active');
		document.querySelector('.mobile-menu-btn').classList.remove('active');
	});
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
	const navLinks = document.querySelector('.nav-links');
	const mobileBtn = document.querySelector('.mobile-menu-btn');

	if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target) && navLinks.classList.contains('active')) {
		navLinks.classList.remove('active');
		mobileBtn.classList.remove('active');
	}
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	});
});