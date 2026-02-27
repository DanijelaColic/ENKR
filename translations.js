export const translations = {
  hr: {
    // Buttons
    newsletterSubmit: 'PRIJAVA',
    sending: 'Slanje...',
    draftSubmit: 'Pošaljite zahtjev',

    // Newsletter form
    newsletter: {
      errorEmpty: 'Molimo unesite email adresu.',
      errorInvalid: 'Molimo unesite važeću email adresu.',
      errorServer: 'Server nije vratio validan odgovor. Molimo pokušajte ponovno.',
      errorServerDev: 'Server nije vratio validan JSON odgovor. Provjerite da li backend server radi.',
      errorFetch: 'Nije moguće povezati se sa serverom. Molimo pokušajte ponovno.',
      errorGeneral: 'Greška pri prijavi. Molimo pokušajte ponovno.',
      success: 'Hvala vam! Uspješno ste se prijavili na newsletter.',
    },

    // Contact form
    contact: {
      errorServerEmpty:
        'Server nije vratio odgovor. Molimo kontaktirajte nas direktno na email: info@enkr.hr ili telefon: +385 91 927 9931',
      errorServerEmptyDev:
        'Server nije vratio odgovor. Provjerite da li backend server radi na http://localhost:5000',
      errorServerJson: (status) =>
        `Server nije vratio JSON odgovor. Status: ${status}. Molimo kontaktirajte nas direktno.`,
      errorServerJsonDev: (status, body) =>
        `Server nije vratio JSON odgovor. Status: ${status}. Odgovor: ${body}`,
      errorServerValid:
        'Server nije vratio validan odgovor. Molimo kontaktirajte nas direktno na email: info@enkr.hr ili telefon: +385 91 927 9931',
      errorServerValidDev:
        'Server nije vratio validan JSON odgovor. Provjerite da li backend server radi na http://localhost:5000',
      errorGeneral: 'Greška pri slanju poruke. Molimo pokušajte ponovno.',
      errorFetch:
        'Nije moguće povezati se sa serverom. Molimo kontaktirajte nas direktno na email: info@enkr.hr ili telefon: +385 91 927 9931',
      errorBackend:
        'Backend server trenutno nije dostupan. Molimo kontaktirajte nas direktno na email: info@enkr.hr ili telefon: +385 91 927 9931',
      success: 'Hvala vam! Vaša poruka je uspješno poslana. Kontaktirat ćemo vas uskoro.',
      errorAlt: 'Alternativno: Pošaljite email na',
      errorAltOr: 'ili nazovite',
    },

    // Draft form
    draft: {
      errorRequired: 'Molimo popunite sva obavezna polja.',
      errorEmail: 'Molimo unesite važeću email adresu.',
      errorParse: (msg) => `Neočekivani odgovor od servera: ${msg}`,
      errorEndpoint: 'Backend endpoint nije pronađen.',
      errorHtml: (status) => `Server je vratio HTML umjesto JSON. Status: ${status}.`,
      errorEmpty: 'Prazan odgovor od servera',
      errorGeneral: 'Greška pri slanju zahtjeva. Molimo pokušajte ponovno.',
      success: 'Zahtjev je uspješno poslan! Kontaktirat ćemo vas u roku od 24h.',
    },

    // Modal sections
    modal: {
      featuresTitle: 'Ključne Funkcionalnosti',
      processTitle: 'Proces Rada',
      techTitle: 'Tehnologije',
      ctaLabel: 'Započnimo Projekt',
    },

    // Service modal data
    services: {
      'web-apps': {
        title: 'Custom Web Stranice',
        subtitle: 'Prilagođene web stranice koje rastu s vašim poslovanjem',
        description:
          'Razvijamo prilagođene web stranice koje odgovaraju vašim specifičnim potrebama i zahtjevima poslovanja. Svaka stranica je kreirana od nule, prilagođena vašim procesima i optimizirana za performanse.',
        features: [
          { title: 'Potpuno Prilagođeno', desc: 'Web stranica dizajnirana specifično za vaše poslovne procese i potrebe' },
          { title: 'Vrhunske Performanse', desc: 'Optimizirane za brzinu i skalabilnost kako bi podržale rast vašeg poslovanja' },
          { title: 'Responsive Dizajn', desc: 'Savršeno funkcionira na svim uređajima - desktop, tablet i mobilni' },
          { title: 'Sigurnost', desc: 'Najbolje prakse sigurnosti i zaštita podataka vaših korisnika' },
        ],
        process: [
          { title: 'Analiza i Planiranje', desc: 'Razgovaramo o vašim potrebama, ciljevima i zahtjevima za web stranicu' },
          { title: 'Dizajn i Prototip', desc: 'Kreiramo wireframe i dizajn koji odgovara vašoj viziji' },
          { title: 'Razvoj', desc: 'Razvijamo web stranicu koristeći najnovije tehnologije i najbolje prakse' },
          { title: 'Testiranje', desc: 'Temeljito testiramo svaku funkcionalnost prije lansiranja' },
          { title: 'Lansiranje i Podrška', desc: 'Pomažemo vam lansirati web stranicu i pružamo kontinuiranu podršku' },
        ],
      },
      ecommerce: {
        title: 'Web Shopovi (E-commerce)',
        subtitle: 'Kompletna e-commerce rješenja za online prodaju',
        description:
          'Kreiramo moderne web shopove koji pretvaraju posjetitelje u kupce. Naša e-commerce rješenja kombiniraju ljepotu dizajna s moćnim funkcionalnostima za upravljanje proizvodima, narudžbama i plaćanjima.',
        features: [
          { title: 'Platni Sustavi', desc: 'Integracija sa svim glavnim platnim sustavima (Stripe, PayPal, banke)' },
          { title: 'Upravljanje Proizvodima', desc: 'Jednostavno dodavanje, uređivanje i organiziranje proizvoda i kategorija' },
          { title: 'Upravljanje Narudžbama', desc: 'Kompletan sustav za praćenje narudžbi, statusa i isporuka' },
          { title: 'Košarica i Checkout', desc: 'Optimiziran proces kupnje za maksimalnu konverziju' },
        ],
        process: [
          { title: 'Analiza Proizvoda', desc: 'Razgovaramo o vašim proizvodima, cijenama i strategiji prodaje' },
          { title: 'Dizajn Shopa', desc: 'Kreiramo atraktivan dizajn koji ističe vaše proizvode' },
          { title: 'Razvoj Funkcionalnosti', desc: 'Implementiramo sve potrebne funkcionalnosti za prodaju' },
          { title: 'Integracija Plaćanja', desc: 'Povezujemo platne sustave i testiramo transakcije' },
          { title: 'Lansiranje', desc: 'Pokrećemo shop i pružamo podršku za optimizaciju prodaje' },
        ],
      },
      blog: {
        title: 'Blog & Content Web Stranice',
        subtitle: 'Stranice optimizirane za sadržaj i SEO',
        description:
          'Kreiramo moderne blog i content stranice koje privlače posjetitelje i pretvaraju ih u čitatelje. Naša rješenja su optimizirana za SEO, brzinu učitavanja i jednostavno upravljanje sadržajem.',
        features: [
          { title: 'SEO Optimizacija', desc: 'Stranica optimizirana za Google i druge pretraživače za bolje rangiranje' },
          { title: 'CMS Sustav', desc: 'Jednostavno upravljanje sadržajem bez poznavanja programiranja' },
          { title: 'Brza Učitavanja', desc: 'Optimizirane performanse za brzo učitavanje stranica i bolje korisničko iskustvo' },
          { title: 'Društvene Mreže', desc: 'Integracija sa društvenim mrežama za lakše dijeljenje sadržaja' },
        ],
        process: [
          { title: 'Strukturiranje Sadržaja', desc: 'Planiranje strukture stranice i kategorija bloga' },
          { title: 'Dizajn i UX', desc: 'Kreiranje atraktivnog dizajna koji ističe vaš sadržaj' },
          { title: 'Razvoj CMS-a', desc: 'Implementacija jednostavnog sustava za upravljanje sadržajem' },
          { title: 'SEO Optimizacija', desc: 'Optimizacija za pretraživače i brzinu učitavanja' },
          { title: 'Lansiranje', desc: 'Pokretanje stranice i obuka za upravljanje sadržajem' },
        ],
      },
      business: {
        title: 'Rješenja za Poslovanje',
        subtitle: 'Digitalna rješenja koja optimiziraju vaše poslovne procese',
        description:
          'Razvijamo digitalna rješenja koja automatiziraju vaše poslovne procese, povećavaju produktivnost i donose vrijedne uvide kroz analitiku. Od CRM sustava do dashboarda za upravljanje - sve prilagođeno vašim potrebama.',
        features: [
          { title: 'Automatizacija Procesa', desc: 'Automatizacija rutinskih zadataka i povećanje efikasnosti' },
          { title: 'Analitika i Izvještaji', desc: 'Dashboardi sa real-time podacima i detaljnim izvještajima' },
          { title: 'CRM Integracije', desc: 'Integracija sa postojećim sustavima i alatom za upravljanje klijentima' },
          { title: 'Sigurnost Podataka', desc: 'Zaštita vaših poslovnih podataka i osiguranje compliance standarda' },
        ],
        process: [
          { title: 'Analiza Procesa', desc: 'Razumijevanje vaših poslovnih procesa i identifikacija mogućnosti poboljšanja' },
          { title: 'Dizajn Rješenja', desc: 'Kreiranje arhitekture rješenja koje odgovara vašim potrebama' },
          { title: 'Razvoj', desc: 'Razvoj sustava sa fokusom na automatizaciju i analitiku' },
          { title: 'Integracija', desc: 'Povezivanje sa postojećim sustavima i alatom' },
          { title: 'Implementacija', desc: 'Uvođenje rješenja i obuka tima za korištenje' },
        ],
      },
      booking: {
        title: 'Booking Sustavi',
        subtitle: 'Oslobodite se telefona i poruka - automatizirajte rezervacije',
        description:
          'Sustavi koji pomažu u organizaciji i radu svim zanimanjima koja troše puno vremena na javljanje na telefon i odgovaranje na poruke. Idealno za frizerske salone, stomatologe, fitnes centre, masažne salone, kozmetičke salone i druge uslužne djelatnosti. Vaši klijenti mogu rezervirati termine online 24/7, dok vi dobivate automatske notifikacije i imate potpunu kontrolu nad rasporedom.',
        features: [
          { title: '24/7 Online Rezervacije', desc: 'Vaši klijenti mogu rezervirati termine bilo kada, čak i kada ste zatvoreni. Nema više propuštenih poziva dok radite s klijentima.' },
          { title: 'Vizualni Kalendar', desc: 'Jednostavno upravljanje terminima i dostupnošću kroz intuitivan kalendar. Vidite sve rezervacije na jednom mjestu.' },
          { title: 'Automatske Notifikacije', desc: 'Email i SMS notifikacije za potvrdu rezervacije, podsjetnike klijentima i obavještavanje vas o novim rezervacijama.' },
          { title: 'Upravljanje Klijentima', desc: 'Baza podataka svih klijenata sa poviješću rezervacija, preferencijama i kontakt informacijama. Sve na jednom mjestu.' },
          { title: 'Ušteda Vremena', desc: 'Više nećete trošiti sate na telefon i odgovaranje na poruke. Fokusirajte se na svoj posao dok sustav upravlja rezervacijama.' },
          { title: 'Povećana Prodaja', desc: 'Omogućite klijentima da rezerviraju termine i kada ste zatvoreni. Više rezervacija znači više prihoda.' },
        ],
        process: [
          { title: 'Analiza Vaše Djelatnosti', desc: 'Razgovaramo o vašim specifičnim potrebama - radno vrijeme, trajanje usluga, broj zaposlenika i posebni zahtjevi vaše djelatnosti' },
          { title: 'Prilagođeni Dizajn', desc: 'Kreiramo korisničko sučelje koje odgovara vašoj djelatnosti i brandu - jednostavno za klijente, moćno za vas' },
          { title: 'Razvoj Funkcionalnosti', desc: 'Implementiramo kalendar, online rezervacije, automatske notifikacije i sve funkcionalnosti potrebne za vašu djelatnost' },
          { title: 'Integracija i Testiranje', desc: 'Povezujemo sa email i SMS servisima, testiramo sve scenarije i osiguravamo da sve radi besprijekorno' },
          { title: 'Lansiranje i Obuka', desc: 'Pokrećemo sustav, pružamo obuku za upravljanje i kontinuiranu podršku za optimizaciju vašeg rada' },
        ],
      },
    },
  },

  en: {
    // Buttons
    newsletterSubmit: 'SUBSCRIBE',
    sending: 'Sending...',
    draftSubmit: 'Send request',

    // Newsletter form
    newsletter: {
      errorEmpty: 'Please enter your email address.',
      errorInvalid: 'Please enter a valid email address.',
      errorServer: 'Server returned an invalid response. Please try again.',
      errorServerDev: 'Server returned an invalid JSON response. Check if the backend server is running.',
      errorFetch: 'Cannot connect to the server. Please try again.',
      errorGeneral: 'Subscription error. Please try again.',
      success: 'Thank you! You have successfully subscribed to our newsletter.',
    },

    // Contact form
    contact: {
      errorServerEmpty:
        'Server returned no response. Please contact us directly at info@enkr.hr or +385 91 927 9931',
      errorServerEmptyDev:
        'Server returned no response. Check if the backend server is running on http://localhost:5000',
      errorServerJson: (status) =>
        `Server returned non-JSON response. Status: ${status}. Please contact us directly.`,
      errorServerJsonDev: (status, body) =>
        `Server returned non-JSON response. Status: ${status}. Response: ${body}`,
      errorServerValid:
        'Server returned an invalid response. Please contact us directly at info@enkr.hr or +385 91 927 9931',
      errorServerValidDev:
        'Server returned an invalid JSON response. Check if the backend server is running on http://localhost:5000',
      errorGeneral: 'Error sending message. Please try again.',
      errorFetch:
        'Cannot connect to the server. Please contact us directly at info@enkr.hr or +385 91 927 9931',
      errorBackend:
        'Backend server is currently unavailable. Please contact us directly at info@enkr.hr or +385 91 927 9931',
      success: 'Thank you! Your message has been sent successfully. We will contact you soon.',
      errorAlt: 'Alternatively: Send an email to',
      errorAltOr: 'or call',
    },

    // Draft form
    draft: {
      errorRequired: 'Please fill in all required fields.',
      errorEmail: 'Please enter a valid email address.',
      errorParse: (msg) => `Unexpected server response: ${msg}`,
      errorEndpoint: 'Backend endpoint not found.',
      errorHtml: (status) => `Server returned HTML instead of JSON. Status: ${status}.`,
      errorEmpty: 'Empty server response',
      errorGeneral: 'Error sending the request. Please try again.',
      success: 'Request sent successfully! We will contact you within 24h.',
    },

    // Modal sections
    modal: {
      featuresTitle: 'Key Features',
      processTitle: 'Our Process',
      techTitle: 'Technologies',
      ctaLabel: 'Start a Project',
    },

    // Service modal data
    services: {
      'web-apps': {
        title: 'Custom Websites',
        subtitle: 'Tailored websites that grow with your business',
        description:
          'We develop custom websites tailored to your specific business needs and requirements. Every site is built from scratch, adapted to your processes and optimised for performance.',
        features: [
          { title: 'Fully Custom', desc: 'Website designed specifically for your business processes and needs' },
          { title: 'Top Performance', desc: 'Optimised for speed and scalability to support your business growth' },
          { title: 'Responsive Design', desc: 'Works perfectly on all devices — desktop, tablet and mobile' },
          { title: 'Security', desc: 'Best security practices and data protection for your users' },
        ],
        process: [
          { title: 'Analysis & Planning', desc: 'We discuss your needs, goals and requirements for the website' },
          { title: 'Design & Prototype', desc: 'We create wireframes and a design that matches your vision' },
          { title: 'Development', desc: 'We build the website using the latest technologies and best practices' },
          { title: 'Testing', desc: 'We thoroughly test every feature before launch' },
          { title: 'Launch & Support', desc: 'We help you launch and provide ongoing support' },
        ],
      },
      ecommerce: {
        title: 'Online Shops (E-commerce)',
        subtitle: 'Complete e-commerce solutions for online sales',
        description:
          'We create modern online shops that convert visitors into buyers. Our e-commerce solutions combine beautiful design with powerful features for managing products, orders and payments.',
        features: [
          { title: 'Payment Systems', desc: 'Integration with all major payment providers (Stripe, PayPal, banks)' },
          { title: 'Product Management', desc: 'Easily add, edit and organise products and categories' },
          { title: 'Order Management', desc: 'Complete system for tracking orders, statuses and shipments' },
          { title: 'Cart & Checkout', desc: 'Optimised buying process for maximum conversion' },
        ],
        process: [
          { title: 'Product Analysis', desc: 'We discuss your products, pricing and sales strategy' },
          { title: 'Shop Design', desc: 'We create an attractive design that highlights your products' },
          { title: 'Feature Development', desc: 'We implement all necessary features for selling online' },
          { title: 'Payment Integration', desc: 'We connect payment systems and test transactions' },
          { title: 'Launch', desc: 'We launch the shop and provide support for sales optimisation' },
        ],
      },
      blog: {
        title: 'Blog & Content Websites',
        subtitle: 'Pages optimised for content and SEO',
        description:
          'We create modern blog and content sites that attract visitors and turn them into readers. Our solutions are optimised for SEO, fast loading and easy content management.',
        features: [
          { title: 'SEO Optimisation', desc: 'Page optimised for Google and other search engines for better rankings' },
          { title: 'CMS System', desc: 'Easy content management without any programming knowledge' },
          { title: 'Fast Loading', desc: 'Optimised performance for fast page loads and better user experience' },
          { title: 'Social Media', desc: 'Integration with social networks for easy content sharing' },
        ],
        process: [
          { title: 'Content Structure', desc: 'Planning the site structure and blog categories' },
          { title: 'Design & UX', desc: 'Creating an attractive design that highlights your content' },
          { title: 'CMS Development', desc: 'Implementing a simple content management system' },
          { title: 'SEO Optimisation', desc: 'Optimisation for search engines and loading speed' },
          { title: 'Launch', desc: 'Launching the site and training for content management' },
        ],
      },
      business: {
        title: 'Business Solutions',
        subtitle: 'Digital solutions that optimise your business processes',
        description:
          'We develop digital solutions that automate your business processes, increase productivity and deliver valuable insights through analytics. From CRM systems to management dashboards — all tailored to your needs.',
        features: [
          { title: 'Process Automation', desc: 'Automation of routine tasks and increased efficiency' },
          { title: 'Analytics & Reports', desc: 'Dashboards with real-time data and detailed reports' },
          { title: 'CRM Integrations', desc: 'Integration with existing systems and client management tools' },
          { title: 'Data Security', desc: 'Protection of your business data and compliance with security standards' },
        ],
        process: [
          { title: 'Process Analysis', desc: 'Understanding your business processes and identifying improvement opportunities' },
          { title: 'Solution Design', desc: 'Creating the solution architecture that fits your needs' },
          { title: 'Development', desc: 'Building the system with a focus on automation and analytics' },
          { title: 'Integration', desc: 'Connecting with existing systems and tools' },
          { title: 'Implementation', desc: 'Rolling out the solution and training your team' },
        ],
      },
      booking: {
        title: 'Booking Systems',
        subtitle: 'Free yourself from phone calls — automate your reservations',
        description:
          'Systems that help any service business that spends too much time answering phones and messages. Ideal for hair salons, dentists, fitness centres, massage studios, beauty salons and other service businesses. Your clients can book appointments online 24/7 while you receive automatic notifications and have full control over your schedule.',
        features: [
          { title: '24/7 Online Bookings', desc: 'Your clients can book at any time, even when you are closed. No more missed calls while you are with another client.' },
          { title: 'Visual Calendar', desc: 'Easy management of appointments and availability through an intuitive calendar. See all bookings in one place.' },
          { title: 'Automatic Notifications', desc: 'Email and SMS notifications for booking confirmations, client reminders and new booking alerts.' },
          { title: 'Client Management', desc: 'Database of all clients with booking history, preferences and contact information. Everything in one place.' },
          { title: 'Time Savings', desc: 'No more hours spent on the phone and answering messages. Focus on your work while the system manages bookings.' },
          { title: 'Increased Revenue', desc: 'Let clients book even when you are closed. More bookings means more income.' },
        ],
        process: [
          { title: 'Business Analysis', desc: 'We discuss your specific needs — working hours, service durations, number of staff and special requirements' },
          { title: 'Custom Design', desc: 'We create a UI that fits your business and brand — simple for clients, powerful for you' },
          { title: 'Feature Development', desc: 'We implement the calendar, online booking, automatic notifications and all features your business needs' },
          { title: 'Integration & Testing', desc: 'We connect email and SMS services, test all scenarios and ensure everything works flawlessly' },
          { title: 'Launch & Training', desc: 'We go live, provide management training and ongoing support for optimising your workflow' },
        ],
      },
    },
  },
};
