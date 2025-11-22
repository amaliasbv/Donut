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
                title: 'Still Life Drawing',
                description: 'Draw 3-5 simple objects (fruits, mug, book) with natural lighting',
                difficulty: 'beginner',
                estimatedTime: 60,
                status: 'completed',
                referenceImage: '🍎📚☕',
                objectives: ['Correct proportions', 'Realistic shadows', 'Balanced composition']
            },
            {
                id: 2,
                title: 'Simple Portrait',
                description: 'Draw a portrait using the proportions you learned',
                difficulty: 'intermediate',
                estimatedTime: 90,
                status: 'in_progress',
                referenceImage: '👤',
                objectives: ['Facial proportions', 'Feature placement', 'Subtle shading']
            },
            {
                id: 3,
                title: 'Landscape with Perspective',
                description: 'Create an urban landscape with 2-point perspective',
                difficulty: 'advanced',
                estimatedTime: 120,
                status: 'available',
                referenceImage: '🏙️',
                objectives: ['Correct perspective', 'Architectural details', 'Depth']
            }
        ];
    }

    async render() {
        return `
            <div class="page-container">
                <header class="mb-4">
                    <h1 style="color: var(--primary); font-size: 2.5rem;">📝 Assignments</h1>
                    <p style="font-size: 1.1rem; color: var(--text-gray);">
                        Personalized assignments to practice your skills
                    </p>
                </header>

                <div class="mb-4">
                    <button class="btn btn-primary" id="generateAssignmentBtn">
                        ✨ Generate New Assignment (AI)
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
                    <strong style="color: var(--primary);">Objectives:</strong>
                    <ul style="margin-top: 0.5rem; padding-left: 1.5rem; color: var(--text-gray);">
                        ${assignment.objectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                </div>

                <div class="flex-between" style="margin-bottom: 1rem; font-size: 0.875rem; color: var(--text-gray);">
                    <span>⏱️ ${assignment.estimatedTime} min</span>
                    ${assignment.status === 'completed' ? '<span style="color: var(--success);">✓ Completed</span>' : ''}
                </div>

                <button class="btn ${assignment.status === 'completed' ? 'btn-secondary' : 'btn-primary'}" style="width: 100%;">
                    ${this.getButtonText(assignment.status)}
                </button>
            </div>
        `).join('');
    }

    renderStatusBadge(status) {
        const badges = {
            available: '<div style="background: var(--primary); color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; display: inline-block; margin-bottom: 1rem;">📌 Available</div>',
            in_progress: '<div style="background: var(--warning); color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; display: inline-block; margin-bottom: 1rem;">⏳ In Progress</div>',
            completed: '<div style="background: var(--success); color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; display: inline-block; margin-bottom: 1rem;">✓ Completed</div>'
        };
        return badges[status] || '';
    }

    getButtonText(status) {
        const texts = {
            available: '▶️ Start Assignment',
            in_progress: '🔄 Continue',
            completed: '👁️ View Feedback'
        };
        return texts[status] || 'View Assignment';
    }

    translateDifficulty(difficulty) {
        const translations = {
            beginner: 'Beginner',
            intermediate: 'Intermediate',
            advanced: 'Advanced'
        };
        return translations[difficulty] || difficulty;
    }

    mount() {
        // Generate assignment button
        document.getElementById('generateAssignmentBtn')?.addEventListener('click', () => {
            alert('AI generation feature will be implemented in the backend!\nIt will generate personalized assignments based on your level and progress.');
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
                alert('This will take you to the upload or feedback page!');
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
                            <h3 style="color: var(--primary);">🎯 Objectives:</h3>
                            <ul style="padding-left: 1.5rem;">
                                ${assignment.objectives.map(obj => `<li>${obj}</li>`).join('')}
                            </ul>
                        </div>

                        <div class="mb-3">
                            <h3 style="color: var(--primary);">📸 Reference:</h3>
                            <div style="background: var(--bg-light); padding: 3rem; text-align: center; border-radius: var(--radius); font-size: 4rem;">
                                ${assignment.referenceImage}
                            </div>
                            <p style="color: var(--text-gray); font-size: 0.875rem; margin-top: 0.5rem; text-align: center;">
                                Reference image will be AI-generated
                            </p>
                        </div>

                        <button class="btn btn-primary" style="width: 100%;" onclick="window.location.hash='upload'">
                            ${assignment.status === 'completed' ? '📤 Re-upload Drawing' : '📤 Upload Your Drawing'}
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
