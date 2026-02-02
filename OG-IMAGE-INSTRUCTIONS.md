# Instrukcije za Kreiranje OG Slike

OG slika (`og-image.jpg`) treba biti 1200x630px i postavljena u `/public/` folder.

## Opcija 1: Automatsko Generiranje (Preporučeno)

1. Instaliraj potrebne pakete:
```bash
npm install canvas
```

2. Pokreni skriptu:
```bash
npm run generate-og
```

Slika će biti automatski generirana u `/public/og-image.jpg`

## Opcija 2: Ručno Kreiranje iz HTML Template-a

1. Otvori `og-image-generator.html` u browseru
2. Koristi jednu od sljedećih metoda:

### Metoda A: Screenshot Tool
- Koristi browser DevTools (F12)
- Postavi viewport na 1200x630px
- Napravi screenshot
- Spremi kao `og-image.jpg` u `/public/` folder

### Metoda B: Online Tool
- Otvori `og-image-generator.html` u browseru
- Koristi online tool kao što je:
  - https://htmlcsstoimage.com/
  - https://www.screenshot.rocks/
- Upload-aj HTML ili napravi screenshot
- Spremi kao `og-image.jpg` u `/public/` folder

### Metoda C: Browser Extension
- Instaliraj browser extension za screenshot (npr. "Full Page Screen Capture")
- Postavi dimenzije na 1200x630px
- Screenshot-aj stranicu
- Spremi kao `og-image.jpg` u `/public/` folder

## Opcija 3: Design Tool (Photoshop, Figma, Canva)

Ako preferiraš design tool:

1. Kreiraj novi dokument: 1200x630px
2. Dodaj gradient pozadinu: #6366f1 → #8b5cf6
3. Dodaj anchor ikonu (⚓) ili koristi logo iz `favicon.svg`
4. Dodaj tekst "ENKR" - bold, veliki font, bijela boja
5. Eksportiraj kao JPG (kvaliteta 90-95%)
6. Spremi kao `og-image.jpg` u `/public/` folder

## Provjera

Nakon kreiranja slike, provjeri:
- [ ] Dimenzije su točno 1200x630px
- [ ] Format je JPG
- [ ] Datoteka je u `/public/og-image.jpg`
- [ ] Veličina datoteke je razumna (< 500KB preporučeno)

## Testiranje

Testiraj OG sliku na:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
