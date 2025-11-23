/**
 * Authentication Service
 *
 * API client for authentication and profile management.
 * Handles token storage, automatic token refresh, and API communication.
 */

class AuthService {
  constructor() {
    this.API_BASE_URL = 'http://localhost:3000/api';
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
    this.isRefreshing = false;
    this.refreshSubscribers = [];
  }

  // ==================== TOKEN MANAGEMENT ====================

  /**
   * Set authentication tokens
   */
  setTokens(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  /**
   * Clear authentication tokens
   */
  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userProfile'); // Clear old localStorage profile
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!this.accessToken;
  }

  /**
   * Get access token
   */
  getAccessToken() {
    return this.accessToken;
  }

  // ==================== TOKEN REFRESH ====================

  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken() {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await fetch(`${this.API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refreshToken: this.refreshToken
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // Refresh token is invalid/expired
        if (data.needsLogin) {
          this.clearTokens();
          throw new Error('Session expired. Please log in again.');
        }
        throw new Error(data.message || 'Failed to refresh token');
      }

      // Update access token
      this.accessToken = data.accessToken;
      localStorage.setItem('accessToken', data.accessToken);

      return data.accessToken;
    } catch (error) {
      this.clearTokens();
      throw error;
    }
  }

  /**
   * Add subscriber for token refresh
   */
  subscribeTokenRefresh(callback) {
    this.refreshSubscribers.push(callback);
  }

  /**
   * Notify all subscribers with new token
   */
  onTokenRefreshed(token) {
    this.refreshSubscribers.forEach(callback => callback(token));
    this.refreshSubscribers = [];
  }

  // ==================== AUTHENTICATED FETCH ====================

  /**
   * Make authenticated API request with automatic token refresh
   */
  async authenticatedFetch(url, options = {}) {
    // Add authorization header
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
      'Authorization': `Bearer ${this.accessToken}`
    };

    try {
      let response = await fetch(url, { ...options, headers });

      // If unauthorized, try refreshing token
      if (response.status === 401) {
        const data = await response.json();

        // If token expired, refresh and retry
        if (data.needsLogin && this.refreshToken) {
          // If already refreshing, wait for it
          if (this.isRefreshing) {
            return new Promise((resolve) => {
              this.subscribeTokenRefresh((newToken) => {
                headers['Authorization'] = `Bearer ${newToken}`;
                resolve(fetch(url, { ...options, headers }));
              });
            });
          }

          // Start refresh process
          this.isRefreshing = true;

          try {
            const newToken = await this.refreshAccessToken();
            this.isRefreshing = false;
            this.onTokenRefreshed(newToken);

            // Retry original request with new token
            headers['Authorization'] = `Bearer ${newToken}`;
            response = await fetch(url, { ...options, headers });
          } catch (refreshError) {
            this.isRefreshing = false;
            throw new Error('Session expired. Please log in again.');
          }
        }
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  // ==================== AUTHENTICATION METHODS ====================

  /**
   * Sign up new user
   */
  async signup(email, password) {
    try {
      const response = await fetch(`${this.API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Login user
   */
  async login(email, password) {
    try {
      const response = await fetch(`${this.API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save tokens
      this.setTokens(data.accessToken, data.refreshToken);

      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Verify email address
   */
  async verifyEmail(token) {
    try {
      const response = await fetch(`${this.API_BASE_URL}/auth/verify/${token}`, {
        method: 'GET'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout() {
    try {
      if (this.refreshToken) {
        await fetch(`${this.API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refreshToken: this.refreshToken
          })
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local tokens
      this.clearTokens();
    }
  }

  /**
   * Resend verification email
   */
  async resendVerification(email) {
    try {
      const response = await fetch(`${this.API_BASE_URL}/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend verification');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Send password reset email
   */
  async forgotPassword(email) {
    try {
      const response = await fetch(`${this.API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset email');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(token, newPassword) {
    try {
      const response = await fetch(`${this.API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, newPassword })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // ==================== PROFILE METHODS ====================

  /**
   * Get user profile
   */
  async getUserProfile() {
    try {
      const response = await this.authenticatedFetch(`${this.API_BASE_URL}/profile`);

      const data = await response.json();

      if (!response.ok) {
        if (data.needsOnboarding) {
          return null; // No profile yet
        }
        throw new Error(data.message || 'Failed to load profile');
      }

      return data.profile;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Save user profile (after onboarding)
   */
  async saveUserProfile(profileData) {
    try {
      const response = await this.authenticatedFetch(`${this.API_BASE_URL}/profile`, {
        method: 'POST',
        body: JSON.stringify(profileData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save profile');
      }

      return data.profile;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update user profile
   */
  async updateUserProfile(updates) {
    try {
      const response = await this.authenticatedFetch(`${this.API_BASE_URL}/profile`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      return data.profile;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update user progress (XP, lessons, assignments)
   */
  async updateProgress(progressData) {
    try {
      const response = await this.authenticatedFetch(`${this.API_BASE_URL}/profile/progress`, {
        method: 'PATCH',
        body: JSON.stringify(progressData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update progress');
      }

      return data.progress;
    } catch (error) {
      throw error;
    }
  }

  // ==================== HEALTH CHECK ====================

  /**
   * Check if API server is running
   */
  async checkHealth() {
    try {
      const response = await fetch(`${this.API_BASE_URL}/health`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Unable to connect to server');
    }
  }
}

// Create singleton instance
const authService = new AuthService();

// Make available globally
window.authService = authService;

export default authService;
