# 📧 ENKR Email Potpis - Upute za Korištenje

Ovaj vodič objašnjava kako koristiti HTML email potpis za ENKR agenciju.

## ⚠️ VAŽNO: Gmail Korisnici

**Ako koristiš Gmail i HTML se prikazuje kao tekst umjesto formatiranog potpisa**, koristi **Gmail-specifične upute**:

👉 **[GMAIL-SIGNATURE-SETUP.md](./GMAIL-SIGNATURE-SETUP.md)** - Detaljne upute za Gmail

**Brzo rješenje za Gmail:**
1. Otvori Gmail Settings → Signature
2. Kopiraj tekst iz `email-signature-gmail-simple.txt`
3. Zalijepi u Gmail signature editor
4. Formatiraj ručno kroz Gmail toolbar (bold, boje, linkovi)
5. Spremi promjene

---

## 📁 Dostupne Datoteke

1. **`email-signature.html`** - Kompletan HTML fajl s uputama i alternativnim verzijama
2. **`email-signature-clean.html`** - Čista verzija samo s HTML kodom za kopiranje
3. **`email-signature-gmail.html`** - Gmail-optimizirana verzija
4. **`email-signature-gmail-simple.txt`** - Jednostavna tekst verzija za Gmail
5. **`GMAIL-SIGNATURE-SETUP.md`** - Detaljne Gmail upute

## 🚀 Brzi Početak

### Korak 1: Priprema Koda

1. Otvori `email-signature-clean.html` u text editoru
2. Pronađi `[Tvoje Ime]` i zamijeni sa svojim imenom
3. Pronađi `[Tvoja Pozicija]` i zamijeni sa svojom pozicijom (npr. "Web Developer", "Project Manager", itd.)

### Korak 2: Kopiranje Koda

Kopiraj **sav kod** iz `email-signature-clean.html` (od `<table>` do `</table>`).

### Korak 3: Dodavanje u Email Klijent

#### Gmail

**⚠️ Gmail ima specifičan način rada - koristi [GMAIL-SIGNATURE-SETUP.md](./GMAIL-SIGNATURE-SETUP.md)**

Alternativno:
1. Otvori Gmail
2. Klikni na **⚙️ Settings** (Postavke) u gornjem desnom kutu
3. Idi na **See all settings** (Pogledaj sve postavke)
4. Skrolaj do **Signature** (Potpis) sekcije
5. Klikni na **Create new** (Kreiraj novi) ili odaberi postojeći
6. **Koristi tekst verziju** iz `email-signature-gmail-simple.txt` i formatiraj ručno kroz Gmail toolbar
7. Dodaj linkove kroz Gmail toolbar (link ikona)
8. Klikni **Save Changes** (Spremi promjene)

#### Outlook (Desktop)

1. Otvori Outlook
2. Idi na **File** > **Options** > **Mail**
3. U sekciji **Compose messages**, klikni **Signatures...**
4. Klikni **New** za kreiranje novog potpisa
5. U editoru, klikni desni klik i odaberi **"Paste"** ili **"Paste Special"** > **"HTML"**
6. Zalijepi HTML kod
7. Klikni **OK** i **OK** ponovo

#### Outlook (Web)

1. Otvori Outlook.com
2. Klikni na **⚙️ Settings** (Postavke)
3. Idi na **View all Outlook settings**
4. Odaberi **Mail** > **Compose and reply**
5. U sekciji **Email signature**, klikni na **Rich text editor**
6. Zalijepi HTML kod
7. Klikni **Save**

#### Apple Mail (macOS)

1. Otvori Mail aplikaciju
2. Idi na **Mail** > **Preferences** (Postavke)
3. Odaberi **Signatures** (Potpisi)
4. Odaberi svoj email account ili klikni **+** za novi
5. Klikni **+** za kreiranje novog potpisa
6. U editoru, klikni desni klik i odaberi **"Paste"**
7. Zalijepi HTML kod
8. Zatvori Preferences

#### Thunderbird

1. Otvori Thunderbird
2. Idi na **Tools** > **Account Settings**
3. Odaberi svoj email account
4. U lijevom meniju, klikni **"Signatures"**
5. Odaberi **"Attach the signature from a file"** ili koristi inline editor
6. Zalijepi HTML kod
7. Klikni **OK**

## 🎨 Prilagođavanje Potpisa

### Promjena Boja

Ako želiš promijeniti boje, pronađi ove vrijednosti u HTML kodu:

- `#6366f1` - Glavna plava boja (logo, linkovi)
- `#1f2937` - Tamno siva (tekst)
- `#6b7280` - Svetlo siva (sekundarni tekst)

### Uklanjanje Emoji Ikona

Ako tvoj email klijent ne prikazuje emoji ikone dobro, koristi alternativnu verziju iz `email-signature.html` (komentirana sekcija na dnu fajla).

### Dodavanje Društvenih Mreža

Ako želiš dodati linkove na društvene mreže, dodaj novi redak u kontakt sekciju:

```html
<tr>
  <td style="padding-bottom: 8px;">
    <table cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right: 8px; vertical-align: middle;">
          <span style="color: #6366f1;">🔗</span>
        </td>
        <td style="vertical-align: middle;">
          <a href="https://linkedin.com/in/tvoj-profil" style="color: #6366f1; text-decoration: none;" target="_blank">LinkedIn</a>
        </td>
      </tr>
    </table>
  </td>
</tr>
```

## ✅ Provjera

Nakon što dodaš potpis:

1. **Pošalji testni email** sebi
2. **Provjeri kako izgleda** na različitim uređajima:
   - Desktop email klijent
   - Mobile email app
   - Web verzija emaila
3. **Provjeri da svi linkovi rade** (email, telefon, web)

## 🔧 Troubleshooting

### Potpis se ne prikazuje

- **Problem:** Email klijent ne podržava HTML
- **Rješenje:** Provjeri da koristiš "Insert HTML" opciju, ne samo paste

### Linkovi ne rade

- **Problem:** Email klijent je uklonio HTML linkove
- **Rješenje:** Provjeri da je HTML formatiranje omogućeno u postavkama

### Emoji ikone se ne prikazuju

- **Problem:** Email klijent ne podržava emoji
- **Rješenje:** Koristi alternativnu verziju bez emoji ikona (u komentarima u `email-signature.html`)

### Boje su drugačije

- **Problem:** Email klijent koristi svoje stilove
- **Rješenje:** Neki email klijenti (posebno Outlook) mogu ignorirati neke CSS stilove. Ovo je normalno i očekivano.

## 📝 Napomene

- Email potpis koristi **inline CSS** za maksimalnu kompatibilnost
- Koristi **table-based layout** što je standard za email HTML
- Svi linkovi su **klikabilni** i otvaraju se u novom prozoru (osim email linka)
- Potpis je **responsive** i radi dobro na mobilnim uređajima

## 🎯 Best Practices

1. **Drži potpis kratkim** - ne dodavaj previše informacija
2. **Testiraj na više klijenata** - Gmail, Outlook, Apple Mail
3. **Provjeri na mobilnim uređajima** - većina ljudi čita emailove na telefonu
4. **Ažuriraj informacije** - ako se promijene kontakt podaci, ažuriraj potpis
5. **Koristi profesionalan ton** - potpis predstavlja tvoju kompaniju

---

**Potrebna pomoć?** Kontaktiraj nas na info@enkr.hr
