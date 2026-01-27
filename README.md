# ENKR Website

Web stranica za ENKR agenciju za digitalne usluge.

## Setup

1. Instaliraj dependencies:
```bash
npm install
```

2. Kreiraj `.env` fajl (kopiraj iz `.env.example`):
```bash
cp .env.example .env
```

3. Dodaj Resend API ključ u `.env`:
```
RESEND_API_KEY=re_your_api_key_here
```

Resend API ključ možete dobiti na: https://resend.com/api-keys

4. Pokreni development server (u jednom terminalu):
```bash
npm run dev
```

5. Pokreni backend server (u drugom terminalu):
```bash
npm run server
```

Stranica će biti dostupna na `http://localhost:3000` (ili drugi slobodan port ako je 3000 zauzet)
Backend API će biti dostupan na `http://localhost:5000`

## Production

Za production deployment, trebate:
- Postaviti environment varijable na hosting servisu
- Pokrenuti backend server (možete koristiti PM2, Docker, ili serverless funkcije)
- Build frontend: `npm run build`

