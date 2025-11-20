// Assignments/Themes Page
import State from '../utils/state.js';

export default class AssignmentsPage {
    constructor() {
        this.state = State.getInstance();
        this.assignments = this.getAssignmentsData();
    }

    getAssignmentsData() {
        return [
            {
                id: 1,
                title: 'Desen de Natură Statică',
                description: 'Desenează 3-5 obiecte simple (fructe, cană, carte) cu lumină naturală',
                difficulty: 'beginner',
                estimatedTime: 60,
                status: 'completed',
                referenceImage: '🍎📚☕',
                objectives: ['Proporții corecte', 'Umbre realiste', 'Compoziție echilibrată']
            },
            {
                id: 2,
                title: 'Portret Simplu',
                description: 'Desenează un portret folosind proporțiile învățate',
                difficulty: 'intermediate',
                estimatedTime: 90,
                status: 'in_progress',
                referenceImage: '👤',
                objectives: ['Proporții faciale', 'Plasarea trăsăturilor', 'Shading subtil']
            },
            {
                id: 3,
                title: 'Peisaj cu Perspectivă',
                description: 'Creează un peisaj urban cu perspectivă în 2 puncte',
                difficulty: 'advanced',
                estimatedTime: 120,
                status: 'available',
                referenceImage: '🏙️',
                objectives: ['Perspectivă corectă', 'Detalii arhitecturale', 'Profunzime']
            }
        ];
    }

    async render() {
        return `
            <div class="page-container">
                <header class="mb-4">
                    <h1 style="color: var(--primary); font-size: 2.5rem;">📝 Teme</h1>
                    <p style="font-size: 1.1rem; color: var(--text-gray);">
                        Teme personalizate pentru exersarea abilităților tale
                    </p>
                </header>

                <div class="mb-4">
                    <button class="btn btn-primary" id="generateAssignmentBtn">
                        ✨ Generează Temă Nouă (AI)
                    </button>
                </div>

                <div class="grid grid-2">
                    ${this.renderAssignments()}
                </div>
            </div>
        `;
    }

    renderAssignments() {
        return this.assignments.map(assignment => `
            <div class="card assignment-card" data-assignment-id="${assignment.id}">
                <div class="card-header">
                    <div>
                        <span style="font-size: 2rem;">${assignment.referenceImage}</span>
                        <h3 class="card-title">${assignment.title}</h3>
                    </div>
                    <span class="card-badge badge-${assignment.difficulty}">
                        ${this.translateDifficulty(assignment.difficulty)}
                    </span>
                </div>

                ${this.renderStatusBadge(assignment.status)}

                <p style="color: var(--text-gray); margin: 1rem 0;">
                    ${assignment.description}
                </p>

                <div style="margin-bottom: 1rem;">
                    <strong style="color: var(--primary);">Obiective:</strong>
                    <ul style="margin-top: 0.5rem; padding-left: 1.5rem; color: var(--text-gray);">
                        ${assignment.objectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                </div>

                <div class="flex-between" style="margin-bottom: 1rem; font-size: 0.875rem; color: var(--text-gray);">
                    <span>⏱️ ${assignment.estimatedTime} min</span>
                    ${assignment.status === 'completed' ? '<span style="color: var(--success);">✓ Completat</span>' : ''}
                </div>

                <button class="btn ${assignment.status === 'completed' ? 'btn-secondary' : 'btn-primary'}" style="width: 100%;">
                    ${this.getButtonText(assignment.status)}
                </button>
            </div>
        `).join('');
    }

    renderStatusBadge(status) {
        const badges = {
            available: '<div style="background: var(--primary); color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; display: inline-block; margin-bottom: 1rem;">📌 Disponibil</div>',
            in_progress: '<div style="background: var(--warning); color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; display: inline-block; margin-bottom: 1rem;">⏳ În progres</div>',
            completed: '<div style="background: var(--success); color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; display: inline-block; margin-bottom: 1rem;">✓ Completat</div>'
        };
        return badges[status] || '';
    }

    getButtonText(status) {
        const texts = {
            available: '▶️ Începe Tema',
            in_progress: '🔄 Continuă',
            completed: '👁️ Vezi Feedback'
        };
        return texts[status] || 'Vezi Tema';
    }

    translateDifficulty(difficulty) {
        const translations = {
            beginner: 'Începător',
            intermediate: 'Intermediar',
            advanced: 'Avansat'
        };
        return translations[difficulty] || difficulty;
    }

    mount() {
        // Generate assignment button
        document.getElementById('generateAssignmentBtn')?.addEventListener('click', () => {
            alert('Funcția de generare AI va fi implementată în backend!\nVa genera teme personalizate bazate pe nivelul și progresul tău.');
        });

        // Assignment cards
        document.querySelectorAll('.assignment-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.tagName === 'BUTTON') return;
                const assignmentId = parseInt(e.currentTarget.getAttribute('data-assignment-id'));
                this.showAssignmentDetail(assignmentId);
            });
        });

        // Button clicks
        document.querySelectorAll('.assignment-card button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                alert('Aceasta va duce la pagina de upload sau feedback!');
                window.location.hash = 'upload';
            });
        });
    }

    showAssignmentDetail(assignmentId) {
        const assignment = this.assignments.find(a => a.id === assignmentId);
        if (!assignment) return;

        const modalHTML = `
            <div class="modal-overlay">
                <div class="modal">
                    <div class="modal-header">
                        <h2>${assignment.referenceImage} ${assignment.title}</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <span class="card-badge badge-${assignment.difficulty}">${this.translateDifficulty(assignment.difficulty)}</span>
                            ${this.renderStatusBadge(assignment.status)}
                        </div>

                        <p style="font-size: 1.1rem; margin-bottom: 2rem;">${assignment.description}</p>

                        <div class="mb-3">
                            <h3 style="color: var(--primary);">🎯 Obiective:</h3>
                            <ul style="padding-left: 1.5rem;">
                                ${assignment.objectives.map(obj => `<li>${obj}</li>`).join('')}
                            </ul>
                        </div>

                        <div class="mb-3">
                            <h3 style="color: var(--primary);">📸 Referință:</h3>
                            <div style="background: var(--bg-light); padding: 3rem; text-align: center; border-radius: var(--radius); font-size: 4rem;">
                                ${assignment.referenceImage}
                            </div>
                            <p style="color: var(--text-gray); font-size: 0.875rem; margin-top: 0.5rem; text-align: center;">
                                Imaginea de referință va fi generată de AI
                            </p>
                        </div>

                        <button class="btn btn-primary" style="width: 100%;" onclick="window.location.hash='upload'">
                            ${assignment.status === 'completed' ? '📤 Reîncarcă Desenul' : '📤 Încarcă Desenul Tău'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = modalHTML;

        modalContainer.querySelector('.modal-close').addEventListener('click', () => {
            modalContainer.innerHTML = '';
        });

        modalContainer.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === modalContainer.querySelector('.modal-overlay')) {
                modalContainer.innerHTML = '';
            }
        });
    }

    cleanup() {}
}
