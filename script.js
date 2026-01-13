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

// Contact form handling
const contactForm = document.getElementById('contactForm');
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
  submitButton.textContent = 'Slanje...';

  // Remove previous error/success messages
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  try {
    // Send data to backend
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    // Check if response has content
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server nije vratio validan odgovor. Provjerite da li backend server radi.');
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Greška pri slanju poruke');
    }

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-message form-message-success';
    successMessage.textContent =
      'Hvala vam! Vaša poruka je uspješno poslana. Kontaktirat ćemo vas uskoro.';
    contactForm.appendChild(successMessage);

    // Reset form
    contactForm.reset();

    // Scroll to message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } catch (error) {
    console.error('Error:', error);

    // Show error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'form-message form-message-error';
    
    // More specific error messages
    let errorText = 'Greška pri slanju poruke. Molimo pokušajte ponovno.';
    if (error.message.includes('fetch')) {
      errorText = 'Nije moguće povezati se sa serverom. Provjerite da li je backend server pokrenut na portu 3001.';
    } else if (error.message) {
      errorText = error.message;
    }
    
    errorMessage.textContent = errorText;
    contactForm.appendChild(errorMessage);

    // Scroll to message
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } finally {
    // Re-enable submit button
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
});

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

// Service content data
const serviceData = {
  'web-apps': {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>`,
    title: 'Custom Web Stranice',
    subtitle: 'Prilagođene web stranice koje rastu s vašim poslovanjem',
    description: 'Razvijamo prilagođene web stranice koje odgovaraju vašim specifičnim potrebama i zahtjevima poslovanja. Svaka stranica je kreirana od nule, prilagođena vašim procesima i optimizirana za performanse.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
        title: 'Potpuno Prilagođeno',
        desc: 'Web stranica dizajnirana specifično za vaše poslovne procese i potrebe'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`,
        title: 'Vrhunske Performanse',
        desc: 'Optimizirane za brzinu i skalabilnost kako bi podržale rast vašeg poslovanja'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>`,
        title: 'Responsive Dizajn',
        desc: 'Savršeno funkcionira na svim uređajima - desktop, tablet i mobilni'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>`,
        title: 'Sigurnost',
        desc: 'Najbolje prakse sigurnosti i zaštita podataka vaših korisnika'
      }
    ],
    process: [
      { number: '1', title: 'Analiza i Planiranje', desc: 'Razgovaramo o vašim potrebama, ciljevima i zahtjevima za web stranicu' },
      { number: '2', title: 'Dizajn i Prototip', desc: 'Kreiramo wireframe i dizajn koji odgovara vašoj viziji' },
      { number: '3', title: 'Razvoj', desc: 'Razvijamo web stranicu koristeći najnovije tehnologije i najbolje prakse' },
      { number: '4', title: 'Testiranje', desc: 'Temeljito testiramo svaku funkcionalnost prije lansiranja' },
      { number: '5', title: 'Lansiranje i Podrška', desc: 'Pomažemo vam lansirati web stranicu i pružamo kontinuiranu podršku' }
    ],
    technologies: ['Astro', 'Next.js', 'React', 'TypeScript', 'Vercel', 'Supabase', 'Stripe', 'Resend', 'Tailwind CSS', 'Prisma']
  },
  'ecommerce': {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>`,
    title: 'Web Shopovi (E-commerce)',
    subtitle: 'Kompletna e-commerce rješenja za online prodaju',
    description: 'Kreiramo moderne web shopove koji pretvaraju posjetitelje u kupce. Naša e-commerce rješenja kombiniraju ljepotu dizajna s moćnim funkcionalnostima za upravljanje proizvodima, narudžbama i plaćanjima.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>`,
        title: 'Platni Sustavi',
        desc: 'Integracija sa svim glavnim platnim sustavima (Stripe, PayPal, banke)'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>`,
        title: 'Upravljanje Proizvodima',
        desc: 'Jednostavno dodavanje, uređivanje i organiziranje proizvoda i kategorija'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>`,
        title: 'Upravljanje Narudžbama',
        desc: 'Kompletan sustav za praćenje narudžbi, statusa i isporuka'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>`,
        title: 'Košarica i Checkout',
        desc: 'Optimiziran proces kupnje za maksimalnu konverziju'
      }
    ],
    process: [
      { number: '1', title: 'Analiza Proizvoda', desc: 'Razgovaramo o vašim proizvodima, cijenama i strategiji prodaje' },
      { number: '2', title: 'Dizajn Shopa', desc: 'Kreiramo atraktivan dizajn koji ističe vaše proizvode' },
      { number: '3', title: 'Razvoj Funkcionalnosti', desc: 'Implementiramo sve potrebne funkcionalnosti za prodaju' },
      { number: '4', title: 'Integracija Plaćanja', desc: 'Povezujemo platne sustave i testiramo transakcije' },
      { number: '5', title: 'Lansiranje', desc: 'Pokrećemo shop i pružamo podršku za optimizaciju prodaje' }
    ],
    technologies: ['Astro', 'Next.js', 'Stripe', 'Supabase', 'Vercel', 'Resend', 'TypeScript', 'Tailwind CSS', 'Prisma', 'Shadcn/ui']
  },
  'blog': {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>`,
    title: 'Blog & Content Web Stranice',
    subtitle: 'Stranice optimizirane za sadržaj i SEO',
    description: 'Kreiramo moderne blog i content stranice koje privlače posjetitelje i pretvaraju ih u čitatelje. Naša rješenja su optimizirana za SEO, brzinu učitavanja i jednostavno upravljanje sadržajem.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>`,
        title: 'SEO Optimizacija',
        desc: 'Stranica optimizirana za Google i druge pretraživače za bolje rangiranje'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>`,
        title: 'CMS Sustav',
        desc: 'Jednostavno upravljanje sadržajem bez poznavanja programiranja'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`,
        title: 'Brza Učitavanja',
        desc: 'Optimizirane performanse za brzo učitavanje stranica i bolje korisničko iskustvo'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>`,
        title: 'Društvene Mreže',
        desc: 'Integracija sa društvenim mrežama za lakše dijeljenje sadržaja'
      }
    ],
    process: [
      { number: '1', title: 'Strukturiranje Sadržaja', desc: 'Planiranje strukture stranice i kategorija bloga' },
      { number: '2', title: 'Dizajn i UX', desc: 'Kreiranje atraktivnog dizajna koji ističe vaš sadržaj' },
      { number: '3', title: 'Razvoj CMS-a', desc: 'Implementacija jednostavnog sustava za upravljanje sadržajem' },
      { number: '4', title: 'SEO Optimizacija', desc: 'Optimizacija za pretraživače i brzinu učitavanja' },
      { number: '5', title: 'Lansiranje', desc: 'Pokretanje stranice i obuka za upravljanje sadržajem' }
    ],
    technologies: ['Astro', 'Next.js', 'Vercel', 'Supabase', 'Resend', 'TypeScript', 'Tailwind CSS', 'MDX', 'Content Collections']
  },
  'business': {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>`,
    title: 'Rješenja za Poslovanje',
    subtitle: 'Digitalna rješenja koja optimiziraju vaše poslovne procese',
    description: 'Razvijamo digitalna rješenja koja automatiziraju vaše poslovne procese, povećavaju produktivnost i donose vrijedne uvide kroz analitiku. Od CRM sustava do dashboarda za upravljanje - sve prilagođeno vašim potrebama.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>`,
        title: 'Automatizacija Procesa',
        desc: 'Automatizacija rutinskih zadataka i povećanje efikasnosti'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`,
        title: 'Analitika i Izvještaji',
        desc: 'Dashboardi sa real-time podacima i detaljnim izvještajima'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`,
        title: 'CRM Integracije',
        desc: 'Integracija sa postojećim sustavima i alatom za upravljanje klijentima'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>`,
        title: 'Sigurnost Podataka',
        desc: 'Zaštita vaših poslovnih podataka i osiguranje compliance standarda'
      }
    ],
    process: [
      { number: '1', title: 'Analiza Procesa', desc: 'Razumijevanje vaših poslovnih procesa i identifikacija mogućnosti poboljšanja' },
      { number: '2', title: 'Dizajn Rješenja', desc: 'Kreiranje arhitekture rješenja koje odgovara vašim potrebama' },
      { number: '3', title: 'Razvoj', desc: 'Razvoj sustava sa fokusom na automatizaciju i analitiku' },
      { number: '4', title: 'Integracija', desc: 'Povezivanje sa postojećim sustavima i alatom' },
      { number: '5', title: 'Implementacija', desc: 'Uvođenje rješenja i obuka tima za korištenje' }
    ],
    technologies: ['Astro', 'Next.js', 'Supabase', 'Vercel', 'Resend', 'TypeScript', 'Tailwind CSS', 'Prisma', 'API Routes', 'Vercel Analytics']
  },
  'booking': {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>`,
    title: 'Booking Sustavi',
    subtitle: 'Oslobodite se telefona i poruka - automatizirajte rezervacije',
    description: 'Sustavi koji pomažu u organizaciji i radu svim zanimanjima koja troše puno vremena na javljanje na telefon i odgovaranje na poruke. Idealno za frizerske salone, stomatologe, fitnes centre, masazne salone, kozmetičke salone i druge uslužne djelatnosti. Vaši klijenti mogu rezervirati termine online 24/7, dok vi dobivate automatske notifikacije i imate potpunu kontrolu nad rasporedom. Više nećete propustiti pozive dok radite s klijentima, a vaši klijenti će moći rezervirati termine u bilo koje vrijeme, čak i kada ste zatvoreni.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
        title: '24/7 Online Rezervacije',
        desc: 'Vaši klijenti mogu rezervirati termine bilo kada, čak i kada ste zatvoreni. Nema više propuštenih poziva dok radite s klijentima.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`,
        title: 'Vizualni Kalendar',
        desc: 'Jednostavno upravljanje terminima i dostupnošću kroz intuitivan kalendar. Vidite sve rezervacije na jednom mjestu.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>`,
        title: 'Automatske Notifikacije',
        desc: 'Email i SMS notifikacije za potvrdu rezervacije, podsjetnike klijentima i obavještavanje vas o novim rezervacijama.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`,
        title: 'Upravljanje Klijentima',
        desc: 'Baza podataka svih klijenata sa poviješću rezervacija, preferencijama i kontakt informacijama. Sve na jednom mjestu.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
        title: 'Ušteda Vremena',
        desc: 'Više nećete trošiti sate na telefon i odgovaranje na poruke. Fokusirajte se na svoj posao dok sustav upravlja rezervacijama.'
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`,
        title: 'Povećana Prodaja',
        desc: 'Omogućite klijentima da rezerviraju termine i kada ste zatvoreni. Više rezervacija znači više prihoda.'
      }
    ],
    process: [
      { number: '1', title: 'Analiza Vaše Djelatnosti', desc: 'Razgovaramo o vašim specifičnim potrebama - radno vrijeme, trajanje usluga, broj zaposlenika i posebni zahtjevi vaše djelatnosti' },
      { number: '2', title: 'Prilagođeni Dizajn', desc: 'Kreiramo korisničko sučelje koje odgovara vašoj djelatnosti i brandu - jednostavno za klijente, moćno za vas' },
      { number: '3', title: 'Razvoj Funkcionalnosti', desc: 'Implementiramo kalendar, online rezervacije, automatske notifikacije i sve funkcionalnosti potrebne za vašu djelatnost' },
      { number: '4', title: 'Integracija i Testiranje', desc: 'Povezujemo sa email i SMS servisima, testiramo sve scenarije i osiguravamo da sve radi besprijekorno' },
      { number: '5', title: 'Lansiranje i Obuka', desc: 'Pokrećemo sustav, pružamo obuku za upravljanje i kontinuiranu podršku za optimizaciju vašeg rada' }
    ],
    technologies: ['Astro', 'Next.js', 'Supabase', 'Vercel', 'Resend', 'Stripe', 'TypeScript', 'Tailwind CSS', 'Prisma', 'React Calendar']
  }
};

// Function to open modal with service data
function openServiceModal(serviceId) {
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
          Ključne Funkcionalnosti
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
          Proces Rada
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
      <a href="#contact" class="btn btn-primary modal-cta">Započnimo Projekt</a>
    </div>
  `;

  modalContent.innerHTML = content;
  serviceModal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Function to close modal
function closeServiceModal() {
  serviceModal.classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
}

// Event listeners
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', (e) => {
    const serviceId = card.getAttribute('data-service');
    if (serviceId) {
      openServiceModal(serviceId);
    }
  });
});

// Close modal events
modalClose.addEventListener('click', closeServiceModal);
modalOverlay.addEventListener('click', closeServiceModal);

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
    closeServiceModal();
  }
});

// Close modal when clicking contact link
modalContent.addEventListener('click', (e) => {
  if (e.target.closest('a[href="#contact"]')) {
    closeServiceModal();
  }
});

