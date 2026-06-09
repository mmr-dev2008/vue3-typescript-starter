# src/services/CLAUDE.md

Services contain **business logic** decoupled from Vue and framework internals.
Each service is a static class with a single responsibility.

---

## Pattern

```ts
// src/services/example.service.ts

import StorageService from './storage.service';

class ExampleService {
    private static readonly STORAGE_KEY: string = 'example_key';

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

export default ExampleService;
```

---

## Rules

- All methods are `static` — never instantiate a service (`new ExampleService()` is not allowed).
- Each service has a single responsibility.
- If the service needs storage → use `StorageService`, never call `localStorage` directly.
- If the service needs HTTP → use `ApiRepository`, never import `axios` directly.
- If the service needs translations → use the exported `t()` from `language.service.ts`.
- If the service needs navigation → import `router` from `@/router`.
- Storage keys are always `private static readonly`.
- File name: `[name].service.ts`

---

## Services own their null guards

A service method accepts nullable inputs and handles `null` internally. Callers never null-check before calling:

```ts
// ✗ avoid — null guard leaks into caller
const label = computed<string | null>(function() {
    if (item.value === null) {
        return null;
    }
    return ExampleService.getLabel(item.value);
});

// ✓ correct — service handles null, caller is a clean one-liner
static getLabel(item: Item | null): string | null {
    if (item === null) {
        return null;
    }
    // ...
}

const label = computed(() => ExampleService.getLabel(item.value));
```

---

## What belongs in a service

Shared presentation or business logic that is reused across multiple files but has no side effects:

- Deriving a display value from an entity's data
- Formatting helpers specific to a domain entity
- Permission or capability checks based on state

Do **not** put data-fetching inside services — that belongs in repositories.
Do **not** put Vue composables inside services — services are plain TypeScript.

---

## Available Services

| Service | Responsibility |
|---|---|
| `storage.service.ts` | `localStorage` wrapper with JSON parse/stringify and generics |
| `token.service.ts` | Store and retrieve the auth token |
| `language.service.ts` | Manage locale, RTL detection, create vue-i18n instance |
| `permission.service.ts` | Store and check user permissions |

---

## Note on LanguageService

`language.service.ts` exports two additional named exports beyond the class:

- `createI18n()` — used once in `main.ts` to mount the plugin
- `t(key)` — used outside components (e.g. in services or plain TS files)

Never import from `vue-i18n` directly anywhere else in the project — always go through this wrapper.
