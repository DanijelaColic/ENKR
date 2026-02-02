# SEO - Sljedeći Koraci - Akcijski Plan

## 🎯 Prioritet 1 - Hitno (Napravi odmah)

### 1. Google Search Console Setup ⏱️ 15 min
**Zašto:** Omogućava praćenje performansi u Google pretrazi i submitanje sitemapa.

**Koraci:**
1. Idi na https://search.google.com/search-console
2. Dodaj svojstvo (dodaj domenu `enkr.hr`)
3. Verificiraj vlasništvo (preko DNS-a ili HTML tag-a)
4. **VAŽNO:** Deploy-aj najnovije promjene (sitemap.xml i robots.txt su sada u `/public` folderu)
5. Submitaj sitemap: `https://enkr.hr/sitemap.xml`
6. Provjeri coverage i indexing status

**Rezultat:** Google će početi indeksirati tvoju stranicu i možeš pratiti performanse.

**NAPOMENA:** ✅ `sitemap.xml` i `robots.txt` su premješteni u `/public/` folder tako da će biti dostupni na produkciji nakon deploya.

---

### 2. Google Analytics 4 (GA4) Implementacija ⏱️ 30 min
**Zašto:** Praćenje posjećenosti, konverzija i korisničkog ponašanja.

**Koraci:**
1. Kreiraj GA4 property na https://analytics.google.com
2. Dobij Measurement ID (format: `G-XXXXXXXXXX`)
3. Dodaj GA4 kod u `index.html` (dodat ću kod ispod)
4. Testiraj da li radi

**Kod za dodati u `<head>` sekciju svih stranica:**
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Napomena:** Već imaš cookie consent banner, tako da će GA4 raditi samo ako korisnik prihvati sve kolačiće.

---

### 3. Testiranje SEO Elementa ⏱️ 20 min
**Zašto:** Provjera da sve radi kako treba.

**Testiraj:**
- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results) - provjeri strukturirane podatke
- [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) - provjeri OG sliku
- [ ] [Twitter Card Validator](https://cards-dev.twitter.com/validator) - provjeri Twitter Card
- [ ] [PageSpeed Insights](https://pagespeed.web.dev/) - provjeri performanse
- [ ] [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) - provjeri mobilnu verziju

---

## 🚀 Prioritet 2 - Važno (Napravi ovaj tjedan)

### 4. Breadcrumb Navigation Schema ⏱️ 15 min
**Zašto:** Poboljšava navigaciju i SEO.

**Dodati u `index.html` (u `<head>` sekciju):**
```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Početna",
    "item": "https://enkr.hr/"
  }, {
    "@type": "ListItem",
    "position": 2,
    "name": "Usluge",
    "item": "https://enkr.hr/#services"
  }, {
    "@type": "ListItem",
    "position": 3,
    "name": "Cjenik",
    "item": "https://enkr.hr/cjenik.html"
  }]
}
</script>
```

---

### 5. Poboljšanje Internih Linkova ⏱️ 30 min
**Zašto:** Pomaže Google-u da bolje razumije strukturu stranice.

**Dodati više internih linkova:**
- U footeru dodati linkove na ključne stranice
- U tekstu dodati linkove na relevantne sekcije (npr. "Naše usluge" → link na `#services`)
- Dodati "Povezani članci" ili "Slične stranice" sekcije

**Primjer:** U sekciji "O nama" dodati link na "Naše usluge" ili "Kontaktirajte nas".

---

### 6. Performance Optimizacija ⏱️ 1h
**Zašto:** Brže stranice = bolji SEO ranking.

**Optimizacije:**
1. **Slike:**
   - Konvertuj `hero slika.jpg` u WebP format
   - Optimizuj OG sliku (kompresija)
   - Dodaj `width` i `height` atribute na slike za layout shift prevention

2. **CSS/JS:**
   - Minifikacija u build procesu (Vite već radi ovo)
   - Dodaj `preload` za kritične resurse:
     ```html
     <link rel="preload" href="styles.css" as="style">
     <link rel="preload" href="script.js" as="script">
     ```

3. **Fonts:**
   - Ako koristiš custom fontove, dodaj `font-display: swap`

---

### 7. Dodati više Keywords u Sadržaj ⏱️ 1h
**Zašto:** Poboljšava ranking za ciljane keywords.

**Keywords za fokus:**
- "web stranice Hrvatska"
- "e-commerce rješenja"
- "booking sustavi"
- "web development agencija"
- "digitalne usluge"

**Dodati u:**
- Hero sekciju
- Service descriptions
- About sekciju
- Meta descriptions

**Napomena:** Ne prekomjeravaj - prirodno uključi u postojeći tekst.

---

## 📈 Prioritet 3 - Dugoročno (Sljedeći mjesec)

### 8. Content Marketing / Blog ⏱️ Kontinuirano
**Zašto:** Svježi sadržaj = bolji SEO ranking.

**Ideje za blog postove:**
- "Kako odabrati pravu web agenciju?"
- "10 stvari koje treba znati prije izrade web stranice"
- "E-commerce vs. Web Shop - što je razlika?"
- "Booking sustavi za frizerske salone - vodič"
- "SEO optimizacija za male biznise"

**Kreiraj:**
- `/blog/` sekciju
- RSS feed
- Kategorije i tagove

---

### 9. Local SEO (ako imaš fizičku lokaciju) ⏱️ 2h
**Zašto:** Ako imaš fizičku lokaciju, ovo je ključno za lokalne pretrage.

**Koraci:**
1. Google My Business profil
2. Dodaj LocalBusiness schema u JSON-LD
3. NAP (Name, Address, Phone) konzistentnost na svim platformama
4. Lokalni direktoriji (Yellow Pages, Yelp, itd.)

---

### 10. Backlinks Strategija ⏱️ Kontinuirano
**Zašto:** Kvalitetni backlinks = veći autoritet = bolji ranking.

**Strategije:**
- Guest posting na relevantnim blogovima
- Sudjelovanje u lokalnim direktorijima
- Partnerstva s drugim agencijama
- Kreiranje shareable contenta (infografike, vodiči)

---

## ✅ Checklist - Što je Već Gotovo

- ✅ Meta tagovi (title, description, keywords)
- ✅ Open Graph tagovi
- ✅ Twitter Card tagovi
- ✅ Canonical URLs
- ✅ Strukturirani podaci (JSON-LD) - Organization, WebSite, Service
- ✅ robots.txt
- ✅ sitemap.xml
- ✅ OG slika
- ✅ Poboljšani alt tekstovi
- ✅ Cookie consent banner (spreman za GA4)

---

## 🎯 Quick Wins (Možeš napraviti danas)

1. **Dodaj preload za kritične resurse** (5 min)
2. **Testiraj stranicu na PageSpeed Insights** (10 min)
3. **Provjeri sve meta tagove** (10 min)
4. **Dodaj breadcrumb schema** (15 min)
5. **Submitaj sitemap na Google Search Console** (15 min)

**Ukupno vrijeme: ~1h za sve quick wins**

---

## 📊 Metrije za Praćenje

Nakon implementacije, prati:
- **Google Search Console:**
  - Impressions (koliko puta se stranica pojavila u pretrazi)
  - Clicks (koliko klikova)
  - CTR (Click-Through Rate)
  - Average position

- **Google Analytics:**
  - Sessions
  - Bounce rate
  - Average session duration
  - Conversion rate (kontakt forme)

- **PageSpeed Insights:**
  - Performance score
  - First Contentful Paint (FCP)
  - Largest Contentful Paint (LCP)
  - Cumulative Layout Shift (CLS)

---

## 🔗 Korisni Linkovi

- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Schema.org Documentation](https://schema.org/)

---

## 💡 Savjeti

1. **Ne prekomjeravaj keywords** - Google penalizira keyword stuffing
2. **Fokusiraj se na korisničko iskustvo** - UX = SEO
3. **Redovito ažuriraj sadržaj** - Svježi sadržaj = bolji ranking
4. **Budi strpljiv** - SEO rezultati dolaze kroz vrijeme (2-6 mjeseci)
5. **Prati konkurenciju** - Analiziraj što rade i uči iz toga

---

**Sljedeći korak:** Počni s Prioritetom 1, točnije Google Search Console setup! 🚀
