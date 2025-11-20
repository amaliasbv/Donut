# SPECIFICAȚIE PENTRU APLICAȚIA DE ARTĂ / DESEN

## 1. Scopul aplicației

O aplicație de învățare și antrenament artistic, construită după structura unui liceu/colegiu de artă, în care utilizatorul:

- **Învață teorie** (culoare, compoziție, umbre, proporții etc.)
- **Primește teme personalizate** de desen/pictură
- **Poate încărca poze** cu lucrările sale
- **Primește corecții și feedback detaliat** de la AI, ca un profesor
- **Are acces la exemple vizuale**, referințe și ghiduri pas cu pas

---

## 2. Funcții principale

### 2.1 Lecții teoretice

Include module ca:

- **Teoria culorilor**: cerc cromatic, complementaritate, armonii de culori, temperatură, contrast
- **Lumină & Umbre**: umbre dure/soft, valoare tonală, lumină ambientală, lumină direcțională
- **Perspectivă**: 1 punct, 2 puncte, aeriană, distorsiune
- **Anatomie**: cap, corp, proporții, mișcare
- **Compoziție**: reguli (treimi, ritm, flow), accent, balans
- **Materiale**: creion, cărbune, cerneală, acuarelă, ulei, tabletă grafică
- **Stiluri**: realism, ilustrație, manga, impresionism etc.

**Lecțiile pot avea:**
- Mini-teste
- Exemple vizuale
- Exerciții scurte

---

### 2.2 Sistem de teme (ca la liceu)

AI-ul generează teme personalizate în funcție de nivel:

- **Începător**: forme simple, shading, natură statică simplă
- **Intermediar**: compoziție cu 3-5 obiecte, portret simplu
- **Avansat**: ilustrații complexe, perspective, scene narative

**Fiecare temă include:**
- Descrierea cerinței
- Timp estimat
- Nivel de dificultate
- Poză inspirațională (foto referință) generată de AI sau din bibliotecă

---

### 2.3 Upload desen + feedback

Utilizatorul face poză desenului și AI-ul:

- **Analizează proporțiile**
- **Analizează umbre/lumină**
- **Compară cu referința**
- **Oferă corecții precise**: „nasul e puțin prea scurt", „umbra trebuie să fie mai soft", „linia orizontului este înclinată" etc.
- **Sugerează pași de îmbunătățire**

---

### 2.4 Modul de progres

**Trackere:**
- Progres la fiecare lecție
- Skill-uri îmbunătățite
- Badge-uri (ex. „Maestru în Umbre", „Regele Tonurilor")
- Jurnal vizual cu toate lucrările utilizatorului

---

### 2.5 Instrumente suplimentare (opționale, dar recomandate)

- **Overlay mode**: utilizatorul pune poza desenului, aplicația arată erorile cu linii trasate deasupra
- **Construcție ghidată**: AI-ul arată „pas cu pas cum ar fi construit un artist profesionist același desen"
- **Mod de studiu liber**: utilizatorul cere oricând: „Vreau o referință pentru un portret în lumină laterală"
- **Generare de compoziții**: AI combină obiecte, culori și lumini pentru idei de desen
- **Corecție de culoare**: dacă desenul este color, AI explică armoniile, problemele de saturație, temperatură etc.

---

## 3. Structura aplicației (flow general)

### Pagina de start
- Începe lecții
- Ia o temă nouă
- Încarcă un desen
- Portofoliul meu

### Lecții
- Modul de teorie
- Exerciții aplicate
- Test rapid

### Teme
- Primești tema
- Vezi referințele
- Ai cronometru / progres
- Trimiți tema prin poză

### Feedback AI
- Analiza desenului
- Corecții
- Recomandări de studiu
- Posibilitate de re-upload

### Profil utilizator
- Progres
- Abilități
- Istoricul temelor
- Galerie

---

## 4. Tehnologii recomandate

Depinde ce AI folosești, dar în general:

- **Backend**: Python/Node.js + API AI
- **Frontend**: Flutter/React Native (mobil) sau React/Vue.js (web)
- **Model de analiză**: Vision AI (pentru pozele cu desene)
- **Model text**: GPT-4 (pentru lecții + feedback)
- **Database**: PostgreSQL/MongoDB pentru stocare utilizatori și progres
- **Storage**: AWS S3/Cloudinary pentru imagini

---

## 5. Funcții premium (opțional, dar ar ridica aplicația la nivel superior)

### ✔ Mod Live Teacher
- Utilizatorul poate desena și face poză progresiv
- AI corectează în timp real

### ✔ Comparare stilistică
- Utilizatorul poate cere:
  - „Fă-l în stil manga"
  - „Fă-l în stil Caravaggio"
- AI generează referințe/art direction

### ✔ Gamificare
- Questuri zilnice
- Niveluri de experiență
- Clasamente între prieteni

### ✔ Mod pentru profesori
- Poate crea clase și urmărește elevii
- Dashboard pentru progres elevi
- Feedback personalizat suplimentar

---

## 6. Modelul de business (considerații viitoare)

### Freemium:
- **Gratuit**:
  - 3-5 lecții de bază
  - 2 teme pe săptămână
  - Feedback AI limitat

- **Premium** ($4.99-9.99/lună):
  - Toate lecțiile
  - Teme nelimitate
  - Feedback detaliat nelimitat
  - Generare referințe custom
  - Mod Live Teacher

### Alternativ:
- **Licențe pentru școli**: pachet pentru profesori și clase întregi

---

## 7. Public țintă

- **Începători** (12-18 ani): elevi care vor să învețe desen
- **Hobbyști** (18-35 ani): adulți care desenează în timpul liber
- **Studenți artă** (18-25 ani): studenți la arte plastice care vor practică suplimentară
- **Profesori**: care caută tool-uri educaționale

---

## 8. Diferențiatori față de competiție

- **Structurare ca liceu de artă** (curriculum structurat)
- **Feedback AI personalizat** și precis
- **Sistem de progres gamificat**
- **Generare automată de teme** adaptate la nivel
- **Comunitate și social learning**

---

*Documentație creată: 20 Noiembrie 2025*
*Creat de: Amalia (16 ani)*
*Asistent: Claude (Anthropic)*
