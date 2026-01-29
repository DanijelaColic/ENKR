# ENKR - Deployment Upute

## 📋 Pregled

ENKR projekt se sastoji od dva dijela:
1. **Frontend** (Vite + vanilla JavaScript) - statička stranica
2. **Backend** (Node.js + Express) - API za slanje emailova

## 🚀 Deployment Frontend-a

### Opcija 1: Vercel (Preporučeno)

1. **Instaliraj Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login u Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   npm run build
   vercel --prod
   ```

4. **Postavi Environment Variables u Vercel**
   - Idi na Vercel Dashboard → Settings → Environment Variables
   - Dodaj: `VITE_API_URL` = URL tvog backend servera (npr. `https://enkr-backend.railway.app`)

### Opcija 2: Netlify

1. **Instaliraj Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Login u Netlify**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

4. **Postavi Environment Variables**
   - Idi na Netlify Dashboard → Site Settings → Environment Variables
   - Dodaj: `VITE_API_URL` = URL tvog backend servera

### Opcija 3: GitHub Pages (Samo statički sadržaj)

**NAPOMENA:** GitHub Pages podržava samo statički sadržaj. Backend moraš deployati odvojeno.

1. **Dodaj u `vite.config.js`**
   ```javascript
   export default defineConfig({
     base: '/naziv-repo/', // Ime tvog GitHub repo-a
     // ... ostale opcije
   });
   ```

2. **Build i deploy**
   ```bash
   npm run build
   gh-pages -d dist
   ```

## 🖥️ Deployment Backend-a

### Opcija 1: Railway (Preporučeno - besplatno)

1. **Kreiraj račun na [Railway.app](https://railway.app)**

2. **Kreiraj novi projekt**
   - Klikni "New Project"
   - Odaberi "Deploy from GitHub repo"
   - Odaberi svoj repository

3. **Postavi Environment Variables**
   ```
   RESEND_API_KEY=your_resend_api_key_here
   PORT=5000
   ```

4. **Railway će automatski detektirati Node.js i pokrenuti `server.js`**

5. **Kopiraj generirani URL** (npr. `https://enkr-backend.railway.app`)

### Opcija 2: Render (Besplatno)

1. **Kreiraj račun na [Render.com](https://render.com)**

2. **Kreiraj novi Web Service**
   - Connect your GitHub repository
   - Build Command: `npm install`
   - Start Command: `npm run server`

3. **Postavi Environment Variables**
   ```
   RESEND_API_KEY=your_resend_api_key_here
   PORT=5000
   ```

4. **Kopiraj generirani URL**

### Opcija 3: Heroku

1. **Instaliraj Heroku CLI i login**
   ```bash
   heroku login
   ```

2. **Kreiraj Heroku app**
   ```bash
   heroku create enkr-backend
   ```

3. **Postavi environment variables**
   ```bash
   heroku config:set RESEND_API_KEY=your_resend_api_key_here
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

## 🔑 Environment Variables Setup

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com
```

### Backend (.env)
```env
RESEND_API_KEY=your_resend_api_key_here
PORT=5000
```

## 📧 Resend API Key

1. Idi na [resend.com](https://resend.com)
2. Kreiraj račun ili login
3. Idi na API Keys
4. Kreiraj novi API key
5. Kopiraj key i dodaj u backend `.env`

**VAŽNO:** Za produkciju moraš verificirati domenu u Resend!
- Idi na Domains u Resend dashboard
- Dodaj svoju domenu (npr. enkr.hr)
- Dodaj DNS zapise koje Resend prikaže
- Čekaj verifikaciju (~24h)
- Nakon verifikacije, možeš slati mailove sa info@enkr.hr

## ✅ Testiranje nakon Deployment-a

1. **Testiraj frontend**
   - Otvori deployed URL
   - Provjeri da se sve stranice otvaraju:
     - Početna stranica
     - Politika privatnosti
     - Uvjeti korištenja
   - Provjeri da se modali sa uslugama otvaraju

2. **Testiraj backend**
   - Provjeri health endpoint: `https://your-backend-url.com/api/health`
   - Trebao bi vratiti: `{"status":"ok"}`

3. **Testiraj kontakt formu**
   - Popuni kontakt formu na deployed stranici
   - Provjeri da li mail stigne na info@enkr.hr
   - Provjeri browser console za greške

## 🔧 Najčešći Problemi i Rješenja

### Problem: Kontakt forma ne radi na live verziji

**Uzrok:** Frontend ne može dohvatiti backend zbog CORS-a ili pogrešnog API URL-a.

**Rješenje:**
1. Provjeri da je `VITE_API_URL` postavljen u frontend environment variables
2. Provjeri da backend dozvoljava CORS (već je implementirano u `server.js`)
3. Provjeri browser console za točnu grešku

### Problem: Politika privatnosti i Uvjeti korištenja ne otvaraju

**Uzrok:** Build proces nije uključio te HTML stranice.

**Rješenje:**
- Provjeri `vite.config.js` - trebao bi sadržavati sve HTML stranice u `build.rollupOptions.input`
- Rebuild: `npm run build`
- Redeploy

### Problem: Backend ne šalje mailove

**Uzrok:** Resend API key nije postavljen ili domena nije verificirana.

**Rješenje:**
1. Provjeri da je `RESEND_API_KEY` postavljen u backend environment variables
2. Provjeri backend logs za specifične greške
3. Ako koristiš svoju domenu (info@enkr.hr), provjeri da je domena verificirana u Resend

### Problem: "Failed to fetch" greška u browser console

**Uzrok:** Frontend ne može kontaktirati backend.

**Rješenje:**
1. Provjeri da backend radi: otvori `https://your-backend-url.com/api/health`
2. Provjeri da je `VITE_API_URL` točno postavljen
3. Rebuild frontend nakon postavljanja env varijabli

## 📝 Deployment Checklist

- [ ] Backend deployed i radi (testiraj `/api/health`)
- [ ] `RESEND_API_KEY` postavljen u backend env variables
- [ ] Domena verificirana u Resend (ako koristiš custom domenu)
- [ ] `VITE_API_URL` postavljen u frontend env variables (mora biti backend URL)
- [ ] Frontend buildan: `npm run build`
- [ ] Frontend deployed
- [ ] Sve stranice se otvaraju (index, privacy-policy, terms-of-service)
- [ ] Modali sa uslugama rade
- [ ] Kontakt forma radi i mail stiže na info@enkr.hr

## 🆘 Support

Ako imaš problema, provjeri:
1. Browser console za frontend greške
2. Backend logs za server greške
3. Network tab u browser dev tools za API pozive

---

**Sretno s deployment-om! 🚀**
