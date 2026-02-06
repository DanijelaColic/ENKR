# 📧 Gmail Email Potpis - Detaljne Upute

Gmail ima specifičan način rada s HTML potpisima. Evo nekoliko metoda koje sigurno rade.

## 🎯 Metoda 1: Gmail Signature Editor (Najlakša - Preporučeno)

### Korak-po-korak:

1. **Otvori Gmail** u browseru
2. **Klikni na ⚙️ Settings** (Postavke) u gornjem desnom kutu
3. **Klikni "See all settings"** (Pogledaj sve postavke)
4. **Skrolaj do "Signature"** sekcije (oko sredine stranice)
5. **Klikni "Create new"** ili odaberi postojeći potpis
6. **U tekst editoru**, kopiraj i zalijepi ovaj tekst:

```
⚓ ENKR

[Tvoje Ime]
[Tvoja Pozicija]

📧 info@enkr.hr
📱 +385 91 927 9931
🌐 enkr.hr

─────────────────────

Digitalne usluge koje rastu s vama
```

7. **Selektiraj tekst** koji želiš formatirati
8. **Koristi toolbar** za formatiranje:
   - **Bold** za "⚓ ENKR" i "[Tvoje Ime]"
   - **Boja teksta** - promijeni boju na #6366f1 (plava) za linkove i logo
   - **Font size** - povećaj za logo i ime
9. **Dodaj linkove**:
   - Selektiraj "info@enkr.hr" → klikni na link ikonu → unesi `mailto:info@enkr.hr`
   - Selektiraj "+385 91 927 9931" → klikni na link ikonu → unesi `tel:+385919279931`
   - Selektiraj "enkr.hr" → klikni na link ikonu → unesi `https://enkr.hr`
10. **Klikni "Save Changes"** (Spremi promjene) na dnu stranice

### Rezultat:
Dobit ćeš lijepo formatiran potpis koji će se prikazivati u svim emailovima.

---

## 🔧 Metoda 2: HTML Paste (Napredna)

Ako želiš koristiti HTML direktno:

### Korak 1: Priprema
1. Otvori `email-signature-gmail.html` u text editoru
2. Zamijeni `[Tvoje Ime]` i `[Tvoja Pozicija]`
3. Kopiraj sav HTML kod

### Korak 2: Gmail Signature Editor
1. Otvori Gmail Settings → Signature
2. **Klikni na "Formatting options"** (obično ikona "A" ili tri točkice)
3. **Odaberi "Insert HTML"** ili **"Paste as HTML"**
4. Zalijepi HTML kod
5. **VAŽNO:** Ako se HTML ne prikaže kako treba, koristi Metodu 1 umjesto ove

---

## 🛠️ Metoda 3: Developer Tools (Za Napredne Korisnike)

Ako prethodne metode ne rade:

1. Otvori Gmail Settings → Signature
2. **Otvori Developer Tools** (F12 ili desni klik → Inspect)
3. **Idi na Console tab**
4. **Pronađi signature editor** u HTML-u (obično `<div contenteditable="true">`)
5. **Zalijepi ovaj JavaScript kod** u Console:

```javascript
// Pronađi signature editor
const editor = document.querySelector('[contenteditable="true"]');
if (editor) {
  editor.innerHTML = `
    <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #1f2937;">
      <div style="font-size: 20px; font-weight: bold; color: #6366f1; margin-bottom: 12px;">
        ⚓ ENKR
      </div>
      <div style="font-size: 16px; font-weight: bold; color: #1f2937; margin-bottom: 4px;">
        [Tvoje Ime]
      </div>
      <div style="font-size: 13px; color: #6b7280; margin-bottom: 16px;">
        [Tvoja Pozicija]
      </div>
      <div style="margin-bottom: 8px;">
        <span style="color: #6366f1;">📧</span> 
        <a href="mailto:info@enkr.hr" style="color: #6366f1; text-decoration: none;">info@enkr.hr</a>
      </div>
      <div style="margin-bottom: 8px;">
        <span style="color: #6366f1;">📱</span> 
        <a href="tel:+385919279931" style="color: #6366f1; text-decoration: none;">+385 91 927 9931</a>
      </div>
      <div style="margin-bottom: 16px;">
        <span style="color: #6366f1;">🌐</span> 
        <a href="https://enkr.hr" style="color: #6366f1; text-decoration: none;">enkr.hr</a>
      </div>
      <div style="border-top: 2px solid #e5e7eb; margin: 16px 0; padding-top: 16px;">
        <div style="font-size: 12px; color: #6b7280; font-style: italic;">
          Digitalne usluge koje rastu s vama
        </div>
      </div>
    </div>
  `;
}
```

6. **Pritisni Enter** - HTML će se umetnuti u editor
7. **Zamijeni `[Tvoje Ime]` i `[Tvoja Pozicija]`** direktno u editoru
8. **Klikni "Save Changes"**

---

## ✅ Provjera

Nakon što postaviš potpis:

1. **Klikni "Compose"** (Sastavi) za novi email
2. **Provjeri da se potpis prikazuje** na dnu emaila
3. **Provjeri da linkovi rade** (klikni na njih)
4. **Pošalji testni email** sebi da vidiš kako izgleda

---

## 🎨 Formatiranje u Gmail Editoru

Gmail signature editor ima toolbar s ovim opcijama:

- **B** - Bold (podebljaj)
- **I** - Italic (naglašeno)
- **U** - Underline (podcrtaj)
- **A** - Font color (boja teksta)
- **Link ikona** - Dodaj link
- **Font size** - Veličina fonta

### Preporučeno formatiranje:

1. **"⚓ ENKR"** - Bold, veličina 18-20px, boja #6366f1
2. **"[Tvoje Ime]"** - Bold, veličina 16px, boja #1f2937
3. **"[Tvoja Pozicija]"** - Normal, veličina 13px, boja #6b7280
4. **Email/Telefon/Web linkovi** - Boja #6366f1, dodaj linkove
5. **Tagline** - Italic, veličina 12px, boja #6b7280

---

## 🔧 Troubleshooting

### Problem: HTML se prikazuje kao tekst

**Rješenje:** Gmail signature editor ne podržava direktan HTML paste. Koristi **Metodu 1** (ručno formatiranje).

### Problem: Linkovi ne rade

**Rješenje:** 
- Provjeri da si dodao linkove kroz Gmail toolbar (link ikona)
- Format linka za email: `mailto:info@enkr.hr`
- Format linka za telefon: `tel:+385919279931`
- Format linka za web: `https://enkr.hr`

### Problem: Emoji ikone se ne prikazuju

**Rješenje:** 
- Neki email klijenti ne podržavaju emoji
- Možeš ih zamijeniti tekstom: "Email:", "Tel:", "Web:"
- Ili koristi jednostavne simbole: •, →, |

### Problem: Boje se ne prikazuju kako treba

**Rješenje:**
- Gmail koristi svoje boje za linkove (plava)
- Možeš promijeniti boju teksta kroz toolbar (ikona "A")
- Neki email klijenti mogu ignorirati custom boje

### Problem: Potpis se ne prikazuje u emailovima

**Rješenje:**
1. Provjeri da si kliknuo **"Save Changes"** na dnu Settings stranice
2. Provjeri da si odabrao **pravu signature** u dropdown meniju
3. Provjeri da je **"Insert signature"** opcija omogućena u Compose prozoru

---

## 📝 Napomene

- **Gmail automatski dodaje potpis** u nove emailove
- **Možeš imati više potpisa** i birati koji koristiti
- **Potpis se ne dodaje automatski** u Reply/Forward - moraš ga dodati ručno ili omogućiti u postavkama
- **Mobile Gmail app** može prikazivati potpis drugačije od web verzije

---

## 🎯 Najbolja Praksa

1. **Koristi Metodu 1** (ručno formatiranje) - najsigurnija opcija
2. **Testiraj na više uređaja** - desktop, mobile, tablet
3. **Drži potpis kratkim** - ne dodavaj previše informacija
4. **Provjeri linkove** - klikni na sve linkove prije slanja
5. **Ažuriraj kada treba** - promijene kontakt podataka, ažuriraj potpis

---

**Potrebna pomoć?** Kontaktiraj nas na info@enkr.hr
