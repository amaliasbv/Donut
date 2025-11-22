// LESSON 1: Color Theory - Interactive Lesson
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
                    <button class="btn-back" id="backToLessons">← Back</button>
                    <h1>🎨 Lesson 1: Color Theory</h1>
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
                        ← Previous
                    </button>
                    <button class="btn btn-primary" id="nextModule">
                        Next →
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
                <h2>🎨 Welcome to Color Theory!</h2>
                <p>
                    Colors are the soul of any drawing. Today you will learn how to choose and combine
                    the perfect colors for your artistic creations.
                </p>
                <p>
                    At the end of this lesson, you will be able to:
                </p>

                <div class="learning-objectives">
                    <h3>📚 What You'll Learn:</h3>
                    <ul>
                        <li>Understand the color wheel and the 12 colors</li>
                        <li>Identify primary, secondary, and tertiary colors</li>
                        <li>Create complementary and analogous color harmonies</li>
                        <li>Apply the 60-30-10 rule for the perfect palette</li>
                        <li>Use color psychology in your drawings</li>
                    </ul>
                </div>

                <div style="margin-top: 2rem; padding: 1.5rem; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: var(--radius); font-size: 1.1rem;">
                    ⏱️ Estimated Duration: 30 minutes<br>
                    📖 5 Interactive Modules<br>
                    ✅ Mini-Quiz at the End
                </div>
            </div>
        `;
    }

    renderModule1_PrimaryColors() {
        return `
            <div class="module-content">
                <h2 style="color: var(--primary); text-align: center; margin-bottom: 2rem;">
                    🔴🟡🔵 Primary Colors
                </h2>

                <p style="font-size: 1.2rem; text-align: center; margin-bottom: 3rem;">
                    Primary colors are the <strong>foundation</strong> of all other colors.
                    They cannot be created by mixing other colors.
                </p>

                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin: 3rem 0;">
                    <div class="color-card" style="text-align: center;">
                        <div style="width: 150px; height: 150px; background: #FF0000; border-radius: 50%; margin: 0 auto 1rem; box-shadow: 0 10px 30px rgba(255,0,0,0.3);"></div>
                        <h3 style="color: #FF0000;">Red</h3>
                        <p style="color: var(--text-gray); font-size: 0.9rem;">Passion • Energy • Attention</p>
                    </div>

                    <div class="color-card" style="text-align: center;">
                        <div style="width: 150px; height: 150px; background: #FFFF00; border-radius: 50%; margin: 0 auto 1rem; box-shadow: 0 10px 30px rgba(255,255,0,0.3);"></div>
                        <h3 style="color: #DDB000;">Yellow</h3>
                        <p style="color: var(--text-gray); font-size: 0.9rem;">Cheerfulness • Optimism • Light</p>
                    </div>

                    <div class="color-card" style="text-align: center;">
                        <div style="width: 150px; height: 150px; background: #0000FF; border-radius: 50%; margin: 0 auto 1rem; box-shadow: 0 10px 30px rgba(0,0,255,0.3);"></div>
                        <h3 style="color: #0000FF;">Blue</h3>
                        <p style="color: var(--text-gray); font-size: 0.9rem;">Calm • Trust • Peace</p>
                    </div>
                </div>

                <div style="background: var(--bg-light); padding: 2rem; border-radius: var(--radius); margin-top: 3rem;">
                    <h4 style="color: var(--primary); margin-bottom: 1rem;">💡 Remember:</h4>
                    <p style="line-height: 1.8;">
                        The primary colors are <strong>red, yellow, and blue</strong>.
                        Think of them as the <strong>basic ingredients</strong> from which you'll create all other colors!
                        In your drawing, these are the purest and most intense colors you can use.
                    </p>
                </div>
            </div>
        `;
    }

    renderModule2_SecondaryColors() {
        return `
            <div class="module-content">
                <h2 style="color: var(--primary); text-align: center; margin-bottom: 2rem;">
                    🟢🟠🟣 Secondary Colors
                </h2>

                <p style="font-size: 1.2rem; text-align: center; margin-bottom: 3rem;">
                    When you mix <strong>two primary colors</strong>, you get a secondary color!
                </p>

                <div class="color-mixing-demo" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 3rem 0;">
                    <!-- Green -->
                    <div style="text-align: center;">
                        <div style="display: flex; justify-content: center; align-items: center; gap: 0.3rem; margin-bottom: 1rem; flex-wrap: wrap;">
                            <div style="width: 50px; height: 50px; background: #FFFF00; border-radius: 50%; flex-shrink: 0;"></div>
                            <span style="font-size: 1.5rem;">+</span>
                            <div style="width: 50px; height: 50px; background: #0000FF; border-radius: 50%; flex-shrink: 0;"></div>
                            <span style="font-size: 1.5rem;">=</span>
                            <div style="width: 70px; height: 70px; background: #00FF00; border-radius: 50%; box-shadow: 0 8px 20px rgba(0,255,0,0.4); flex-shrink: 0;"></div>
                        </div>
                        <h3 style="color: #00AA00;">Green</h3>
                        <p style="color: var(--text-gray); font-size: 0.9rem;">Nature • Freshness • Balance</p>
                    </div>

                    <!-- Orange -->
                    <div style="text-align: center;">
                        <div style="display: flex; justify-content: center; align-items: center; gap: 0.3rem; margin-bottom: 1rem; flex-wrap: wrap;">
                            <div style="width: 50px; height: 50px; background: #FF0000; border-radius: 50%; flex-shrink: 0;"></div>
                            <span style="font-size: 1.5rem;">+</span>
                            <div style="width: 50px; height: 50px; background: #FFFF00; border-radius: 50%; flex-shrink: 0;"></div>
                            <span style="font-size: 1.5rem;">=</span>
                            <div style="width: 70px; height: 70px; background: #FF8800; border-radius: 50%; box-shadow: 0 8px 20px rgba(255,136,0,0.4); flex-shrink: 0;"></div>
                        </div>
                        <h3 style="color: #FF8800;">Orange</h3>
                        <p style="color: var(--text-gray); font-size: 0.9rem;">Enthusiasm • Warmth • Creativity</p>
                    </div>

                    <!-- Purple -->
                    <div style="text-align: center;">
                        <div style="display: flex; justify-content: center; align-items: center; gap: 0.3rem; margin-bottom: 1rem; flex-wrap: wrap;">
                            <div style="width: 50px; height: 50px; background: #FF0000; border-radius: 50%; flex-shrink: 0;"></div>
                            <span style="font-size: 1.5rem;">+</span>
                            <div style="width: 50px; height: 50px; background: #0000FF; border-radius: 50%; flex-shrink: 0;"></div>
                            <span style="font-size: 1.5rem;">=</span>
                            <div style="width: 70px; height: 70px; background: #8800FF; border-radius: 50%; box-shadow: 0 8px 20px rgba(136,0,255,0.4); flex-shrink: 0;"></div>
                        </div>
                        <h3 style="color: #8800FF;">Purple</h3>
                        <p style="color: var(--text-gray); font-size: 0.9rem;">Mystery • Luxury • Imagination</p>
                    </div>
                </div>

                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: var(--radius); color: white; margin-top: 3rem;">
                    <h4 style="margin-bottom: 1rem;">🎨 Try It Yourself!</h4>
                    <p>
                        In your drawing, you can create any secondary color with just the 3 primary colors.
                        You don't need many paint tubes - just science and practice!
                    </p>
                </div>
            </div>
        `;
    }

    renderModule3_ColorWheel() {
        return `
            <div class="module-content">
                <h2 style="color: var(--primary); text-align: center; margin-bottom: 2rem;">
                    🎡 The Complete Color Wheel
                </h2>

                <p style="font-size: 1.2rem; text-align: center; margin-bottom: 3rem;">
                    The color wheel contains all <strong>12 colors</strong>: 3 primary, 3 secondary, and 6 tertiary.
                </p>

                <!-- SVG Color Wheel -->
                <div id="colorWheelContainer" style="max-width: 500px; margin: 0 auto 3rem;">
                    ${this.renderColorWheelSVG()}
                </div>

                <div style="background: var(--bg-light); padding: 2rem; border-radius: var(--radius);">
                    <h3 style="color: var(--primary); margin-bottom: 1.5rem;">📍 Color Relationships:</h3>

                    <div style="display: grid; gap: 1.5rem;">
                        <div style="padding: 1rem; background: white; border-radius: var(--radius); border-left: 4px solid #FF0000;">
                            <h4 style="color: var(--primary);">Complementary</h4>
                            <p>Colors <strong>opposite on the wheel</strong>. Creates the strongest contrast.</p>
                            <p style="font-size: 0.9rem; color: var(--text-gray);">
                                Example: Red-Green, Blue-Orange, Yellow-Purple
                            </p>
                        </div>

                        <div style="padding: 1rem; background: white; border-radius: var(--radius); border-left: 4px solid #00FF00;">
                            <h4 style="color: var(--primary);">Analogous</h4>
                            <p>Colors <strong>adjacent on the wheel</strong>. Creates natural harmonies.</p>
                            <p style="font-size: 0.9rem; color: var(--text-gray);">
                                Example: Blue, Blue-Green, Green
                            </p>
                        </div>

                        <div style="padding: 1rem; background: white; border-radius: var(--radius); border-left: 4px solid #0000FF;">
                            <h4 style="color: var(--primary);">Triadic</h4>
                            <p><strong>3 evenly spaced colors</strong> on the wheel. Vibrant and balanced palettes.</p>
                            <p style="font-size: 0.9rem; color: var(--text-gray);">
                                Example: Red, Yellow, Blue (the primaries!)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderColorWheelSVG() {
        const colors = [
            { name: 'Red', hex: '#FF0000', angle: 0 },
            { name: 'Red-Orange', hex: '#FF4400', angle: 30 },
            { name: 'Orange', hex: '#FF8800', angle: 60 },
            { name: 'Yellow-Orange', hex: '#FFCC00', angle: 90 },
            { name: 'Yellow', hex: '#FFFF00', angle: 120 },
            { name: 'Yellow-Green', hex: '#88FF00', angle: 150 },
            { name: 'Green', hex: '#00FF00', angle: 180 },
            { name: 'Blue-Green', hex: '#00FF88', angle: 210 },
            { name: 'Blue', hex: '#0000FF', angle: 240 },
            { name: 'Blue-Purple', hex: '#4400FF', angle: 270 },
            { name: 'Purple', hex: '#8800FF', angle: 300 },
            { name: 'Red-Purple', hex: '#FF0088', angle: 330 }
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
                    Color Wheel
                </text>
            </svg>
        `;
    }

    renderModule4_Harmonies() {
        return `
            <div class="module-content">
                <h2 style="color: var(--primary); text-align: center; margin-bottom: 2rem;">
                    🎵 Color Harmonies
                </h2>

                <p style="font-size: 1.2rem; text-align: center; margin-bottom: 3rem;">
                    Learn to combine colors like a master!
                </p>

                <!-- The 60-30-10 Rule -->
                <div style="background: white; padding: 2rem; border-radius: var(--radius); margin-bottom: 3rem; box-shadow: var(--shadow);">
                    <h3 style="color: var(--primary); margin-bottom: 1.5rem;">📏 The 60-30-10 Rule</h3>
                    <p style="margin-bottom: 2rem;">
                        The secret formula for the perfect palette:
                    </p>

                    <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
                        <div style="flex: 6; background: #667eea; height: 100px; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                            60% Dominant Color
                        </div>
                        <div style="flex: 3; background: #f5576c; height: 100px; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                            30% Secondary
                        </div>
                        <div style="flex: 1; background: #ffd700; height: 100px; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                            10% Accent
                        </div>
                    </div>

                    <p style="color: var(--text-gray);">
                        This rule creates perfect balance and makes your drawing look professional!
                    </p>
                </div>

                <!-- Color Temperature -->
                <div style="background: var(--bg-light); padding: 2rem; border-radius: var(--radius); margin-bottom: 3rem;">
                    <h3 style="color: var(--primary); margin-bottom: 1.5rem;">🌡️ Color Temperature</h3>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div>
                            <h4 style="color: #FF4400; margin-bottom: 1rem;">🔥 Warm Colors</h4>
                            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                                <div style="width: 50px; height: 50px; background: #FF0000; border-radius: 50%;"></div>
                                <div style="width: 50px; height: 50px; background: #FF8800; border-radius: 50%;"></div>
                                <div style="width: 50px; height: 50px; background: #FFFF00; border-radius: 50%;"></div>
                            </div>
                            <p style="color: var(--text-gray); font-size: 0.9rem;">
                                Evoke energy, passion, warmth. Perfect for vibrant drawings!
                            </p>
                        </div>

                        <div>
                            <h4 style="color: #0066FF; margin-bottom: 1rem;">❄️ Cool Colors</h4>
                            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                                <div style="width: 50px; height: 50px; background: #0000FF; border-radius: 50%;"></div>
                                <div style="width: 50px; height: 50px; background: #00FF88; border-radius: 50%;"></div>
                                <div style="width: 50px; height: 50px; background: #8800FF; border-radius: 50%;"></div>
                            </div>
                            <p style="color: var(--text-gray); font-size: 0.9rem;">
                                Bring calm, peace, serenity. Ideal for peaceful landscapes!
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Color Psychology -->
                <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 2rem; border-radius: var(--radius); color: white;">
                    <h3 style="margin-bottom: 1.5rem;">🧠 Color Psychology</h3>
                    <p style="margin-bottom: 1.5rem;">
                        Each color conveys emotions! Choose them consciously:
                    </p>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin-bottom: 0.75rem;">🔴 Red: Passion, energy, danger</li>
                        <li style="margin-bottom: 0.75rem;">🔵 Blue: Calm, trust, professionalism</li>
                        <li style="margin-bottom: 0.75rem;">🟡 Yellow: Cheerfulness, optimism, attention</li>
                        <li style="margin-bottom: 0.75rem;">🟢 Green: Nature, growth, balance</li>
                        <li style="margin-bottom: 0.75rem;">🟣 Purple: Mystery, luxury, creativity</li>
                        <li>🟠 Orange: Enthusiasm, friendship, warmth</li>
                    </ul>
                </div>
            </div>
        `;
    }

    renderQuiz() {
        return `
            <div class="module-content">
                <h2 style="color: var(--primary); text-align: center; margin-bottom: 2rem;">
                    ✅ Mini-Quiz: Color Theory
                </h2>

                <p style="text-align: center; font-size: 1.1rem; margin-bottom: 3rem;">
                    Test your knowledge! 5 quick questions.
                </p>

                <div id="quizContainer">
                    <!-- Quiz questions will be rendered here -->
                </div>

                <div id="quizResults" style="display: none; text-align: center; padding: 3rem;">
                    <div id="score" style="font-size: 4rem; margin-bottom: 1rem;"></div>
                    <h3 id="resultTitle" style="color: var(--primary); margin-bottom: 1rem;"></h3>
                    <p id="resultMessage" style="font-size: 1.1rem; color: var(--text-gray); margin-bottom: 2rem;"></p>
                    <button class="btn btn-primary" onclick="window.location.hash='lessons';">
                        🎉 Back to Lessons
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
        this.narrate("Welcome to your first art lesson! Today we'll learn about color theory - the foundation of any beautiful drawing. By the end of this lesson, you'll be able to choose the perfect colors for your drawings. Press 'Next' when you're ready to begin!");

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
                this.narrate("Welcome to Color Theory!");
                break;
            case 1:
                content.innerHTML = this.renderModule1_PrimaryColors();
                this.narrate("Let's start with the basics. The primary colors are red, yellow, and blue. Why are they called primary? Because they cannot be created by mixing other colors. Think of them as the basic ingredients from which you make all other colors.");
                break;
            case 2:
                content.innerHTML = this.renderModule2_SecondaryColors();
                this.narrate("Now comes the fun part! When you mix two primary colors, you get a secondary color. Yellow plus Blue makes Green! Red plus Yellow makes Orange! And Red plus Blue makes Purple!");
                break;
            case 3:
                content.innerHTML = this.renderModule3_ColorWheel();
                this.narrate("This is the complete color wheel! It contains all 12 colors: 3 primary, 3 secondary, and 6 tertiary. Complementary colors are opposite on the wheel and create the strongest contrast.");
                break;
            case 4:
                content.innerHTML = this.renderModule4_Harmonies();
                this.narrate("Learn to combine colors using the 60-30-10 rule: 60% dominant color, 30% secondary, and 10% accent. This rule makes your drawing look professional!");
                break;
            case 5:
                content.innerHTML = this.renderQuiz();
                this.startQuiz();
                this.narrate("Now let's see how well you've learned! Answer the 5 questions.");
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
        nextBtn.textContent = this.currentModule === this.totalModules ? 'Finish →' : 'Next →';
    }

    narrate(text) {
        if (!this.narrationEnabled || !this.synth) return;

        this.synth.cancel(); // Stop previous narration

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.85; // Slightly slower for better clarity
        utterance.pitch = 1.0;
        utterance.volume = 0.8;

        // Try to find and use an English voice if available
        const voices = this.synth.getVoices();
        const englishVoice = voices.find(voice =>
            voice.lang === 'en-US' || voice.lang.startsWith('en')
        );

        if (englishVoice) {
            utterance.voice = englishVoice;
        }

        this.synth.speak(utterance);
    }

    startQuiz() {
        const questions = [
            {
                question: "What are the 3 primary colors?",
                options: ["Red, Green, Blue", "Red, Yellow, Blue", "Green, Orange, Purple"],
                correct: 1
            },
            {
                question: "What color do you get when you mix Red with Yellow?",
                options: ["Green", "Orange", "Purple"],
                correct: 1
            },
            {
                question: "Complementary colors are:",
                options: ["Adjacent on the wheel", "Opposite on the wheel", "Evenly spaced on the wheel"],
                correct: 1
            },
            {
                question: "The 60-30-10 rule refers to:",
                options: ["Drawing time", "Color proportions in the palette", "Number of colors"],
                correct: 1
            },
            {
                question: "What emotion does the color Blue convey?",
                options: ["Passion and energy", "Calm and trust", "Cheerfulness and optimism"],
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
                    <div style="color: var(--text-gray); margin-bottom: 1rem;">Question ${currentQ + 1} of ${questions.length}</div>
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
            titleEl.textContent = '🎉 Excellent!';
            titleEl.style.color = 'var(--success)';
            messageEl.textContent = 'You\'ve mastered color theory! You\'re ready to create wonderful palettes!';
            this.narrate('Congratulations! You got an excellent score! You\'re ready to use colors like a true artist!');
        } else if (scorePercent >= 60) {
            titleEl.textContent = '👍 Good Job!';
            titleEl.style.color = 'var(--warning)';
            messageEl.textContent = 'Nice work! You might want to review the lesson to master the concepts perfectly.';
            this.narrate('Good job! You understood most of the concepts. You might want to review the lesson to master color theory perfectly.');
        } else {
            titleEl.textContent = '📚 Keep Practicing!';
            titleEl.style.color = 'var(--error)';
            messageEl.textContent = 'No worries! Review the lesson and try again. Practice makes perfect!';
            this.narrate('No worries! Review the lesson and try again. With a little practice, you\'ll master color theory!');
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
