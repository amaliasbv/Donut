// Simple State Management (Singleton Pattern) with LocalStorage Persistence
class State {
    constructor() {
        if (State.instance) {
            return State.instance;
        }

        this.state = {};
        this.listeners = {};
        State.instance = this;
    }

    static getInstance() {
        if (!State.instance) {
            State.instance = new State();
        }
        return State.instance;
    }

    get(key) {
        return this.state[key];
    }

    set(key, value) {
        this.state[key] = value;
        this.notify(key, value);
    }

    update(key, updater) {
        const currentValue = this.state[key];
        const newValue = updater(currentValue);
        this.set(key, newValue);
    }

    subscribe(key, listener) {
        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }
        this.listeners[key].push(listener);

        // Return unsubscribe function
        return () => {
            this.listeners[key] = this.listeners[key].filter(l => l !== listener);
        };
    }

    notify(key, value) {
        if (this.listeners[key]) {
            this.listeners[key].forEach(listener => listener(value));
        }
    }

    // ========== Profile Management with LocalStorage ==========

    /**
     * Load user profile from localStorage
     * @returns {Object|null} User profile or null if not found
     */
    loadProfile() {
        try {
            const profileData = localStorage.getItem('userProfile');
            if (profileData) {
                return JSON.parse(profileData);
            }
            return null;
        } catch (error) {
            console.error('Error loading profile:', error);
            return null;
        }
    }

    /**
     * Save user profile to localStorage
     * @param {Object} profileData - User profile data
     */
    saveProfile(profileData) {
        try {
            localStorage.setItem('userProfile', JSON.stringify(profileData));

            // Update state with new profile
            this.set('user', {
                ...this.get('user'),
                name: profileData.name,
                profileData: profileData
            });

            return true;
        } catch (error) {
            console.error('Error saving profile:', error);
            return false;
        }
    }

    /**
     * Check if user has completed onboarding
     * @returns {boolean}
     */
    hasCompletedOnboarding() {
        const profile = this.loadProfile();
        return profile && profile.completedOnboarding === true;
    }

    /**
     * Get specific profile field
     * @param {string} field - Field name
     * @returns {any} Field value or null
     */
    getProfileField(field) {
        const profile = this.loadProfile();
        return profile ? profile[field] : null;
    }

    /**
     * Update specific profile field
     * @param {string} field - Field name
     * @param {any} value - New value
     */
    updateProfileField(field, value) {
        const profile = this.loadProfile();
        if (profile) {
            profile[field] = value;
            this.saveProfile(profile);
        }
    }

    /**
     * Clear profile (logout/reset)
     */
    clearProfile() {
        try {
            localStorage.removeItem('userProfile');

            // Reset user state to default
            this.set('user', {
                id: 1,
                name: 'DrawHub Student',
                email: 'student@drawhub.com',
                level: 1,
                xp: 0,
                avatar: null,
                joinedDate: new Date().toISOString().split('T')[0]
            });

            return true;
        } catch (error) {
            console.error('Error clearing profile:', error);
            return false;
        }
    }

    /**
     * Initialize user state from profile or defaults
     */
    initializeUser() {
        const profile = this.loadProfile();

        if (profile && profile.completedOnboarding) {
            // User has profile - load it
            this.set('user', {
                id: 1,
                name: profile.name,
                email: `${profile.name.toLowerCase().replace(/\s+/g, '')}@drawhub.com`,
                level: 1,
                xp: 0,
                avatar: profile.profilePicture || null,
                joinedDate: profile.createdAt ? profile.createdAt.split('T')[0] : new Date().toISOString().split('T')[0],
                profileData: profile
            });
        } else {
            // New user - default state
            this.set('user', {
                id: 1,
                name: 'DrawHub Student',
                email: 'student@drawhub.com',
                level: 1,
                xp: 0,
                avatar: null,
                joinedDate: new Date().toISOString().split('T')[0]
            });
        }
    }
}

export default State;
