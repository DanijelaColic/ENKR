# 🔧 Brzo Rješenje za Deployment Probleme

## ✅ Što je Popravljeno

### 1. **API Endpoint Problem** ✅
- **Problem:** Hardcoded `localhost:5000` u `script.js` - nije radio na produkciji
- **Rješenje:** Sada koristi environment varijablu `VITE_API_URL` koja se može postaviti posebno za development i production

### 2. **Environment Variables** ✅
- **Dodano:** `.env.example` fajl sa svim potrebnim varijablama
- **Potrebno:** Kreiraj `.env` fajl i dodaj:
  ```env
  VITE_API_URL=http://localhost:5000  # Za local
  RESEND_API_KEY=your_key_here
  ```

### 3. **Multi-Page Build** ✅
- **Problem:** Vite nije buildao `privacy-policy.html` i `terms-of-service.html`
- **Rješenje:** Ažuriran `vite.config.js` da uključi sve HTML stranice

### 4. **Deployment Konfiguracija** ✅
- **Dodano:** `vercel.json` za Vercel deployment
- **Dodano:** `netlify.toml` za Netlify deployment
- **Dodano:** `DEPLOYMENT.md` sa detaljnim uputama

## 🚀 Što Trebaš Napraviti Sada

### Za Lokalni Development (Testiranje)

1. **Kreiraj `.env` fajl:**
   ```bash
   cp .env.example .env
   ```

2. **Dodaj Resend API key u `.env`:**
   ```env
   RESEND_API_KEY=re_your_api_key_here
   ```
   
   Dobiti key na: https://resend.com/api-keys

3. **Testiraj lokalno:**
   ```bash
   # Terminal 1 - Frontend
   npm run dev
   
   # Terminal 2 - Backend
   npm run server
   ```

4. **Otvori `http://localhost:3000` i testiraj:**
   - ✅ Klikni na kartice usluga (trebaju otvoriti modale)
   - ✅ Klikni na "Politika privatnosti" u footeru
   - ✅ Klikni na "Uvjeti korištenja" u footeru
   - ✅ Pošalji testnu poruku kroz kontakt formu

### Za Production Deployment

#### Korak 1: Deploy Backend

**Opcija A: Railway (Preporučeno - Besplatno)**

1. Idi na [railway.app](https://railway.app)
2. Klikni "New Project" → "Deploy from GitHub repo"
3. Odaberi svoj repo
4. Dodaj environment variable:
   - `RESEND_API_KEY` = tvoj Resend API key
5. **Kopiraj generirani URL** (npr. `https://enkr-backend.railway.app`)

**Opcija B: Render**

1. Idi na [render.com](https://render.com)
2. New Web Service → Connect GitHub repo
3. Build Command: `npm install`
4. Start Command: `npm run server`
5. Dodaj env variable: `RESEND_API_KEY`
6. **Kopiraj generirani URL**

#### Korak 2: Deploy Frontend

**Opcija A: Vercel (Preporučeno)**

1. Instaliraj Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Build i deploy:
   ```bash
   npm run build
   vercel --prod
   ```

3. **VAŽNO:** Postavi environment variable u Vercel Dashboard:
   - Ime: `VITE_API_URL`
   - Vrijednost: Backend URL iz koraka 1 (npr. `https://enkr-backend.railway.app`)

4. Redeploy nakon dodavanja env variable

**Opcija B: Netlify**

1. Instaliraj Netlify CLI:
   ```bash
   npm i -g netlify-cli
   ```

2. Build i deploy:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

3. **VAŽNO:** U Netlify Dashboard → Environment Variables:
   - Dodaj: `VITE_API_URL` = tvoj backend URL

4. Redeploy

#### Korak 3: Verificiraj Domenu za Emailove (Opciono ali Preporučeno)

1. Idi na [resend.com/domains](https://resend.com/domains)
2. Dodaj domenu `enkr.hr`
3. Dodaj DNS zapise koje Resend prikaže
4. Čekaj verifikaciju (~24h)
5. Nakon verifikacije, emailovi će se slati sa `info@enkr.hr`

## 🧪 Testiranje Produkcije

Nakon deploymenta, testiraj:

1. **Backend Health Check:**
   ```
   https://your-backend-url.com/api/health
   ```
   Trebao bi vratiti: `{"status":"ok"}`

2. **Frontend:**
   - Otvori deployed URL
   - Provjeri da sve stranice rade
   - Testiraj kontakt formu
   - Provjeri da li mail stiže na info@enkr.hr

## ❗ Najčešći Problemi

### Problem: Kontakt forma ne radi na produkciji

**Uzrok:** `VITE_API_URL` nije postavljen ili nije ispravan.

**Rješenje:**
1. Provjeri da je `VITE_API_URL` postavljen u Vercel/Netlify environment variables
2. Vrijednost mora biti točan backend URL (bez trailing slash-a)
3. Rebuild i redeploy frontend nakon dodavanja env variable

### Problem: "Failed to fetch" greška

**Uzrok:** Backend nije dostupan ili CORS problem.

**Rješenje:**
1. Testiraj backend: otvori `https://your-backend-url.com/api/health`
2. Ako backend ne radi, provjeri backend logs
3. Provjeri da je `RESEND_API_KEY` postavljen u backend env variables

### Problem: Politika privatnosti vraća 404

**Uzrok:** Build nije uključio te stranice.

**Rješenje:**
1. Provjeri `vite.config.js` - trebao bi imati sve stranice
2. Lokalno testiraj: `npm run build` i `npm run preview`
3. Ako radi lokalno, redeploy frontend

## 📞 Pomoć

Za dodatnu pomoć, pročitaj detaljne upute u **[DEPLOYMENT.md](./DEPLOYMENT.md)**

---

**Važno:** Nakon svakog dodavanja environment varijable, moraš rebuild-ati i redeploy-ati aplikaciju!
