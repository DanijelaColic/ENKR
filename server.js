import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Sva polja su obavezna',
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

    // Send email using Resend
    // Note: Za primanje odgovora, trebate verificirati domenu u Resend-u
    // i koristiti email s te domene kao "from" adresu
    const { data, error } = await resend.emails.send({
      from: 'ENKR Website <onboarding@resend.dev>',
      to: ['mirosleon.colic@gmail.com'],
      replyTo: 'mirosleon.colic@gmail.com',
      subject: `Nova poruka sa ENKR web stranice od ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Nova poruka sa ENKR web stranice</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Ime:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Poruka:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #6b7280; font-size: 12px;">
            Ova poruka je poslana sa kontakt forme na ENKR web stranici.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({
        success: false,
        error: 'Greška pri slanju emaila. Molimo pokušajte ponovno.',
      });
    }

    res.json({
      success: true,
      message: 'Poruka je uspješno poslana!',
      data,
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      error: 'Greška na serveru. Molimo pokušajte ponovno.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

