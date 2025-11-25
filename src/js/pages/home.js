// Home Page
import State from '../utils/state.js';

export default class HomePage {
    constructor() {
        this.state = State.getInstance();
    }

    async render() {
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
                    <h1 style="color: var(--primary); font-size: 2.5rem;">Welcome to DrawHub, ${user.name || 'User'}!</h1>
                    <p style="font-size: 1.2rem; color: var(--text-gray);">
                        AI-Powered Art Learning Platform
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
        // Handle quick action clicks
        document.querySelectorAll('[data-action]').forEach(card => {
            card.addEventListener('click', (e) => {
                const action = e.currentTarget.getAttribute('data-action');
                window.location.hash = action;

                // Trigger navigation
                const navLink = document.querySelector(`.nav-link[data-page="${action}"]`);
                if (navLink) navLink.click();
            });
        });
    }

    cleanup() {
        // Cleanup if needed
    }
}
