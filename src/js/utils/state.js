// Simple State Management (Singleton Pattern)
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
}

export default State;
