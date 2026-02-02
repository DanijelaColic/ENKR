# Sitemap.xml Fix - Rješenje 404 Greške

## Problem
Google Search Console je prijavljivao 404 grešku prilikom pokušaja pristupa `https://enkr.hr/sitemap.xml`.

## Uzrok
`sitemap.xml` i `robots.txt` su bili u root folderu projekta, ali Vite build proces kopira samo sadržaj iz `/public/` foldera u root build-a. Stoga datoteke nisu bile dostupne na produkciji.

## Rješenje ✅
Premještene su obje datoteke u `/public/` folder:
- `/public/sitemap.xml` ✅
- `/public/robots.txt` ✅

## Kako Vite Radi
Vite automatski kopira sve datoteke iz `/public/` foldera u root `dist/` foldera tijekom build procesa. To znači da će:
- `public/sitemap.xml` → `dist/sitemap.xml` (dostupno na `https://enkr.hr/sitemap.xml`)
- `public/robots.txt` → `dist/robots.txt` (dostupno na `https://enkr.hr/robots.txt`)

## Sljedeći Koraci

1. **Deploy najnovije promjene:**
   ```bash
   npm run build
   # Zatim deploy na Vercel/Netlify
   ```

2. **Provjeri da li radi:**
   - Otvori `https://enkr.hr/sitemap.xml` u browseru
   - Trebao bi vidjeti XML sadržaj
   - Otvori `https://enkr.hr/robots.txt`
   - Trebao bi vidjeti robots.txt sadržaj

3. **U Google Search Console:**
   - Idi na Sitemaps sekciju
   - Pokušaj ponovno submitati sitemap
   - Ili jednostavno sačekaj da Google automatski otkrije sitemap (može potrajati nekoliko dana)

## Provjera Lokalno

Možeš provjeriti lokalno:
```bash
npm run build
npm run preview
# Otvori http://localhost:4173/sitemap.xml
```

## Napomene

- **Root folder datoteke:** `sitemap.xml` i `robots.txt` su još uvijek u root folderu za development, ali za produkciju se koriste one iz `/public/` foldera
- **Ažuriranje sitemapa:** Kada dodaješ nove stranice, ažuriraj `/public/sitemap.xml` i datum `lastmod`
- **Build proces:** Vite automatski kopira `/public/` folder, nema potrebe za dodatnom konfiguracijom
