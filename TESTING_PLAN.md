# 🧪 PLAN DE TESTARE - DrawHub

**Data:** 22 Noiembrie 2025
**Versiune:** v1.1 - Prima Lecție Interactivă
**URL de testare:** https://donut-rkhb.onrender.com

---

## 🎯 OBIECTIVE TESTARE

### Prioritate 1 - CRITICAL:
1. ✅ Site-ul se încarcă fără erori 404
2. ✅ Navigarea între pagini funcționează
3. ✅ Lecția "Teoria Culorilor" se încarcă complet
4. ✅ Toate modulele lecției se afișează

### Prioritate 2 - HIGH:
5. ✅ Color wheel SVG se afișează și e interactiv
6. ✅ Animațiile CSS funcționează smooth
7. ✅ Quiz-ul calculează corect scorul
8. ✅ Certificatul apare la scor > 85%

### Prioritate 3 - MEDIUM:
9. ✅ Text-to-Speech narration funcționează
10. ✅ Butoanele de navigare (Înapoi/Înainte) funcționează
11. ✅ Progress bar se actualizează
12. ✅ Responsive design pe mobile

---

## 🔍 ERORI DETECTATE (din screenshot)

### Eroare 1: `/favicon.ico` - 404
```
Failed to load resource: the server responded with a status of 404 ()
```
**Impact:** LOW (nu afectează funcționalitatea)
**Fix:** Adaugă favicon.ico sau ignoră eroarea

### Eroare 2: `/index.js` - 404
```
Failed to load resource: the server responded with a status of 404 (index)
```
**Impact:** CRITICAL - Aplicația nu va funcționa fără index.js
**Cauză posibilă:** Server.js nu servește corect fișierele din /src
**Fix:** Verifică configurația server.js

---

## 📋 CHECKLIST TESTARE MODULARĂ

### Modul 1: Server & Infrastructure
- [ ] **1.1** Site se încarcă la https://donut-rkhb.onrender.com
- [ ] **1.2** Server.js servește fișierele din `/src` corect
- [ ] **1.3** CSS se încarcă (`/src/css/main.css`)
- [ ] **1.4** JavaScript modules se încarcă (`/src/js/*.js`)
- [ ] **1.5** Nu există erori 404 critice în console

**Criterii succes:** Pagina principală se afișează complet

---

### Modul 2: Homepage & Navigation
- [ ] **2.1** Logo și navbar se afișează corect
- [ ] **2.2** Butoanele din navbar funcționează (Home, Lecții, Teme, Upload, Profil)
- [ ] **2.3** SPA routing funcționează (URL hash changes)
- [ ] **2.4** Cardurile de pe homepage sunt clickable
- [ ] **2.5** Statisticile se afișează corect

**Criterii succes:** Navigarea între pagini fără page refresh

---

### Modul 3: Pagina Lecții
- [ ] **3.1** Lecțiile se afișează în grid layout
- [ ] **3.2** Filtrele (Toate, Începător, Intermediar, Avansat) funcționează
- [ ] **3.3** Lecția "Teoria Culorilor" are badge "✓ Completat"
- [ ] **3.4** Click pe lecție deschide modul/lecția
- [ ] **3.5** Lecția 1 redirect către `#lesson-color-theory`

**Criterii succes:** Click pe "Teoria Culorilor" → lecția interactivă se încarcă

---

### Modul 4: Lecția - Teoria Culorilor (Structură)
- [ ] **4.1** Lecția se încarcă fără erori JavaScript
- [ ] **4.2** Progress bar se afișează (0% initial)
- [ ] **4.3** Modul 1 (Introducere) se afișează
- [ ] **4.4** Butoanele "Înapoi" și "Înainte" se afișează
- [ ] **4.5** Toggle narration button (fixed bottom-right) apare

**Criterii succes:** Structura lecției e vizibilă și navigabilă

---

### Modul 5: Lecția - Modul 2 (Culori Primare)
- [ ] **5.1** Cardurile pentru Roșu, Galben, Albastru se afișează
- [ ] **5.2** Fiecare card are culoarea corectă în background
- [ ] **5.3** Textul psihologiei culorii e vizibil
- [ ] **5.4** Hover effects funcționează
- [ ] **5.5** Click pe "Înainte" → trece la Modul 3

**Criterii succes:** Cele 3 culori primare sunt clar vizibile

---

### Modul 6: Lecția - Modul 3 (Culori Secundare)
- [ ] **6.1** Color mixer se afișează
- [ ] **6.2** Cele 6 opțiuni de culori (3 primare + 3 secundare) apar
- [ ] **6.3** Click pe două culori → calcul și afișare rezultat
- [ ] **6.4** Mesaj feedback corect (ex: "Roșu + Galben = Portocaliu")
- [ ] **6.5** Animația de mixing funcționează smooth

**Criterii succes:** Poți combina culori și vezi rezultatul

---

### Modul 7: Lecția - Modul 4 (Color Wheel)
- [ ] **7.1** SVG color wheel se afișează (12 culori)
- [ ] **7.2** Culorile sunt aranjate circular corect
- [ ] **7.3** Hover pe culoare → scale 1.1 + brightness
- [ ] **7.4** Click pe culoare → arată complementara
- [ ] **7.5** Drop shadow pe SVG funcționează

**Criterii succes:** Color wheel e interactiv și vizual plăcut

---

### Modul 8: Lecția - Modul 5 (Armonii & Psihologie)
- [ ] **8.1** Secțiunea "Culori Complementare" e vizibilă
- [ ] **8.2** Secțiunea "Culori Analoage" e vizibilă
- [ ] **8.3** Secțiunea "Culori Triadice" e vizibilă
- [ ] **8.4** Regula 60-30-10 e explicată clar
- [ ] **8.5** Psihologia culorilor (6 carduri color) se afișează cu gradient-uri

**Criterii succes:** Toate armoniile sunt explicate vizual

---

### Modul 9: Quiz Interactiv
- [ ] **9.1** Cei 5 întrebări se afișează
- [ ] **9.2** Opțiunile sunt clickable
- [ ] **9.3** Selected option are border albastru
- [ ] **9.4** Click pe "Verifică Răspunsurile" → feedback vizual
- [ ] **9.5** Răspunsuri corecte → border verde
- [ ] **9.6** Răspunsuri greșite → border roșu
- [ ] **9.7** Scor final calculat corect (0-100%)
- [ ] **9.8** Mesaj final bazat pe scor

**Criterii succes:** Quiz funcționează complet și dă feedback corect

---

### Modul 10: Certificat de Completare
- [ ] **10.1** Certificat apare DOAR dacă scor ≥ 85%
- [ ] **10.2** Design gradient (primary → primary-dark)
- [ ] **10.3** Numele utilizatorului apare
- [ ] **10.4** Data completării e corectă
- [ ] **10.5** Buton "Descarcă Certificat" funcționează (placeholder OK)

**Criterii succes:** Certificat se afișează pentru scor înalt

---

### Modul 11: Text-to-Speech Narration
- [ ] **11.1** Web Speech API disponibil în browser
- [ ] **11.2** Click pe toggle narration → pornește/oprește
- [ ] **11.3** Voce română se aude clar
- [ ] **11.4** Rate 0.9 e natural
- [ ] **11.5** Narration se sincronizează cu modulele

**Criterii succes:** Vocea AI citește conținutul în română

**Note:** Funcționează doar în browsere compatibile (Chrome, Edge, Safari)

---

### Modul 12: Responsive Design
- [ ] **12.1** Layout se adaptează pe mobile (< 768px)
- [ ] **12.2** Grid devine 1 coloană pe mobile
- [ ] **12.3** Butoanele sunt suficient de mari pentru touch
- [ ] **12.4** Text e lizibil pe ecrane mici
- [ ] **12.5** Color wheel se scalează corect

**Criterii succes:** Experiență bună pe mobile și desktop

---

## 🐛 BUG TRACKING

### Critical Bugs
| ID | Modul | Bug | Status | Fix |
|----|-------|-----|--------|-----|
| B001 | Server | `/index.js` 404 error | 🔴 OPEN | Verifică server.js paths |
| B002 | Server | `/favicon.ico` 404 | 🟡 LOW | Adaugă favicon sau ignore |

### High Priority Bugs
| ID | Modul | Bug | Status | Fix |
|----|-------|-----|--------|-----|
| - | - | - | - | - |

### Medium Priority Bugs
| ID | Modul | Bug | Status | Fix |
|----|-------|-----|--------|-----|
| - | - | - | - | - |

---

## 📊 METRICI DE SUCCESS

### Performance
- [ ] Page load time < 3 secunde
- [ ] Time to Interactive < 5 secunde
- [ ] No JavaScript errors in console
- [ ] No CSS rendering issues

### Functionality
- [ ] 100% din module funcționează
- [ ] Quiz calculation accuracy: 100%
- [ ] Narration works in supported browsers
- [ ] Navigation smooth (no glitches)

### UX/UI
- [ ] Animations smooth (60fps)
- [ ] Colors accurate (match design)
- [ ] Typography readable
- [ ] Mobile experience good

---

## 🔧 PLAN DE FIX

### Step 1: Rezolvă eroarea critică (index.js 404)
**Acțiune:**
1. Verifică `server.js` - path corect către `/src`
2. Verifică `index.html` - import-uri corecte pentru modules
3. Test local înainte de deploy

### Step 2: Testează fiecare modul individual
**Acțiune:**
1. Pornește de la homepage
2. Navighează către Lecții
3. Deschide lecția Teoria Culorilor
4. Parcurge fiecare modul (1→2→3→4→5)
5. Completează quiz-ul
6. Verifică certificatul

### Step 3: Cross-browser testing
**Browsere de testat:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

### Step 4: Performance testing
**Tools:**
- Chrome DevTools Lighthouse
- Network tab (loading times)
- Console (errors/warnings)

### Step 5: Documentare rezultate
**Output:**
- Screenshot-uri pentru fiecare modul
- Lista de bug-uri găsite
- Raport final de testare

---

## 📝 RAPORT TEMPLATE

```markdown
# Raport Testare - Lecția "Teoria Culorilor"

**Data:** [DATA]
**Tester:** Amalia
**Browser:** [BROWSER + VERSION]
**Device:** [Desktop/Mobile]

## Rezultate Generale
- ✅ Module funcționale: X/12
- ❌ Bug-uri critice: X
- ⚠️ Bug-uri medii: X
- 📊 Scor general: X/100

## Detalii pe Module
[Pentru fiecare modul din checklist]

## Bug-uri Găsite
[Lista completă]

## Recomandări
[Îmbunătățiri sugerate]
```

---

## 🚀 NEXT STEPS DUPĂ TESTARE

1. **Fix critical bugs** - Prioritate MAXIMĂ
2. **Fix high priority bugs** - În 1-2 zile
3. **Polish UI/UX** - Îmbunătățiri cosmetice
4. **Optimize performance** - Dacă e nevoie
5. **Deploy fix-uri** - Push to production
6. **Re-test** - Verifică că fix-urile funcționează

---

*Plan creat: 22 Noiembrie 2025*
*Ready for testing execution!*
