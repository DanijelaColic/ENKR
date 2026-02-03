# Google Analytics 4 - Troubleshooting "Prikupljanje podataka nije aktivno"

## 🔍 Problem
Google Analytics prikazuje upozorenje: **"Prikupljanje podataka nije aktivno za vašu web-lokaciju"**

## ✅ Kod je Implementiran
- ✅ Measurement ID: `G-P1Y5DGMX35` je ispravno dodan
- ✅ GA4 kod je u `<head>` sekciji svih stranica
- ✅ Cookie consent sistem je integritan

## ❓ Zašto Google Ne Vidi Podatke?

### 1. **Stranica nije deployana s novim kodom** (najvjerojatnije)
**Problem:** Kod je u lokalnom projektu, ali nije na produkciji.

**Rješenje:**
```bash
npm run build
# Zatim deploy na Vercel/Netlify
```

**Provjera:**
- Otvori `https://enkr.hr` u browseru
- View Page Source (Ctrl+U)
- Traži `G-P1Y5DGMX35` - trebao bi biti u kodu

---

### 2. **Korisnici ne prihvaćaju kolačiće**
**Problem:** GA4 je onemogućen dok korisnik ne prihvati sve kolačiće (GDPR compliance).

**Rješenje:**
- Korisnici moraju kliknuti "Prihvati sve" na cookie banneru
- Ako kliknu "Samo nužni" ili "Odbij", GA4 neće raditi

**Test:**
1. Otvori stranicu u incognito modu
2. Klikni "Prihvati sve"
3. Provjeri Google Analytics Real-Time report

---

### 3. **Google još nije detektirao aktivnost**
**Problem:** Google Analytics može potrajati 24-48 sati da detektira aktivnost.

**Rješenje:**
- Sačekaj 24-48 sati
- Koristi Real-Time report za trenutnu provjeru

---

### 4. **URL Mismatch**
**Problem:** U Google Analytics Stream URL je `https://www.enkr.hr` (s www), ali možda koristiš `https://enkr.hr` (bez www).

**Rješenje:**
- Ovo ne bi trebalo biti problem (isti su domeni)
- Ali provjeri u Google Analytics Settings → Data Streams → ENKR
- Ažuriraj Stream URL ako je potrebno

---

## 🧪 Kako Testirati da Radi

### Test 1: Provjeri je li kod na produkciji
1. Otvori `https://enkr.hr` u browseru
2. View Page Source (Ctrl+U ili Cmd+U)
3. Traži `G-P1Y5DGMX35`
4. **Ako ne vidiš kod:** Stranica nije deployana s novim kodom

### Test 2: Browser Console Test
1. Otvori `https://enkr.hr` u browseru
2. Otvori DevTools (F12) → Console tab
3. Obriši localStorage: `localStorage.clear()`
4. Refresh stranicu
5. Klikni "Prihvati sve" na cookie banneru
6. Trebao bi vidjeti: `📊 Analytics initialized (all cookies accepted)`

### Test 3: Network Tab Test
1. Otvori `https://enkr.hr` u browseru
2. Otvori DevTools (F12) → Network tab
3. Filtriraj po "collect" ili "gtag"
4. Obriši localStorage i refresh
5. Klikni "Prihvati sve"
6. Trebao bi vidjeti zahtjeve prema `google-analytics.com/collect`

### Test 4: Google Analytics Real-Time Report
1. Idi na https://analytics.google.com
2. Odaberi property "ENKR"
3. Idi na "Reports" → "Real-time"
4. Otvori `https://enkr.hr` u novom tabu
5. Klikni "Prihvati sve" na cookie banneru
6. Sačekaj 30-60 sekundi
7. Trebao bi vidjeti aktivnost u Real-Time reportu

---

## 🚀 Quick Fix - Test Mode (Za Testiranje)

Ako želiš testirati bez cookie consent-a (samo za testiranje), možeš privremeno omogućiti GA4:

**U `index.html`, zamijeni:**
```javascript
gtag('consent', 'default', {
  'analytics_storage': 'denied',  // ← Promijeni u 'granted'
  'ad_storage': 'denied'          // ← Promijeni u 'granted'
});
```

**NAPOMENA:** Vrati natrag na 'denied' nakon testiranja za GDPR compliance!

---

## ✅ Checklist

- [ ] **Deploy najnovije promjene na produkciju**
- [ ] **Provjeri da je kod na produkciji** (View Page Source)
- [ ] **Testiraj u incognito modu** (cookie banner → "Prihvati sve")
- [ ] **Provjeri Browser Console** (`📊 Analytics initialized`)
- [ ] **Provjeri Network Tab** (zahtjevi prema google-analytics.com)
- [ ] **Provjeri Google Analytics Real-Time report**
- [ ] **Sačekaj 24-48 sati** ako ništa ne radi

---

## 📊 Očekivani Rezultati

### Ako sve radi:
- ✅ Browser Console: `📊 Analytics initialized`
- ✅ Network Tab: Zahtjevi prema `google-analytics.com/collect`
- ✅ Google Analytics Real-Time: Aktivnost se pojavljuje u 30-60 sekundi
- ✅ Upozorenje nestaje nakon 24-48 sati

### Ako ne radi:
- ❌ Provjeri je li kod deployan
- ❌ Provjeri je li korisnik prihvatio kolačiće
- ❌ Provjeri Browser Console za greške
- ❌ Provjeri Network Tab za blokirane zahtjeve

---

## 🔧 Alternativno Rješenje (Ako Consent Mode Ne Radi)

Ako consent mode ne radi kako treba, možeš koristiti jednostavniji pristup:

**U `index.html`, zamijeni GA4 kod sa:**
```html
<!-- Google Analytics (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-P1Y5DGMX35"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  
  // Initialize only if cookies accepted
  if (localStorage.getItem('cookieConsent') === 'true') {
    gtag('config', 'G-P1Y5DGMX35', {
      'anonymize_ip': true
    });
  }
</script>
```

**U `script.js`, ažuriraj `initializeGoogleAnalytics()`:**
```javascript
function initializeGoogleAnalytics() {
  if (hasAcceptedAllCookies()) {
    if (typeof gtag !== 'undefined') {
      gtag('config', 'G-P1Y5DGMX35', {
        'anonymize_ip': true
      });
    }
  }
}
```

---

**Najvažnije:** Provjeri je li kod deployan na produkciju! 🚀
