import StorageService from './storage.service';

class TokenService {
    static readonly STORAGE_KEY: string = 'auth_token';

    static set(value: string): void {
        StorageService.set<string>(this.STORAGE_KEY, value);
    }

    static get(): string | undefined {
        return StorageService.get<string>(this.STORAGE_KEY);
    }

    static isExist(): boolean {
        return StorageService.has(this.STORAGE_KEY);
    }

    static clear(): void {
        StorageService.delete(this.STORAGE_KEY);
    }
}

export default TokenService;