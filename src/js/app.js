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
        // Wait for authService to be ready
        await this.waitForAuthService();

        // Register routes first
        this.registerRoutes();

        // Setup navigation listeners
        this.setupNavigation();

        // Make updateNavbar globally accessible
        window.updateNavbar = this.updateNavbar.bind(this);
        window.updateNavbarVisibility = this.updateNavbarVisibility.bind(this);

        // Check if user is authenticated
        if (!window.authService.isAuthenticated()) {
            // Not logged in - show login page
            const currentHash = window.location.hash.slice(1);

            // Allow these pages without authentication
            const publicPages = ['login', 'signup', 'verify-email'];

            const targetPage = publicPages.includes(currentHash) ? currentHash : 'login';

            this.updateNavbar();
            this.updateNavbarVisibility(targetPage);
            this.router.navigate(targetPage);
            return;
        }

        // User is logged in - initialize state
        await this.initializeState();

        // Update navbar with user info
        this.updateNavbar();

        // Check if profile exists
        try {
            const profile = await window.authService.getUserProfile();

            if (!profile) {
                // No profile - redirect to onboarding
                this.updateNavbarVisibility('onboarding');
                this.router.navigate('onboarding');
            } else {
                // Has profile - normal navigation
                const targetPage = window.location.hash.slice(1) || 'home';
                this.updateNavbarVisibility(targetPage);
                this.router.navigate(targetPage);
            }
        } catch (error) {
            console.error('Failed to check profile:', error);
            // On error, redirect to login
            window.authService.clearTokens();
            this.updateNavbar();
            this.updateNavbarVisibility('login');
            this.router.navigate('login');
        }

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            const page = window.location.hash.slice(1) || 'home';
            this.updateNavbarVisibility(page);
            this.router.navigate(page);
        });

        // Handle hash changes (when links change URL hash)
        window.addEventListener('hashchange', () => {
            const page = window.location.hash.slice(1) || 'home';

            // Check authentication for protected pages
            const publicPages = ['login', 'signup', 'verify-email'];
            const isPublic = publicPages.includes(page);

            if (!isPublic && !window.authService.isAuthenticated()) {
                // Redirect to login if not authenticated
                window.location.hash = 'login';
                this.updateNavbarVisibility('login');
                this.router.navigate('login');
                return;
            }

            this.updateNavbarVisibility(page);
            this.router.navigate(page);
        });
    }

    waitForAuthService() {
        return new Promise((resolve) => {
            if (window.authService) {
                resolve();
            } else {
                const interval = setInterval(() => {
                    if (window.authService) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 50);

                // Timeout after 5 seconds
                setTimeout(() => {
                    clearInterval(interval);
                    console.error('AuthService failed to load');
                    resolve();
                }, 5000);
            }
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

                // Update navbar visibility
                this.updateNavbarVisibility(page);

                // Navigate
                window.location.hash = page;
                this.router.navigate(page);
            });
        });
    }

    updateNavbar() {
        const navAuth = document.querySelector('.nav-auth');
        if (!navAuth) return;

        const isAuthenticated = window.authService && window.authService.isAuthenticated();

        if (isAuthenticated) {
            // Show user info + logout button
            const user = this.state.get('user');
            const userName = user?.name || 'User';

            navAuth.innerHTML = `
                <span class="user-greeting">Hi, ${userName}! 👋</span>
                <button class="btn-secondary" id="logoutBtn">Logout</button>
            `;

            // Add logout handler
            document.getElementById('logoutBtn')?.addEventListener('click', async () => {
                if (confirm('Are you sure you want to log out?')) {
                    await window.authService.logout();
                    this.state.set('user', null);
                    this.updateNavbar();
                    this.updateNavbarVisibility('login');
                    window.location.hash = 'login';
                    this.router.navigate('login');
                }
            });
        } else {
            // Show login button
            navAuth.innerHTML = `
                <button class="btn-secondary" id="loginBtn">Login</button>
            `;

            // Add login handler
            document.getElementById('loginBtn')?.addEventListener('click', () => {
                this.updateNavbarVisibility('login');
                window.location.hash = 'login';
                this.router.navigate('login');
            });
        }
    }

    updateNavbarVisibility(page) {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        const authPages = ['login', 'signup', 'verify-email', 'onboarding'];

        if (authPages.includes(page)) {
            navbar.style.display = 'none';
        } else {
            navbar.style.display = 'block';
        }
    }
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('DrawHub PWA: Service Worker registered', registration.scope);

            // Check for updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New version available
                        console.log('DrawHub PWA: New version available!');
                        if (confirm('A new version of DrawHub is available. Reload to update?')) {
                            newWorker.postMessage({ type: 'SKIP_WAITING' });
                            window.location.reload();
                        }
                    }
                });
            });
        } catch (error) {
            console.error('DrawHub PWA: Service Worker registration failed', error);
        }
    });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
