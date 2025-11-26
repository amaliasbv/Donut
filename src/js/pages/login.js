// Login Page
import State from '../utils/state.js';

export default class LoginPage {
    constructor() {
        this.state = State.getInstance();
        this.authService = window.authService;
        this.isLoading = false;
    }

    async render() {
        return `
            <div class="auth-container">
                <div class="auth-card">
                    <div class="auth-header">
                        <h1 style="font-size: 2.5rem; color: var(--primary); margin-bottom: 0.5rem;">
                            🎨 Welcome Back!
                        </h1>
                        <p style="color: var(--text-gray); font-size: 1.1rem;">
                            Log in to continue your art learning journey
                        </p>
                    </div>

                    <form id="loginForm" class="auth-form">
                        <!-- Email Field -->
                        <div class="form-group">
                            <label class="form-label" for="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                class="form-input"
                                placeholder="your.email@example.com"
                                required
                                autocomplete="email"
                                autofocus
                            />
                            <span class="error-message" id="emailError"></span>
                        </div>

                        <!-- Password Field -->
                        <div class="form-group">
                            <label class="form-label" for="password">Password</label>
                            <div class="password-input-wrapper">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    class="form-input"
                                    placeholder="Enter your password"
                                    required
                                    autocomplete="current-password"
                                />
                                <button type="button" class="password-toggle" id="togglePassword">
                                    <span class="eye-icon">👁️</span>
                                </button>
                            </div>
                            <span class="error-message" id="passwordError"></span>
                        </div>

                        <!-- Remember Me & Forgot Password -->
                        <div class="form-row">
                            <label class="checkbox-label">
                                <input type="checkbox" id="rememberMe" name="rememberMe" />
                                <span>Remember me</span>
                            </label>
                            <a href="#forgot-password" class="link-primary">Forgot password?</a>
                        </div>

                        <!-- Error Message -->
                        <div id="loginError" class="error-message" style="display: none; margin-bottom: 1rem;"></div>

                        <!-- Login Button -->
                        <button type="submit" class="btn btn-primary btn-large" id="loginButton">
                            <span id="loginButtonText">Log In</span>
                            <span id="loginButtonLoading" style="display: none;">
                                <span class="loading-dots">Logging in</span>
                            </span>
                        </button>

                        <!-- Divider -->
                        <div class="divider">
                            <span>Don't have an account?</span>
                        </div>

                        <!-- Sign Up Link -->
                        <button type="button" class="btn btn-secondary btn-large" id="signupLink">
                            Create Account
                        </button>
                    </form>

                    <!-- Email Verification Notice -->
                    <div id="verificationNotice" class="info-notice" style="display: none; margin-top: 1rem;">
                        <strong>📧 Email not verified?</strong><br>
                        Please check your inbox for the verification email.
                        <button class="btn btn-link" id="resendVerification" style="margin-top: 0.5rem;">
                            Resend verification email
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    mount() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Form submission
        const form = document.getElementById('loginForm');
        form.addEventListener('submit', (e) => this.handleLogin(e));

        // Password toggle
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            togglePassword.querySelector('.eye-icon').textContent = type === 'password' ? '👁️' : '🙈';
        });

        // Sign up link
        const signupLink = document.getElementById('signupLink');
        signupLink.addEventListener('click', () => {
            // Update navbar visibility
            if (window.updateNavbarVisibility) {
                window.updateNavbarVisibility('signup');
            }
            // Navigate to signup
            window.location.hash = 'signup';
            if (window.appRouter) {
                window.appRouter.navigate('signup');
            }
        });

        // Forgot password link
        const forgotPasswordLink = document.querySelector('a[href="#forgot-password"]');
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleForgotPassword();
        });

        // Resend verification
        const resendBtn = document.getElementById('resendVerification');
        resendBtn.addEventListener('click', () => this.handleResendVerification());

        // Clear errors on input
        document.getElementById('email').addEventListener('input', () => {
            this.clearError('emailError');
            this.clearError('loginError');
        });

        document.getElementById('password').addEventListener('input', () => {
            this.clearError('passwordError');
            this.clearError('loginError');
        });
    }

    async handleLogin(e) {
        e.preventDefault();

        if (this.isLoading) return;

        // Get form data
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Validate
        if (!this.validateForm(email, password)) {
            return;
        }

        // Show loading state
        this.setLoading(true);
        this.clearError('loginError');

        try {
            // Call AuthService login
            const result = await this.authService.login(email, password);

            console.log('Login successful:', result);

            // Load user profile
            const profile = await this.authService.getUserProfile();

            // Update app state
            this.state.set('user', {
                id: result.user.id,
                email: result.user.email,
                name: profile ? profile.name : 'User',
                level: profile ? profile.level : 1,
                xp: profile ? profile.xp : 0,
                avatar: profile ? profile.profilePicture : null,
                joinedDate: new Date().toISOString().split('T')[0],
                profileData: profile
            });

            // Update navbar to show logged-in state
            if (window.updateNavbar) {
                window.updateNavbar();
            }

            // Check if onboarding is needed
            if (result.needsOnboarding || !profile) {
                // Redirect to onboarding
                if (window.updateNavbarVisibility) {
                    window.updateNavbarVisibility('onboarding');
                }
                setTimeout(() => {
                    window.location.hash = 'onboarding';
                    if (window.appRouter) {
                        window.appRouter.navigate('onboarding');
                    }
                }, 500);
            } else {
                // Redirect to home
                if (window.updateNavbarVisibility) {
                    window.updateNavbarVisibility('home');
                }
                setTimeout(() => {
                    window.location.hash = 'home';
                    if (window.appRouter) {
                        window.appRouter.navigate('home');
                    }
                }, 500);
            }

        } catch (error) {
            console.error('Login error:', error);

            // Check if email verification is needed
            if (error.message.includes('verify') || error.message.includes('verification')) {
                this.showError('loginError', error.message);
                this.showVerificationNotice(email);
            } else {
                this.showError('loginError', error.message || 'Login failed. Please check your credentials.');
            }

            this.setLoading(false);
        }
    }

    validateForm(email, password) {
        let isValid = true;

        // Validate email
        if (!email) {
            this.showError('emailError', 'Email is required');
            isValid = false;
        } else if (!this.isValidEmail(email)) {
            this.showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate password
        if (!password) {
            this.showError('passwordError', 'Password is required');
            isValid = false;
        }

        return isValid;
    }

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    setLoading(loading) {
        this.isLoading = loading;
        const button = document.getElementById('loginButton');
        const buttonText = document.getElementById('loginButtonText');
        const buttonLoading = document.getElementById('loginButtonLoading');

        if (loading) {
            button.disabled = true;
            button.style.opacity = '0.7';
            buttonText.style.display = 'none';
            buttonLoading.style.display = 'inline-block';
        } else {
            button.disabled = false;
            button.style.opacity = '1';
            buttonText.style.display = 'inline-block';
            buttonLoading.style.display = 'none';
        }
    }

    showVerificationNotice(email) {
        const notice = document.getElementById('verificationNotice');
        notice.style.display = 'block';
        notice.dataset.email = email; // Store email for resend
    }

    async handleResendVerification() {
        const email = document.getElementById('email').value.trim() ||
                      document.getElementById('verificationNotice').dataset.email;

        if (!email) {
            this.showError('loginError', 'Please enter your email address');
            return;
        }

        try {
            const result = await this.authService.resendVerification(email);
            alert(result.message || 'Verification email sent! Please check your inbox.');
        } catch (error) {
            this.showError('loginError', error.message || 'Failed to resend verification email');
        }
    }

    async handleForgotPassword() {
        const email = prompt('Enter your email address to receive password reset instructions:');

        if (!email) return;

        if (!this.isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        try {
            const result = await this.authService.forgotPassword(email);
            alert(result.message || 'Password reset email sent! Please check your inbox.');
        } catch (error) {
            alert(error.message || 'Failed to send password reset email');
        }
    }

    cleanup() {
        // Cleanup
    }
}
