/**
 * Onboarding Page - First-time user experience
 * Collects user profile data for personalization
 */

class OnboardingPage {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 3;
        this.profileData = {
            name: '',
            age: null,
            gender: '',
            experienceLevel: '',
            drawingDuration: '',
            learningGoals: [],
            profilePicture: null,
            preferredStyle: '',
            learningReason: '',
            learningMode: '',
            completedOnboarding: false,
            createdAt: null
        };
    }

    async render() {
        return `
            <div class="onboarding-container">
                <div class="onboarding-card">
                    <!-- Progress Indicator -->
                    <div class="onboarding-progress">
                        <div class="progress-step ${this.currentStep >= 1 ? 'active' : ''}" data-step="1">
                            <div class="step-circle">1</div>
                            <span>About You</span>
                        </div>
                        <div class="progress-line ${this.currentStep >= 2 ? 'active' : ''}"></div>
                        <div class="progress-step ${this.currentStep >= 2 ? 'active' : ''}" data-step="2">
                            <div class="step-circle">2</div>
                            <span>Drawing Experience</span>
                        </div>
                        <div class="progress-line ${this.currentStep >= 3 ? 'active' : ''}"></div>
                        <div class="progress-step ${this.currentStep >= 3 ? 'active' : ''}" data-step="3">
                            <div class="step-circle">3</div>
                            <span>Preferences</span>
                        </div>
                    </div>

                    <!-- Welcome Header -->
                    <div class="onboarding-header">
                        <h1>🎨 Welcome to DrawHub!</h1>
                        <p>Let's personalize your learning journey</p>
                    </div>

                    <!-- Form Steps -->
                    <form id="onboarding-form" class="onboarding-form">
                        ${this.renderCurrentStep()}
                    </form>

                    <!-- Navigation Buttons -->
                    <div class="onboarding-actions">
                        ${this.currentStep > 1 ? `
                            <button type="button" class="btn-secondary" id="btn-prev">
                                ← Back
                            </button>
                        ` : ''}
                        <button type="button" class="btn-primary" id="btn-next">
                            ${this.currentStep < this.totalSteps ? 'Next →' : 'Get Started! 🚀'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderCurrentStep() {
        switch (this.currentStep) {
            case 1:
                return this.renderStep1();
            case 2:
                return this.renderStep2();
            case 3:
                return this.renderStep3();
            default:
                return '';
        }
    }

    renderStep1() {
        return `
            <div class="form-step active" data-step="1">
                <h2>Tell us about yourself</h2>

                <div class="form-group">
                    <label for="user-name">What's your name? <span class="required">*</span></label>
                    <input
                        type="text"
                        id="user-name"
                        name="name"
                        placeholder="Enter your name"
                        value="${this.profileData.name}"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="user-age">How old are you? <span class="required">*</span></label>
                    <input
                        type="number"
                        id="user-age"
                        name="age"
                        placeholder="Enter your age"
                        min="5"
                        max="120"
                        value="${this.profileData.age || ''}"
                        required
                    >
                </div>

                <div class="form-group">
                    <label>Gender <span class="required">*</span></label>
                    <div class="radio-group">
                        <label class="radio-option">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                ${this.profileData.gender === 'male' ? 'checked' : ''}
                            >
                            <span>Male</span>
                        </label>
                        <label class="radio-option">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                ${this.profileData.gender === 'female' ? 'checked' : ''}
                            >
                            <span>Female</span>
                        </label>
                        <label class="radio-option">
                            <input
                                type="radio"
                                name="gender"
                                value="other"
                                ${this.profileData.gender === 'other' ? 'checked' : ''}
                            >
                            <span>Other</span>
                        </label>
                    </div>
                </div>
            </div>
        `;
    }

    renderStep2() {
        const goalOptions = [
            { value: 'portrait', label: 'Portrait Drawing' },
            { value: 'anime', label: 'Anime/Manga' },
            { value: 'digital-art', label: 'Digital Art' },
            { value: 'perspective', label: 'Perspective & Architecture' },
            { value: 'coloring', label: 'Coloring & Shading' },
            { value: 'anatomy', label: 'Anatomy' },
            { value: 'animals', label: 'Animals & Nature' },
            { value: 'character-design', label: 'Character Design' }
        ];

        return `
            <div class="form-step active" data-step="2">
                <h2>Your drawing experience</h2>

                <div class="form-group">
                    <label>Experience Level <span class="required">*</span></label>
                    <div class="radio-group">
                        <label class="radio-option">
                            <input
                                type="radio"
                                name="experienceLevel"
                                value="beginner"
                                ${this.profileData.experienceLevel === 'beginner' ? 'checked' : ''}
                            >
                            <span>🌱 Beginner<br><small>Just starting out</small></span>
                        </label>
                        <label class="radio-option">
                            <input
                                type="radio"
                                name="experienceLevel"
                                value="intermediate"
                                ${this.profileData.experienceLevel === 'intermediate' ? 'checked' : ''}
                            >
                            <span>🎨 Intermediate<br><small>Some experience</small></span>
                        </label>
                        <label class="radio-option">
                            <input
                                type="radio"
                                name="experienceLevel"
                                value="advanced"
                                ${this.profileData.experienceLevel === 'advanced' ? 'checked' : ''}
                            >
                            <span>🏆 Advanced<br><small>Experienced artist</small></span>
                        </label>
                    </div>
                </div>

                <div class="form-group">
                    <label for="drawing-duration">How long have you been drawing? <span class="required">*</span></label>
                    <select id="drawing-duration" name="drawingDuration" required>
                        <option value="">Select duration</option>
                        <option value="less-than-1-month" ${this.profileData.drawingDuration === 'less-than-1-month' ? 'selected' : ''}>Less than 1 month</option>
                        <option value="1-6-months" ${this.profileData.drawingDuration === '1-6-months' ? 'selected' : ''}>1-6 months</option>
                        <option value="6-12-months" ${this.profileData.drawingDuration === '6-12-months' ? 'selected' : ''}>6-12 months</option>
                        <option value="1-2-years" ${this.profileData.drawingDuration === '1-2-years' ? 'selected' : ''}>1-2 years</option>
                        <option value="2-5-years" ${this.profileData.drawingDuration === '2-5-years' ? 'selected' : ''}>2-5 years</option>
                        <option value="5-plus-years" ${this.profileData.drawingDuration === '5-plus-years' ? 'selected' : ''}>5+ years</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>What do you want to learn? <span class="required">*</span> <small>(Select all that apply)</small></label>
                    <div class="checkbox-grid">
                        ${goalOptions.map(goal => `
                            <label class="checkbox-option">
                                <input
                                    type="checkbox"
                                    name="learningGoals"
                                    value="${goal.value}"
                                    ${this.profileData.learningGoals.includes(goal.value) ? 'checked' : ''}
                                >
                                <span>${goal.label}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderStep3() {
        return `
            <div class="form-step active" data-step="3">
                <h2>Personalize your experience</h2>

                <div class="form-group">
                    <label for="profile-picture">Profile Picture <small>(Optional)</small></label>
                    <div class="profile-picture-upload">
                        <div class="picture-preview" id="picture-preview">
                            ${this.profileData.profilePicture
                                ? `<img src="${this.profileData.profilePicture}" alt="Profile">`
                                : '<div class="placeholder">📷</div>'
                            }
                        </div>
                        <input
                            type="file"
                            id="profile-picture"
                            name="profilePicture"
                            accept="image/*"
                            style="display: none;"
                        >
                        <button type="button" class="btn-secondary" id="upload-picture">
                            Choose Photo
                        </button>
                    </div>
                </div>

                <div class="form-group">
                    <label>Preferred Drawing Style <span class="required">*</span></label>
                    <div class="radio-group">
                        <label class="radio-option">
                            <input
                                type="radio"
                                name="preferredStyle"
                                value="realistic"
                                ${this.profileData.preferredStyle === 'realistic' ? 'checked' : ''}
                            >
                            <span>🖼️ Realistic</span>
                        </label>
                        <label class="radio-option">
                            <input
                                type="radio"
                                name="preferredStyle"
                                value="anime"
                                ${this.profileData.preferredStyle === 'anime' ? 'checked' : ''}
                            >
                            <span>✨ Anime</span>
                        </label>
                        <label class="radio-option">
                            <input
                                type="radio"
                                name="preferredStyle"
                                value="cartoon"
                                ${this.profileData.preferredStyle === 'cartoon' ? 'checked' : ''}
                            >
                            <span>🎭 Cartoon</span>
                        </label>
                        <label class="radio-option">
                            <input
                                type="radio"
                                name="preferredStyle"
                                value="semi-realistic"
                                ${this.profileData.preferredStyle === 'semi-realistic' ? 'checked' : ''}
                            >
                            <span>🎨 Semi-Realistic</span>
                        </label>
                    </div>
                </div>

                <div class="form-group">
                    <label for="learning-reason">Why do you want to learn drawing? <span class="required">*</span></label>
                    <select id="learning-reason" name="learningReason" required>
                        <option value="">Select reason</option>
                        <option value="hobby" ${this.profileData.learningReason === 'hobby' ? 'selected' : ''}>Hobby/Fun</option>
                        <option value="art-career" ${this.profileData.learningReason === 'art-career' ? 'selected' : ''}>Art Career</option>
                        <option value="draw-people" ${this.profileData.learningReason === 'draw-people' ? 'selected' : ''}>Draw People</option>
                        <option value="draw-animals" ${this.profileData.learningReason === 'draw-animals' ? 'selected' : ''}>Draw Animals</option>
                        <option value="digital-illustration" ${this.profileData.learningReason === 'digital-illustration' ? 'selected' : ''}>Digital Illustration</option>
                        <option value="concept-art" ${this.profileData.learningReason === 'concept-art' ? 'selected' : ''}>Concept Art</option>
                        <option value="self-expression" ${this.profileData.learningReason === 'self-expression' ? 'selected' : ''}>Self-Expression</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Preferred Learning Mode <span class="required">*</span></label>
                    <div class="radio-group">
                        <label class="radio-option">
                            <input
                                type="radio"
                                name="learningMode"
                                value="video"
                                ${this.profileData.learningMode === 'video' ? 'checked' : ''}
                            >
                            <span>🎥 Video Lessons</span>
                        </label>
                        <label class="radio-option">
                            <input
                                type="radio"
                                name="learningMode"
                                value="text"
                                ${this.profileData.learningMode === 'text' ? 'checked' : ''}
                            >
                            <span>📚 Text with Images</span>
                        </label>
                        <label class="radio-option">
                            <input
                                type="radio"
                                name="learningMode"
                                value="practice"
                                ${this.profileData.learningMode === 'practice' ? 'checked' : ''}
                            >
                            <span>✏️ Practical Exercises</span>
                        </label>
                    </div>
                </div>
            </div>
        `;
    }

    mount() {
        // Next button handler
        const btnNext = document.getElementById('btn-next');
        if (btnNext) {
            btnNext.addEventListener('click', () => this.handleNext());
        }

        // Previous button handler
        const btnPrev = document.getElementById('btn-prev');
        if (btnPrev) {
            btnPrev.addEventListener('click', () => this.handlePrevious());
        }

        // Profile picture upload
        const uploadBtn = document.getElementById('upload-picture');
        const fileInput = document.getElementById('profile-picture');
        if (uploadBtn && fileInput) {
            uploadBtn.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', (e) => this.handlePictureUpload(e));
        }
    }

    handleNext() {
        // Validate current step
        if (!this.validateCurrentStep()) {
            return;
        }

        // Save current step data
        this.saveStepData();

        if (this.currentStep < this.totalSteps) {
            // Move to next step
            this.currentStep++;
            this.updateView();
        } else {
            // Final step - complete onboarding
            this.completeOnboarding();
        }
    }

    handlePrevious() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateView();
        }
    }

    validateCurrentStep() {
        const form = document.getElementById('onboarding-form');
        const currentStepDiv = form.querySelector('.form-step.active');

        // Get all required inputs in current step
        const requiredInputs = currentStepDiv.querySelectorAll('[required]');
        let isValid = true;

        requiredInputs.forEach(input => {
            if (input.type === 'radio') {
                // Check if any radio in group is checked
                const radioGroup = currentStepDiv.querySelectorAll(`input[name="${input.name}"]`);
                const isChecked = Array.from(radioGroup).some(radio => radio.checked);
                if (!isChecked) {
                    isValid = false;
                    this.showError(`Please select a ${input.name}`);
                }
            } else if (input.type === 'checkbox') {
                // Check if at least one checkbox is checked
                const checkboxGroup = currentStepDiv.querySelectorAll(`input[name="${input.name}"]`);
                const isChecked = Array.from(checkboxGroup).some(checkbox => checkbox.checked);
                if (!isChecked) {
                    isValid = false;
                    this.showError('Please select at least one learning goal');
                }
            } else {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    this.showError('Please fill in all required fields');
                } else {
                    input.classList.remove('error');
                }
            }
        });

        return isValid;
    }

    saveStepData() {
        const form = document.getElementById('onboarding-form');
        const formData = new FormData(form);

        // Save basic fields
        for (let [key, value] of formData.entries()) {
            if (key === 'learningGoals') {
                // Collect all checked goals
                this.profileData.learningGoals = formData.getAll('learningGoals');
            } else if (key === 'profilePicture') {
                // Skip profilePicture - it's handled separately by handlePictureUpload
                // Only update if it's not already set (keep null if no file uploaded)
                continue;
            } else {
                this.profileData[key] = value;
            }
        }
    }

    handlePictureUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            this.showError('Image size must be less than 2MB');
            return;
        }

        // Read and convert to base64
        const reader = new FileReader();
        reader.onload = (e) => {
            this.profileData.profilePicture = e.target.result;
            // Update preview
            const preview = document.getElementById('picture-preview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Profile">`;
        };
        reader.readAsDataURL(file);
    }

    async completeOnboarding() {
        // Mark onboarding as complete
        this.profileData.completedOnboarding = true;
        this.profileData.createdAt = new Date().toISOString();

        try {
            // Show saving message
            this.showSuccess('Saving your profile...');

            // Save to backend API
            const savedProfile = await window.authService.saveUserProfile(this.profileData);

            console.log('Profile saved:', savedProfile);

            // Update app state safely
            try {
                const state = window.appState;
                if (state) {
                    const currentUser = state.get('user') || {};
                    state.set('user', {
                        ...currentUser,
                        name: savedProfile.name,
                        level: savedProfile.level,
                        xp: savedProfile.xp,
                        avatar: savedProfile.profilePicture,
                        profileData: savedProfile
                    });
                }
            } catch (stateError) {
                console.warn('Could not update app state:', stateError);
            }

            // Update navbar to show user name
            if (window.updateNavbar) {
                window.updateNavbar();
            }

            // Show success message
            this.showSuccess('Profile created successfully! Redirecting...');

            // Redirect to home after 2 seconds
            setTimeout(() => {
                try {
                    if (window.updateNavbarVisibility) {
                        window.updateNavbarVisibility('home');
                    }
                    window.location.hash = 'home';
                    if (window.appRouter) {
                        window.appRouter.navigate('home');
                    }
                } catch (navError) {
                    console.warn('Navigation error:', navError);
                    // Fallback - just reload to home
                    window.location.href = window.location.pathname + '#home';
                }
            }, 2000);

        } catch (error) {
            console.error('Failed to save profile:', error);

            // Handle 409 Conflict - profile already exists
            if (error.status === 409) {
                // Profile already exists - load it and redirect to home
                console.log('Profile already exists, loading existing profile...');
                try {
                    const existingProfile = await window.authService.getUserProfile();
                    if (existingProfile) {
                        // Update state with existing profile
                        try {
                            const state = window.appState;
                            if (state) {
                                const currentUser = state.get('user') || {};
                                state.set('user', {
                                    ...currentUser,
                                    name: existingProfile.name,
                                    level: existingProfile.level,
                                    xp: existingProfile.xp,
                                    avatar: existingProfile.profilePicture,
                                    profileData: existingProfile
                                });
                            }
                        } catch (stateError) {
                            console.warn('Could not update app state:', stateError);
                        }

                        if (window.updateNavbar) {
                            window.updateNavbar();
                        }

                        this.showSuccess('Profile already exists! Redirecting...');

                        setTimeout(() => {
                            if (window.updateNavbarVisibility) {
                                window.updateNavbarVisibility('home');
                            }
                            window.location.hash = 'home';
                            if (window.appRouter) {
                                window.appRouter.navigate('home');
                            }
                        }, 1500);
                        return;
                    }
                } catch (profileError) {
                    console.error('Could not load existing profile:', profileError);
                }
            }

            this.showError('Failed to save profile: ' + error.message);

            // Re-enable submit button
            const submitBtn = document.querySelector('.onboarding-submit-btn');
            if (submitBtn) {
                submitBtn.disabled = false;
            }
        }
    }

    showSuccess(message = null) {
        const container = document.querySelector('.onboarding-card');
        const displayMessage = message || `Your personalized learning journey is ready.`;

        container.innerHTML = `
            <div class="onboarding-success">
                <div class="success-icon">🎉</div>
                <h2>Welcome to DrawHub, ${this.profileData.name}!</h2>
                <p>${displayMessage}</p>
                <div class="loading-dots">
                    <span>.</span><span>.</span><span>.</span>
                </div>
                <p class="redirect-text">Please wait...</p>
            </div>
        `;
    }

    showError(message) {
        // Remove existing error if any
        const existingError = document.querySelector('.error-message');
        if (existingError) existingError.remove();

        // Create error element
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;

        const form = document.getElementById('onboarding-form');
        form.insertBefore(error, form.firstChild);

        // Auto-remove after 3 seconds
        setTimeout(() => error.remove(), 3000);
    }

    async updateView() {
        const form = document.getElementById('onboarding-form');
        form.innerHTML = this.renderCurrentStep();

        // Update progress indicator
        const steps = document.querySelectorAll('.progress-step');
        const lines = document.querySelectorAll('.progress-line');

        steps.forEach((step, index) => {
            if (index < this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        lines.forEach((line, index) => {
            if (index < this.currentStep - 1) {
                line.classList.add('active');
            } else {
                line.classList.remove('active');
            }
        });

        // Update buttons
        const actions = document.querySelector('.onboarding-actions');
        actions.innerHTML = `
            ${this.currentStep > 1 ? `
                <button type="button" class="btn-secondary" id="btn-prev">
                    ← Back
                </button>
            ` : ''}
            <button type="button" class="btn-primary" id="btn-next">
                ${this.currentStep < this.totalSteps ? 'Next →' : 'Get Started! 🚀'}
            </button>
        `;

        // Re-attach event listeners
        this.mount();
    }
}

export default OnboardingPage;
