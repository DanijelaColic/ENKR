// Debug: Script loaded
console.log('📜 script.js loaded');

import { translations } from './translations.js';
const lang = window.location.pathname.startsWith('/en/') ? 'en' : 'hr';
const t = translations[lang];

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
  });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  });
});

// Newsletter inline form handling
const newsletterFormInline = document.getElementById('newsletterFormInline');
if (newsletterFormInline) {
  const submitButton = newsletterFormInline.querySelector('button[type="submit"]');
  const originalButtonText = submitButton ? submitButton.textContent : t.newsletterSubmit;

  newsletterFormInline.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('newsletter-email-inline').value.trim();

    // Remove previous error/success messages
    const existingMessage = newsletterFormInline.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Validate email
    if (!email) {
      const errorMessage = document.createElement('div');
      errorMessage.className = 'form-message form-message-error';
      errorMessage.textContent = t.newsletter.errorEmpty;
      newsletterFormInline.appendChild(errorMessage);
      errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const errorMessage = document.createElement('div');
      errorMessage.className = 'form-message form-message-error';
      errorMessage.textContent = t.newsletter.errorInvalid;
      newsletterFormInline.appendChild(errorMessage);
      errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }

    // Disable submit button and show loading state
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = t.sending;
    }

    try {
      console.log('📧 Sending newsletter signup...');

      // Send data to backend
      const hostname = window.location.hostname;
      const isProduction = hostname !== 'localhost' && hostname !== '127.0.0.1';
      const API_URL = isProduction ? '' : (import.meta.env.VITE_API_URL || 'http://localhost:5000');
      const endpoint = `${API_URL}/api/newsletter`;

      console.log('🌐 Newsletter API URL:', endpoint);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log('📥 Newsletter response status:', response.status);

      // Try to parse response as JSON
      let data;
      try {
        const text = await response.text();
        console.log('📥 Newsletter response text:', text);

        if (!text) {
          throw new Error(t.newsletter.errorEmpty || 'Empty response');
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          data = JSON.parse(text);
        } else {
          throw new Error(`Server returned non-JSON. Status: ${response.status}`);
        }
      } catch (parseError) {
        console.error('❌ Error parsing newsletter response:', parseError);
        throw new Error(isProduction ? t.newsletter.errorServer : t.newsletter.errorServerDev);
      }

      if (!response.ok) {
        console.error('❌ Newsletter server error:', data);
        throw new Error(data.error || t.newsletter.errorGeneral);
      }

      console.log('✅ Newsletter signup success:', data);

      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'form-message form-message-success';
      successMessage.textContent = data.message || t.newsletter.success;
      newsletterFormInline.appendChild(successMessage);

      // Reset form
      newsletterFormInline.reset();

      // Scroll to message
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (error) {
      console.error('❌ Newsletter signup error:', error);

      // Show error message
      const errorMessage = document.createElement('div');
      errorMessage.className = 'form-message form-message-error';

      let errorText = t.newsletter.errorGeneral;
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorText = t.newsletter.errorFetch;
      } else if (error.message) {
        errorText = error.message;
      }

      errorMessage.textContent = errorText;
      newsletterFormInline.appendChild(errorMessage);

      // Scroll to message
      errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } finally {
      // Re-enable submit button
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;

  contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Disable submit button and show loading state
  submitButton.disabled = true;
  submitButton.textContent = t.sending;

  // Remove previous error/success messages
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  try {
    console.log('📤 Sending contact form data...');
    
    // Send data to backend
    // For Vercel: use relative path /api/contact
    // For local development: use environment variable or localhost
    const hostname = window.location.hostname;
    const isProduction = hostname !== 'localhost' && hostname !== '127.0.0.1';
    const API_URL = isProduction ? '' : (import.meta.env.VITE_API_URL || 'http://localhost:5000');
    const endpoint = `${API_URL}/api/contact`;
    
    console.log('🌐 Environment:', isProduction ? 'Production' : 'Development');
    console.log('🔗 API URL:', endpoint);
    console.log('📝 Form data:', { name, email, message: message.substring(0, 50) + '...' });
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    console.log('📥 Response status:', response.status);
    console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));

    // Check if response has content
    const contentType = response.headers.get('content-type');
    
    // Try to parse response as JSON, but handle non-JSON responses gracefully
    let data;
    try {
      const text = await response.text();
      console.log('📥 Response text:', text);
      
      if (!text) {
        throw new Error(
          isProduction ? t.contact.errorServerEmpty : t.contact.errorServerEmptyDev
        );
      }
      
      if (contentType && contentType.includes('application/json')) {
        data = JSON.parse(text);
      } else {
        throw new Error(
          isProduction
            ? t.contact.errorServerJson(response.status)
            : t.contact.errorServerJsonDev(response.status, text.substring(0, 100))
        );
      }
    } catch (parseError) {
      console.error('❌ Error parsing response:', parseError);
      throw new Error(
        isProduction ? t.contact.errorServerValid : t.contact.errorServerValidDev
      );
    }

    if (!response.ok) {
      console.error('❌ Server returned error:', data);
      throw new Error(data.error || t.contact.errorGeneral);
    }

    console.log('✅ Success:', data);

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-message form-message-success';
    successMessage.textContent = t.contact.success;
    contactForm.appendChild(successMessage);

    // Reset form
    contactForm.reset();

    // Scroll to message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } catch (error) {
    console.error('❌ Error details:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    // Show error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'form-message form-message-error';
    
    // More specific error messages
    let errorText = t.contact.errorGeneral;
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      errorText = t.contact.errorFetch;
    } else if (error.message.includes('localhost:5000') || error.message.includes('server')) {
      errorText = t.contact.errorBackend;
    } else if (error.message) {
      errorText = error.message;
    }
    
    errorMessage.innerHTML = errorText + `<br><br><strong>${t.contact.errorAlt}:</strong> <a href="mailto:info@enkr.hr" style="color: inherit; text-decoration: underline;">info@enkr.hr</a> ${t.contact.errorAltOr} <a href="tel:+385919279931" style="color: inherit; text-decoration: underline;">+385 91 927 9931</a>`;
    contactForm.appendChild(errorMessage);

    // Scroll to message
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } finally {
    // Re-enable submit button
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
  });
}

// Draft form handling (single-step)
let draftForm;

function initDraftFormHandlers() {
  if (!draftForm) return;

  const submitBtn = document.getElementById('submitBtn');
  const originalSubmitButtonText = submitBtn ? submitBtn.textContent : t.draftSubmit;

  draftForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('draft-name').value.trim();
    const email = document.getElementById('draft-email').value.trim();
    const phone = document.getElementById('draft-phone').value.trim();
    const service = document.getElementById('draft-service').value;
    const businessType = document.getElementById('draft-business-type').value.trim();
    const goal = document.getElementById('draft-goal').value.trim();
    const existingWebsite = document.getElementById('draft-existing-website').value.trim();

    if (!fullName || !email || !phone || !service || !businessType || !goal) {
      alert(t.draft.errorRequired);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert(t.draft.errorEmail);
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = t.sending;
    }

    const existingMessage = draftForm.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    try {
      console.log('📤 Sending draft form data...');

      const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');
      const endpoint = API_URL ? `${API_URL}/api/draft` : '/api/draft';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          service,
          businessType,
          goal,
          existingWebsite,
        }),
      });

      let data;
      try {
        const text = await response.text();

        if (!text) {
          throw new Error(t.draft.errorEmpty);
        }

        if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
          throw new Error(t.draft.errorHtml(response.status));
        }

        data = JSON.parse(text);
      } catch (parseError) {
        if (parseError.message.includes('HTML') || parseError.message.includes('Status:')) {
          throw new Error(parseError.message);
        } else if (response.status === 404) {
          throw new Error(t.draft.errorEndpoint);
        } else {
          throw new Error(t.draft.errorParse(parseError.message));
        }
      }

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      if (!data.success) {
        throw new Error(data.error || t.draft.errorGeneral);
      }

      console.log('✅ Draft form submitted successfully:', data);

      const successMessage = document.createElement('div');
      successMessage.className = 'form-message form-message-success';
      successMessage.textContent = data.message || t.draft.success;
      draftForm.appendChild(successMessage);

      successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      draftForm.reset();
    } catch (error) {
      console.error('❌ Error submitting draft form:', error);

      const errorMessage = document.createElement('div');
      errorMessage.className = 'form-message form-message-error';
      errorMessage.textContent = error.message || t.draft.errorGeneral;
      draftForm.appendChild(errorMessage);

      errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalSubmitButtonText;
      }
    }
  });
}

// Modal functionality removed - survey is now inline on the page

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach((card) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// Observe about section
const aboutSection = document.querySelector('.about-text');
if (aboutSection) {
  aboutSection.style.opacity = '0';
  aboutSection.style.transform = 'translateY(20px)';
  aboutSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(aboutSection);
}

// Service Modal functionality
const serviceModal = document.getElementById('serviceModal');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

// Service content data — icons are shared, text comes from translations
const serviceIcons = {
  'web-apps': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>`,
  ecommerce: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>`,
  blog: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>`,
  business: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`,
  booking: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`,
};

const featureIcons = {
  'web-apps': [
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>`,
  ],
  ecommerce: [
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>`,
  ],
  blog: [
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>`,
  ],
  business: [
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>`,
  ],
  booking: [
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`,
  ],
};

const serviceTechnologies = {
  'web-apps': ['Astro', 'Next.js', 'React', 'TypeScript', 'Vercel', 'Supabase', 'Stripe', 'Resend', 'Tailwind CSS', 'Prisma'],
  ecommerce: ['Astro', 'Next.js', 'Stripe', 'Supabase', 'Vercel', 'Resend', 'TypeScript', 'Tailwind CSS', 'Prisma', 'Shadcn/ui'],
  blog: ['Astro', 'Next.js', 'Vercel', 'Supabase', 'Resend', 'TypeScript', 'Tailwind CSS', 'MDX', 'Content Collections'],
  business: ['Astro', 'Next.js', 'Supabase', 'Vercel', 'Resend', 'TypeScript', 'Tailwind CSS', 'Prisma', 'API Routes', 'Vercel Analytics'],
  booking: ['Astro', 'Next.js', 'Supabase', 'Vercel', 'Resend', 'Stripe', 'TypeScript', 'Tailwind CSS', 'Prisma', 'React Calendar'],
};

// Build serviceData from translations + icons
const serviceData = Object.fromEntries(
  Object.keys(serviceIcons).map((id) => {
    const txt = t.services[id];
    const icons = featureIcons[id];
    return [
      id,
      {
        icon: serviceIcons[id],
        title: txt.title,
        subtitle: txt.subtitle,
        description: txt.description,
        features: txt.features.map((f, i) => ({ icon: icons[i] || '', title: f.title, desc: f.desc })),
        process: txt.process.map((p, i) => ({ number: String(i + 1), title: p.title, desc: p.desc })),
        technologies: serviceTechnologies[id],
      },
    ];
  })
);

// Function to open modal with service data
function openServiceModal(serviceId) {
  if (!serviceModal || !modalContent) return;
  
  const service = serviceData[serviceId];
  if (!service) return;

  // Build modal content
  const content = `
    <div class="modal-header">
      <div class="modal-icon">${service.icon}</div>
      <h2 class="modal-title">${service.title}</h2>
      <p class="modal-subtitle">${service.subtitle}</p>
    </div>
    
    <div class="modal-body">
      <div class="modal-section">
        <p class="modal-description">${service.description}</p>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          ${t.modal.featuresTitle}
        </h3>
        <div class="modal-features">
          ${service.features.map(feature => `
            <div class="modal-feature-item">
              <div class="modal-feature-icon">${feature.icon}</div>
              <div class="modal-feature-text">
                <div class="modal-feature-title">${feature.title}</div>
                <div class="modal-feature-desc">${feature.desc}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          ${t.modal.processTitle}
        </h3>
        <div class="modal-process">
          ${service.process.map(step => `
            <div class="modal-process-step">
              <div class="modal-process-number">${step.number}</div>
              <div class="modal-process-content">
                <div class="modal-process-title">${step.title}</div>
                <div class="modal-process-desc">${step.desc}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          Tehnologije
        </h3>
        <div class="modal-technologies">
          ${service.technologies.map(tech => `<span class="modal-tech-tag">${tech}</span>`).join('')}
        </div>
      </div>
    </div>

    <div class="modal-footer">
      <a href="#contact" class="btn btn-primary modal-cta">${t.modal.ctaLabel}</a>
    </div>
  `;

  modalContent.innerHTML = content;
  serviceModal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Function to close modal
function closeServiceModal() {
  if (!serviceModal) return;
  serviceModal.classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
}

// Service cards — compact cards are already <a> tags, no extra handler needed

// Close modal events (only if modal elements exist)
if (modalClose) {
  modalClose.addEventListener('click', closeServiceModal);
}
if (modalOverlay) {
  modalOverlay.addEventListener('click', closeServiceModal);
}

// Close modal on ESC key (only if modal exists)
if (serviceModal) {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
      closeServiceModal();
    }
  });
}

// Close modal when clicking contact link
if (modalContent) {
  modalContent.addEventListener('click', (e) => {
    if (e.target.closest('a[href="#contact"]')) {
      closeServiceModal();
    }
  });
}

// Cookie Consent Management
const COOKIE_CONSENT_KEY = 'enkr_cookie_consent';
const COOKIE_CONSENT_EXPIRY_DAYS = 365; // Cookie consent traje 1 godinu

// Check if user has already given consent (any type)
function hasCookieConsent() {
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!consent) return false;

  try {
    const consentData = JSON.parse(consent);
    // If explicitly rejected, return false
    if (consentData.accepted === false) return false;
    
    // Check if consent has expired (older than expiry days)
    const expiryDate = new Date(consentData.date);
    const now = new Date();
    const daysDiff = (now - expiryDate) / (1000 * 60 * 60 * 24);
    
    return daysDiff < COOKIE_CONSENT_EXPIRY_DAYS;
  } catch (e) {
    return false;
  }
}

// Check if user has accepted all cookies (not just essential)
function hasAcceptedAllCookies() {
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!consent) return false;

  try {
    const consentData = JSON.parse(consent);
    return consentData.accepted === true;
  } catch (e) {
    return false;
  }
}

// Save cookie consent
function saveCookieConsent(accepted) {
  const consentData = {
    accepted: accepted,
    date: new Date().toISOString(),
  };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
}

// Show cookie banner if consent not given
function showCookieBanner() {
  const cookieBanner = document.getElementById('cookieBanner');
  if (cookieBanner && !hasCookieConsent()) {
    // Small delay for better UX
    setTimeout(() => {
      cookieBanner.classList.add('show');
    }, 500);
  }
}

// Hide cookie banner
function hideCookieBanner() {
  const cookieBanner = document.getElementById('cookieBanner');
  if (cookieBanner) {
    cookieBanner.classList.remove('show');
  }
}

// Handle accept all cookies
function handleAcceptCookies() {
  saveCookieConsent(true);
  hideCookieBanner();
  
  // Initialize analytics and other tracking scripts
  initializeGoogleAnalytics();
  
  console.log('✅ All cookies accepted');
}

// Handle accept essential cookies only
function handleAcceptEssentialCookies() {
  saveCookieConsent('essential');
  hideCookieBanner();
  
  // Don't initialize analytics - only essential cookies
  disableGoogleAnalytics();
  
  console.log('✅ Only essential cookies accepted');
}

// Handle reject cookies
function handleRejectCookies() {
  saveCookieConsent(false);
  hideCookieBanner();
  
  // Disable analytics or other tracking scripts
  disableGoogleAnalytics();
  
  console.log('❌ Cookies rejected');
}

// Initialize everything when DOM is ready
function initializeApp() {
  console.log('🚀 initializeApp called, document.readyState:', document.readyState);
  
  // Cookie banner
  const acceptBtn = document.getElementById('acceptCookies');
  const acceptEssentialBtn = document.getElementById('acceptEssentialCookies');
  const rejectBtn = document.getElementById('rejectCookies');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', handleAcceptCookies);
  }

  if (acceptEssentialBtn) {
    acceptEssentialBtn.addEventListener('click', handleAcceptEssentialCookies);
  }

  if (rejectBtn) {
    rejectBtn.addEventListener('click', handleRejectCookies);
  }

  // Show banner if consent not given
  showCookieBanner();
  
  // Initialize Google Analytics if user already accepted cookies
  if (hasAcceptedAllCookies()) {
    initializeGoogleAnalytics();
  }

  // Get draft form element
  draftForm = document.getElementById('draftForm');
  console.log('📋 Draft form found:', !!draftForm);

  if (draftForm) {
    initDraftFormHandlers();
  }
  console.log('✅ initializeApp completed');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  // DOM is still loading, wait for DOMContentLoaded
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // DOM is already loaded, initialize immediately
  initializeApp();
}

// Draft form is inline, no modal initialization needed

// Function to initialize Google Analytics (only if all cookies accepted)
function initializeGoogleAnalytics() {
  // Only initialize if user accepted ALL cookies (not just essential)
  if (hasAcceptedAllCookies()) {
    // Google Analytics 4 is already loaded in <head>, enable it via consent mode
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });
      console.log('📊 Analytics initialized (all cookies accepted)');
    }
  } else {
    console.log('📊 Analytics not initialized (only essential cookies or rejected)');
  }
}

// Function to disable Google Analytics
function disableGoogleAnalytics() {
  // Disable tracking by setting consent mode to denied
  if (typeof gtag !== 'undefined') {
    gtag('consent', 'update', {
      'analytics_storage': 'denied'
    });
    
    // Remove analytics cookies
    document.cookie.split(";").forEach(function(c) { 
      const cookieName = c.split("=")[0].trim();
      if (cookieName.startsWith('_ga') || cookieName.startsWith('_gid')) {
        document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
      }
    });
    
    console.log('📊 Analytics disabled');
  }
}

// Pricing Toggle (Monthly/Yearly)
const pricingToggle = document.getElementById('pricingToggle');
if (pricingToggle) {
  // Initialize labels on page load
  const labels = document.querySelectorAll('.pricing-toggle-label');
  labels.forEach(label => {
    if (label.dataset.period === 'monthly') {
      label.classList.add('active');
    }
  });

  pricingToggle.addEventListener('change', function() {
    const isYearly = this.checked;
    const priceRowsMonthly = document.querySelectorAll('.price-row-monthly');
    const priceRowsYearly = document.querySelectorAll('.price-row-yearly');
    
    // Toggle visibility - show only one type at a time
    priceRowsMonthly.forEach(row => {
      if (isYearly) {
        row.style.setProperty('display', 'none', 'important');
      } else {
        row.style.setProperty('display', 'flex', 'important');
      }
    });
    
    priceRowsYearly.forEach(row => {
      if (isYearly) {
        row.style.setProperty('display', 'flex', 'important');
      } else {
        row.style.setProperty('display', 'none', 'important');
      }
    });
    
    // Update labels
    labels.forEach(label => {
      label.classList.remove('active');
      if (isYearly) {
        if (label.dataset.period === 'yearly') {
          label.classList.add('active');
        }
      } else {
        if (label.dataset.period === 'monthly') {
          label.classList.add('active');
        }
      }
    });
  });
}
