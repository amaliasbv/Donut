// Main Application Entry Point
import Router from './utils/router.js';
import State from './utils/state.js';

// Import pages
import HomePage from './pages/home.js';
import LessonsPage from './pages/lessons.js';
import AssignmentsPage from './pages/assignments.js';
import UploadPage from './pages/upload.js';
import ProfilePage from './pages/profile.js';
import ColorTheoryLesson from './pages/lesson-color-theory.js';
import OnboardingPage from './pages/onboarding.js';
import LoginPage from './pages/login.js';
import SignupPage from './pages/signup.js';
import VerifyEmailPage from './pages/verifyEmail.js';

class App {
    constructor() {
        this.router = new Router();
        this.state = State.getInstance();

        // Make router and state globally accessible
        window.appRouter = this.router;
        window.appState = this.state;

        this.init();
    }

    async init() {
        // Register routes first
        this.registerRoutes();

        // Setup navigation listeners
        this.setupNavigation();

        // Check if user is authenticated
        if (!window.authService.isAuthenticated()) {
            // Not logged in - show login page
            const currentHash = window.location.hash.slice(1);

            // Allow these pages without authentication
            const publicPages = ['login', 'signup', 'verify-email'];

            if (publicPages.includes(currentHash)) {
                this.router.navigate(currentHash);
            } else {
                this.router.navigate('login');
            }
            return;
        }

        // User is logged in - initialize state
        await this.initializeState();

        // Check if profile exists
        try {
            const profile = await window.authService.getUserProfile();

            if (!profile) {
                // No profile - redirect to onboarding
                this.router.navigate('onboarding');
            } else {
                // Has profile - normal navigation
                this.router.navigate(window.location.hash.slice(1) || 'home');
            }
        } catch (error) {
            console.error('Failed to check profile:', error);
            // On error, redirect to login
            window.authService.clearTokens();
            this.router.navigate('login');
        }

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.router.navigate(window.location.hash.slice(1) || 'home');
        });
    }

    async initializeState() {
        // Initialize user from profile or use defaults
        await this.state.initializeUser();

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
            { id: 1, name: 'First Steps', icon: '🎨', earned: true },
            { id: 2, name: 'Color Master', icon: '🌈', earned: true },
            { id: 3, name: 'Shadow Expert', icon: '🌓', earned: false }
        ]);
    }

    registerRoutes() {
        // Auth pages
        this.router.addRoute('login', new LoginPage());
        this.router.addRoute('signup', new SignupPage());
        this.router.addRoute('verify-email', new VerifyEmailPage());
        this.router.addRoute('onboarding', new OnboardingPage());

        // Main pages
        this.router.addRoute('home', new HomePage());
        this.router.addRoute('lessons', new LessonsPage());
        this.router.addRoute('assignments', new AssignmentsPage());
        this.router.addRoute('upload', new UploadPage());
        this.router.addRoute('profile', new ProfilePage());
        this.router.addRoute('lesson-color-theory', new ColorTheoryLesson());
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

        // Handle login button - redirect to login page
        document.getElementById('loginBtn')?.addEventListener('click', () => {
            window.location.hash = 'login';
        });

        // Add logout button handler if user is logged in
        document.getElementById('logoutBtn')?.addEventListener('click', async () => {
            if (confirm('Are you sure you want to log out?')) {
                await window.authService.logout();
                window.location.hash = 'login';
                location.reload();
            }
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
