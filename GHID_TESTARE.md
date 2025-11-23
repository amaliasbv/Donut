# 🧪 GHID DE TESTARE PAS CU PAS - Lecția "Teoria Culorilor"

**URL:** https://drawhub.onrender.com

---

## 📋 PREGĂTIRE TESTARE

### Ce ai nevoie:
- ✅ Browser modern (Chrome, Edge, Firefox, sau Safari)
- ✅ Conexiune la internet
- ✅ Console deschis (F12 → Console tab) pentru debug
- ✅ 15-20 minute pentru testare completă

### Notițe importante:
- 🔊 **Text-to-Speech** funcționează doar în browsere compatibile (Chrome, Edge, Safari)
- 📱 **Mobile testing** - testează și pe telefon
- 🐛 **Bug reporting** - notează orice problemă

---

## 🚀 PASUL 1: TESTARE HOMEPAGE

### 1.1 Deschide site-ul
```
URL: https://drawhub.onrender.com
```

### 1.2 Verifică Console (F12)
**✅ CE TREBUIE SĂ VEZI:**
- Console FĂRĂ erori 404 (am eliminat style.css și favicon errors)
- Fișierele /css/main.css și /js/app.js se încarcă cu succes (200 OK)
- Favicon 🎨 apare în tab

**❌ DACĂ VEZI ERORI:**
- Screenshot la console
- Notează exact ce eroare apare

### 1.3 Verifică vizual homepage
**✅ CE TREBUIE SĂ VEZI:**
- Navbar cu logo "🎨 DrawHub"
- 5 linkuri: Acasă, Lecții, Teme, Upload, Profil
- Buton "Login" în dreapta
- Footer cu "Created with ❤️"

**✅ TESTEAZĂ:**
- [ ] Hover pe linkuri navbar → background se schimbă
- [ ] Click pe fiecare link → URL hash se schimbă (#home, #lessons, etc.)
- [ ] Pagina se schimbă FĂRĂ page refresh (SPA)

---

## 📚 PASUL 2: TESTARE PAGINA LECȚII

### 2.1 Navighează la Lecții
```
Click pe "Lecții" din navbar
SAU
Direct: https://drawhub.onrender.com/#lessons
```

### 2.2 Verifică afișare
**✅ CE TREBUIE SĂ VEZI:**
- Titlu: "📚 Lecții"
- Subtitlu: "Învață teorie artistică pas cu pas"
- 4 butoane filtru: Toate, Începător, Intermediar, Avansat
- Grid cu 8 lecții (3 coloane pe desktop)

### 2.3 Verifică lecția "Teoria Culorilor"
**✅ PRIMA LECȚIE TREBUIE SĂ AIBĂ:**
- Thumbnail: 🎨
- Titlu: "Teoria Culorilor"
- Badge: "Începător" (albastru deschis)
- Badge: "✓ Completat" (verde, top-right)
- Descriere: "Învață despre cercul cromatic..."
- Categorie: "📁 Fundamente"
- Durată: "⏱️ 30 min"
- Buton: "Revizuiește" (secundar - light background)

### 2.4 Testează filtrele
**✅ TESTEAZĂ:**
- [ ] Click "Începător" → Afișează doar lecțiile beginner (3 lecții)
- [ ] Click "Intermediar" → Afișează doar intermediate (3 lecții)
- [ ] Click "Avansat" → Afișează doar advanced (2 lecții)
- [ ] Click "Toate" → Afișează toate (8 lecții)
- [ ] Butonul activ are background albastru

---

## 🎨 PASUL 3: TESTARE LECȚIA INTERACTIVĂ

### 3.1 Deschide lecția
```
Click pe cardul "Teoria Culorilor"
```

**✅ CE AR TREBUI SĂ SE ÎNTÂMPLE:**
- URL se schimbă la: `#lesson-color-theory`
- Lecția se încarcă (NO page refresh!)
- Console FĂRĂ erori JavaScript

### 3.2 Verifică structura lecției
**✅ TOP SCREEN TREBUIE SĂ AIBĂ:**
- [ ] Titlu: "🎨 Teoria Culorilor - Învață să Combini Culorile Perfect"
- [ ] Progress bar (linie albastră-violet gradient, 0% initial)
- [ ] Text progress: "Modul 1 din 5"

**✅ MODUL 1 (INTRODUCERE):**
- [ ] Heading: "Bun venit la prima lecție!"
- [ ] Text intro cu emoji 👋
- [ ] Emoji mare: 🎨
- [ ] Explicație de ce e importantă teoria culorilor

**✅ BOTTOM NAVIGATION:**
- [ ] Buton "⬅️ Înapoi" (disabled, gri)
- [ ] Buton "Înainte ➡️" (enabled, albastru)

**✅ BOTTOM-RIGHT CORNER:**
- [ ] Buton circular fix cu 🔊 (narration toggle)
- [ ] Culoare gradient albastru-violet
- [ ] Shadow vizibil

### 3.3 Testează narration (Text-to-Speech)
**✅ TESTEAZĂ:**
- [ ] Click pe butonul 🔊
- [ ] Se aude o voce în română
- [ ] Vocea spune intro text-ul modulului
- [ ] Click din nou → vocea se oprește
- [ ] Emoji se schimbă: 🔊 ↔️ 🔇

**⚠️ NOTĂ:** Dacă nu merge:
- Verifică că browserul suportă Web Speech API (Chrome/Edge/Safari OK)
- Verifică că limba română e disponibilă în sistem

---

## 🎨 PASUL 4: MODUL 2 - CULORI PRIMARE

### 4.1 Navighează la Modul 2
```
Click "Înainte ➡️" din Modul 1
```

**✅ CE TREBUIE SĂ SE ÎNTÂMPLE:**
- [ ] Progress bar se actualizează la ~20%
- [ ] Text progress: "Modul 2 din 5"
- [ ] Smooth transition (slideIn animation)
- [ ] Butonul "⬅️ Înapoi" devine enabled

### 4.2 Verifică conținutul
**✅ TREBUIE SĂ VEZI:**
- [ ] Heading: "🔴 Culorile Primare"
- [ ] Explicație despre cele 3 culori
- [ ] Grid cu 3 carduri (Roșu, Galben, Albastru)

### 4.3 Verifică cardurile de culori
**✅ FIECARE CARD TREBUIE SĂ AIBĂ:**

**Card ROȘU:**
- [ ] Background roșu vibrant (#ef4444)
- [ ] Emoji: ❤️
- [ ] Heading: "Roșu"
- [ ] Text psihologie: "Pasiune, energie, pericol..."

**Card GALBEN:**
- [ ] Background galben (#fbbf24)
- [ ] Emoji: ☀️
- [ ] Heading: "Galben"
- [ ] Text psihologie: "Veselie, optimism, atenție..."

**Card ALBASTRU:**
- [ ] Background albastru (#3b82f6)
- [ ] Emoji: 💙
- [ ] Heading: "Albastru"
- [ ] Text psihologie: "Calm, încredere, profesionalism..."

### 4.4 Testează interactivitatea
**✅ TESTEAZĂ:**
- [ ] Hover pe card → translateY(-5px) - cardul se ridică
- [ ] Animation smooth (transition 0.3s)

---

## 🌈 PASUL 5: MODUL 3 - CULORI SECUNDARE & COLOR MIXER

### 5.1 Navighează la Modul 3
```
Click "Înainte ➡️"
```

**✅ VERIFICĂ:**
- [ ] Progress bar ~40%
- [ ] Text: "Modul 3 din 5"

### 5.2 Verifică Color Mixer
**✅ TREBUIE SĂ VEZI:**
- [ ] Heading: "🎨 Culori Secundare - Amestecă Culorile!"
- [ ] Explicație despre cum se formează
- [ ] Section "Color Mixer" cu background gri deschis
- [ ] 6 cercuri de culori:
  - 3 primare (Roșu, Galben, Albastru)
  - 3 secundare (Verde, Portocaliu, Violet)

### 5.3 Testează mixing-ul
**✅ TESTEAZĂ COMBINAȚII CORECTE:**

**Test 1: Roșu + Galben = Portocaliu**
- [ ] Click pe cercul Roșu → border albastru + shadow
- [ ] Click pe cercul Galben → border albastru + shadow
- [ ] Apare mesaj: "Roșu + Galben = Portocaliu ✅"
- [ ] Cercul Portocaliu se highlight-uiește

**Test 2: Galben + Albastru = Verde**
- [ ] Click Galben
- [ ] Click Albastru
- [ ] Mesaj: "Galben + Albastru = Verde ✅"

**Test 3: Roșu + Albastru = Violet**
- [ ] Click Roșu
- [ ] Click Albastru
- [ ] Mesaj: "Roșu + Albastru = Violet ✅"

**✅ TESTEAZĂ COMBINAȚIE GREȘITĂ:**
**Test 4: Roșu + Roșu**
- [ ] Click Roșu (x2)
- [ ] Mesaj: "Hmm, nu poți combina aceeași culoare cu ea însăși! 🤔"

**Test 5: Verde + Portocaliu (două secundare)**
- [ ] Click Verde
- [ ] Click Portocaliu
- [ ] Mesaj: "Încearcă să combini NUMAI culori primare!" (sau similar)

### 5.4 Testează hover effects
**✅ TESTEAZĂ:**
- [ ] Hover pe cerc → scale(1.1) + shadow mai mare
- [ ] Smooth animation

---

## 🎡 PASUL 6: MODUL 4 - CERCUL CROMATIC INTERACTIV

### 6.1 Navighează la Modul 4
```
Click "Înainte ➡️"
```

**✅ VERIFICĂ:**
- [ ] Progress bar ~60%
- [ ] Text: "Modul 4 din 5"

### 6.2 Verifică Color Wheel SVG
**✅ TREBUIE SĂ VEZI:**
- [ ] SVG circular cu 12 culori aranjate ca pe un ceas
- [ ] Fiecare culoare e un segment (30° fiecare)
- [ ] Culorile în ordine:
  1. Roșu (top)
  2. Roșu-Portocaliu
  3. Portocaliu
  4. Galben-Portocaliu
  5. Galben
  6. Galben-Verde
  7. Verde
  8. Albastru-Verde (Cyan)
  9. Albastru
  10. Albastru-Violet
  11. Violet
  12. Roșu-Violet (Magenta)

### 6.3 Testează interactivitatea Color Wheel
**✅ TESTEAZĂ:**
- [ ] Hover pe culoare → scale(1.1) + brightness mai mare
- [ ] Click pe Roșu → mesaj arată: "Complementara: Verde"
- [ ] Click pe Galben → mesaj: "Complementara: Violet"
- [ ] Click pe Albastru → mesaj: "Complementara: Portocaliu"
- [ ] Click pe orice culoare → complementara e vizualizată cumva (text/highlight)

### 6.4 Verifică shadow & styling
**✅ VERIFICĂ:**
- [ ] SVG are drop-shadow (0 4px 6px rgba black 0.1)
- [ ] SVG e centrat perfect
- [ ] Dimensiune adecvată (nu prea mic, nu prea mare)

---

## 🌟 PASUL 7: MODUL 5 - ARMONII & PSIHOLOGIA CULORILOR

### 7.1 Navighează la Modul 5
```
Click "Înainte ➡️"
```

**✅ VERIFICĂ:**
- [ ] Progress bar ~80%
- [ ] Text: "Modul 5 din 5"

### 7.2 Verifică secțiunile de armonii

**✅ SECȚIUNEA 1: CULORI COMPLEMENTARE**
- [ ] Emoji: 🎯
- [ ] Heading: "Culori Complementare"
- [ ] Explicație: Opuse pe cerc, contrast maxim
- [ ] Exemple: Roșu-Verde, Albastru-Portocaliu, Galben-Violet

**✅ SECȚIUNEA 2: CULORI ANALOAGE**
- [ ] Emoji: 🌈
- [ ] Heading: "Culori Analoage"
- [ ] Explicație: Culori alăturate pe cerc
- [ ] Exemple: Roșu-Portocaliu-Galben

**✅ SECȚIUNEA 3: CULORI TRIADICE**
- [ ] Emoji: 🔺
- [ ] Heading: "Culori Triadice"
- [ ] Explicație: 3 culori echidistante
- [ ] Exemple: Roșu-Galben-Albastru

**✅ SECȚIUNEA 4: REGULA 60-30-10**
- [ ] Emoji: 📊
- [ ] Heading: "Regula 60-30-10"
- [ ] Explicație clară cu procente
- [ ] Exemplu vizual

### 7.3 Verifică Psihologia Culorilor
**✅ TREBUIE SĂ VEZI GRID CU 6 CARDURI:**

Fiecare card are:
- [ ] Background gradient (culoarea respectivă)
- [ ] Text alb
- [ ] Emoji
- [ ] Nume culoare
- [ ] Emoții asociate

**Cardurile:**
1. **Roșu** - Gradient #ef4444 → darker
   - Emoții: "Pasiune, Energie, Urgență"
2. **Portocaliu** - Gradient #f97316 → darker
   - Emoții: "Entuziasm, Căldură, Creativitate"
3. **Galben** - Gradient #fbbf24 → darker
   - Emoții: "Veselie, Optimism, Atenție"
4. **Verde** - Gradient #10b981 → darker
   - Emoții: "Natură, Echilibru, Calm"
5. **Albastru** - Gradient #3b82f6 → darker
   - Emoții: "Calm, Încredere, Profesionalism"
6. **Violet** - Gradient #8b5cf6 → darker
   - Emoții: "Lux, Creativitate, Mister"

### 7.4 Testează hover effects
**✅ TESTEAZĂ:**
- [ ] Hover pe card → translateY(-5px)
- [ ] Smooth transition

---

## ✅ PASUL 8: QUIZ INTERACTIV

### 8.1 Navighează la Quiz
```
Click "Înainte ➡️" din Modul 5
```

**✅ VERIFICĂ:**
- [ ] Progress bar 100%
- [ ] Heading: "📝 Mini-Test - Verifică-ți Cunoștințele!"
- [ ] 5 întrebări afișate

### 8.2 Verifică structura quiz-ului

**✅ ÎNTREBAREA 1:**
```
Care sunt culorile PRIMARE?
A) Roșu, Verde, Albastru
B) Roșu, Galben, Albastru ✅ (CORRECT)
C) Roșu, Portocaliu, Violet
D) Verde, Portocaliu, Violet
```

**✅ ÎNTREBAREA 2:**
```
Complementara roșului este:
A) Galben
B) Albastru
C) Verde ✅ (CORRECT)
D) Portocaliu
```

**✅ ÎNTREBAREA 3:**
```
Ce culoare se formează din Galben + Albastru?
A) Portocaliu
B) Violet
C) Verde ✅ (CORRECT)
D) Maro
```

**✅ ÎNTREBAREA 4:**
```
Ce emoție evocă culoarea ALBASTRU?
A) Pasiune
B) Calm și încredere ✅ (CORRECT)
C) Veselie
D) Energie
```

**✅ ÎNTREBAREA 5:**
```
Regula 60-30-10 se referă la:
A) Temperatura culorilor
B) Proporția culorilor într-o paletă ✅ (CORRECT)
C) Numărul de culori pe cerc
D) Saturația culorilor
```

### 8.3 Testează interactivitatea quiz-ului

**✅ TESTEAZĂ SELECTARE:**
- [ ] Click pe opțiune → border devine albastru
- [ ] Background devine rgba(102, 126, 234, 0.1) - albastru pal
- [ ] Click pe altă opțiune → prima se deselectează
- [ ] Poți selecta DOAR 1 răspuns per întrebare

**✅ TESTEAZĂ BUTONUL "VERIFICĂ RĂSPUNSURILE":**
- [ ] Buton apare la final (albastru, full width)
- [ ] Click → feedback vizual instant

### 8.4 Testează feedback-ul

**✅ RĂSPUNSURI CORECTE:**
- [ ] Border verde (--success)
- [ ] Background verde pal rgba(16, 185, 129, 0.1)
- [ ] Eventual emoji ✅

**✅ RĂSPUNSURI GREȘITE:**
- [ ] Border roșu (--error)
- [ ] Background roșu pal rgba(239, 68, 68, 0.1)
- [ ] Eventual emoji ❌

### 8.5 Testează calculul scorului

**✅ SCOR FINAL TREBUIE SĂ FIE:**
- Formula: (răspunsuri corecte / 5) × 100
- Afișat mare, vizibil
- Format: "X/100" sau "X%"

**✅ MESAJE BAZATE PE SCOR:**
- **0-59%**: "Încearcă din nou! Mai exersează teoria culorilor." 😞
- **60-79%**: "Bine! Dar mai ai de învățat." 😊
- **80-89%**: "Foarte bine! Aproape perfect!" 🎉
- **90-100%**: "Excelent! Ești un maestru al culorilor!" 🏆

---

## 🏆 PASUL 9: CERTIFICAT DE COMPLETARE

### 9.1 Testează condiția de afișare

**✅ SCENARIU 1: Scor < 85%**
- [ ] Certificatul NU apare
- [ ] Mesajul e clar: "Trebuie să obții minimum 85% pentru certificat"
- [ ] Buton "Încearcă din nou" apare

**✅ SCENARIU 2: Scor ≥ 85%**
- [ ] Certificatul APARE automat
- [ ] Confetti animation (opțional)

### 9.2 Verifică design certificat

**✅ TREBUIE SĂ AIBĂ:**
- [ ] Background gradient (albastru → violet)
- [ ] Border radius mare (var(--radius-lg))
- [ ] Box shadow masiv (0 20px 60px rgba black 0.3)
- [ ] Padding generos (3rem)
- [ ] Text alb

**✅ CONȚINUT CERTIFICAT:**
- [ ] Emoji/Icon: 🏆 sau 🎖️
- [ ] Heading: "Felicitări!"
- [ ] Text: "Ai completat cu succes lecția..."
- [ ] Numele utilizatorului: "DrawHub Student" (din State)
- [ ] Data: Format românesc (ex: "22 noiembrie 2025")
- [ ] Scor final afișat: "Scor: X%"

**✅ BUTON DESCĂRCARE:**
- [ ] Text: "📥 Descarcă Certificat" sau "🖨️ Printează Certificat"
- [ ] Background alb
- [ ] Color primary
- [ ] Hover effect

### 9.3 Testează funcționalitatea (placeholder OK)
- [ ] Click pe buton → alert/modal/console log (pentru MVP)
- [ ] Mesaj: "Funcția de descărcare va fi implementată!"

---

## 🔄 PASUL 10: TESTARE NAVIGARE ÎNAPOI

### 10.1 Testează butonul "Înapoi"
**✅ DIN MODUL 5 → MODUL 4:**
- [ ] Click "⬅️ Înapoi"
- [ ] Progress bar scade la ~60%
- [ ] Modulul 4 (Color Wheel) apare
- [ ] Smooth transition

**✅ DIN MODUL 4 → MODUL 3:**
- [ ] Progress bar ~40%
- [ ] Color Mixer apare

**✅ DIN MODUL 3 → MODUL 2:**
- [ ] Progress bar ~20%
- [ ] Culori Primare apar

**✅ DIN MODUL 2 → MODUL 1:**
- [ ] Progress bar 0%
- [ ] Intro apare
- [ ] Butonul "⬅️ Înapoi" devine disabled (gri)

---

## 📱 PASUL 11: TESTARE RESPONSIVE (MOBILE)

### 11.1 Testează pe mobile (sau resize browser < 768px)

**✅ LAYOUT:**
- [ ] Grid devine 1 coloană (stack vertical)
- [ ] Cardurile sunt full-width
- [ ] Text e lizibil (nu prea mic)
- [ ] Butoanele sunt suficient de mari pentru touch

**✅ COLOR WHEEL:**
- [ ] SVG se scalează corect
- [ ] Nu depășește width-ul ecranului
- [ ] Touch interactions funcționează

**✅ NAVIGATION:**
- [ ] Butoanele "Înapoi"/"Înainte" rămân vizibile
- [ ] Narration toggle rămâne în bottom-right (fixed)

---

## 🎧 PASUL 12: TESTARE AVANSATĂ TEXT-TO-SPEECH

### 12.1 Testează narration-ul pentru fiecare modul

**✅ MODUL 1:**
- [ ] Text: "Bun venit la prima ta lecție..."
- [ ] Voce clară, naturală
- [ ] Rate 0.9 (nu prea rapid)

**✅ MODUL 2:**
- [ ] Text: "Culorile primare sunt roșu, galben și albastru..."
- [ ] Pronunție corectă română

**✅ MODUL 3:**
- [ ] Text: "Când amesteci două culori primare..."
- [ ] Sincronizare cu conținutul vizual

**✅ VERIFICĂ:**
- [ ] Narration se oprește când schimbi modulul
- [ ] Toggle buton funcționează consistent
- [ ] Nu există echo sau overlap de voce

---

## 📊 PASUL 13: TESTARE PERFORMANCE

### 13.1 Deschide Chrome DevTools → Lighthouse
```
1. F12 → Lighthouse tab
2. Selectează: Performance, Accessibility, Best Practices
3. Click "Analyze page load"
```

**✅ TARGET SCORES:**
- [ ] Performance: > 80
- [ ] Accessibility: > 90
- [ ] Best Practices: > 90

### 13.2 Verifică Network tab
```
F12 → Network tab → Reload page
```

**✅ VERIFICĂ:**
- [ ] Total page load < 3 secunde
- [ ] CSS load time < 500ms
- [ ] JS files load < 1 secunde
- [ ] No failed requests (toate 200 OK)

### 13.3 Verifică Console
**✅ CONSOLE TREBUIE SĂ FIE CLEAN:**
- [ ] No errors (roșu)
- [ ] No critical warnings (galben)
- [ ] Eventual doar info messages (albastru)

---

## ✅ CHECKLIST FINAL

### Critical (MUST PASS):
- [ ] Site se încarcă fără erori
- [ ] Lecția "Teoria Culorilor" se deschide
- [ ] Toate cele 5 module se afișează
- [ ] Quiz-ul calculează scorul corect
- [ ] Certificatul apare la scor ≥ 85%

### High Priority (SHOULD PASS):
- [ ] Color wheel e interactiv
- [ ] Color mixer funcționează
- [ ] Animațiile sunt smooth
- [ ] Responsive pe mobile
- [ ] Navigare înapoi/înainte funcționează

### Medium Priority (NICE TO HAVE):
- [ ] Text-to-Speech funcționează
- [ ] Hover effects pe toate elementele
- [ ] Performance score > 80
- [ ] No console errors

---

## 🐛 RAPORTARE BUG-URI

### Dacă găsești bug-uri, notează:

**Template raport bug:**
```markdown
### Bug ID: B-XXX

**Modul:** [ex: Modul 3 - Color Mixer]
**Severitate:** [Critical / High / Medium / Low]

**Descriere:**
[Ce nu funcționează?]

**Steps to reproduce:**
1. [Pas 1]
2. [Pas 2]
3. [Rezultat așteptat vs Rezultat actual]

**Screenshot:**
[Atașează screenshot]

**Console errors:**
[Copy-paste din console]

**Browser & Device:**
[ex: Chrome 120, Windows 11 Desktop]
```

---

## 📝 RAPORT FINAL TESTARE

### După ce finalizezi toate testele, completează:

```markdown
# RAPORT TESTARE - Lecția "Teoria Culorilor"

**Data:** [DATA]
**Tester:** QA Team
**Browser:** [BROWSER]
**Scor general:** [X/100]

## ✅ Ce funcționează perfect:
- [listă]

## ⚠️ Ce are probleme minore:
- [listă]

## ❌ Ce nu funcționează deloc:
- [listă]

## 📊 Metrici:
- Timp de încărcare: X secunde
- Performance score: X/100
- Bug-uri găsite: X critical, X high, X medium, X low

## 💡 Recomandări:
1. [Sugestie 1]
2. [Sugestie 2]
3. [Sugestie 3]
```

---

**Mult succes la testare!** 🚀

*Ghid creat: 22 Noiembrie 2025*
