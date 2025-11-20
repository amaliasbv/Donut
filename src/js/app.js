// Main Application Entry Point
import Router from './utils/router.js';
import State from './utils/state.js';

// Import pages
import HomePage from './pages/home.js';
import LessonsPage from './pages/lessons.js';
import AssignmentsPage from './pages/assignments.js';
import UploadPage from './pages/upload.js';
import ProfilePage from './pages/profile.js';

class App {
    constructor() {
        this.router = new Router();
        this.state = State.getInstance();
        this.init();
    }

    init() {
        // Initialize state with mock data (will be replaced with API calls)
        this.initializeState();

        // Register routes
        this.registerRoutes();

        // Setup navigation listeners
        this.setupNavigation();

        // Handle initial route
        this.router.navigate(window.location.hash.slice(1) || 'home');

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.router.navigate(window.location.hash.slice(1) || 'home');
        });
    }

    initializeState() {
        // Mock user data (later from API)
        this.state.set('user', {
            id: 1,
            name: 'Amalia',
            email: 'amalia@drawhub.com',
            level: 5,
            xp: 1250,
            avatar: null,
            joinedDate: '2025-01-15'
        });

        // Mock progress data
        this.state.set('progress', {
            lessonsCompleted: 8,
            totalLessons: 15,
            assignmentsCompleted: 5,
            totalAssignments: 10,
            skills: {
                color: 65,
                shading: 45,
                perspective: 30,
                composition: 55,
                anatomy: 40
            }
        });

        // Mock badges
        this.state.set('badges', [
            { id: 1, name: 'Primii Pași', icon: '🎨', earned: true },
            { id: 2, name: 'Maestru Culori', icon: '🌈', earned: true },
            { id: 3, name: 'Expert Umbre', icon: '🌓', earned: false }
        ]);
    }

    registerRoutes() {
        this.router.addRoute('home', new HomePage());
        this.router.addRoute('lessons', new LessonsPage());
        this.router.addRoute('assignments', new AssignmentsPage());
        this.router.addRoute('upload', new UploadPage());
        this.router.addRoute('profile', new ProfilePage());
    }

    setupNavigation() {
        // Handle nav link clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.getAttribute('data-page');

                // Update active state
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');

                // Navigate
                window.location.hash = page;
                this.router.navigate(page);
            });
        });

        // Handle login button
        document.getElementById('loginBtn')?.addEventListener('click', () => {
            this.showLoginModal();
        });
    }

    showLoginModal() {
        // Simple modal implementation
        const modalHTML = `
            <div class="modal-overlay">
                <div class="modal">
                    <div class="modal-header">
                        <h2>Login</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="loginForm">
                            <div class="form-group">
                                <label class="form-label">Email:</label>
                                <input type="email" class="form-input" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Password:</label>
                                <input type="password" class="form-input" required>
                            </div>
                            <button type="submit" class="btn btn-primary" style="width: 100%;">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        `;

        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = modalHTML;

        // Close modal handlers
        modalContainer.querySelector('.modal-close').addEventListener('click', () => {
            modalContainer.innerHTML = '';
        });

        modalContainer.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === modalContainer.querySelector('.modal-overlay')) {
                modalContainer.innerHTML = '';
            }
        });

        // Form submit
        modalContainer.querySelector('#loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Login functionality will be implemented with backend!');
            modalContainer.innerHTML = '';
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
