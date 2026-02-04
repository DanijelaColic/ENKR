import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Initialize Resend
const RESEND_API_KEY = process.env.RESEND_API_KEY;
if (!RESEND_API_KEY) {
  console.warn('⚠️  WARNING: RESEND_API_KEY nije postavljen u .env fajlu!');
  console.warn('   Email slanje neće raditi bez API ključa.');
}

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'ENKR Backend API is running',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact (POST)',
      draft: '/api/draft (POST)'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Contact form endpoint - GET handler (info)
app.get('/api/contact', (req, res) => {
  res.json({
    message: 'Contact form endpoint',
    method: 'POST',
    requiredFields: ['name', 'email', 'message'],
    example: {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello, this is a test message'
    }
  });
});

// Contact form endpoint - POST handler
app.post('/api/contact', async (req, res) => {
  try {
    console.log('📧 Contact form submission received');
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      console.log('❌ Validation failed: Missing required fields');
      return res.status(400).json({
        success: false,
        error: 'Sva polja su obavezna',
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Validation failed: Invalid email format');
      return res.status(400).json({
        success: false,
        error: 'Nevažeća email adresa',
      });
    }

    // Check if Resend is configured
    if (!resend || !RESEND_API_KEY) {
      console.error('❌ Resend API key not configured');
      return res.status(500).json({
        success: false,
        error: 'Email servis nije konfiguriran. Molimo kontaktirajte administratora.',
      });
    }

    console.log(`📤 Attempting to send email to info@enkr.hr (replyTo: ${email})`);

    // Sanitize inputs to prevent XSS attacks
    const sanitizeHtml = (str) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const sanitizedName = sanitizeHtml(name);
    const sanitizedEmail = sanitizeHtml(email);
    const sanitizedMessage = sanitizeHtml(message);

    // Send email using Resend
    // Using info@enkr.hr as the from address (verified domain required in Resend)
    // Sending to info@enkr.hr with replyTo set to the sender's email
    // When you click Reply in your email client, it will automatically go to the person who sent the message
    // replyTo must be only the email address (without name) for proper email client support
    const { data, error } = await resend.emails.send({
      from: 'ENKR Kontakt <info@enkr.hr>',
      to: ['info@enkr.hr'],
      replyTo: email, // Ovo osigurava da Reply ide na osobu koja je poslala poruku
      subject: `Nova poruka sa ENKR web stranice od ${sanitizedName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Nova poruka sa ENKR web stranice</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Ime:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p>
            <p><strong>Poruka:</strong></p>
            <p style="white-space: pre-wrap;">${sanitizedMessage}</p>
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            Ova poruka je poslana sa kontakt forme na ENKR web stranici.<br>
            <strong>Kliknite "Reply" da odgovorite na ${sanitizedEmail}</strong>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('❌ Resend error:', JSON.stringify(error, null, 2));
      return res.status(500).json({
        success: false,
        error: 'Greška pri slanju emaila. Molimo pokušajte ponovno.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }

    console.log('✅ Email sent successfully:', data?.id || 'unknown');
    res.json({
      success: true,
      message: 'Poruka je uspješno poslana!',
      data,
    });
  } catch (error) {
    console.error('❌ Server error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      error: 'Greška na serveru. Molimo pokušajte ponovno.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Draft form endpoint - GET handler (info)
app.get('/api/draft', (req, res) => {
  res.json({
    message: 'Draft form endpoint',
    method: 'POST',
    requiredFields: ['package', 'visualStyle', 'colorHex', 'companyName', 'businessType', 'email', 'goal'],
    example: {
      package: 'standard',
      visualStyle: 'modern',
      colorHex: '#6366f1',
      companyName: 'Moja Firma d.o.o.',
      businessType: 'OPG',
      email: 'info@mojafirma.hr',
      goal: 'Želim privući nove klijente'
    }
  });
});

// Draft form endpoint - POST handler
app.post('/api/draft', async (req, res) => {
  try {
    console.log('📋 Draft form submission received');
    const { package, visualStyle, colorHex, companyName, businessType, email, goal } = req.body;

    // Validation
    if (!companyName || !businessType || !email || !goal) {
      console.log('❌ Validation failed: Missing required fields');
      return res.status(400).json({
        success: false,
        error: 'Sva obavezna polja moraju biti popunjena',
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Validation failed: Invalid email format');
      return res.status(400).json({
        success: false,
        error: 'Nevažeća email adresa',
      });
    }

    // Check if Resend is configured
    if (!resend || !RESEND_API_KEY) {
      console.error('❌ Resend API key not configured');
      return res.status(500).json({
        success: false,
        error: 'Email servis nije konfiguriran. Molimo kontaktirajte administratora.',
      });
    }

    console.log(`📤 Attempting to send draft form email to info@enkr.hr (replyTo: ${email})`);

    // Sanitize inputs to prevent XSS attacks
    const sanitizeInput = (input) => {
      if (!input) return '';
      return String(input)
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
    };

    // Map package values to readable names
    const packageNames = {
      'one-page': 'One Page / Landing Page',
      'standard': 'Standard Paket',
      'premium': 'Premium Paket',
    };

    // Map visual style values to readable names
    const styleNames = {
      'futuristic': 'Futuristički',
      'elegant': 'Elegantan i nježan',
      'modern': 'Moderan minimalistički',
      'classic': 'Klasičan',
      'playful': 'Razigran i kreativan',
      'natural': 'Prirodan i organski',
    };

    const sanitizedCompanyName = sanitizeInput(companyName);
    const sanitizedBusinessType = sanitizeInput(businessType);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedGoal = sanitizeInput(goal);
    const sanitizedPackage = sanitizeInput(packageNames[package] || package || 'Nije odabran');
    const sanitizedVisualStyle = sanitizeInput(styleNames[visualStyle] || visualStyle || 'Nije odabran');
    const sanitizedColorHex = sanitizeInput(colorHex || '#000000');

    // Email content
    const emailHtml = `
      <h2>Novi zahtjev za besplatni nacrt web stranice</h2>
      <h3>Informacije o firmi</h3>
      <p><strong>Ime firme:</strong> ${sanitizedCompanyName}</p>
      <p><strong>Djelatnost:</strong> ${sanitizedBusinessType}</p>
      <p><strong>Email:</strong> ${sanitizedEmail}</p>
      <p><strong>Što žele postići webom:</strong></p>
      <p>${sanitizedGoal.replace(/\n/g, '<br>')}</p>
      
      <h3>Odabrani paket i stil</h3>
      <p><strong>Paket:</strong> ${sanitizedPackage}</p>
      <p><strong>Vizualni identitet:</strong> ${sanitizedVisualStyle}</p>
      <p><strong>Primarna boja:</strong> <span style="display: inline-block; width: 20px; height: 20px; background-color: ${sanitizedColorHex}; border: 1px solid #ccc; vertical-align: middle; margin-right: 5px;"></span> ${sanitizedColorHex}</p>
      
      <hr>
      <p><em>Zahtjev poslan s web stranice ENKR</em></p>
    `;

    const emailText = `
Novi zahtjev za besplatni nacrt web stranice

Informacije o firmi:
Ime firme: ${companyName}
Djelatnost: ${businessType}
Email: ${email}

Što žele postići webom:
${goal}

Odabrani paket i stil:
Paket: ${packageNames[package] || package || 'Nije odabran'}
Vizualni identitet: ${styleNames[visualStyle] || visualStyle || 'Nije odabran'}
Primarna boja: ${colorHex || '#000000'}

---
Zahtjev poslan s web stranice ENKR
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'ENKR Web <onboarding@resend.dev>',
      to: 'info@enkr.hr',
      replyTo: email,
      subject: `Novi zahtjev za besplatni nacrt - ${companyName}`,
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return res.status(500).json({
        success: false,
        error: 'Greška pri slanju emaila. Molimo pokušajte ponovno.',
      });
    }

    console.log('✅ Draft form email sent successfully:', data?.id || 'unknown');
    res.json({
      success: true,
      message: 'Zahtjev je uspješno poslan! Kontaktirat ćemo vas u roku od 48h.',
      data,
    });
  } catch (error) {
    console.error('❌ Server error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      error: 'Greška na serveru. Molimo pokušajte ponovno.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Newsletter endpoint - GET handler (info)
app.get('/api/newsletter', (req, res) => {
  res.json({
    message: 'Newsletter signup endpoint',
    method: 'POST',
    requiredFields: ['name', 'email'],
    example: {
      name: 'Ime Prezime',
      email: 'user@example.com'
    }
  });
});

// Newsletter endpoint - POST handler
app.post('/api/newsletter', async (req, res) => {
  try {
    console.log('📧 Newsletter signup received');
    const { name, email } = req.body;

    // Validation
    if (!email) {
      console.log('❌ Validation failed: Missing email');
      return res.status(400).json({
        success: false,
        error: 'Email adresa je obavezna',
      });
    }

    if (!name || !name.trim()) {
      console.log('❌ Validation failed: Missing name');
      return res.status(400).json({
        success: false,
        error: 'Ime i prezime su obavezni',
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Validation failed: Invalid email format');
      return res.status(400).json({
        success: false,
        error: 'Nevažeća email adresa',
      });
    }

    // Check if Resend is configured
    if (!resend || !RESEND_API_KEY) {
      console.error('❌ Resend API key not configured');
      return res.status(500).json({
        success: false,
        error: 'Email servis nije konfiguriran. Molimo kontaktirajte administratora.',
      });
    }

    console.log(`📤 Attempting to send newsletter signup notification for ${email}`);

    // Sanitize email to prevent XSS attacks
    const sanitizeHtml = (str) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const sanitizedName = sanitizeHtml(name);
    const sanitizedEmail = sanitizeHtml(email);

    // Send notification email to ENKR
    const { data, error } = await resend.emails.send({
      from: 'ENKR Newsletter <onboarding@resend.dev>',
      to: 'info@enkr.hr',
      replyTo: email,
      subject: `Nova prijava na newsletter - ${sanitizedName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Nova prijava na newsletter</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Ime i prezime:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p>
            <p><strong>Datum:</strong> ${new Date().toLocaleString('hr-HR')}</p>
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            Ova prijava je poslana sa newsletter forme na ENKR web stranici.<br>
            <strong>Kliknite "Reply" da odgovorite na ${sanitizedEmail}</strong>
          </p>
        </div>
      `,
      text: `Nova prijava na newsletter\n\nIme i prezime: ${sanitizedName}\nEmail: ${sanitizedEmail}\nDatum: ${new Date().toLocaleString('hr-HR')}\n\nOva prijava je poslana sa newsletter forme na ENKR web stranici.`,
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return res.status(500).json({
        success: false,
        error: 'Greška pri prijavi. Molimo pokušajte ponovno.',
      });
    }

    console.log('✅ Newsletter signup email sent successfully:', data?.id || 'unknown');
    res.json({
      success: true,
      message: 'Uspješno ste se prijavili na newsletter!',
      data,
    });
  } catch (error) {
    console.error('❌ Server error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      error: 'Greška na serveru. Molimo pokušajte ponovno.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Contact endpoint: http://localhost:${PORT}/api/contact`);
  console.log(`📋 Draft endpoint: http://localhost:${PORT}/api/draft`);
  console.log(`📧 Newsletter endpoint: http://localhost:${PORT}/api/newsletter`);
  console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
  if (!RESEND_API_KEY) {
    console.warn('⚠️  WARNING: RESEND_API_KEY nije postavljen!');
  } else {
    console.log('✅ Resend API key configured');
  }
});

