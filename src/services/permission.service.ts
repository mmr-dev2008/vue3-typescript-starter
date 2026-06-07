import StorageService from './storage.service';

type PermissionMap = Record<string, true>;

class PermissionService {
    private static STORAGE_KEY: string = 'permissions';

    private static _permissions: PermissionMap = StorageService.get<PermissionMap>(this.STORAGE_KEY) || {};

    static set(permissions: object): void {
        for (const permission in permissions) {
            this._permissions[permission] = true;
        }

        StorageService.set<PermissionMap>(this.STORAGE_KEY, this._permissions);
    }

    static has(name: string): boolean {
        return Boolean(this._permissions[name]);
    }

    static hasAll(names: string[]): boolean {
        return names.every((name) => this.has(name));
    }

    static hasAny(names: string[]): boolean {
        return names.some((name) => this.has(name));
    }

    static clear(): void {
        this._permissions = {};
        StorageService.delete(this.STORAGE_KEY);
    }
}

export default PermissionService;
