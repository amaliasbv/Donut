# 🎨 DrawHub - Art Learning Platform

> **Aplicație de învățare artistică alimentată de AI, creată de Amalia (16 ani)**

O platformă educațională interactivă care funcționează ca un liceu de artă digital, oferind lecții structurate, teme personalizate și feedback detaliat de la AI pentru desenele utilizatorilor.

---

## 📋 Conținut Documentație

1. **[SPECIFICATIE.md](./SPECIFICATIE.md)** - Specificație completă a aplicației
2. **[PLAN_IMPLEMENTARE.md](./PLAN_IMPLEMENTARE.md)** - Plan tehnic detaliat și arhitectură
3. **[NEXT_STEPS.md](./NEXT_STEPS.md)** - Pași imediați pentru următoarele 2 săptămâni

---

## 🎯 Viziunea Proiectului

### Scopul principal
O aplicație care transformă învățarea artistică prin:
- 📚 **Lecții structurate** (teorie culorilor, perspective, anatomie, etc.)
- 📝 **Teme personalizate** generate de AI în funcție de nivel
- 📸 **Upload desene** și primire feedback instant
- 🎓 **Feedback de profesor AI** - analiză detaliată a proporțiilor, umbrelor, compoziției
- 📊 **Tracking progres** - skill development, badges, gamification

---

## 🚀 Status Curent

### Versiunea actuală: DrawHub v0.1 (Prototype)
- [x] Canvas interactiv de desen
- [x] 8 culori + selector grosime pensulă
- [x] Funcție gumă și clear canvas
- [x] Salvare desen ca PNG
- [x] 4 tutoriale de bază (cerc, casă, floare, față)
- [x] Support touch pentru mobil
- [x] Deployed pe Render: [donut-tkwg.onrender.com](https://donut-tkwg.onrender.com)

### Ce urmează: MVP cu AI (Faza 1)
- [ ] Backend API (Node.js + Express)
- [ ] Database pentru utilizatori (PostgreSQL)
- [ ] Integrare OpenAI GPT-4 Vision
- [ ] Upload imagine + AI feedback
- [ ] Sistem de lecții (5-10 lecții inițiale)
- [ ] Profil utilizator cu progres

**Timeline estimat**: 6-8 săptămâni

---

## 💻 Tech Stack

### Current (v0.1)
- HTML5 Canvas
- Vanilla JavaScript
- CSS3 (Responsive)
- Node.js + Express (server static)

### Planned (MVP)
```
Frontend:   React.js + Tailwind CSS
Backend:    Node.js + Express.js
Database:   PostgreSQL
AI:         OpenAI GPT-4 Vision API
Storage:    Cloudinary
Hosting:    Render (backend) + Vercel (frontend)
```

---

## 📁 Structura Proiectului

```
Donut/
├── index.html              # Main page (current DrawHub)
├── style.css               # Styling
├── script.js               # Canvas drawing logic
├── server.js               # Express server
├── package.json            # Dependencies
│
├── SPECIFICATIE.md         # Full specification
├── PLAN_IMPLEMENTARE.md    # Technical implementation plan
├── NEXT_STEPS.md           # Immediate action items
└── README.md               # This file
```

---

## 🎓 Features Roadmap

### Faza 1: MVP (2-3 luni)
- [x] Prototip canvas desen
- [ ] Autentificare utilizatori
- [ ] 10-15 lecții teoretice
- [ ] Upload desene
- [ ] AI feedback basic
- [ ] Profil + progres

### Faza 2: Core Features (2-3 luni)
- [ ] Sistem complet de teme
- [ ] Generare teme de AI
- [ ] Feedback AI avansat (overlay, comparație)
- [ ] Badge system
- [ ] Dashboard progres

### Faza 3: Advanced (2-3 luni)
- [ ] Gamification (XP, levels, quests)
- [ ] Social features (follow, like, comment)
- [ ] Mobile app (React Native)
- [ ] AI Live Teacher mode
- [ ] Mod pentru profesori

---

## 📊 Metrici de Success

### MVP Success Criteria:
- 50+ utilizatori beta
- 500+ desene uploadate
- 90%+ satisfaction AI feedback
- 3+ lecții completate/user în medie

### După 6 luni:
- 1,000 utilizatori activi
- 10,000+ desene
- 50% retention rate
- Featured în 3+ publicații

---

## 💡 Diferențiatori Competitivi

✨ **Ce face DrawHub unic:**

1. **Structură academică** - curriculum ca la liceu de artă
2. **AI ca profesor personal** - feedback personalizat și detaliat
3. **Progres gamificat** - sistem de XP, levels, badges
4. **Generare automată teme** - teme personalizate după nivel
5. **Focus pe educație** - nu doar tool de desen, ci platformă de învățare

---

## 🎯 Public Țintă

- **Adolescenți** (12-18 ani): Elevi care vor să învețe desen
- **Hobbyști** (18-35 ani): Adulți care desenează în timpul liber
- **Studenți artă** (18-25 ani): Studenți care vor practică extra
- **Profesori**: Caută tool-uri educaționale pentru clasă

---

## 💰 Model de Business (Viitor)

### Freemium:
- **Free**: 3-5 lecții, 2 teme/săptămână, feedback limitat
- **Premium** ($4.99-9.99/lună): Toate lecțiile, feedback nelimitat, AI Live Teacher

### Alternative:
- Licențe pentru școli (B2B)
- Marketplace pentru instructori independenți

---

## 🛠️ Getting Started (Development)

### Prerequisites:
```bash
Node.js >= 18
npm >= 9
Git
```

### Installation:
```bash
# Clone repo
git clone https://github.com/amaliasbv/Donut.git
cd Donut

# Install dependencies
npm install

# Run local server
npm start

# Open in browser
http://localhost:3000
```

### Environment Variables:
```
OPENAI_API_KEY=your_key_here
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
DATABASE_URL=your_postgres_url
```

---

## 📚 Resources & Learning

### Documentație:
- [React Docs](https://react.dev)
- [OpenAI API](https://platform.openai.com/docs)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html)

### Tutorials recomandate:
- Full Stack Open: [fullstackopen.com](https://fullstackopen.com)
- Node.js Guide: [nodejs.org/en/learn](https://nodejs.org/en/learn)

---

## 🤝 Contributing

Acest proiect este în dezvoltare activă! Dacă vrei să contribui:

1. Fork the repo
2. Creează branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Deschide Pull Request

---

## 📝 License

MIT License - vezi [LICENSE](LICENSE) pentru detalii

---

## 👩‍💻 Despre Creator

**Amalia** - 16 ani, pasionată de programare și artă

- 🌱 Învăț: React, Node.js, AI/ML
- 🎨 Proiecte: DrawHub (art learning platform)
- 📫 Contact: [GitHub](https://github.com/amaliasbv)

---

## 🙏 Acknowledgments

- OpenAI pentru GPT-4 Vision API
- Render pentru hosting gratuit
- Comunitatea open-source
- Claude (Anthropic) pentru asistență în dezvoltare

---

## 📅 Timeline

- **Nov 2025**: Început proiect, prototip DrawHub
- **Dec 2025**: MVP planning & learning
- **Jan-Feb 2026**: MVP development
- **Mar 2026**: Beta testing
- **Apr 2026**: Public launch v1.0

---

## 🚀 Status: In Active Development

**Next milestone**: MVP cu AI feedback (Faza 1)
**ETA**: Februarie 2026

---

*"Start small, dream big, iterate fast!"*

Made with ❤️ by Amalia | © 2025
