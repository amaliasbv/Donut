# Plan Deployment Separat - DrawHub

## Cuprins
1. [Analiza Situației Actuale](#1-analiza-situației-actuale)
2. [Arhitectura Propusă](#2-arhitectura-propusă)
3. [Modificări Necesare](#3-modificări-necesare)
4. [Plan de Implementare Modular](#4-plan-de-implementare-modular)
5. [Strategia TDD](#5-strategia-tdd)
6. [Configurare Render](#6-configurare-render)
7. [Checklist Final](#7-checklist-final)

---

## 1. Analiza Situației Actuale

### Ce funcționează
| Componentă | Status | Detalii |
|------------|--------|---------|
| Frontend HTML/CSS/JS | ✅ | Se încarcă corect pe Render |
| Router SPA | ✅ | Navigarea funcționează |
| AuthService | ✅ | Cod complet, dar API nu răspunde |
| Backend Code | ✅ | Complet implementat local |
| PWA Manifest | ✅ | Configurat |
| Electron Setup | ✅ | Configurat (nebuildat) |

### Ce NU funcționează
| Componentă | Status | Cauză |
|------------|--------|-------|
| Backend API | ❌ | Nu e deployed pe Render |
| Login/Signup | ❌ | API returnează 503 |
| Database | ❌ | Nu există conexiune |
| Profiluri | ❌ | Nu se salvează |

### Cauza principală
Render rulează `server.js` din rădăcină (doar static files), NU `backend/server.js` (API complet).

---

## 2. Arhitectura Propusă

### Deployment Separat (2 Web Services pe Render)

```
┌─────────────────────────────────────────────────────────────────┐
│                         RENDER.COM                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────┐      ┌─────────────────────┐           │
│  │  WEB SERVICE #1     │      │  WEB SERVICE #2     │           │
│  │  (Frontend)         │      │  (Backend API)      │           │
│  │                     │      │                     │           │
│  │  Root: /            │      │  Root: /backend     │           │
│  │  Build: npm install │      │  Build: npm install │           │
│  │  Start: npm start   │      │  Start: npm start   │           │
│  │                     │      │                     │           │
│  │  URL:               │      │  URL:               │           │
│  │  donut-tkwg.        │      │  drawhub-api.       │           │
│  │  onrender.com       │      │  onrender.com       │           │
│  └──────────┬──────────┘      └──────────┬──────────┘           │
│             │                            │                       │
│             │   API Calls                │                       │
│             │   ────────────────────────>│                       │
│             │                            │                       │
│             │                  ┌─────────┴─────────┐             │
│             │                  │   PostgreSQL DB   │             │
│             │                  │   (Render)        │             │
│             │                  └───────────────────┘             │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Avantaje
1. **Scalabilitate independentă** - Frontend și Backend pot scala separat
2. **Deployment independent** - Poți actualiza API fără a afecta frontend
3. **Debugging ușor** - Logs separate pentru fiecare serviciu
4. **Securitate** - API poate avea reguli de security diferite

---

## 3. Modificări Necesare

### 3.1 Modificări Frontend (MINIME)

**Fișier: `src/js/services/authService.js`**

Trebuie să actualizăm `API_BASE_URL` pentru a pointa către noul backend.

```javascript
// ÎNAINTE (linia 11-14)
this.API_BASE_URL = window.API_BASE_URL ||
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api'
    : '/api'); // Production: same origin - NU FUNCȚIONEAZĂ!

// DUPĂ
this.API_BASE_URL = window.API_BASE_URL ||
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api'
    : 'https://drawhub-api.onrender.com/api'); // Production: Backend separat
```

**Impact:** O singură linie modificată, fără a afecta funcționalitatea existentă.

### 3.2 Modificări Backend (MINIME)

**Fișier: `backend/server.js`**

Trebuie să actualizăm CORS pentru a permite requesturi de pe frontend.

```javascript
// ÎNAINTE (linia 25-29)
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5500',
  credentials: true,
  optionsSuccessStatus: 200
};

// DUPĂ - Permite multiple origini
const allowedOrigins = [
  'http://localhost:5500',
  'http://localhost:3000',
  'https://donut-tkwg.onrender.com',  // Frontend production
  process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};
```

### 3.3 Variabile de Environment (.env inconsistency FIX)

**Problemă identificată:** `.env` folosește `JWT_ACCESS_EXPIRES_IN` dar codul caută `JWT_ACCESS_EXPIRY`

**Fișier: `backend/utils/tokenUtils.js`**

```javascript
// Linia 17 - VERIFICĂ și FIXEAZĂ
const accessExpiry = process.env.JWT_ACCESS_EXPIRY || process.env.JWT_ACCESS_EXPIRES_IN || '15m';
const refreshExpiry = process.env.JWT_REFRESH_EXPIRY || process.env.JWT_REFRESH_EXPIRES_IN || '7d';
```

---

## 4. Plan de Implementare Modular

### Modul 1: Pregătire și Testare Locală (30 min)
```
□ 1.1 Verifică că backend-ul pornește local
    - cd backend && npm install && npm start
    - Test: curl http://localhost:3000/api/health

□ 1.2 Verifică că frontend-ul funcționează local
    - npx http-server ./src -p 5500
    - Test: deschide http://localhost:5500

□ 1.3 Testează signup/login local
    - Creează cont nou
    - Verifică că tokenurile se salvează
```

### Modul 2: Fixuri Critice (15 min)
```
□ 2.1 Fix JWT_ACCESS_EXPIRY inconsistency
    - Fișier: backend/utils/tokenUtils.js
    - Adaugă fallback pentru ambele variante

□ 2.2 Fix CORS pentru producție
    - Fișier: backend/server.js
    - Adaugă URL-ul frontend-ului Render

□ 2.3 Actualizează API_BASE_URL în frontend
    - Fișier: src/js/services/authService.js
    - Pointează către backend-ul nou
```

### Modul 3: Configurare Render Backend (20 min)
```
□ 3.1 Creează Web Service nou pe Render
    - Name: drawhub-api
    - Repository: același (Donut)
    - Root Directory: backend
    - Build Command: npm install
    - Start Command: npm start

□ 3.2 Creează PostgreSQL Database
    - Name: drawhub-db
    - Plan: Free
    - Notează DATABASE_URL

□ 3.3 Configurează Environment Variables
    - DATABASE_URL (din Render PostgreSQL)
    - JWT_ACCESS_SECRET (generează nou, 64+ chars)
    - JWT_REFRESH_SECRET (generează nou, 64+ chars)
    - JWT_ACCESS_EXPIRY=15m
    - JWT_REFRESH_EXPIRY=7d
    - FRONTEND_URL=https://donut-tkwg.onrender.com
    - NODE_ENV=production
```

### Modul 4: Deploy și Verificare (15 min)
```
□ 4.1 Push modificările la GitHub
□ 4.2 Verifică deploy-ul backend
    - curl https://drawhub-api.onrender.com/api/health
□ 4.3 Verifică deploy-ul frontend
    - Deschide https://donut-tkwg.onrender.com
□ 4.4 Testează signup/login în producție
```

---

## 5. Strategia TDD (Test-Driven Development)

### 5.1 Teste Existente de Rulat

Backend-ul are deja scripturi de test:

```bash
# Test conexiune database
cd backend
npm run db:test

# Creează database și tabele
npm run db:create

# Creează database cu date de test
npm run db:seed
```

### 5.2 Teste Manuale Înainte de Deploy

#### Test 1: Health Check
```bash
# Local
curl http://localhost:3000/api/health

# Așteptat:
{
  "status": "ok",
  "message": "DrawHub API Server is running",
  "database": "connected",
  "timestamp": "...",
  "environment": "development"
}
```

#### Test 2: Signup
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPass123"}'

# Așteptat:
{
  "success": true,
  "message": "Account created successfully!...",
  "user": { "id": 1, "email": "test@example.com", "isVerified": true }
}
```

#### Test 3: Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPass123"}'

# Așteptat:
{
  "success": true,
  "accessToken": "eyJ...",
  "refreshToken": "eyJ...",
  "needsOnboarding": true
}
```

#### Test 4: Profile (cu token)
```bash
# Folosește accessToken din login
curl http://localhost:3000/api/profile \
  -H "Authorization: Bearer eyJ..."

# Așteptat (user nou):
{
  "success": false,
  "needsOnboarding": true,
  "message": "Profile not found. Please complete onboarding."
}
```

### 5.3 Test Suite Automatizată (Opțional - Viitor)

Structură recomandată pentru teste automate:

```
backend/
  tests/
    unit/
      models/
        user.test.js
        userProfile.test.js
        refreshToken.test.js
      utils/
        tokenUtils.test.js
        emailService.test.js
    integration/
      auth.test.js
      profile.test.js
    e2e/
      signup-login-flow.test.js
```

**Package.json update pentru teste:**
```json
{
  "scripts": {
    "test": "jest",
    "test:unit": "jest tests/unit",
    "test:integration": "jest tests/integration",
    "test:e2e": "jest tests/e2e"
  },
  "devDependencies": {
    "jest": "^29.x",
    "supertest": "^6.x"
  }
}
```

---

## 6. Configurare Render

### 6.1 Pasul 1: Creează Backend Web Service

1. Mergi la [render.com](https://render.com) → Dashboard
2. Click **New** → **Web Service**
3. Conectează repository-ul GitHub (Donut)
4. Configurează:

| Setting | Value |
|---------|-------|
| Name | `drawhub-api` |
| Region | Frankfurt (EU Central) |
| Branch | `main` |
| Root Directory | `backend` |
| Runtime | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Plan | Free |

### 6.2 Pasul 2: Creează PostgreSQL Database

1. În Render Dashboard → **New** → **PostgreSQL**
2. Configurează:

| Setting | Value |
|---------|-------|
| Name | `drawhub-db` |
| Region | Frankfurt (EU Central) |
| PostgreSQL Version | 15 |
| Plan | Free |

3. După creare, copiază **Internal Database URL**

### 6.3 Pasul 3: Environment Variables pentru Backend

În Backend Web Service → Environment:

```env
# Database (copiază din Render PostgreSQL)
DATABASE_URL=postgresql://user:pass@host/dbname

# JWT Secrets (generează cu: openssl rand -hex 32)
JWT_ACCESS_SECRET=<64-character-random-string>
JWT_REFRESH_SECRET=<64-character-random-string>

# JWT Expiry
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Frontend URL
FRONTEND_URL=https://donut-tkwg.onrender.com

# Environment
NODE_ENV=production
PORT=10000
```

### 6.4 Pasul 4: Verifică Frontend Service

Frontend-ul existent (`donut-tkwg.onrender.com`) trebuie să rămână neschimbat în Render, doar codul se actualizează prin push.

---

## 7. Checklist Final

### Pre-Deploy
- [ ] Backend pornește local fără erori
- [ ] Teste locale trec (health, signup, login, profile)
- [ ] CORS configurat pentru producție
- [ ] API_BASE_URL actualizat în frontend
- [ ] JWT secrets generate (64+ caractere fiecare)

### Deploy Backend
- [ ] Web Service creat pe Render (drawhub-api)
- [ ] PostgreSQL Database creat (drawhub-db)
- [ ] Environment variables configurate
- [ ] Deploy reușit (verde în Render)
- [ ] Health check funcționează: `curl https://drawhub-api.onrender.com/api/health`

### Deploy Frontend
- [ ] Modificări pushed la GitHub
- [ ] Frontend redeploy automat
- [ ] Pagina se încarcă fără erori console

### Testare Producție
- [ ] Signup funcționează
- [ ] Login funcționează
- [ ] Token refresh funcționează
- [ ] Onboarding salvează profilul
- [ ] Profile page afișează datele

### Post-Deploy
- [ ] Monitorizare logs în Render
- [ ] Verifică că email-urile se trimit (opțional)
- [ ] Test pe mobil/tabletă
- [ ] PWA instalabil

---

## Anexe

### A. Generare JWT Secrets

```bash
# Pe Windows (PowerShell):
[System.Convert]::ToBase64String((1..48 | ForEach-Object { Get-Random -Maximum 256 }))

# Pe Linux/Mac:
openssl rand -hex 32

# Sau online:
# https://generate-secret.vercel.app/64
```

### B. Structura URL-urilor Finale

| Service | URL |
|---------|-----|
| Frontend | https://donut-tkwg.onrender.com |
| Backend API | https://drawhub-api.onrender.com |
| API Health | https://drawhub-api.onrender.com/api/health |
| API Docs | https://drawhub-api.onrender.com/api |

### C. Troubleshooting

#### Backend nu pornește
```bash
# Verifică logs în Render Dashboard
# Caută erori de:
# - DATABASE_URL invalid
# - JWT_SECRET lipsă
# - Port binding (folosește process.env.PORT)
```

#### CORS errors în browser
```
# Verifică că FRONTEND_URL e setat corect
# Verifică că origin-ul frontend-ului e în lista allowedOrigins
```

#### Database connection failed
```
# Verifică că DATABASE_URL e corect copiat
# Verifică că PostgreSQL e în aceeași regiune
# Folosește Internal Database URL, nu External
```

---

**Document creat:** 2024-12-28
**Versiune:** 1.0
**Autor:** Claude Code Assistant
