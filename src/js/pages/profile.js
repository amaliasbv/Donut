// Profile Page
import State from '../utils/state.js';

export default class ProfilePage {
    constructor() {
        this.state = State.getInstance();
    }

    async render() {
        const user = this.state.get('user');
        const progress = this.state.get('progress');
        const badges = this.state.get('badges');
        const profile = user.profileData; // User profile from onboarding

        return `
            <div class="page-container">
                <div class="grid grid-2 gap-3">
                    <!-- Left Column - User Info & Stats -->
                    <div>
                        <!-- Profile Card -->
                        <div class="card text-center mb-3">
                            ${profile && profile.profilePicture ? `
                                <div style="width: 120px; height: 120px; margin: 0 auto 1rem; border-radius: 50%; overflow: hidden; border: 4px solid var(--primary);">
                                    <img src="${profile.profilePicture}" alt="${user.name}" style="width: 100%; height: 100%; object-fit: cover;">
                                </div>
                            ` : `
                                <div style="width: 120px; height: 120px; margin: 0 auto 1rem; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 3rem;">
                                    ${user.avatar || '👤'}
                                </div>
                            `}
                            <h2 style="color: var(--primary); margin-bottom: 0.5rem;">${user.name}</h2>
                            <p style="color: var(--text-gray); margin-bottom: 1rem;">${user.email}</p>

                            ${profile ? `
                                <div style="margin-bottom: 1rem; padding: 0.75rem; background: var(--bg-light); border-radius: var(--radius);">
                                    <p style="color: var(--text-gray); font-size: 0.9rem; margin-bottom: 0.25rem;">
                                        <strong>Experience:</strong> ${this.formatExperience(profile.experienceLevel)}
                                    </p>
                                    <p style="color: var(--text-gray); font-size: 0.9rem; margin-bottom: 0.25rem;">
                                        <strong>Preferred Style:</strong> ${this.formatStyle(profile.preferredStyle)}
                                    </p>
                                    <p style="color: var(--text-gray); font-size: 0.9rem;">
                                        <strong>Learning Mode:</strong> ${this.formatLearningMode(profile.learningMode)}
                                    </p>
                                </div>
                            ` : ''}

                            <div style="display: inline-block; background: var(--primary); color: white; padding: 0.5rem 1.5rem; border-radius: 20px; margin-bottom: 1rem;">
                                ⭐ Level ${user.level} - ${user.xp} XP
                            </div>

                            <div style="margin-bottom: 1rem;">
                                <div style="background: var(--bg-light); height: 10px; border-radius: 10px; overflow: hidden;">
                                    <div style="
                                        background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
                                        width: ${(user.xp % 500) / 500 * 100}%;
                                        height: 100%;
                                    "></div>
                                </div>
                                <p style="font-size: 0.875rem; color: var(--text-gray); margin-top: 0.5rem;">
                                    ${500 - (user.xp % 500)} XP until Level ${user.level + 1}
                                </p>
                            </div>

                            <button class="btn btn-secondary" style="width: 100%;">Edit Profile</button>
                        </div>

                        <!-- Skills Card -->
                        <div class="card">
                            <h3 style="color: var(--primary); margin-bottom: 1rem;">🎨 Skills</h3>
                            ${this.renderSkills(progress.skills)}
                        </div>
                    </div>

                    <!-- Right Column - Progress & Badges -->
                    <div>
                        <!-- Progress Stats -->
                        <div class="card mb-3">
                            <h3 style="color: var(--primary); margin-bottom: 1rem;">📊 Progress</h3>

                            <div style="margin-bottom: 1.5rem;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                    <span>📚 Lessons</span>
                                    <span style="font-weight: bold;">${progress.lessonsCompleted}/${progress.totalLessons}</span>
                                </div>
                                <div style="background: var(--bg-light); height: 8px; border-radius: 10px; overflow: hidden;">
                                    <div style="
                                        background: var(--primary);
                                        width: ${(progress.lessonsCompleted / progress.totalLessons) * 100}%;
                                        height: 100%;
                                    "></div>
                                </div>
                            </div>

                            <div>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                    <span>📝 Assignments</span>
                                    <span style="font-weight: bold;">${progress.assignmentsCompleted}/${progress.totalAssignments}</span>
                                </div>
                                <div style="background: var(--bg-light); height: 8px; border-radius: 10px; overflow: hidden;">
                                    <div style="
                                        background: var(--secondary-dark);
                                        width: ${(progress.assignmentsCompleted / progress.totalAssignments) * 100}%;
                                        height: 100%;
                                    "></div>
                                </div>
                            </div>
                        </div>

                        <!-- Badges Card -->
                        <div class="card">
                            <h3 style="color: var(--primary); margin-bottom: 1rem;">🏆 Badges</h3>
                            <div class="grid grid-3">
                                ${this.renderBadges(badges)}
                            </div>
                        </div>

                        <!-- Account Info -->
                        <div class="card mt-3">
                            <h3 style="color: var(--primary); margin-bottom: 1rem;">ℹ️ Account Info</h3>
                            <div style="color: var(--text-gray);">
                                <p style="margin-bottom: 0.5rem;">
                                    <strong>Member since:</strong> ${new Date(user.joinedDate).toLocaleDateString('en-US')}
                                </p>
                                <p style="margin-bottom: 0.5rem;">
                                    <strong>Drawings uploaded:</strong> 12
                                </p>
                                <p>
                                    <strong>Feedbacks received:</strong> 10
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Gallery Section -->
                <div class="mt-4">
                    <h2 style="color: var(--primary); margin-bottom: 1rem;">🖼️ My Gallery</h2>
                    <div class="grid grid-4">
                        ${this.renderGallery()}
                    </div>
                </div>
            </div>
        `;
    }

    renderSkills(skills) {
        return Object.entries(skills).map(([skill, value]) => `
            <div style="margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="font-weight: 600; text-transform: capitalize;">${this.translateSkill(skill)}</span>
                    <span style="color: var(--primary); font-weight: bold;">${value}%</span>
                </div>
                <div style="background: var(--bg-light); height: 8px; border-radius: 10px; overflow: hidden;">
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

    renderBadges(badges) {
        return badges.map(badge => `
            <div class="card text-center" style="opacity: ${badge.earned ? 1 : 0.4}; padding: 1rem;">
                <div style="font-size: 3rem; margin-bottom: 0.5rem;">${badge.icon}</div>
                <p style="font-size: 0.875rem; font-weight: bold;">${badge.name}</p>
                ${badge.earned ? '<p style="font-size: 0.75rem; color: var(--success);">✓ Earned</p>' : '<p style="font-size: 0.75rem; color: var(--text-gray);">Locked</p>'}
            </div>
        `).join('');
    }

    renderGallery() {
        const gallery = [
            { id: 1, title: 'Portrait', emoji: '👤', date: 'Today' },
            { id: 2, title: 'Nature', emoji: '🍎', date: 'Yesterday' },
            { id: 3, title: 'Landscape', emoji: '🏞️', date: '2 days' },
            { id: 4, title: 'Animal', emoji: '🐱', date: '3 days' },
            { id: 5, title: 'House', emoji: '🏠', date: '4 days' },
            { id: 6, title: 'Flower', emoji: '🌸', date: '5 days' },
            { id: 7, title: 'Abstract', emoji: '🎨', date: '6 days' },
            { id: 8, title: 'Circle', emoji: '⭕', date: '7 days' }
        ];

        return gallery.map(item => `
            <div class="card gallery-item" style="cursor: pointer; text-align: center;">
                <div style="background: var(--bg-light); padding: 2rem; border-radius: var(--radius); margin-bottom: 0.5rem; font-size: 3rem;">
                    ${item.emoji}
                </div>
                <p style="font-weight: bold; margin-bottom: 0.25rem;">${item.title}</p>
                <p style="font-size: 0.75rem; color: var(--text-gray);">${item.date}</p>
            </div>
        `).join('');
    }

    mount() {
        // Gallery items click
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                alert('Will open drawing details with feedback received!');
            });
        });

        // Edit profile button
        document.querySelector('.btn-secondary')?.addEventListener('click', () => {
            this.showEditProfileModal();
        });
    }

    showEditProfileModal() {
        const user = this.state.get('user');

        const modalHTML = `
            <div class="modal-overlay">
                <div class="modal">
                    <div class="modal-header">
                        <h2>✏️ Edit Profile</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="editProfileForm">
                            <div class="form-group">
                                <label class="form-label">Name:</label>
                                <input type="text" class="form-input" value="${user.name}" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email:</label>
                                <input type="email" class="form-input" value="${user.email}" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Avatar (emoji):</label>
                                <input type="text" class="form-input" value="${user.avatar || ''}" placeholder="👤">
                            </div>
                            <button type="submit" class="btn btn-primary" style="width: 100%;">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        `;

        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = modalHTML;

        modalContainer.querySelector('.modal-close').addEventListener('click', () => {
            modalContainer.innerHTML = '';
        });

        modalContainer.querySelector('#editProfileForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Profile saving will be implemented with backend!');
            modalContainer.innerHTML = '';
        });
    }

    formatExperience(level) {
        const levels = {
            'beginner': '🌱 Beginner',
            'intermediate': '🎨 Intermediate',
            'advanced': '🏆 Advanced'
        };
        return levels[level] || level;
    }

    formatStyle(style) {
        const styles = {
            'realistic': '🖼️ Realistic',
            'anime': '✨ Anime',
            'cartoon': '🎭 Cartoon',
            'semi-realistic': '🎨 Semi-Realistic'
        };
        return styles[style] || style;
    }

    formatLearningMode(mode) {
        const modes = {
            'video': '🎥 Video Lessons',
            'text': '📚 Text with Images',
            'practice': '✏️ Practical Exercises'
        };
        return modes[mode] || mode;
    }

    cleanup() {}
}
