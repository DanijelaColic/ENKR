# Smjernice za prilagodbu ENKR email templatea

## Vizualni identitet

### Boje (HEX)
- **Primarna boja:** `#6366f1` (indigo) - za CTA gumbove i akcentne elemente
- **Sekundarna boja:** `#8b5cf6` (purple) - za gradijente i dodatne akcente
- **Tamni tekst:** `#1f2937` - za naslove i važan tekst
- **Svijetli tekst:** `#6b7280` - za opise i sekundarni tekst
- **Pozadina:** `#ffffff` (bijela) za glavni sadržaj, `#f9fafb` za wrapper
- **Border:** `#e5e7eb` - za razdjelnike i okvire

### Tipografija
- **Font porodica:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
- **Email-safe fontovi:** Koriste se system fontovi koji su podržani u svim email klijentima
- **Font weights:** 600 (semi-bold) za naslove, 700 (bold) za CTA, 400 (regular) za tekst
- **Line height:** 1.6 za čitljivost

### Stil CTA gumba
- **Pozadina:** `#6366f1` (primarna boja)
- **Tekst:** Bijeli (`#ffffff`)
- **Padding:** `14px 32px`
- **Border radius:** `8px`
- **Font weight:** `600`
- **Font size:** `16px`

### Opći ton komunikacije
- **Profesionalan:** Koristite jasne, konkretne formulacije
- **Prijateljski:** Neformalni, ali ne previše opušteni
- **B2B fokus:** Naglasite vrijednost i ROI za poslovanje
- **Jasno i direktno:** Izbjegavajte žargon, fokusirajte se na korisnost

---

## Kako prilagoditi template za različite ponude

### 1. Promjena naslova

**Pronađite:**
```html
<h1 style="...">Naslov vaše ponude</h1>
```

**Primjeri:**
- **Besplatni nacrt:** "Besplatna izrada prvog nacrta vaše web stranice"
- **E-commerce ponuda:** "Pokrenite online prodaju s našim e-commerce rješenjem"
- **Booking sustav:** "Automatizirajte rezervacije i uštedite vrijeme"
- **SEO usluga:** "Povećajte vidljivost vaše web stranice u Google pretraživanju"

**Najbolje prakse:**
- Maksimalno 8-10 riječi
- Koristite glagole akcije (pokrenite, povećajte, automatizirajte)
- Naglasite glavnu vrijednost

---

### 2. Prilagodba opisa

**Pronađite:**
```html
<p style="...">Kratki opis usluge ili ponude...</p>
```

**Struktura opisa:**
1. **Problem** (1 rečenica) - Što klijent rješava?
2. **Rješenje** (1-2 rečenice) - Kako vaša usluga pomaže?
3. **Rezultat** (1 rečenica) - Što će klijent dobiti?

**Primjer za besplatni nacrt:**
```html
<p style="...">
  Nema potrebe za kupnjom na slijepo. Nakon ispunjavanja kratkog upitnika i odabira željenog stila, 
  prvi nacrt weba stiže na vaš email u roku od 48 sati. Bez obaveza.
</p>
```

**Primjer za e-commerce:**
```html
<p style="...">
  Kompletna e-commerce rješenja za online prodaju s modernim funkcionalnostima i jednostavnim upravljanjem. 
  Integrirani platni sustavi, automatsko upravljanje zalihama i SEO optimizacija uključeni.
</p>
```

**Najbolje prakse:**
- Maksimalno 3-4 rečenice
- Koristite konkretne brojke i rokove gdje je moguće
- Fokusirajte se na korisnost, ne na značajke

---

### 3. Promjena CTA gumba

**Pronađite:**
```html
<a href="..." style="...">Poziv na akciju</a>
```

**Tekst CTA gumba:**
- **Akcijski glagol + predmet:** "Započni besplatnu izradu", "Pogledaj cjenik", "Rezerviraj konsultaciju"
- **Kratko i jasno:** Maksimalno 3-4 riječi
- **Urgentnost (opcionalno):** "Započni danas", "Ograničena ponuda"

**Primjeri:**
- "Započni besplatnu izradu →"
- "Pogledaj cjenik"
- "Rezerviraj konsultaciju"
- "Preuzmi vodič"
- "Kontaktiraj nas"

**Promjena linka:**
```html
<a href="https://www.enkr.hr/besplatna-verzija.html" style="...">
```

**Najbolje prakse:**
- Koristite direktan link na landing stranicu
- Izbjegavajte generičke tekstove poput "Klikni ovdje"
- Dodajte strelicu (→) za vizualni naglasak ako želite

---

### 4. Dodavanje dodatnih elemenata

#### Benefit liste (opcionalno)

Dodajte između opisa i CTA gumba:

```html
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
  <tr>
    <td style="padding-bottom: 24px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="padding-bottom: 12px;">
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #1f2937;">
              ✓ Potpuno besplatno - bez skrivenih troškova
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: 12px;">
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #1f2937;">
              ⚡ Brza isporuka - prvi nacrt u roku od 48 sati
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #1f2937;">
              🔓 Bez obaveza - naknadno odlučite o nastavku
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```

#### Slika (opcionalno)

Dodajte između naslova i opisa:

```html
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
  <tr>
    <td style="padding-bottom: 24px; text-align: center;">
      <img src="https://www.enkr.hr/og-image.png" alt="ENKR - Digitalne usluge" width="520" height="auto" style="max-width: 100%; height: auto; border-radius: 8px; display: block; margin: 0 auto;">
    </td>
  </tr>
</table>
```

**Napomena:** Slike u emailovima mogu biti blokirane. Uvijek koristite `alt` tekst i razmislite o tekstualnoj verziji važnih informacija.

---

### 5. Prilagodba za različite kampanje

#### Promocijska kampanja
- **Naslov:** Dodajte "🎁" ili "✨" emoji na početak
- **CTA:** "Iskoristi ponudu →" ili "Ograničena ponuda"
- **Dodajte:** Rok trajanja ponude u footer ili nakon CTA

#### Newsletter
- **Naslov:** "ENKR Newsletter - [Mjesec] [Godina]"
- **Dodajte:** Više sekcija s različitim sadržajem
- **CTA:** "Pročitaj više" ili "Pogledaj projekt"

#### Follow-up email
- **Naslov:** "Slijedimo vaš upit..."
- **Tone:** Neformalniji, fokus na pomoć
- **CTA:** "Odgovori na email" ili "Zakazi poziv"

#### Onboarding email
- **Naslov:** "Dobrodošli u ENKR!"
- **Dodajte:** Koraci sljedećih akcija
- **CTA:** "Započni projekt"

---

### 6. Testiranje i kompatibilnost

#### Email klijenti za testiranje:
1. **Gmail** (web i mobilna aplikacija)
2. **Outlook** (desktop i web)
3. **Apple Mail** (iOS i macOS)
4. **MailerLite** (preview u editoru)

#### Checklist prije slanja:
- [ ] Sve boje su ispravno prikazane
- [ ] CTA gumb je klikabilan i vidljiv
- [ ] Tekst je čitljiv bez slika (slike mogu biti blokirane)
- [ ] Linkovi su ispravni i otvaraju se u novom prozoru
- [ ] Template je responzivan na mobilnim uređajima
- [ ] Footer kontakt informacije su točne
- [ ] Nema prekida u layoutu u različitim klijentima

#### Test alati:
- **Litmus** ili **Email on Acid** za testiranje različitih klijenata
- **MailerLite preview** za brzi pregled
- Ručno testiranje u Gmailu i Outlooku

---

### 7. Najbolje prakse za email marketing

#### Subjekt emaila
- **Kratko:** Maksimalno 50 znakova
- **Jasno:** Recite što će primatelj dobiti
- **Personalizirano:** Koristite ime ili naziv tvrtke gdje je moguće

**Primjeri:**
- "Besplatni nacrt web stranice za [Ime tvrtke]"
- "ENKR: Vaš projekt je spreman"
- "Povećajte online prodaju s e-commerce rješenjem"

#### Timing
- **Radni dani:** Utorak-Četvrtak, 9-11h ili 14-16h
- **Izbjegavajte:** Ponedjeljak ujutro, petak popodne, vikend

#### Personalizacija
- Koristite `{{ime}}` ili `{{naziv_tvrtke}}` gdje je moguće
- Referencirajte prethodne interakcije ako imate podatke

#### A/B testiranje
- Testirajte različite naslove
- Testirajte različite CTA tekstove
- Testirajte različite slike (ako koristite)

---

### 8. Primjer kompletnog emaila za specifičnu ponudu

**Ponuda: Besplatni nacrt web stranice**

```html
<!-- Naslov -->
<h1 style="...">
  🎁 Besplatna izrada prvog nacrta vaše web stranice
</h1>

<!-- Opis -->
<p style="...">
  Nema potrebe za kupnjom na slijepo. Nakon ispunjavanja kratkog upitnika i odabira željenog stila, 
  prvi nacrt weba stiže na vaš email u roku od 48 sati. Bez obaveza.
</p>

<!-- Benefit lista -->
<!-- (dodajte benefit listu iz gore navedenog primjera) -->

<!-- CTA -->
<a href="https://www.enkr.hr/besplatna-verzija.html" style="...">
  ⚡ Započni besplatnu izradu →
</a>
```

---

### 9. Troubleshooting

#### Problem: Gumb se ne prikazuje ispravno u Outlooku
**Rješenje:** Outlook koristi VML za gumbove. Koristite `mso` conditional komentare ili table-based gumbove (kao u templateu).

#### Problem: Slike se ne učitavaju
**Rješenje:** 
- Koristite apsolutne URL-ove za slike
- Uvijek dodajte `alt` tekst
- Razmislite o tekstualnoj verziji važnih informacija

#### Problem: Fontovi se ne prikazuju
**Rješenje:** Koristite email-safe fontove (system fontovi) kao u templateu.

#### Problem: Template se lomi na mobilnim uređajima
**Rješenje:**
- Koristite `max-width: 100%` za sve tabele
- Koristite `padding` umjesto `margin` gdje je moguće
- Testirajte na različitim uređajima

---

## Kontakt za pomoć

Ako imate pitanja o prilagodbi templatea ili trebate dodatnu pomoć, kontaktirajte:
- **Email:** info@enkr.hr
- **Telefon:** +385 92 451 3373
- **Web:** https://www.enkr.hr
