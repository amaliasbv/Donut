// LECȚIA 1: Teoria Culorilor - Interactive Lesson
import State from '../utils/state.js';

export default class ColorTheoryLesson {
    constructor() {
        this.state = State.getInstance();
        this.currentModule = 0;
        this.totalModules = 5;
        this.quizScore = 0;
        this.narrationEnabled = true;
        this.synth = window.speechSynthesis;
    }

    async render() {
        return `
            <div class="lesson-container">
                <!-- Progress Bar -->
                <div class="lesson-progress-bar">
                    <div class="progress-fill" style="width: 0%" id="lessonProgress"></div>
                </div>

                <!-- Lesson Header -->
                <div class="lesson-header">
                    <button class="btn-back" id="backToLessons">← Înapoi</button>
                    <h1>🎨 Lecția 1: Teoria Culorilor</h1>
                    <div class="lesson-controls">
                        <button class="btn-icon" id="toggleNarration" title="Toggle narration">
                            🔊
                        </button>
                    </div>
                </div>

                <!-- Main Content Area -->
                <div class="lesson-content" id="lessonContent">
                    ${this.renderIntro()}
                </div>

                <!-- Navigation Buttons -->
                <div class="lesson-navigation">
                    <button class="btn btn-secondary" id="prevModule" style="display: none;">
                        ← Anterior
                    </button>
                    <button class="btn btn-primary" id="nextModule">
                        Următorul →
                    </button>
                </div>
            </div>

            <style>
                .lesson-container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 2rem;
                }

                .lesson-progress-bar {
                    background: var(--bg-light);
                    height: 8px;
                    border-radius: 10px;
                    margin-bottom: 2rem;
                    overflow: hidden;
                }

                .progress-fill {
                    background: linear-gradient(90deg, var(--primary), var(--secondary));
                    height: 100%;
                    transition: width 0.5s ease;
                }

                .lesson-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 2px solid var(--border);
                }

                .lesson-header h1 {
                    color: var(--primary);
                    font-size: 2rem;
                }

                .btn-back {
                    background: none;
                    border: none;
                    color: var(--text-gray);
                    cursor: pointer;
                    font-size: 1rem;
                    padding: 0.5rem 1rem;
                }

                .btn-back:hover {
                    color: var(--primary);
                }

                .btn-icon {
                    background: var(--bg-light);
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 1.2rem;
                    transition: transform 0.3s;
                }

                .btn-icon:hover {
                    transform: scale(1.1);
                }

                .btn-icon.muted {
                    opacity: 0.5;
                }

                .lesson-content {
                    background: white;
                    border-radius: var(--radius-lg);
                    padding: 3rem;
                    min-height: 500px;
                    box-shadow: var(--shadow);
                }

                .lesson-navigation {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 2rem;
                }

                .module-intro {
                    text-align: center;
                    padding: 2rem;
                }

                .module-intro h2 {
                    color: var(--primary);
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                }

                .module-intro p {
                    font-size: 1.2rem;
                    line-height: 1.8;
                    color: var(--text-gray);
                    margin-bottom: 1.5rem;
                }

                .learning-objectives {
                    text-align: left;
                    max-width: 600px;
                    margin: 2rem auto;
                    background: var(--bg-light);
                    padding: 2rem;
                    border-radius: var(--radius);
                }

                .learning-objectives h3 {
                    color: var(--primary);
                    margin-bottom: 1rem;
                }

                .learning-objectives ul {
                    list-style: none;
                    padding: 0;
                }

                .learning-objectives li {
                    padding: 0.75rem 0;
                    border-bottom: 1px solid var(--border);
                }

                .learning-objectives li:before {
                    content: "✓";
                    color: var(--success);
                    font-weight: bold;
                    margin-right: 0.75rem;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .lesson-content > * {
                    animation: fadeIn 0.6s ease-out;
                }
            </style>
        `;
    }

    renderIntro() {
        return `
            <div class="module-intro">
                <h2>🎨 Bun venit la Teoria Culorilor!</h2>
                <p>
                    Culorile sunt sufletul oricărui desen. Astăzi vei învăța cum să alegi și să combini
                    culorile perfecte pentru creațiile tale artistice.
                </p>
                <p>
                    La finalul acestei lecții, vei putea să:
                </p>

                <div class="learning-objectives">
                    <h3>📚 Ce vei învăța:</h3>
                    <ul>
                        <li>Să înțelegi cercul cromatic și cele 12 culori</li>
                        <li>Să identifici culorile primare, secundare și terțiare</li>
                        <li>Să creezi armonii de culori complementare și analoage</li>
                        <li>Să aplici regula 60-30-10 pentru paleta perfectă</li>
                        <li>Să folosești psihologia culorilor în desenele tale</li>
                    </ul>
                </div>

                <div style="margin-top: 2rem; padding: 1.5rem; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: var(--radius); font-size: 1.1rem;">
                    ⏱️ Durata estimată: 30 minute<br>
                    📖 5 module interactive<br>
                    ✅ Mini-test la final
                </div>
            </div>
        `;
    }

    renderModule1_PrimaryColors() {
        return `
            <div class="module-content">
                <h2 style="color: var(--primary); text-align: center; margin-bottom: 2rem;">
                    🔴🟡🔵 Culorile Primare
                </h2>

                <p style="font-size: 1.2rem; text-align: center; margin-bottom: 3rem;">
                    Culorile primare sunt <strong>fundamentul</strong> tuturor celorlalte culori.
                    Nu pot fi create prin amestecarea altor culori.
                </p>

                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin: 3rem 0;">
                    <div class="color-card" style="text-align: center;">
                        <div style="width: 150px; height: 150px; background: #FF0000; border-radius: 50%; margin: 0 auto 1rem; box-shadow: 0 10px 30px rgba(255,0,0,0.3);"></div>
                        <h3 style="color: #FF0000;">Roșu</h3>
                        <p style="color: var(--text-gray); font-size: 0.9rem;">Pasiune • Energie • Atenție</p>
                    </div>

                    <div class="color-card" style="text-align: center;">
                        <div style="width: 150px; height: 150px; background: #FFFF00; border-radius: 50%; margin: 0 auto 1rem; box-shadow: 0 10px 30px rgba(255,255,0,0.3);"></div>
                        <h3 style="color: #DDB000;">Galben</h3>
                        <p style="color: var(--text-gray); font-size: 0.9rem;">Veselie • Optimism • Lumină</p>
                    </div>

                    <div class="color-card" style="text-align: center;">
                        <div style="width: 150px; height: 150px; background: #0000FF; border-radius: 50%; margin: 0 auto 1rem; box-shadow: 0 10px 30px rgba(0,0,255,0.3);"></div>
                        <h3 style="color: #0000FF;">Albastru</h3>
                        <p style="color: var(--text-gray); font-size: 0.9rem;">Calm • Încredere • Pace</p>
                    </div>
                </div>

                <div style="background: var(--bg-light); padding: 2rem; border-radius: var(--radius); margin-top: 3rem;">
                    <h4 style="color: var(--primary); margin-bottom: 1rem;">💡 De reținut:</h4>
                    <p style="line-height: 1.8;">
                        Culorile primare sunt <strong>roșu, galben și albastru</strong>.
                        Gândește-te la ele ca la <strong>ingredientele de bază</strong> din care vei crea toate celelalte culori!
                        În desenul tău, acestea sunt cele mai pure și intense culori pe care le poți folosi.
                    </p>
                </div>
            </div>
        `;
    }

    renderModule2_SecondaryColors() {
        return `
            <div class="module-content">
                <h2 style="color: var(--primary); text-align: center; margin-bottom: 2rem;">
                    🟢🟠🟣 Culorile Secundare
                </h2>

                <p style="font-size: 1.2rem; text-align: center; margin-bottom: 3rem;">
                    Când amesteci <strong>două culori primare</strong>, obții o culoare secundară!
                </p>

                <div class="color-mixing-demo" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 3rem 0;">
                    <!-- Verde -->
                    <div style="text-align: center;">
                        <div style="display: flex; justify-content: center; align-items: center; gap: 0.3rem; margin-bottom: 1rem; flex-wrap: wrap;">
                            <div style="width: 50px; height: 50px; background: #FFFF00; border-radius: 50%; flex-shrink: 0;"></div>
                            <span style="font-size: 1.5rem;">+</span>
                            <div style="width: 50px; height: 50px; background: #0000FF; border-radius: 50%; flex-shrink: 0;"></div>
                            <span style="font-size: 1.5rem;">=</span>
                            <div style="width: 70px; height: 70px; background: #00FF00; border-radius: 50%; box-shadow: 0 8px 20px rgba(0,255,0,0.4); flex-shrink: 0;"></div>
                        </div>
                        <h3 style="color: #00AA00;">Verde</h3>
                        <p style="color: var(--text-gray); font-size: 0.9rem;">Natură • Prospețime • Echilibru</p>
                    </div>

                    <!-- Portocaliu -->
                    <div style="text-align: center;">
                        <div style="display: flex; justify-content: center; align-items: center; gap: 0.3rem; margin-bottom: 1rem; flex-wrap: wrap;">
                            <div style="width: 50px; height: 50px; background: #FF0000; border-radius: 50%; flex-shrink: 0;"></div>
                            <span style="font-size: 1.5rem;">+</span>
                            <div style="width: 50px; height: 50px; background: #FFFF00; border-radius: 50%; flex-shrink: 0;"></div>
                            <span style="font-size: 1.5rem;">=</span>
                            <div style="width: 70px; height: 70px; background: #FF8800; border-radius: 50%; box-shadow: 0 8px 20px rgba(255,136,0,0.4); flex-shrink: 0;"></div>
                        </div>
                        <h3 style="color: #FF8800;">Portocaliu</h3>
                        <p style="color: var(--text-gray); font-size: 0.9rem;">Entuziasm • Căldură • Creativitate</p>
                    </div>

                    <!-- Violet -->
                    <div style="text-align: center;">
                        <div style="display: flex; justify-content: center; align-items: center; gap: 0.3rem; margin-bottom: 1rem; flex-wrap: wrap;">
                            <div style="width: 50px; height: 50px; background: #FF0000; border-radius: 50%; flex-shrink: 0;"></div>
                            <span style="font-size: 1.5rem;">+</span>
                            <div style="width: 50px; height: 50px; background: #0000FF; border-radius: 50%; flex-shrink: 0;"></div>
                            <span style="font-size: 1.5rem;">=</span>
                            <div style="width: 70px; height: 70px; background: #8800FF; border-radius: 50%; box-shadow: 0 8px 20px rgba(136,0,255,0.4); flex-shrink: 0;"></div>
                        </div>
                        <h3 style="color: #8800FF;">Violet</h3>
                        <p style="color: var(--text-gray); font-size: 0.9rem;">Mister • Lux • Imaginație</p>
                    </div>
                </div>

                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: var(--radius); color: white; margin-top: 3rem;">
                    <h4 style="margin-bottom: 1rem;">🎨 Încearcă tu!</h4>
                    <p>
                        În desenul tău, poți crea orice culoare secundară doar cu cele 3 culori primare.
                        Nu ai nevoie de multe tuburi de vopsea - doar știință și practică!
                    </p>
                </div>
            </div>
        `;
    }

    renderModule3_ColorWheel() {
        return `
            <div class="module-content">
                <h2 style="color: var(--primary); text-align: center; margin-bottom: 2rem;">
                    🎡 Cercul Cromatic Complet
                </h2>

                <p style="font-size: 1.2rem; text-align: center; margin-bottom: 3rem;">
                    Cercul cromatic conține toate cele <strong>12 culori</strong>: 3 primare, 3 secundare și 6 terțiare.
                </p>

                <!-- SVG Color Wheel -->
                <div id="colorWheelContainer" style="max-width: 500px; margin: 0 auto 3rem;">
                    ${this.renderColorWheelSVG()}
                </div>

                <div style="background: var(--bg-light); padding: 2rem; border-radius: var(--radius);">
                    <h3 style="color: var(--primary); margin-bottom: 1.5rem;">📍 Relații între Culori:</h3>

                    <div style="display: grid; gap: 1.5rem;">
                        <div style="padding: 1rem; background: white; border-radius: var(--radius); border-left: 4px solid #FF0000;">
                            <h4 style="color: var(--primary);">Complementare</h4>
                            <p>Culori <strong>opuse pe cerc</strong>. Creează cel mai puternic contrast.</p>
                            <p style="font-size: 0.9rem; color: var(--text-gray);">
                                Exemplu: Roșu-Verde, Albastru-Portocaliu, Galben-Violet
                            </p>
                        </div>

                        <div style="padding: 1rem; background: white; border-radius: var(--radius); border-left: 4px solid #00FF00;">
                            <h4 style="color: var(--primary);">Analoage</h4>
                            <p>Culori <strong>alăturate pe cerc</strong>. Creează armonii naturale.</p>
                            <p style="font-size: 0.9rem; color: var(--text-gray);">
                                Exemplu: Albastru, Albastru-Verde, Verde
                            </p>
                        </div>

                        <div style="padding: 1rem; background: white; border-radius: var(--radius); border-left: 4px solid #0000FF;">
                            <h4 style="color: var(--primary);">Triadice</h4>
                            <p><strong>3 culori echidistante</strong> pe cerc. Palete vibrante și echilibrate.</p>
                            <p style="font-size: 0.9rem; color: var(--text-gray);">
                                Exemplu: Roșu, Galben, Albastru (primiarele!)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderColorWheelSVG() {
        const colors = [
            { name: 'Roșu', hex: '#FF0000', angle: 0 },
            { name: 'Roșu-Portocaliu', hex: '#FF4400', angle: 30 },
            { name: 'Portocaliu', hex: '#FF8800', angle: 60 },
            { name: 'Galben-Portocaliu', hex: '#FFCC00', angle: 90 },
            { name: 'Galben', hex: '#FFFF00', angle: 120 },
            { name: 'Galben-Verde', hex: '#88FF00', angle: 150 },
            { name: 'Verde', hex: '#00FF00', angle: 180 },
            { name: 'Albastru-Verde', hex: '#00FF88', angle: 210 },
            { name: 'Albastru', hex: '#0000FF', angle: 240 },
            { name: 'Albastru-Violet', hex: '#4400FF', angle: 270 },
            { name: 'Violet', hex: '#8800FF', angle: 300 },
            { name: 'Roșu-Violet', hex: '#FF0088', angle: 330 }
        ];

        let segments = '';
        const centerX = 250;
        const centerY = 250;
        const radius = 200;
        const innerRadius = 80;

        colors.forEach((color, i) => {
            const angle1 = (color.angle - 15) * Math.PI / 180;
            const angle2 = (color.angle + 15) * Math.PI / 180;

            const x1 = centerX + radius * Math.cos(angle1);
            const y1 = centerY + radius * Math.sin(angle1);
            const x2 = centerX + radius * Math.cos(angle2);
            const y2 = centerY + radius * Math.sin(angle2);
            const x3 = centerX + innerRadius * Math.cos(angle2);
            const y3 = centerY + innerRadius * Math.sin(angle2);
            const x4 = centerX + innerRadius * Math.cos(angle1);
            const y4 = centerY + innerRadius * Math.sin(angle1);

            segments += `
                <path d="M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}
                         L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z"
                      fill="${color.hex}"
                      class="color-segment"
                      data-color="${color.name}"
                      style="cursor: pointer; transition: transform 0.3s;"
                      onmouseover="this.style.transform='scale(1.1)'; this.style.transformOrigin='250px 250px';"
                      onmouseout="this.style.transform='scale(1)';">
                </path>
            `;
        });

        return `
            <svg width="500" height="500" viewBox="0 0 500 500" style="display: block; margin: 0 auto;">
                ${segments}
                <circle cx="250" cy="250" r="${innerRadius}" fill="white" stroke="var(--border)" stroke-width="2"/>
                <text x="250" y="250" text-anchor="middle" dy=".3em" fill="var(--text-gray)" font-size="16">
                    Cercul Cromatic
                </text>
            </svg>
        `;
    }

    renderModule4_Harmonies() {
        return `
            <div class="module-content">
                <h2 style="color: var(--primary); text-align: center; margin-bottom: 2rem;">
                    🎵 Armonii de Culori
                </h2>

                <p style="font-size: 1.2rem; text-align: center; margin-bottom: 3rem;">
                    Învață să combini culorile ca un maestru!
                </p>

                <!-- Regula 60-30-10 -->
                <div style="background: white; padding: 2rem; border-radius: var(--radius); margin-bottom: 3rem; box-shadow: var(--shadow);">
                    <h3 style="color: var(--primary); margin-bottom: 1.5rem;">📏 Regula 60-30-10</h3>
                    <p style="margin-bottom: 2rem;">
                        Formula secretă pentru paleta perfectă:
                    </p>

                    <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
                        <div style="flex: 6; background: #667eea; height: 100px; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                            60% Culoare Dominantă
                        </div>
                        <div style="flex: 3; background: #f5576c; height: 100px; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                            30% Secundară
                        </div>
                        <div style="flex: 1; background: #ffd700; height: 100px; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                            10% Accent
                        </div>
                    </div>

                    <p style="color: var(--text-gray);">
                        Această regulă creează echilibru perfect și face desenul tău să arate profesional!
                    </p>
                </div>

                <!-- Temperatura Culorilor -->
                <div style="background: var(--bg-light); padding: 2rem; border-radius: var(--radius); margin-bottom: 3rem;">
                    <h3 style="color: var(--primary); margin-bottom: 1.5rem;">🌡️ Temperatura Culorilor</h3>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div>
                            <h4 style="color: #FF4400; margin-bottom: 1rem;">🔥 Culori Calde</h4>
                            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                                <div style="width: 50px; height: 50px; background: #FF0000; border-radius: 50%;"></div>
                                <div style="width: 50px; height: 50px; background: #FF8800; border-radius: 50%;"></div>
                                <div style="width: 50px; height: 50px; background: #FFFF00; border-radius: 50%;"></div>
                            </div>
                            <p style="color: var(--text-gray); font-size: 0.9rem;">
                                Evocă energie, pasiune, căldură. Perfect pentru desene pline de viață!
                            </p>
                        </div>

                        <div>
                            <h4 style="color: #0066FF; margin-bottom: 1rem;">❄️ Culori Reci</h4>
                            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                                <div style="width: 50px; height: 50px; background: #0000FF; border-radius: 50%;"></div>
                                <div style="width: 50px; height: 50px; background: #00FF88; border-radius: 50%;"></div>
                                <div style="width: 50px; height: 50px; background: #8800FF; border-radius: 50%;"></div>
                            </div>
                            <p style="color: var(--text-gray); font-size: 0.9rem;">
                                Aduc calm, pace, seninătate. Ideale pentru peisaje liniștite!
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Psihologia Culorilor -->
                <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 2rem; border-radius: var(--radius); color: white;">
                    <h3 style="margin-bottom: 1.5rem;">🧠 Psihologia Culorilor</h3>
                    <p style="margin-bottom: 1.5rem;">
                        Fiecare culoare transmite emoții! Alege-le conștient:
                    </p>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin-bottom: 0.75rem;">🔴 Roșu: Pasiune, energie, pericol</li>
                        <li style="margin-bottom: 0.75rem;">🔵 Albastru: Calm, încredere, profesionalism</li>
                        <li style="margin-bottom: 0.75rem;">🟡 Galben: Veselie, optimism, atenție</li>
                        <li style="margin-bottom: 0.75rem;">🟢 Verde: Natură, creștere, echilibru</li>
                        <li style="margin-bottom: 0.75rem;">🟣 Violet: Mister, lux, creativitate</li>
                        <li>🟠 Portocaliu: Entuziasm, prietenie, căldură</li>
                    </ul>
                </div>
            </div>
        `;
    }

    renderQuiz() {
        return `
            <div class="module-content">
                <h2 style="color: var(--primary); text-align: center; margin-bottom: 2rem;">
                    ✅ Mini-Test: Teoria Culorilor
                </h2>

                <p style="text-align: center; font-size: 1.1rem; margin-bottom: 3rem;">
                    Testează-ți cunoștințele! 5 întrebări rapide.
                </p>

                <div id="quizContainer">
                    <!-- Quiz questions will be rendered here -->
                </div>

                <div id="quizResults" style="display: none; text-align: center; padding: 3rem;">
                    <div id="score" style="font-size: 4rem; margin-bottom: 1rem;"></div>
                    <h3 id="resultTitle" style="color: var(--primary); margin-bottom: 1rem;"></h3>
                    <p id="resultMessage" style="font-size: 1.1rem; color: var(--text-gray); margin-bottom: 2rem;"></p>
                    <button class="btn btn-primary" onclick="window.location.hash='lessons';">
                        🎉 Înapoi la Lecții
                    </button>
                </div>
            </div>
        `;
    }

    mount() {
        // Navigation
        document.getElementById('nextModule')?.addEventListener('click', () => this.nextModule());
        document.getElementById('prevModule')?.addEventListener('click', () => this.prevModule());
        document.getElementById('backToLessons')?.addEventListener('click', () => {
            window.location.hash = 'lessons';
        });

        // Narration toggle
        document.getElementById('toggleNarration')?.addEventListener('click', () => {
            this.narrationEnabled = !this.narrationEnabled;
            const btn = document.getElementById('toggleNarration');
            btn.textContent = this.narrationEnabled ? '🔊' : '🔇';
            btn.classList.toggle('muted');

            if (!this.narrationEnabled) {
                this.synth.cancel();
            }
        });

        // Start narration for intro
        this.narrate("Bun venit la prima ta lecție de artă! Astăzi vom învăța despre teoria culorilor - fundamentul oricărui desen frumos. La finalul acestei lecții, vei putea să alegi culorile perfecte pentru desenele tale. Apasă pe 'Următorul' când ești gata să începi!");

        // Update progress
        this.updateProgress();
    }

    nextModule() {
        if (this.currentModule < this.totalModules) {
            this.currentModule++;
            this.updateContent();
            this.updateProgress();
            this.updateNavButtons();
        }
    }

    prevModule() {
        if (this.currentModule > 0) {
            this.currentModule--;
            this.updateContent();
            this.updateProgress();
            this.updateNavButtons();
        }
    }

    updateContent() {
        const content = document.getElementById('lessonContent');

        switch(this.currentModule) {
            case 0:
                content.innerHTML = this.renderIntro();
                this.narrate("Bun venit la Teoria Culorilor!");
                break;
            case 1:
                content.innerHTML = this.renderModule1_PrimaryColors();
                this.narrate("Să începem cu bazele. Culorile primare sunt roșu, galben și albastru. De ce se numesc primare? Pentru că nu pot fi create prin amestecarea altor culori. Gândește-te la ele ca la ingredientele de bază din care faci toate celelalte culori.");
                break;
            case 2:
                content.innerHTML = this.renderModule2_SecondaryColors();
                this.narrate("Acum vine partea distractivă! Când amesteci două culori primare, obții o culoare secundară. Galben plus Albastru face Verde! Roșu plus Galben face Portocaliu! Și Roșu plus Albastru face Violet!");
                break;
            case 3:
                content.innerHTML = this.renderModule3_ColorWheel();
                this.narrate("Acesta este cercul cromatic complet! Conține toate cele 12 culori: 3 primare, 3 secundare și 6 terțiare. Culorile complementare sunt opuse pe cerc și creează cel mai puternic contrast.");
                break;
            case 4:
                content.innerHTML = this.renderModule4_Harmonies();
                this.narrate("Învață să combini culorile folosind regula 60-30-10: 60% culoare dominantă, 30% secundară, și 10% accent. Această regulă face desenul tău să arate profesional!");
                break;
            case 5:
                content.innerHTML = this.renderQuiz();
                this.startQuiz();
                this.narrate("Acum să vedem cât de bine ai învățat! Răspunde la cele 5 întrebări.");
                break;
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateProgress() {
        const progress = (this.currentModule / this.totalModules) * 100;
        document.getElementById('lessonProgress').style.width = progress + '%';
    }

    updateNavButtons() {
        const prevBtn = document.getElementById('prevModule');
        const nextBtn = document.getElementById('nextModule');

        prevBtn.style.display = this.currentModule > 0 ? 'block' : 'none';
        nextBtn.textContent = this.currentModule === this.totalModules ? 'Finalizează →' : 'Următorul →';
    }

    narrate(text) {
        if (!this.narrationEnabled || !this.synth) return;

        this.synth.cancel(); // Stop previous narration

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ro-RO';
        utterance.rate = 0.85; // Slightly slower for better clarity
        utterance.pitch = 1.0;
        utterance.volume = 0.8;

        // Try to find and use a Romanian voice if available
        const voices = this.synth.getVoices();
        const romanianVoice = voices.find(voice =>
            voice.lang === 'ro-RO' || voice.lang.startsWith('ro')
        );

        if (romanianVoice) {
            utterance.voice = romanianVoice;
        }

        this.synth.speak(utterance);
    }

    startQuiz() {
        const questions = [
            {
                question: "Care sunt cele 3 culori primare?",
                options: ["Roșu, Verde, Albastru", "Roșu, Galben, Albastru", "Verde, Portocaliu, Violet"],
                correct: 1
            },
            {
                question: "Ce culoare obții când amesteci Roșu cu Galben?",
                options: ["Verde", "Portocaliu", "Violet"],
                correct: 1
            },
            {
                question: "Culorile complementare sunt:",
                options: ["Alăturate pe cerc", "Opuse pe cerc", "La distanță egală pe cerc"],
                correct: 1
            },
            {
                question: "Regula 60-30-10 se referă la:",
                options: ["Timpul de desen", "Proporția culorilor în paletă", "Numărul de culori"],
                correct: 1
            },
            {
                question: "Ce emoție transmite culoarea Albastru?",
                options: ["Pasiune și energie", "Calm și încredere", "Veselie și optimism"],
                correct: 1
            }
        ];

        let currentQ = 0;
        const container = document.getElementById('quizContainer');

        const renderQuestion = () => {
            if (currentQ >= questions.length) {
                this.showQuizResults();
                return;
            }

            const q = questions[currentQ];
            container.innerHTML = `
                <div style="background: white; padding: 2rem; border-radius: var(--radius); box-shadow: var(--shadow);">
                    <div style="color: var(--text-gray); margin-bottom: 1rem;">Întrebarea ${currentQ + 1} din ${questions.length}</div>
                    <h3 style="color: var(--primary); margin-bottom: 2rem;">${q.question}</h3>
                    <div class="quiz-options">
                        ${q.options.map((opt, i) => `
                            <button class="quiz-option" data-index="${i}" style="
                                display: block;
                                width: 100%;
                                padding: 1.5rem;
                                margin-bottom: 1rem;
                                background: var(--bg-light);
                                border: 2px solid var(--border);
                                border-radius: var(--radius);
                                cursor: pointer;
                                font-size: 1.1rem;
                                text-align: left;
                                transition: all 0.3s;
                            ">
                                ${String.fromCharCode(65 + i)}. ${opt}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;

            document.querySelectorAll('.quiz-option').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const selected = parseInt(e.target.getAttribute('data-index'));
                    if (selected === q.correct) {
                        this.quizScore++;
                        e.target.style.background = 'var(--success)';
                        e.target.style.color = 'white';
                        e.target.style.borderColor = 'var(--success)';
                    } else {
                        e.target.style.background = 'var(--error)';
                        e.target.style.color = 'white';
                        e.target.style.borderColor = 'var(--error)';
                    }

                    document.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);

                    setTimeout(() => {
                        currentQ++;
                        renderQuestion();
                    }, 1500);
                });

                btn.addEventListener('mouseover', (e) => {
                    if (!e.target.disabled) {
                        e.target.style.background = 'var(--primary)';
                        e.target.style.color = 'white';
                        e.target.style.borderColor = 'var(--primary)';
                    }
                });

                btn.addEventListener('mouseout', (e) => {
                    if (!e.target.disabled && e.target.style.background !== 'var(--success)' && e.target.style.background !== 'var(--error)') {
                        e.target.style.background = 'var(--bg-light)';
                        e.target.style.color = 'inherit';
                        e.target.style.borderColor = 'var(--border)';
                    }
                });
            });
        };

        renderQuestion();
    }

    showQuizResults() {
        document.getElementById('quizContainer').style.display = 'none';
        document.getElementById('quizResults').style.display = 'block';

        const scorePercent = (this.quizScore / 5) * 100;
        const scoreEl = document.getElementById('score');
        const titleEl = document.getElementById('resultTitle');
        const messageEl = document.getElementById('resultMessage');

        scoreEl.textContent = `${this.quizScore}/5`;

        if (scorePercent >= 80) {
            titleEl.textContent = '🎉 Excelent!';
            titleEl.style.color = 'var(--success)';
            messageEl.textContent = 'Ai stăpânit teoria culorilor! Ești gata să creezi palete minunate!';
            this.narrate('Felicitări! Ai obținut un scor excelent! Ești gata să folosești culorile ca un adevărat artist!');
        } else if (scorePercent >= 60) {
            titleEl.textContent = '👍 Bine!';
            titleEl.style.color = 'var(--warning)';
            messageEl.textContent = 'Bună treabă! Poate vrei să revizuiești lecția pentru a stăpâni perfect conceptele.';
            this.narrate('Bună treabă! Ai înțeles majoritatea conceptelor. Poate vrei să revizuiești lecția pentru a stăpâni perfect teoria culorilor.');
        } else {
            titleEl.textContent = '📚 Continuă să exersezi!';
            titleEl.style.color = 'var(--error)';
            messageEl.textContent = 'Nu-i nimic! Revizuiește lecția și încearcă din nou. Practica face pe maestrul!';
            this.narrate('Nu-i nimic! Revizuiește lecția și încearcă din nou. Cu puțină practică, vei stăpâni teoria culorilor!');
        }

        // Mark lesson as completed in state
        this.state.update('progress', (progress) => {
            return {
                ...progress,
                lessonsCompleted: Math.max(progress.lessonsCompleted, 1)
            };
        });
    }

    cleanup() {
        if (this.synth) {
            this.synth.cancel();
        }
    }
}
