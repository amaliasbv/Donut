// Lessons Page
import State from '../utils/state.js';

export default class LessonsPage {
    constructor() {
        this.state = State.getInstance();
        this.lessons = this.getLessonsData();
        this.selectedLesson = null;
    }

    getLessonsData() {
        // Mock lessons data (will be from API later)
        return [
            {
                id: 1,
                title: 'Teoria Culorilor',
                description: 'Învață despre cercul cromatic, complementaritate și armonii de culori',
                difficulty: 'beginner',
                duration: 30,
                completed: true,
                category: 'Fundamente',
                thumbnail: '🎨'
            },
            {
                id: 2,
                title: 'Lumină și Umbre',
                description: 'Înțelege valoarea tonală, lumina ambientală și direcțională',
                difficulty: 'beginner',
                duration: 45,
                completed: true,
                category: 'Fundamente',
                thumbnail: '🌓'
            },
            {
                id: 3,
                title: 'Perspectivă: 1 Punct',
                description: 'Bazele perspectivei cu un singur punct de fugă',
                difficulty: 'intermediate',
                duration: 60,
                completed: false,
                category: 'Perspectivă',
                thumbnail: '📐'
            },
            {
                id: 4,
                title: 'Compoziție: Regula Treimilor',
                description: 'Cum să compui desene echilibrate și atractive',
                difficulty: 'beginner',
                duration: 40,
                completed: true,
                category: 'Compoziție',
                thumbnail: '📐'
            },
            {
                id: 5,
                title: 'Anatomie: Proporții Faciale',
                description: 'Proporțiile de bază pentru desenarea feței',
                difficulty: 'intermediate',
                duration: 90,
                completed: false,
                category: 'Anatomie',
                thumbnail: '👤'
            },
            {
                id: 6,
                title: 'Shading Tehnici',
                description: 'Hatching, cross-hatching, și blending',
                difficulty: 'intermediate',
                duration: 50,
                completed: false,
                category: 'Tehnici',
                thumbnail: '✏️'
            },
            {
                id: 7,
                title: 'Perspectivă: 2 Puncte',
                description: 'Perspectivă avansată cu două puncte de fugă',
                difficulty: 'advanced',
                duration: 75,
                completed: false,
                category: 'Perspectivă',
                thumbnail: '🏙️'
            },
            {
                id: 8,
                title: 'Anatomie: Corp Uman',
                description: 'Proporții și structură a corpului uman',
                difficulty: 'advanced',
                duration: 120,
                completed: false,
                category: 'Anatomie',
                thumbnail: '🧍'
            }
        ];
    }

    async render() {
        return `
            <div class="page-container">
                <header class="mb-4">
                    <h1 style="color: var(--primary); font-size: 2.5rem;">📚 Lecții</h1>
                    <p style="font-size: 1.1rem; color: var(--text-gray);">
                        Învață teorie artistică pas cu pas
                    </p>
                </header>

                <!-- Filters -->
                <div class="flex gap-2 mb-4" style="flex-wrap: wrap;">
                    <button class="filter-btn active" data-filter="all">Toate</button>
                    <button class="filter-btn" data-filter="beginner">Începător</button>
                    <button class="filter-btn" data-filter="intermediate">Intermediar</button>
                    <button class="filter-btn" data-filter="advanced">Avansat</button>
                    <button class="filter-btn" data-filter="completed">Completate</button>
                </div>

                <!-- Lessons Grid -->
                <div class="grid grid-3" id="lessonsGrid">
                    ${this.renderLessons()}
                </div>
            </div>
        `;
    }

    renderLessons(filter = 'all') {
        let filteredLessons = this.lessons;

        if (filter === 'completed') {
            filteredLessons = this.lessons.filter(l => l.completed);
        } else if (filter !== 'all') {
            filteredLessons = this.lessons.filter(l => l.difficulty === filter);
        }

        return filteredLessons.map(lesson => `
            <div class="card lesson-card" data-lesson-id="${lesson.id}">
                ${lesson.completed ? '<div class="completed-badge" style="position: absolute; top: 10px; right: 10px; background: var(--success); color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem;">✓ Completat</div>' : ''}

                <div style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">${lesson.thumbnail}</div>

                <div class="card-header">
                    <h3 class="card-title">${lesson.title}</h3>
                    <span class="card-badge badge-${lesson.difficulty}">
                        ${this.translateDifficulty(lesson.difficulty)}
                    </span>
                </div>

                <p style="color: var(--text-gray); margin-bottom: 1rem; min-height: 3rem;">
                    ${lesson.description}
                </p>

                <div class="flex-between" style="margin-bottom: 1rem; font-size: 0.875rem; color: var(--text-gray);">
                    <span>📁 ${lesson.category}</span>
                    <span>⏱️ ${lesson.duration} min</span>
                </div>

                <button class="btn ${lesson.completed ? 'btn-secondary' : 'btn-primary'}" style="width: 100%;">
                    ${lesson.completed ? 'Revizuiește' : 'Începe Lecția'}
                </button>
            </div>
        `).join('');
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
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                const filter = e.target.getAttribute('data-filter');
                const grid = document.getElementById('lessonsGrid');
                grid.innerHTML = this.renderLessons(filter);
                this.attachLessonCardListeners();
            });
        });

        // Add filter button styles
        const style = document.createElement('style');
        style.textContent = `
            .filter-btn {
                padding: 0.5rem 1rem;
                border: 2px solid var(--primary);
                background: white;
                color: var(--primary);
                border-radius: var(--radius);
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s;
            }
            .filter-btn:hover {
                background: var(--bg-light);
            }
            .filter-btn.active {
                background: var(--primary);
                color: white;
            }
            .lesson-card {
                position: relative;
            }
        `;
        document.head.appendChild(style);

        this.attachLessonCardListeners();
    }

    attachLessonCardListeners() {
        document.querySelectorAll('.lesson-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const lessonId = parseInt(e.currentTarget.getAttribute('data-lesson-id'));
                this.showLessonDetail(lessonId);
            });
        });
    }

    showLessonDetail(lessonId) {
        const lesson = this.lessons.find(l => l.id === lessonId);
        if (!lesson) return;

        const modalHTML = `
            <div class="modal-overlay">
                <div class="modal" style="max-width: 800px;">
                    <div class="modal-header">
                        <h2>${lesson.thumbnail} ${lesson.title}</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="flex-between mb-3">
                            <span class="card-badge badge-${lesson.difficulty}">${this.translateDifficulty(lesson.difficulty)}</span>
                            <span style="color: var(--text-gray);">⏱️ ${lesson.duration} minute</span>
                        </div>

                        <p style="color: var(--text-gray); margin-bottom: 2rem; font-size: 1.1rem;">
                            ${lesson.description}
                        </p>

                        <div class="mb-3">
                            <h3 style="color: var(--primary); margin-bottom: 1rem;">📋 Ce vei învăța:</h3>
                            <ul style="list-style: none; padding: 0;">
                                ${this.getLessonObjectives(lesson.id).map(obj => `
                                    <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
                                        ✓ ${obj}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>

                        <div class="mb-3">
                            <h3 style="color: var(--primary); margin-bottom: 1rem;">📝 Conținut:</h3>
                            <p style="color: var(--text-gray);">
                                ${this.getLessonContent(lesson.id)}
                            </p>
                        </div>

                        <button class="btn btn-primary" style="width: 100%;" onclick="alert('Lecția va fi implementată cu conținut complet!')">
                            ${lesson.completed ? '🔄 Revizuiește Lecția' : '▶️ Începe Lecția'}
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

    getLessonObjectives(lessonId) {
        const objectives = {
            1: [
                'Înțelege cercul cromatic și relațiile dintre culori',
                'Identifică culorile complementare și armonii',
                'Aplică teoria culorilor în desene',
                'Înțelege temperatura culorilor'
            ],
            2: [
                'Recunoști surse de lumină directă și ambientală',
                'Desenezi umbre corecte bazate pe sursa de lumină',
                'Înțelegi valoarea tonală și gradarea',
                'Aplici tehnici de shading'
            ],
            3: [
                'Înțelegi conceptul de punct de fugă',
                'Desenezi obiecte simple în perspectivă',
                'Construiești scene în perspectivă corectă',
                'Eviți erorile comune de perspectivă'
            ]
        };
        return objectives[lessonId] || [
            'Obiectiv 1: Înțelegere concepte de bază',
            'Obiectiv 2: Practică ghidată',
            'Obiectiv 3: Aplicare în desene'
        ];
    }

    getLessonContent(lessonId) {
        return 'Această lecție include teorie detaliată, exemple vizuale, exerciții practice și un mini-test la final. Vei învăța pas cu pas, cu explicații clare și exemple practice.';
    }

    cleanup() {
        // Cleanup
    }
}
