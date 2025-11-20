// Simple SPA Router
export default class Router {
    constructor() {
        this.routes = {};
        this.currentPage = null;
    }

    addRoute(path, page) {
        this.routes[path] = page;
    }

    async navigate(path) {
        // Show loading
        this.showLoading();

        // Get the page
        const page = this.routes[path];

        if (!page) {
            console.error(`Route not found: ${path}`);
            this.hideLoading();
            return;
        }

        // Cleanup previous page if exists
        if (this.currentPage && this.currentPage.cleanup) {
            this.currentPage.cleanup();
        }

        try {
            // Render new page
            const appContainer = document.getElementById('app');
            const html = await page.render();
            appContainer.innerHTML = html;

            // Mount page (attach event listeners, etc.)
            if (page.mount) {
                page.mount();
            }

            this.currentPage = page;
        } catch (error) {
            console.error('Error rendering page:', error);
        }

        // Hide loading
        this.hideLoading();
    }

    showLoading() {
        document.getElementById('loading-spinner').style.display = 'flex';
    }

    hideLoading() {
        document.getElementById('loading-spinner').style.display = 'none';
    }
}
