import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Log for debugging
if (!process.env.RESEND_API_KEY) {
  console.error('⚠️ RESEND_API_KEY is not set!');
} else {
  console.log('✅ RESEND_API_KEY is set (length:', process.env.RESEND_API_KEY.length, ')');
}

export default async function handler(req, res) {
  console.log('📧 Contact API handler called');
  console.log('📧 Method:', req.method);
  console.log('📧 Headers:', JSON.stringify(req.headers, null, 2));
  
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    console.log('✅ CORS preflight request handled');
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    console.log('❌ Method not allowed:', req.method);
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    console.log('📧 Contact form submission received');
    
    // Parse request body if it's a string (Vercel sometimes sends string)
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        console.error('❌ Error parsing request body:', e);
        return res.status(400).json({
          success: false,
          error: 'Nevažeći format podataka',
        });
      }
    }
    
    console.log('📧 Parsed request body:', JSON.stringify(body, null, 2));
    const { name, email, message } = body;

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
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ Resend API key not configured');
      console.error('❌ Available env vars:', Object.keys(process.env).filter(k => k.includes('RESEND')));
      return res.status(500).json({
        success: false,
        error: 'Email servis nije konfiguriran. Molimo kontaktirajte administratora.',
      });
    }
    
    // Check if Resend instance is initialized
    if (!resend) {
      console.error('❌ Resend instance not initialized');
      return res.status(500).json({
        success: false,
        error: 'Email servis nije inicijaliziran. Molimo kontaktirajte administratora.',
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
    const { data, error } = await resend.emails.send({
      from: 'ENKR Kontakt <info@enkr.hr>',
      to: ['info@enkr.hr'],
      replyTo: email,
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
    return res.status(200).json({
      success: true,
      message: 'Poruka je uspješno poslana!',
      data,
    });
  } catch (error) {
    console.error('❌ Server error:', error);
    console.error('Error stack:', error.stack);
    return res.status(500).json({
      success: false,
      error: 'Greška na serveru. Molimo pokušajte ponovno.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
