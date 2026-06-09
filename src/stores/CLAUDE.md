# src/stores/CLAUDE.md

Stores are managed by Pinia using Setup Store (function syntax).
Only state that needs to be shared across multiple unrelated components belongs here.
If data is only used in one component, keep it local in `<script setup>` — don't put it in a store.

---

## Pattern

```ts
// src/stores/auth.store.ts

import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import type { User } from '@/types/user';

export const useAuthStore = defineStore('auth', function() {
    const user = ref<User | null>(null);
    const isLoggedIn = computed(() => user.value !== null);

    function setUser(value: User): void {
        user.value = value;
    }

    function clearUser(): void {
        user.value = null;
    }

    return {
        user,
        isLoggedIn,
        setUser,
        clearUser
    };
});
```

---

## Rules

- Always use **Setup Store** (function syntax) — never Options Store.
- Store ID (first argument to `defineStore`) must match the file name without extension: `'auth'`, `'cart'`.
- Composable name: `use` + PascalCase + `Store` → `useAuthStore`, `useCartStore`.
- Never make API calls directly inside a store — call the repository from a composable, pass the result to the store.
- File name: `[name].store.ts`

---

## Naming

| File | Export |
|---|---|
| `auth.store.ts` | `useAuthStore` |
| `cart.store.ts` | `useCartStore` |
| `ui.store.ts` | `useUiStore` |

---

## Function naming inside stores

Action functions inside a store must start with an imperative verb:

```ts
// ✓ correct
function setUser(value: User): void { ... }
function clearUser(): void { ... }
function loadPermissions(): void { ... }

// ✗ avoid
function user(value: User): void { ... }
function permissions(): void { ... }
```
