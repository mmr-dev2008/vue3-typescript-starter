class StorageService {
    static set<T>(name: string, value: T): void {
        const stringifyValue = JSON.stringify(value);
        localStorage.setItem(name, stringifyValue);
    }

    static get<T = unknown>(name: string): T | undefined {
        const value = localStorage.getItem(name);

        if (value === null) {
            return undefined;
        }

        try {
            return JSON.parse(value) as T;
        } catch {
            return undefined;
        }
    }

    static delete(name: string): void {
        localStorage.removeItem(name);
    }

    static has(name: string): boolean {
        return localStorage.getItem(name) !== null;
    }
}

export default StorageService;