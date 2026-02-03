# Google Analytics 4 (GA4) - Setup i Implementacija

## ✅ Što je Implementirano

Google Analytics 4 je uspješno implementiran na sve glavne stranice s GDPR-compliant cookie consent sistemom.

### Implementirane Stranice:
- ✅ `index.html` - Glavna stranica
- ✅ `cjenik.html` - Stranica cjenika
- ✅ `besplatna-verzija.html` - Landing stranica

### Measurement ID:
```
G-P1Y5DGMX35
```

---

## 🔒 GDPR Compliance

Google Analytics je implementiran s **cookie consent sistemom**:

### Kako Radi:
1. **Početno stanje:** GA4 se učitava ali je **onemogućen** (consent mode: denied)
2. **Kada korisnik prihvati sve kolačiće:** GA4 se aktivira i počinje pratiti
3. **Kada korisnik odbije ili prihvati samo nužne:** GA4 ostaje onemogućen

### Consent Mode:
- `analytics_storage: 'denied'` - početno stanje
- `analytics_storage: 'granted'` - kada korisnik prihvati sve kolačiće
- `analytics_storage: 'denied'` - kada korisnik odbije ili prihvati samo nužne

---

## 📊 Kako Provjeriti da Radi

### 1. Browser Console
Otvori browser DevTools (F12) i provjeri console:
- Ako korisnik **prihvati sve kolačiće:** Trebao bi vidjeti `📊 Analytics initialized (all cookies accepted)`
- Ako korisnik **odbije kolačiće:** Trebao bi vidjeti `📊 Analytics disabled`

### 2. Google Analytics Real-Time Report
1. Idi na https://analytics.google.com
2. Odaberi property "ENKR"
3. Idi na "Reports" → "Real-time"
4. Otvori stranicu u novom tabu i prihvati sve kolačiće
5. Trebao bi vidjeti aktivnost u real-time reportu (može potrajati 30-60 sekundi)

### 3. Network Tab
1. Otvori browser DevTools → Network tab
2. Filtriraj po "collect" ili "gtag"
3. Kada korisnik prihvati kolačiće, trebao bi vidjeti zahtjeve prema `google-analytics.com`

---

## 🧪 Testiranje

### Test Scenarij 1: Korisnik prihvati sve kolačiće
1. Otvori stranicu u incognito modu (ili obriši localStorage)
2. Klikni "Prihvati sve" na cookie banneru
3. Provjeri console: `📊 Analytics initialized`
4. Provjeri Google Analytics Real-Time report

### Test Scenarij 2: Korisnik odbije kolačiće
1. Otvori stranicu u incognito modu
2. Klikni "Odbij" na cookie banneru
3. Provjeri console: `📊 Analytics disabled`
4. Provjeri Network tab - ne bi trebalo biti zahtjeva prema GA4

### Test Scenarij 3: Korisnik već ima prihvaćene kolačiće
1. Otvori stranicu (bez cookie bannera)
2. Provjeri console: `📊 Analytics initialized`
3. GA4 bi trebao raditi automatski

---

## 🔧 Tehnički Detalji

### Implementacija u HTML:
```html
<!-- Google Analytics (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-P1Y5DGMX35"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  
  // Consent mode - početno onemogućen
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied'
  });
  
  gtag('config', 'G-P1Y5DGMX35', {
    'anonymize_ip': true,
    'cookie_flags': 'SameSite=None;Secure'
  });
</script>
```

### Aktivacija u script.js:
```javascript
function initializeGoogleAnalytics() {
  if (hasAcceptedAllCookies()) {
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });
    }
  }
}
```

---

## 📈 Što GA4 Prati

### Automatski Eventi:
- **Page views** - svaki put kada korisnik otvori stranicu
- **Scroll depth** - koliko korisnik skrola
- **Click events** - klikovi na linkove i gumbove
- **Form submissions** - slanje kontakt forme

### Custom Eventi (mogu se dodati):
- Button clicks (npr. "Besplatan nacrt web stranice")
- Form interactions
- Video plays (ako imaš video)
- Download events

---

## 🎯 Sljedeći Koraci

### 1. Setup Goals/Conversions (Preporučeno)
U Google Analytics, postavi conversion goals:
- Kontakt forma submission
- "Besplatan nacrt" klik
- Cjenik stranica posjeta

### 2. Custom Events (Opcionalno)
Dodaj custom evente za važne akcije:
```javascript
gtag('event', 'button_click', {
  'button_name': 'besplatan_nacrt',
  'button_location': 'hero_section'
});
```

### 3. Enhanced E-commerce (Ako imaš e-commerce)
Ako u budućnosti dodaš e-commerce, možeš pratiti:
- Product views
- Add to cart
- Checkout steps
- Purchases

---

## ⚠️ Važne Napomene

### Privacy Policy
U `privacy-policy.html` već postoji spomen Google Analytics-a:
```html
<p>Koristimo Google Analytics za analizu posjeta.</p>
```

### Anonymize IP
GA4 je konfiguriran s `anonymize_ip: true` za bolju privatnost korisnika.

### Cookie Flags
Korišten je `SameSite=None;Secure` za cross-site tracking (ako je potrebno).

---

## 🐛 Troubleshooting

### Problem: GA4 ne prati posjete
**Rješenje:**
1. Provjeri je li korisnik prihvatio sve kolačiće
2. Provjeri browser console za greške
3. Provjeri Network tab - trebao bi vidjeti zahtjeve prema `google-analytics.com`
4. Provjeri je li Measurement ID ispravan: `G-P1Y5DGMX35`

### Problem: Cookie banner se ne prikazuje
**Rješenje:**
1. Obriši localStorage: `localStorage.clear()`
2. Refresh stranicu
3. Cookie banner bi se trebao pojaviti

### Problem: GA4 radi iako korisnik nije prihvatio kolačiće
**Rješenje:**
1. Provjeri `initializeGoogleAnalytics()` funkciju
2. Provjeri `hasAcceptedAllCookies()` funkciju
3. Provjeri consent mode postavke

---

## 📚 Korisni Linkovi

- [Google Analytics Dashboard](https://analytics.google.com)
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Consent Mode Guide](https://developers.google.com/tag-platform/devguides/consent)
- [GDPR Compliance](https://support.google.com/analytics/answer/9019185)

---

## ✅ Checklist

- [x] GA4 kod dodan u `<head>` sekciju svih stranica
- [x] Cookie consent sistem integritan
- [x] Consent mode konfiguriran
- [x] Anonymize IP omogućen
- [x] Testiranje u browser console
- [ ] Testiranje u Google Analytics Real-Time report
- [ ] Setup conversion goals
- [ ] Custom events (opcionalno)

---

**Status:** ✅ Google Analytics 4 je implementiran i spreman za korištenje!

**Sljedeći korak:** Testiraj u Google Analytics Real-Time reportu i postavi conversion goals! 🚀
