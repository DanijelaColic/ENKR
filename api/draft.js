import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Log for debugging (remove in production)
if (!process.env.RESEND_API_KEY) {
  console.error('⚠️ RESEND_API_KEY is not set!');
} else {
  console.log('✅ RESEND_API_KEY is set (length:', process.env.RESEND_API_KEY.length, ')');
}

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    console.log('📥 Draft form request received');
    console.log('📥 Request body:', JSON.stringify(req.body, null, 2));
    const { fullName, email, phone, service, businessType, goal, existingWebsite } = req.body;

    if (!fullName || !email || !phone || !service || !businessType || !goal) {
      return res.status(400).json({
        success: false,
        error: 'Sva obavezna polja moraju biti popunjena',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Nevažeća email adresa',
      });
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ Resend API key not configured');
      console.error('❌ Available env vars:', Object.keys(process.env).filter(k => k.includes('RESEND')));
      return res.status(500).json({
        success: false,
        error: 'Email servis nije konfiguriran. Molimo kontaktirajte administratora.',
      });
    }

    console.log('✅ Resend API key found, attempting to send email...');

    const sanitizeInput = (input) => {
      if (!input) return '';
      return String(input)
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
    };

    const serviceNames = {
      'web-stranica': 'Web stranica',
      'web-shop': 'Web shop',
      'booking-sustav': 'Booking sustav',
      'web-aplikacija': 'Web aplikacija',
      'nisam-siguran': 'Nisam siguran/a — trebam savjet',
    };

    const sFullName = sanitizeInput(fullName);
    const sEmail = sanitizeInput(email);
    const sPhone = sanitizeInput(phone);
    const sService = sanitizeInput(serviceNames[service] || service);
    const sBusinessType = sanitizeInput(businessType);
    const sGoal = sanitizeInput(goal);
    const sExistingWebsite = sanitizeInput(existingWebsite);

    const emailHtml = `
      <h2>Novi zahtjev za besplatni nacrt web stranice</h2>
      <h3>Kontakt informacije</h3>
      <p><strong>Ime i prezime:</strong> ${sFullName}</p>
      <p><strong>Email:</strong> ${sEmail}</p>
      <p><strong>Telefon:</strong> ${sPhone}</p>

      <h3>Detalji projekta</h3>
      <p><strong>Zanima me:</strong> ${sService}</p>
      <p><strong>Djelatnost:</strong> ${sBusinessType}</p>
      <p><strong>Što žele postići webom:</strong></p>
      <p>${sGoal.replace(/\n/g, '<br>')}</p>
      ${sExistingWebsite ? `<p><strong>Postojeća web stranica:</strong> <a href="${sExistingWebsite}">${sExistingWebsite}</a></p>` : ''}
      
      <hr>
      <p><em>Zahtjev poslan s web stranice ENKR</em></p>
    `;

    const emailText = `
Novi zahtjev za besplatni nacrt web stranice

Kontakt informacije:
Ime i prezime: ${fullName}
Email: ${email}
Telefon: ${phone}

Detalji projekta:
Zanima me: ${serviceNames[service] || service}
Djelatnost: ${businessType}
Što žele postići webom:
${goal}
${existingWebsite ? `Postojeća web stranica: ${existingWebsite}` : ''}

---
Zahtjev poslan s web stranice ENKR
    `;

    // Send email using Resend
    // Using verified domain enkr.hr
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'ENKR Web <noreply@enkr.hr>';
    
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: 'info@enkr.hr',
      replyTo: email,
      subject: `Novi zahtjev za besplatni nacrt - ${fullName}`,
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      console.error('❌ Resend error:', error);
      console.error('❌ Resend error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({
        success: false,
        error: `Greška pri slanju emaila: ${error.message || JSON.stringify(error)}. Molimo pokušajte ponovno.`,
      });
    }

    console.log('✅ Draft form email sent successfully:', data?.id || 'unknown');
    return res.status(200).json({
      success: true,
      message: 'Zahtjev je uspješno poslan! Kontaktirat ćemo vas u roku od 48h.',
      data,
    });
  } catch (error) {
    console.error('❌ Server error:', error);
    return res.status(500).json({
      success: false,
      error: 'Greška na serveru. Molimo pokušajte ponovno.',
    });
  }
}
