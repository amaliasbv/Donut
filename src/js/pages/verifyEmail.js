// Email Verification Page
export default class VerifyEmailPage {
    constructor() {
        this.authService = window.authService;
        this.token = null;
        this.verificationStatus = 'loading'; // 'loading' | 'success' | 'error'
        this.errorMessage = '';
    }

    async render() {
        // Extract token from URL query parameter
        const urlParams = new URLSearchParams(window.location.search);
        this.token = urlParams.get('token');

        return `
            <div class="auth-container">
                <div class="auth-card text-center">
                    <div id="verificationContent">
                        ${this.renderVerificationContent()}
                    </div>
                </div>
            </div>
        `;
    }

    renderVerificationContent() {
        if (this.verificationStatus === 'loading') {
            return `
                <div class="verification-loading">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">📧</div>
                    <h1 style="color: var(--primary); font-size: 2rem; margin-bottom: 1rem;">
                        Verifying Your Email...
                    </h1>
                    <div class="loading-dots">Please wait</div>
                </div>
            `;
        } else if (this.verificationStatus === 'success') {
            return `
                <div class="verification-success">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
                    <h1 style="color: var(--success); font-size: 2rem; margin-bottom: 1rem;">
                        Email Verified Successfully!
                    </h1>
                    <p style="color: var(--text-gray); font-size: 1.1rem; margin-bottom: 2rem;">
                        Your email has been verified. You can now log in to your account.
                    </p>
                    <button class="btn btn-primary btn-large" id="loginButton">
                        Go to Login
                    </button>
                    <p style="color: var(--text-gray); font-size: 0.875rem; margin-top: 1rem;">
                        Redirecting in <span id="countdown">5</span> seconds...
                    </p>
                </div>
            `;
        } else {
            return `
                <div class="verification-error">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">❌</div>
                    <h1 style="color: var(--danger); font-size: 2rem; margin-bottom: 1rem;">
                        Verification Failed
                    </h1>
                    <p style="color: var(--text-gray); font-size: 1.1rem; margin-bottom: 2rem;">
                        ${this.errorMessage || 'The verification link is invalid or has expired.'}
                    </p>

                    ${this.errorMessage.includes('expired') ? `
                        <div class="info-notice" style="margin-bottom: 1.5rem;">
                            <strong>Need a new verification link?</strong><br>
                            Enter your email address and we'll send you a new one.
                        </div>
                        <div class="form-group" style="max-width: 400px; margin: 0 auto 1rem;">
                            <input
                                type="email"
                                id="resendEmail"
                                class="form-input"
                                placeholder="your.email@example.com"
                                style="margin-bottom: 0.5rem;"
                            />
                            <span class="error-message" id="resendError"></span>
                        </div>
                        <button class="btn btn-primary btn-large" id="resendButton">
                            Resend Verification Email
                        </button>
                    ` : `
                        <button class="btn btn-primary btn-large" id="backButton">
                            Back to Login
                        </button>
                    `}
                </div>
            `;
        }
    }

    async mount() {
        // Auto-verify if token exists
        if (this.token) {
            await this.verifyEmail();
        } else {
            this.verificationStatus = 'error';
            this.errorMessage = 'No verification token provided. Please check your email for the verification link.';
            this.updateContent();
        }

        this.setupEventListeners();
    }

    async verifyEmail() {
        try {
            // Call AuthService to verify email
            const result = await this.authService.verifyEmail(this.token);

            console.log('Verification successful:', result);

            // Update status to success
            this.verificationStatus = 'success';
            this.updateContent();

            // Start countdown and redirect
            this.startRedirectCountdown();

        } catch (error) {
            console.error('Verification error:', error);

            // Update status to error
            this.verificationStatus = 'error';
            this.errorMessage = error.message;
            this.updateContent();
        }
    }

    updateContent() {
        const content = document.getElementById('verificationContent');
        if (content) {
            content.innerHTML = this.renderVerificationContent();
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        // Login button (success state)
        const loginButton = document.getElementById('loginButton');
        if (loginButton) {
            loginButton.addEventListener('click', () => {
                window.location.hash = 'login';
            });
        }

        // Back button (error state)
        const backButton = document.getElementById('backButton');
        if (backButton) {
            backButton.addEventListener('click', () => {
                window.location.hash = 'login';
            });
        }

        // Resend button (expired error state)
        const resendButton = document.getElementById('resendButton');
        if (resendButton) {
            resendButton.addEventListener('click', () => this.handleResend());
        }
    }

    async handleResend() {
        const emailInput = document.getElementById('resendEmail');
        const errorSpan = document.getElementById('resendError');
        const resendButton = document.getElementById('resendButton');

        const email = emailInput.value.trim();

        // Validate email
        if (!email) {
            errorSpan.textContent = 'Email is required';
            errorSpan.style.display = 'block';
            return;
        }

        if (!this.isValidEmail(email)) {
            errorSpan.textContent = 'Please enter a valid email address';
            errorSpan.style.display = 'block';
            return;
        }

        // Clear error
        errorSpan.style.display = 'none';

        // Disable button
        resendButton.disabled = true;
        resendButton.textContent = 'Sending...';

        try {
            const result = await this.authService.resendVerification(email);

            alert(result.message || 'Verification email sent! Please check your inbox.');

            // Redirect to login
            setTimeout(() => {
                window.location.hash = 'login';
            }, 2000);

        } catch (error) {
            errorSpan.textContent = error.message || 'Failed to resend verification email';
            errorSpan.style.display = 'block';

            resendButton.disabled = false;
            resendButton.textContent = 'Resend Verification Email';
        }
    }

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    startRedirectCountdown() {
        let seconds = 5;
        const countdownElement = document.getElementById('countdown');

        const interval = setInterval(() => {
            seconds--;
            if (countdownElement) {
                countdownElement.textContent = seconds;
            }

            if (seconds <= 0) {
                clearInterval(interval);
                window.location.hash = 'login';
            }
        }, 1000);
    }

    cleanup() {
        // Cleanup
    }
}
