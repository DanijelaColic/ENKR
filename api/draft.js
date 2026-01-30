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
    const { package: packageValue, visualStyle, colorHex, companyName, businessType, email, goal } = req.body;

    // Validation
    if (!companyName || !businessType || !email || !goal) {
      return res.status(400).json({
        success: false,
        error: 'Sva obavezna polja moraju biti popunjena',
      });
    }

    // Email validation
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

    // Sanitize inputs
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
    const sanitizedPackage = sanitizeInput(packageNames[packageValue] || packageValue || 'Nije odabran');
    const sanitizedVisualStyle = sanitizeInput(styleNames[visualStyle] || visualStyle || 'Nije odabran');
    const sanitizedColorHex = sanitizeInput(colorHex || '#6366f1');

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
Paket: ${packageNames[packageValue] || packageValue || 'Nije odabran'}
Vizualni identitet: ${styleNames[visualStyle] || visualStyle || 'Nije odabran'}
Primarna boja: ${colorHex || '#6366f1'}

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
