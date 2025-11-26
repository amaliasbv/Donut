// Signup Page
import State from '../utils/state.js';

export default class SignupPage {
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
                            🎨 Join DrawHub
                        </h1>
                        <p style="color: var(--text-gray); font-size: 1.1rem;">
                            Start your art learning journey today
                        </p>
                    </div>

                    <form id="signupForm" class="auth-form">
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
                                    placeholder="At least 8 characters"
                                    required
                                    autocomplete="new-password"
                                />
                                <button type="button" class="password-toggle" id="togglePassword">
                                    <span class="eye-icon">👁️</span>
                                </button>
                            </div>
                            <span class="error-message" id="passwordError"></span>

                            <!-- Password Strength Indicator -->
                            <div class="password-strength" id="passwordStrength" style="display: none;">
                                <div class="strength-bar">
                                    <div class="strength-bar-fill" id="strengthBarFill"></div>
                                </div>
                                <span class="strength-text" id="strengthText"></span>
                            </div>
                        </div>

                        <!-- Confirm Password Field -->
                        <div class="form-group">
                            <label class="form-label" for="confirmPassword">Confirm Password</label>
                            <div class="password-input-wrapper">
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    class="form-input"
                                    placeholder="Re-enter your password"
                                    required
                                    autocomplete="new-password"
                                />
                                <button type="button" class="password-toggle" id="toggleConfirmPassword">
                                    <span class="eye-icon">👁️</span>
                                </button>
                            </div>
                            <span class="error-message" id="confirmPasswordError"></span>
                        </div>

                        <!-- Terms of Service -->
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="terms" name="terms" required />
                                <span>
                                    I agree to the <a href="#terms" class="link-primary">Terms of Service</a>
                                    and <a href="#privacy" class="link-primary">Privacy Policy</a>
                                </span>
                            </label>
                            <span class="error-message" id="termsError"></span>
                        </div>

                        <!-- Error Message -->
                        <div id="signupError" class="error-message" style="display: none; margin-bottom: 1rem;"></div>

                        <!-- Success Message -->
                        <div id="signupSuccess" class="success-message" style="display: none; margin-bottom: 1rem;"></div>

                        <!-- Signup Button -->
                        <button type="submit" class="btn btn-primary btn-large" id="signupButton">
                            <span id="signupButtonText">Create Account</span>
                            <span id="signupButtonLoading" style="display: none;">
                                <span class="loading-dots">Creating account</span>
                            </span>
                        </button>

                        <!-- Divider -->
                        <div class="divider">
                            <span>Already have an account?</span>
                        </div>

                        <!-- Login Link -->
                        <button type="button" class="btn btn-secondary btn-large" id="loginLink">
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        `;
    }

    mount() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Form submission
        const form = document.getElementById('signupForm');
        form.addEventListener('submit', (e) => this.handleSignup(e));

        // Password toggles
        this.setupPasswordToggle('togglePassword', 'password');
        this.setupPasswordToggle('toggleConfirmPassword', 'confirmPassword');

        // Password strength indicator
        const passwordInput = document.getElementById('password');
        passwordInput.addEventListener('input', (e) => {
            this.updatePasswordStrength(e.target.value);
            this.clearError('passwordError');
            this.clearError('signupError');
        });

        // Confirm password validation
        const confirmPasswordInput = document.getElementById('confirmPassword');
        confirmPasswordInput.addEventListener('input', () => {
            this.clearError('confirmPasswordError');
            this.clearError('signupError');
        });

        // Email validation
        document.getElementById('email').addEventListener('input', () => {
            this.clearError('emailError');
            this.clearError('signupError');
        });

        // Terms checkbox
        document.getElementById('terms').addEventListener('change', () => {
            this.clearError('termsError');
        });

        // Login link
        const loginLink = document.getElementById('loginLink');
        loginLink.addEventListener('click', () => {
            // Update navbar visibility
            if (window.updateNavbarVisibility) {
                window.updateNavbarVisibility('login');
            }
            // Navigate to login
            window.location.hash = 'login';
            if (window.appRouter) {
                window.appRouter.navigate('login');
            }
        });
    }

    setupPasswordToggle(toggleId, inputId) {
        const toggle = document.getElementById(toggleId);
        const input = document.getElementById(inputId);

        toggle.addEventListener('click', () => {
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            toggle.querySelector('.eye-icon').textContent = type === 'password' ? '👁️' : '🙈';
        });
    }

    updatePasswordStrength(password) {
        const strengthContainer = document.getElementById('passwordStrength');
        const strengthBarFill = document.getElementById('strengthBarFill');
        const strengthText = document.getElementById('strengthText');

        if (!password) {
            strengthContainer.style.display = 'none';
            return;
        }

        strengthContainer.style.display = 'block';

        // Calculate strength
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;

        // Update UI
        const strengthLevels = [
            { text: 'Very Weak', color: '#dc3545', width: '20%' },
            { text: 'Weak', color: '#fd7e14', width: '40%' },
            { text: 'Fair', color: '#ffc107', width: '60%' },
            { text: 'Good', color: '#28a745', width: '80%' },
            { text: 'Strong', color: '#20c997', width: '100%' }
        ];

        const level = strengthLevels[Math.min(strength, 4)];
        strengthBarFill.style.width = level.width;
        strengthBarFill.style.background = level.color;
        strengthText.textContent = level.text;
        strengthText.style.color = level.color;
    }

    async handleSignup(e) {
        e.preventDefault();

        if (this.isLoading) return;

        // Get form data
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terms = document.getElementById('terms').checked;

        // Validate
        if (!this.validateForm(email, password, confirmPassword, terms)) {
            return;
        }

        // Show loading state
        this.setLoading(true);
        this.clearError('signupError');
        this.hideSuccess();

        try {
            // Call AuthService signup
            const result = await this.authService.signup(email, password);

            console.log('Signup successful:', result);

            // Check if user is auto-verified (dev mode)
            if (result.user && result.user.isVerified) {
                // ✅ AUTO-VERIFIED in dev mode - AUTO LOGIN!
                this.showSuccess('✅ Account created! Setting up your profile...');

                // Auto-login with the same credentials
                try {
                    const loginResult = await this.authService.login(email, password);

                    // Update app state
                    this.state.set('user', {
                        id: loginResult.user.id,
                        email: loginResult.user.email,
                        name: 'User',
                        profileData: null
                    });

                    // Update navbar
                    if (window.updateNavbar) {
                        window.updateNavbar();
                    }

                    // Redirect to onboarding (skip login page!)
                    setTimeout(() => {
                        if (window.updateNavbarVisibility) {
                            window.updateNavbarVisibility('onboarding');
                        }
                        window.location.hash = 'onboarding';
                        if (window.appRouter) {
                            window.appRouter.navigate('onboarding');
                        }
                    }, 1500);

                } catch (loginError) {
                    console.error('Auto-login failed:', loginError);
                    // Fallback: redirect to login
                    this.showSuccess('Account created! Redirecting to login...');
                    setTimeout(() => {
                        window.location.hash = 'login';
                        if (window.appRouter) {
                            window.appRouter.navigate('login');
                        }
                    }, 2000);
                }

            } else {
                // Production mode - needs email verification
                this.showSuccess(
                    '✅ Account created successfully! ' +
                    'Please check your email inbox for a verification link. ' +
                    'You\'ll need to verify your email before logging in.'
                );

                // Clear form
                document.getElementById('signupForm').reset();
                document.getElementById('passwordStrength').style.display = 'none';

                // Redirect to login after 5 seconds
                setTimeout(() => {
                    window.location.hash = 'login';
                    if (window.appRouter) {
                        window.appRouter.navigate('login');
                    }
                }, 5000);
            }

        } catch (error) {
            console.error('Signup error:', error);

            this.showError('signupError', error.message || 'Signup failed. Please try again.');
            this.setLoading(false);
        }
    }

    validateForm(email, password, confirmPassword, terms) {
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
        } else if (password.length < 8) {
            this.showError('passwordError', 'Password must be at least 8 characters long');
            isValid = false;
        }

        // Validate confirm password
        if (!confirmPassword) {
            this.showError('confirmPasswordError', 'Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            this.showError('confirmPasswordError', 'Passwords do not match');
            isValid = false;
        }

        // Validate terms
        if (!terms) {
            this.showError('termsError', 'You must accept the Terms of Service');
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

    showSuccess(message) {
        const successElement = document.getElementById('signupSuccess');
        successElement.textContent = message;
        successElement.style.display = 'block';

        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    hideSuccess() {
        const successElement = document.getElementById('signupSuccess');
        successElement.style.display = 'none';
    }

    setLoading(loading) {
        this.isLoading = loading;
        const button = document.getElementById('signupButton');
        const buttonText = document.getElementById('signupButtonText');
        const buttonLoading = document.getElementById('signupButtonLoading');

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

    cleanup() {
        // Cleanup
    }
}
