# Performance Optimizacija - PageSpeed Insights

## 📊 Trenutno Stanje

Prema [PageSpeed Insights](https://pagespeed.web.dev/analysis/https-enkr-hr/1z1y57z8jw?form_factor=mobile) rezultatima:
- **Chrome User Experience Report:** Nema dovoljno podataka (stranica je nova ili ima malo posjećenosti)
- To je normalno za nove stranice - podaci će se pojaviti nakon što stranica ima više posjećenosti

---

## ✅ Što je Već Implementirano

### 1. Lazy Loading Slika ✅
```html
<img src="..." loading="lazy" />
```
- Sve slike koriste `loading="lazy"` atribut
- Slike se učitavaju tek kada su potrebne

### 2. Async Script Loading ✅
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-P1Y5DGMX35"></script>
```
- Google Analytics se učitava asinkrono
- Ne blokira render stranice

### 3. Vite Build Optimizacija ✅
- Vite automatski minifikuje CSS/JS u production build-u
- Code splitting i optimizacija resursa

---

## 🚀 Dodane Optimizacije

### 1. Preload Critical Resources ✅
Dodano u `<head>` sekciju:
```html
<link rel="preload" href="styles.css" as="style" />
<link rel="preload" href="script.js" as="script" />
```

**Zašto:** Brže učitavanje kritičnih resursa (CSS i JS).

---

## 📋 Preporuke za Daljnje Optimizacije

### Prioritet 1 - Važno

#### 1. ✅ OG Slika Optimizirana
**Status:** ✅ **ZAVRŠENO**
- **Veličina:** 171KB (prethodno 558KB) - **69% smanjenje!** 🎉
- **Dimenzije:** 1200x630px (ispravno za OG slike)
- **Format:** PNG
- **Preporuka:** < 200KB ✅ (cilj postignut!)

**Napomena:** OG slika se učitava samo kada se stranica dijeli na društvenim mrežama, ne na svakoj stranici, tako da ovo poboljšanje direktno utječe na brzinu dijeljenja.

---

#### 2. Optimiziraj Slike (WebP Format) ⏱️ 1h
**Problem:** Slike s Unsplash-a su vanjski resursi i mogu biti spore.

**Rješenje:**
- Preuzmi slike lokalno
- Konvertuj u WebP format (manja veličina, bolja kvaliteta)
- Koristi `<picture>` element za fallback:
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="..." loading="lazy">
</picture>
```

**Alati:**
- [Squoosh](https://squoosh.app/) - online image optimizer
- [ImageOptim](https://imageoptim.com/) - desktop app
- [Sharp](https://sharp.pixelplumbing.com/) - Node.js library

---

#### 2. Dodaj Width i Height na Slike ⏱️ 30 min
**Zašto:** Sprječava Cumulative Layout Shift (CLS).

**Primjer:**
```html
<img 
  src="image.jpg" 
  alt="..." 
  loading="lazy"
  width="800"
  height="600"
/>
```

**Kako:**
- Provjeri dimenzije slika
- Dodaj `width` i `height` atribute
- Koristi CSS za responsive sizing: `width: 100%; height: auto;`

---

#### 3. Font Optimization ⏱️ 30 min
**Problem:** Fontovi se učitavaju tek kada su potrebni.

**Rješenje:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```

**CSS:**
```css
@font-face {
  font-family: 'YourFont';
  src: url('font.woff2') format('woff2');
  font-display: swap; /* ← Važno za performance */
}
```

---

#### 4. Defer Non-Critical JavaScript ⏱️ 15 min
**Problem:** JavaScript može blokirati render.

**Rješenje:**
```html
<script defer src="script.js"></script>
```

**Ili za inline scripts:**
```html
<script>
  // Critical code here
</script>
<script defer src="non-critical.js"></script>
```

---

### Prioritet 2 - Poboljšanja

#### 5. Service Worker / PWA ⏱️ 2h
**Zašto:** Caching i offline funkcionalnost.

**Koraci:**
1. Kreiraj `service-worker.js`
2. Registriraj u `script.js`
3. Cache strategija za statičke resurse

**Rezultat:** Brže učitavanje za povratne posjete.

---

#### 6. CDN za Statičke Resurse ⏱️ 1h
**Zašto:** Brže učitavanje s CDN-a.

**Opcije:**
- Vercel Edge Network (automatski ako koristiš Vercel)
- Cloudflare CDN
- Netlify CDN (automatski ako koristiš Netlify)

---

#### 7. HTTP/2 Server Push ⏱️ 30 min
**Zašto:** Server može "pushati" kritične resurse prije nego što browser zatraži.

**Konfiguracija:**
- Vercel/Netlify automatski podržavaju HTTP/2
- Provjeri server konfiguraciju

---

### Prioritet 3 - Napredno

#### 8. Code Splitting ⏱️ 1h
**Zašto:** Učitaj samo kod koji je potreban.

**Vite već radi ovo automatski**, ali možeš optimizirati:
- Lazy load komponente
- Dynamic imports za velike biblioteke

---

#### 9. Resource Hints ⏱️ 15 min
**Dodaj u `<head>`:**
```html
<!-- DNS prefetch za vanjske domene -->
<link rel="dns-prefetch" href="https://images.unsplash.com">
<link rel="dns-prefetch" href="https://www.googletagmanager.com">

<!-- Preconnect za kritične resurse -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

---

#### 10. Minifikacija HTML ⏱️ 15 min
**Vite automatski minifikuje**, ali provjeri:
- Ukloni komentare u production build-u
- Ukloni whitespace
- Optimiziraj inline CSS/JS

---

## 🎯 Core Web Vitals Ciljevi

### LCP (Largest Contentful Paint)
**Cilj:** < 2.5 sekunde

**Optimizacije:**
- Preload kritičnih resursa
- Optimiziraj slike
- Koristi CDN
- Optimiziraj server response time

---

### FID (First Input Delay)
**Cilj:** < 100 milisekundi

**Optimizacije:**
- Minimiziraj JavaScript execution time
- Code splitting
- Defer non-critical JavaScript
- Optimiziraj third-party scripts

---

### CLS (Cumulative Layout Shift)
**Cilj:** < 0.1

**Optimizacije:**
- Dodaj width/height na slike
- Izbjegavaj dinamicke resize-ove
- Reserve space za ads/embeds
- Koristi font-display: swap

---

## 📊 Monitoring Performansi

### Alati za Praćenje:
1. **Google PageSpeed Insights** - https://pagespeed.web.dev/
2. **Google Search Console** - Core Web Vitals report
3. **Chrome DevTools** - Performance tab
4. **WebPageTest** - https://www.webpagetest.org/
5. **Lighthouse** - Built-in u Chrome DevTools

---

## ✅ Checklist

- [x] Lazy loading slika
- [x] Async script loading
- [x] Preload critical resources
- [x] **OG slika optimizirana (171KB)** ✅
- [ ] Optimiziraj slike (WebP format)
- [ ] Dodaj width/height na slike
- [ ] Font optimization (font-display: swap)
- [x] Defer non-critical JavaScript ✅
- [x] Resource hints (dns-prefetch, preconnect) ✅
- [ ] Service Worker / PWA (opcionalno)
- [ ] CDN setup (opcionalno)

---

## 🚀 Quick Wins (Možeš napraviti danas)

1. **Dodaj preload za kritične resurse** ✅ (Već dodano)
2. **Optimiziraj OG sliku** (provjeri veličinu)
3. **Dodaj width/height na slike** (30 min)
4. **Dodaj resource hints** (15 min)
5. **Testiraj na PageSpeed Insights** (5 min)

**Ukupno vrijeme: ~1h za sve quick wins**

---

## 📚 Korisni Linkovi

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Web Vitals](https://web.dev/vitals/)
- [Vite Performance Guide](https://vitejs.dev/guide/performance.html)
- [Image Optimization Guide](https://web.dev/fast/#optimize-your-images)

---

**Status:** ✅ Osnovne optimizacije su implementirane. **OG slika je optimizirana (171KB - 69% smanjenje)!** Preporučeno je dodati WebP optimizaciju i width/height atribute na slike za najbolje rezultate! 🚀
