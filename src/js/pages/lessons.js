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
                title: 'Color Theory',
                description: 'Learn about the color wheel, complementary colors, and color harmonies',
                difficulty: 'beginner',
                duration: 30,
                completed: true,
                category: 'Fundamentals',
                thumbnail: '🎨'
            },
            {
                id: 2,
                title: 'Light and Shadow',
                description: 'Understand tonal value, ambient and directional lighting',
                difficulty: 'beginner',
                duration: 45,
                completed: true,
                category: 'Fundamentals',
                thumbnail: '🌓'
            },
            {
                id: 3,
                title: 'Perspective: 1-Point',
                description: 'Basics of perspective with one vanishing point',
                difficulty: 'intermediate',
                duration: 60,
                completed: false,
                category: 'Perspective',
                thumbnail: '📐'
            },
            {
                id: 4,
                title: 'Composition: Rule of Thirds',
                description: 'How to compose balanced and attractive drawings',
                difficulty: 'beginner',
                duration: 40,
                completed: true,
                category: 'Composition',
                thumbnail: '📐'
            },
            {
                id: 5,
                title: 'Anatomy: Facial Proportions',
                description: 'Basic proportions for drawing the face',
                difficulty: 'intermediate',
                duration: 90,
                completed: false,
                category: 'Anatomy',
                thumbnail: '👤'
            },
            {
                id: 6,
                title: 'Shading Techniques',
                description: 'Hatching, cross-hatching, and blending',
                difficulty: 'intermediate',
                duration: 50,
                completed: false,
                category: 'Techniques',
                thumbnail: '✏️'
            },
            {
                id: 7,
                title: 'Perspective: 2-Point',
                description: 'Advanced perspective with two vanishing points',
                difficulty: 'advanced',
                duration: 75,
                completed: false,
                category: 'Perspective',
                thumbnail: '🏙️'
            },
            {
                id: 8,
                title: 'Anatomy: Human Body',
                description: 'Proportions and structure of the human body',
                difficulty: 'advanced',
                duration: 120,
                completed: false,
                category: 'Anatomy',
                thumbnail: '🧍'
            }
        ];
    }

    async render() {
        return `
            <div class="page-container">
                <header class="mb-4">
                    <h1 style="color: var(--primary); font-size: 2.5rem;">📚 Lessons</h1>
                    <p style="font-size: 1.1rem; color: var(--text-gray);">
                        Learn art theory step by step
                    </p>
                </header>

                <!-- Filters -->
                <div class="flex gap-2 mb-4" style="flex-wrap: wrap;">
                    <button class="filter-btn active" data-filter="all">All</button>
                    <button class="filter-btn" data-filter="beginner">Beginner</button>
                    <button class="filter-btn" data-filter="intermediate">Intermediate</button>
                    <button class="filter-btn" data-filter="advanced">Advanced</button>
                    <button class="filter-btn" data-filter="completed">Completed</button>
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
                ${lesson.completed ? '<div class="completed-badge" style="position: absolute; top: 10px; right: 10px; background: var(--success); color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem;">✓ Completed</div>' : ''}

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
                    ${lesson.completed ? 'Review' : 'Start Lesson'}
                </button>
            </div>
        `).join('');
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

        // If it's the Color Theory lesson, navigate directly to it
        if (lessonId === 1) {
            window.location.hash = 'lesson-color-theory';
            const router = window.appRouter; // We'll set this in app.js
            if (router) {
                router.navigate('lesson-color-theory');
            }
            return;
        }

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
                            <span style="color: var(--text-gray);">⏱️ ${lesson.duration} minutes</span>
                        </div>

                        <p style="color: var(--text-gray); margin-bottom: 2rem; font-size: 1.1rem;">
                            ${lesson.description}
                        </p>

                        <div class="mb-3">
                            <h3 style="color: var(--primary); margin-bottom: 1rem;">📋 What you'll learn:</h3>
                            <ul style="list-style: none; padding: 0;">
                                ${this.getLessonObjectives(lesson.id).map(obj => `
                                    <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
                                        ✓ ${obj}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>

                        <div class="mb-3">
                            <h3 style="color: var(--primary); margin-bottom: 1rem;">📝 Content:</h3>
                            <p style="color: var(--text-gray);">
                                ${this.getLessonContent(lesson.id)}
                            </p>
                        </div>

                        <button class="btn btn-primary" style="width: 100%;" onclick="alert('Lesson will be implemented with full content!')">
                            ${lesson.completed ? '🔄 Review Lesson' : '▶️ Start Lesson'}
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
                'Understand the color wheel and color relationships',
                'Identify complementary colors and harmonies',
                'Apply color theory in drawings',
                'Understand color temperature'
            ],
            2: [
                'Recognize direct and ambient light sources',
                'Draw correct shadows based on light source',
                'Understand tonal value and gradation',
                'Apply shading techniques'
            ],
            3: [
                'Understand the concept of vanishing point',
                'Draw simple objects in perspective',
                'Construct scenes in correct perspective',
                'Avoid common perspective errors'
            ]
        };
        return objectives[lessonId] || [
            'Objective 1: Understanding basic concepts',
            'Objective 2: Guided practice',
            'Objective 3: Application in drawings'
        ];
    }

    getLessonContent(lessonId) {
        return 'This lesson includes detailed theory, visual examples, practical exercises, and a mini-quiz at the end. You will learn step by step with clear explanations and practical examples.';
    }

    cleanup() {
        // Cleanup
    }
}
