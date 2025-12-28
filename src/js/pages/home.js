// Home Page - Landing/Presentation Page (Public)
import State from '../utils/state.js';

export default class HomePage {
    constructor() {
        this.state = State.getInstance();
    }

    async render() {
        const isAuthenticated = window.authService && window.authService.isAuthenticated();

        if (isAuthenticated) {
            return this.renderDashboard();
        } else {
            return this.renderLanding();
        }
    }

    // Landing page for visitors (not logged in)
    renderLanding() {
        return `
            <div class="landing-page">
                <!-- Hero Section -->
                <section class="hero-section" style="
                    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
                    color: white;
                    padding: 4rem 2rem;
                    text-align: center;
                    border-radius: 0 0 2rem 2rem;
                    margin: -2rem -2rem 2rem -2rem;
                ">
                    <h1 style="font-size: 3rem; margin-bottom: 1rem;">
                        🎨 Learn to Draw with AI
                    </h1>
                    <p style="font-size: 1.3rem; opacity: 0.9; max-width: 600px; margin: 0 auto 2rem;">
                        DrawHub is your personal AI-powered art teacher. Get instant feedback,
                        personalized lessons, and track your progress as you master drawing.
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="getStartedBtn" style="
                            background: white;
                            color: var(--primary);
                            padding: 1rem 2rem;
                            font-size: 1.1rem;
                            font-weight: 600;
                        ">
                            Get Started Free
                        </button>
                        <button class="btn" id="loginHeroBtn" style="
                            background: transparent;
                            color: white;
                            border: 2px solid white;
                            padding: 1rem 2rem;
                            font-size: 1.1rem;
                        ">
                            Sign In
                        </button>
                    </div>
                </section>

                <!-- Features Section -->
                <section class="features-section mb-4">
                    <h2 class="text-center mb-4" style="color: var(--primary-dark); font-size: 2rem;">
                        Why Choose DrawHub?
                    </h2>
                    <div class="grid grid-3">
                        <div class="card text-center" style="padding: 2rem;">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">🤖</div>
                            <h3 style="color: var(--primary); margin-bottom: 0.5rem;">AI-Powered Feedback</h3>
                            <p style="color: var(--text-gray);">
                                Upload your drawings and get instant, detailed feedback on proportions,
                                shading, composition, and more.
                            </p>
                        </div>
                        <div class="card text-center" style="padding: 2rem;">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">📚</div>
                            <h3 style="color: var(--primary); margin-bottom: 0.5rem;">Structured Lessons</h3>
                            <p style="color: var(--text-gray);">
                                Learn step-by-step with interactive lessons covering color theory,
                                perspective, anatomy, and more.
                            </p>
                        </div>
                        <div class="card text-center" style="padding: 2rem;">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">🎯</div>
                            <h3 style="color: var(--primary); margin-bottom: 0.5rem;">Personalized Path</h3>
                            <p style="color: var(--text-gray);">
                                Get assignments tailored to your skill level and preferred art style.
                                Learn at your own pace.
                            </p>
                        </div>
                    </div>
                </section>

                <!-- How It Works -->
                <section class="how-it-works mb-4">
                    <h2 class="text-center mb-4" style="color: var(--primary-dark); font-size: 2rem;">
                        How It Works
                    </h2>
                    <div class="grid grid-4">
                        <div class="text-center">
                            <div style="
                                width: 60px;
                                height: 60px;
                                background: var(--primary);
                                color: white;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 1.5rem;
                                font-weight: bold;
                                margin: 0 auto 1rem;
                            ">1</div>
                            <h4>Sign Up</h4>
                            <p style="color: var(--text-gray); font-size: 0.9rem;">Create your free account in seconds</p>
                        </div>
                        <div class="text-center">
                            <div style="
                                width: 60px;
                                height: 60px;
                                background: var(--primary);
                                color: white;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 1.5rem;
                                font-weight: bold;
                                margin: 0 auto 1rem;
                            ">2</div>
                            <h4>Set Your Goals</h4>
                            <p style="color: var(--text-gray); font-size: 0.9rem;">Tell us your experience and what you want to learn</p>
                        </div>
                        <div class="text-center">
                            <div style="
                                width: 60px;
                                height: 60px;
                                background: var(--primary);
                                color: white;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 1.5rem;
                                font-weight: bold;
                                margin: 0 auto 1rem;
                            ">3</div>
                            <h4>Learn & Practice</h4>
                            <p style="color: var(--text-gray); font-size: 0.9rem;">Follow lessons and complete assignments</p>
                        </div>
                        <div class="text-center">
                            <div style="
                                width: 60px;
                                height: 60px;
                                background: var(--primary);
                                color: white;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 1.5rem;
                                font-weight: bold;
                                margin: 0 auto 1rem;
                            ">4</div>
                            <h4>Get Feedback</h4>
                            <p style="color: var(--text-gray); font-size: 0.9rem;">Upload your art and improve with AI feedback</p>
                        </div>
                    </div>
                </section>

                <!-- Testimonials / Stats -->
                <section class="stats-section mb-4">
                    <div class="card" style="
                        background: linear-gradient(135deg, var(--bg-light) 0%, white 100%);
                        padding: 2rem;
                    ">
                        <div class="grid grid-3 text-center">
                            <div>
                                <h3 style="font-size: 2.5rem; color: var(--primary);">15+</h3>
                                <p style="color: var(--text-gray);">Interactive Lessons</p>
                            </div>
                            <div>
                                <h3 style="font-size: 2.5rem; color: var(--secondary-dark);">5</h3>
                                <p style="color: var(--text-gray);">Art Styles Covered</p>
                            </div>
                            <div>
                                <h3 style="font-size: 2.5rem; color: var(--success);">100%</h3>
                                <p style="color: var(--text-gray);">Free to Start</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- CTA Section -->
                <section class="cta-section text-center" style="
                    background: var(--bg-light);
                    padding: 3rem 2rem;
                    border-radius: 1rem;
                    margin-bottom: 2rem;
                ">
                    <h2 style="color: var(--primary-dark); margin-bottom: 1rem;">
                        Ready to Start Your Art Journey?
                    </h2>
                    <p style="color: var(--text-gray); margin-bottom: 1.5rem;">
                        Join DrawHub today and transform your drawing skills with AI-powered learning.
                    </p>
                    <button class="btn btn-primary" id="ctaSignupBtn" style="
                        padding: 1rem 3rem;
                        font-size: 1.1rem;
                    ">
                        Create Free Account
                    </button>
                </section>
            </div>
        `;
    }

    // Dashboard for logged-in users
    renderDashboard() {
        const user = this.state.get('user') || { name: 'User', level: 1, xp: 0 };
        const progress = this.state.get('progress') || {
            lessonsCompleted: 0,
            totalLessons: 10,
            assignmentsCompleted: 0,
            totalAssignments: 5,
            skills: {
                color: 0,
                shading: 0,
                perspective: 0,
                composition: 0,
                anatomy: 0
            }
        };

        return `
            <div class="page-container">
                <header class="text-center mb-4">
                    <h1 style="color: var(--primary); font-size: 2.5rem;">Welcome back, ${user.name || 'Artist'}!</h1>
                    <p style="font-size: 1.2rem; color: var(--text-gray);">
                        Let's continue your art journey
                    </p>
                </header>

                <!-- Stats Overview -->
                <div class="grid grid-4 mb-4">
                    <div class="card text-center">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">📚</div>
                        <h3 style="font-size: 2rem; color: var(--primary);">${progress.lessonsCompleted || 0}/${progress.totalLessons || 10}</h3>
                        <p style="color: var(--text-gray);">Lessons Completed</p>
                    </div>

                    <div class="card text-center">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">📝</div>
                        <h3 style="font-size: 2rem; color: var(--secondary-dark);">${progress.assignmentsCompleted || 0}/${progress.totalAssignments || 5}</h3>
                        <p style="color: var(--text-gray);">Assignments Completed</p>
                    </div>

                    <div class="card text-center">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">⭐</div>
                        <h3 style="font-size: 2rem; color: var(--warning);">Level ${user.level || 1}</h3>
                        <p style="color: var(--text-gray);">${user.xp || 0} XP</p>
                    </div>

                    <div class="card text-center">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🏆</div>
                        <h3 style="font-size: 2rem; color: var(--success);">2/3</h3>
                        <p style="color: var(--text-gray);">Badges</p>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="mb-4">
                    <h2 class="mb-3" style="color: var(--primary-dark);">🚀 Quick Actions</h2>
                    <div class="grid grid-3">
                        <div class="card" data-action="lessons">
                            <div class="card-header">
                                <span style="font-size: 2rem;">📖</span>
                                <h3 class="card-title">Continue Lessons</h3>
                            </div>
                            <p style="color: var(--text-gray);">Learn color theory, perspective, and anatomy</p>
                            <button class="btn btn-primary mt-2" style="width: 100%;">View Lessons</button>
                        </div>

                        <div class="card" data-action="assignments">
                            <div class="card-header">
                                <span style="font-size: 2rem;">✏️</span>
                                <h3 class="card-title">Get an Assignment</h3>
                            </div>
                            <p style="color: var(--text-gray);">Personalized AI-generated assignments for your level</p>
                            <button class="btn btn-primary mt-2" style="width: 100%;">View Assignments</button>
                        </div>

                        <div class="card" data-action="upload">
                            <div class="card-header">
                                <span style="font-size: 2rem;">📸</span>
                                <h3 class="card-title">Upload Drawing</h3>
                            </div>
                            <p style="color: var(--text-gray);">Get instant AI feedback</p>
                            <button class="btn btn-primary mt-2" style="width: 100%;">Upload</button>
                        </div>
                    </div>
                </div>

                <!-- Skills Progress -->
                <div class="mb-4">
                    <h2 class="mb-3" style="color: var(--primary-dark);">📊 Your Progress</h2>
                    <div class="card">
                        ${this.renderSkillBars(progress.skills)}
                    </div>
                </div>

                <!-- Recent Activity -->
                <div>
                    <h2 class="mb-3" style="color: var(--primary-dark);">⏱️ Recent Activity</h2>
                    <div class="card">
                        <div class="activity-item" style="padding: 1rem; border-bottom: 1px solid var(--border);">
                            <div class="flex-between">
                                <div>
                                    <strong>Lesson "Color Theory" completed</strong>
                                    <p style="color: var(--text-gray); font-size: 0.875rem;">2 hours ago</p>
                                </div>
                                <span style="color: var(--success); font-size: 1.5rem;">✓</span>
                            </div>
                        </div>
                        <div class="activity-item" style="padding: 1rem; border-bottom: 1px solid var(--border);">
                            <div class="flex-between">
                                <div>
                                    <strong>You received feedback for "Simple Portrait"</strong>
                                    <p style="color: var(--text-gray); font-size: 0.875rem;">Yesterday</p>
                                </div>
                                <span style="color: var(--primary); font-size: 1.5rem;">🎨</span>
                            </div>
                        </div>
                        <div class="activity-item" style="padding: 1rem;">
                            <div class="flex-between">
                                <div>
                                    <strong>Badge "Color Master" earned!</strong>
                                    <p style="color: var(--text-gray); font-size: 0.875rem;">3 days ago</p>
                                </div>
                                <span style="font-size: 1.5rem;">🏆</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderSkillBars(skills) {
        // Default skills if not provided
        const defaultSkills = {
            color: 0,
            shading: 0,
            perspective: 0,
            composition: 0,
            anatomy: 0
        };
        const safeSkills = skills || defaultSkills;

        return Object.entries(safeSkills).map(([skill, value]) => `
            <div class="skill-bar mb-3">
                <div class="flex-between mb-1">
                    <span style="font-weight: 600; text-transform: capitalize;">${this.translateSkill(skill)}</span>
                    <span style="color: var(--primary); font-weight: 600;">${value}%</span>
                </div>
                <div style="background: var(--bg-light); height: 10px; border-radius: 10px; overflow: hidden;">
                    <div style="
                        background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
                        width: ${value}%;
                        height: 100%;
                        transition: width 0.5s ease;
                    "></div>
                </div>
            </div>
        `).join('');
    }

    translateSkill(skill) {
        const translations = {
            color: 'Color',
            shading: 'Shading',
            perspective: 'Perspective',
            composition: 'Composition',
            anatomy: 'Anatomy'
        };
        return translations[skill] || skill;
    }

    mount() {
        const isAuthenticated = window.authService && window.authService.isAuthenticated();

        if (isAuthenticated) {
            // Dashboard event handlers
            document.querySelectorAll('[data-action]').forEach(card => {
                card.addEventListener('click', (e) => {
                    const action = e.currentTarget.getAttribute('data-action');
                    window.location.hash = action;
                });
            });
        } else {
            // Landing page event handlers
            const getStartedBtn = document.getElementById('getStartedBtn');
            const loginHeroBtn = document.getElementById('loginHeroBtn');
            const ctaSignupBtn = document.getElementById('ctaSignupBtn');

            if (getStartedBtn) {
                getStartedBtn.addEventListener('click', () => {
                    window.location.hash = 'signup';
                });
            }

            if (loginHeroBtn) {
                loginHeroBtn.addEventListener('click', () => {
                    window.location.hash = 'login';
                });
            }

            if (ctaSignupBtn) {
                ctaSignupBtn.addEventListener('click', () => {
                    window.location.hash = 'signup';
                });
            }
        }
    }

    cleanup() {
        // Cleanup if needed
    }
}
