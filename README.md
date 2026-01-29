# ⚓ ENKR - Agencija za Digitalne Usluge

Moderna web stranica za ENKR agenciju za digitalne usluge. Projekt uključuje frontend (Vite + vanilla JS) i backend API (Node.js + Express) za slanje emailova.

## 🚀 Brzi Početak

### 1. Instaliraj Dependencies

```bash
npm install
```

### 2. Postavi Environment Variables

Kreiraj `.env` fajl (možeš kopirati iz `.env.example`):

```bash
cp .env.example .env
```

Uredi `.env` i dodaj svoj Resend API key:

```env
VITE_API_URL=http://localhost:5000
RESEND_API_KEY=re_your_api_key_here
PORT=5000
```

**Gdje dobiti Resend API key?**
1. Idi na [resend.com](https://resend.com)
2. Kreiraj račun ili login
3. Idi na [API Keys](https://resend.com/api-keys)
4. Kreiraj novi API key i kopiraj ga

### 3. Pokreni Development Servere

**U prvom terminalu** - pokreni frontend:
```bash
npm run dev
```
Frontend će biti dostupan na `http://localhost:3000`

**U drugom terminalu** - pokreni backend:
```bash
npm run server
```
Backend API će biti dostupan na `http://localhost:5000`

### 4. Testiraj

Otvori `http://localhost:3000` u browseru i testiraj:
- ✅ Navigacija i sve sekcije
- ✅ Modali sa uslugama (klikni na bilo koju karticu usluge)
- ✅ Kontakt forma (pošalji testnu poruku)
- ✅ Politika privatnosti link u footeru
- ✅ Uvjeti korištenja link u footeru

## 📁 Struktura Projekta

```
enkr-website/
├── index.html              # Glavna stranica
├── privacy-policy.html     # Politika privatnosti
├── terms-of-service.html   # Uvjeti korištenja
├── script.js               # Frontend JavaScript
├── styles.css              # Stilovi
├── server.js               # Backend API server
├── vite.config.js          # Vite konfiguracija
├── package.json            # NPM dependencies
├── .env.example            # Environment variables template
├── DEPLOYMENT.md           # Detaljne deployment upute
└── public/                 # Statički resursi
    └── hero slika.jpg
```

## 🌐 Production Deployment

Za detaljne upute kako deployati projekt na produkciju, pogledaj **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

### Brzi Pregled

1. **Backend** - Deploy na Railway, Render, ili Heroku
2. **Frontend** - Deploy na Vercel, Netlify, ili GitHub Pages
3. Postavi environment variables na oba servisa
4. Verificiraj domenu u Resend (za slanje mailova sa info@enkr.hr)

## 🛠️ Dostupne Skripte

| Skripta | Opis |
|---------|------|
| `npm run dev` | Pokreće Vite development server (port 3000) |
| `npm run build` | Builda projekt za produkciju u `dist/` folder |
| `npm run preview` | Preview production builda lokalno |
| `npm run server` | Pokreće backend API server (port 5000) |
| `npm start` | Alias za `npm run server` (za hosting servise) |

## 📧 Email Konfiguracija

Projekt koristi [Resend](https://resend.com) za slanje emailova iz kontakt forme.

### Za Development

- Možeš koristiti Resend besplatni plan
- Mailovi će se slati sa verificiranog "from" emaila (npr. `onboarding@resend.dev`)

### Za Production

1. Verificiraj svoju domenu u Resend
2. Dodaj DNS zapise koje Resend prikaže
3. Čekaj verifikaciju (~24h)
4. Nakon verifikacije, mailovi će se slati sa `info@enkr.hr`

## 🔧 Troubleshooting

### "RESEND_API_KEY nije postavljen"

**Problem:** Backend server ne može slati mailove.

**Rješenje:** Dodaj `RESEND_API_KEY` u `.env` fajl.

### "Failed to fetch" u browser console

**Problem:** Frontend ne može kontaktirati backend.

**Rješenje:** 
1. Provjeri da backend radi na `http://localhost:5000`
2. Provjeri da je `VITE_API_URL` postavljen u `.env`
3. Restartaj Vite dev server nakon mijenjanja `.env`

### Politika privatnosti/Uvjeti ne otvaraju na produkciji

**Problem:** Build proces nije uključio sve HTML stranice.

**Rješenje:** Provjeri `vite.config.js` - trebao bi imati sve stranice u `rollupOptions.input`.

Za više problema i rješenja, pogledaj **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

## 📝 Features

- ✨ Moderna, responsive web stranica
- 🎨 Gradijent dizajn sa animacijama
- 📱 Mobile-first pristup
- 🔍 SEO optimizirano
- 📧 Kontakt forma sa Resend email integracijom
- 🎭 Modali sa detaljima o uslugama
- 📄 Politika privatnosti i Uvjeti korištenja stranice
- ⚡ Brze performanse (Vite)
- 🔒 Sigurnosne najbolje prakse

## 🤝 Support

Za pitanja ili pomoć:
- 📧 Email: info@enkr.hr
- 📱 Telefon: +385 97 783 39 89

---

Napravio **ENKR** s ❤️

