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

        return `
            <div class="page-container">
                <div class="grid grid-2 gap-3">
                    <!-- Left Column - User Info & Stats -->
                    <div>
                        <!-- Profile Card -->
                        <div class="card text-center mb-3">
                            <div style="width: 120px; height: 120px; margin: 0 auto 1rem; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 3rem;">
                                ${user.avatar || '👤'}
                            </div>
                            <h2 style="color: var(--primary); margin-bottom: 0.5rem;">${user.name}</h2>
                            <p style="color: var(--text-gray); margin-bottom: 1rem;">${user.email}</p>

                            <div style="display: inline-block; background: var(--primary); color: white; padding: 0.5rem 1.5rem; border-radius: 20px; margin-bottom: 1rem;">
                                ⭐ Nivel ${user.level} - ${user.xp} XP
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
                                    ${500 - (user.xp % 500)} XP până la Nivel ${user.level + 1}
                                </p>
                            </div>

                            <button class="btn btn-secondary" style="width: 100%;">Editează Profil</button>
                        </div>

                        <!-- Skills Card -->
                        <div class="card">
                            <h3 style="color: var(--primary); margin-bottom: 1rem;">🎨 Abilități</h3>
                            ${this.renderSkills(progress.skills)}
                        </div>
                    </div>

                    <!-- Right Column - Progress & Badges -->
                    <div>
                        <!-- Progress Stats -->
                        <div class="card mb-3">
                            <h3 style="color: var(--primary); margin-bottom: 1rem;">📊 Progres</h3>

                            <div style="margin-bottom: 1.5rem;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                    <span>📚 Lecții</span>
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
                                    <span>📝 Teme</span>
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
                            <h3 style="color: var(--primary); margin-bottom: 1rem;">🏆 Badge-uri</h3>
                            <div class="grid grid-3">
                                ${this.renderBadges(badges)}
                            </div>
                        </div>

                        <!-- Account Info -->
                        <div class="card mt-3">
                            <h3 style="color: var(--primary); margin-bottom: 1rem;">ℹ️ Info Cont</h3>
                            <div style="color: var(--text-gray);">
                                <p style="margin-bottom: 0.5rem;">
                                    <strong>Membru din:</strong> ${new Date(user.joinedDate).toLocaleDateString('ro-RO')}
                                </p>
                                <p style="margin-bottom: 0.5rem;">
                                    <strong>Desene încărcate:</strong> 12
                                </p>
                                <p>
                                    <strong>Feedback-uri primite:</strong> 10
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Gallery Section -->
                <div class="mt-4">
                    <h2 style="color: var(--primary); margin-bottom: 1rem;">🖼️ Galeria Mea</h2>
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
            color: 'Culoare',
            shading: 'Umbre',
            perspective: 'Perspectivă',
            composition: 'Compoziție',
            anatomy: 'Anatomie'
        };
        return translations[skill] || skill;
    }

    renderBadges(badges) {
        return badges.map(badge => `
            <div class="card text-center" style="opacity: ${badge.earned ? 1 : 0.4}; padding: 1rem;">
                <div style="font-size: 3rem; margin-bottom: 0.5rem;">${badge.icon}</div>
                <p style="font-size: 0.875rem; font-weight: bold;">${badge.name}</p>
                ${badge.earned ? '<p style="font-size: 0.75rem; color: var(--success);">✓ Obținut</p>' : '<p style="font-size: 0.75rem; color: var(--text-gray);">Blocat</p>'}
            </div>
        `).join('');
    }

    renderGallery() {
        const gallery = [
            { id: 1, title: 'Portret', emoji: '👤', date: 'Azi' },
            { id: 2, title: 'Natură', emoji: '🍎', date: 'Ieri' },
            { id: 3, title: 'Peisaj', emoji: '🏞️', date: '2 zile' },
            { id: 4, title: 'Animal', emoji: '🐱', date: '3 zile' },
            { id: 5, title: 'Casă', emoji: '🏠', date: '4 zile' },
            { id: 6, title: 'Floare', emoji: '🌸', date: '5 zile' },
            { id: 7, title: 'Abstract', emoji: '🎨', date: '6 zile' },
            { id: 8, title: 'Cerc', emoji: '⭕', date: '7 zile' }
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
                alert('Va deschide detaliile desenului cu feedback-ul primit!');
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
                        <h2>✏️ Editează Profil</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="editProfileForm">
                            <div class="form-group">
                                <label class="form-label">Nume:</label>
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
                            <button type="submit" class="btn btn-primary" style="width: 100%;">Salvează</button>
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
            alert('Salvarea profilului va fi implementată cu backend!');
            modalContainer.innerHTML = '';
        });
    }

    cleanup() {}
}
