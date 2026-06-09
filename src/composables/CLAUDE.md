# src/composables/CLAUDE.md

Composables are Vue Composition API functions that encapsulate reusable reactive state or logic.

---

## Pattern

```ts
// src/composables/[name].composable.ts

import { ref, computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';

interface UseExample {
    value: ComputedRef<string>;
    setValue: (v: string) => void;
}

export function useExample(): UseExample {
    const _value: Ref<string> = ref('');
    const value: ComputedRef<string> = computed(() => _value.value);

    function setValue(newValue: string): void {
        _value.value = newValue;
    }

    return {
        value,
        setValue
    };
}
```

---

## Rules

- Function name always starts with `use`: `useLoading`, `useForm`, `useModal`.
- Define a return type `interface` and annotate the function's return type explicitly.
- All reactive state is defined inside the function — no state outside (unless intentionally a module-level singleton).
- Use `computed` for derived values — not a plain `ref` kept in sync manually.
- Use `import type` for Vue type imports.
- File name: `[name].composable.ts`

---

## Available Composables

### `useLoading`

```ts
const { isLoading, startLoading, endLoading, startFakeLoading } = useLoading();
```

| Property / Method | Description |
|---|---|
| `isLoading` | `ComputedRef<boolean>` — true when any loading is active |
| `startLoading()` | Increments the loading counter |
| `endLoading()` | Decrements the loading counter |
| `startFakeLoading(delay?)` | Artificial loading with delay (default 500ms), returns `Promise<true>` |

Loading uses a counter internally — multiple concurrent requests are handled correctly.
`isLoading` only becomes `false` when all active loadings have ended.

Usage example:

```ts
const { isLoading, startLoading, endLoading } = useLoading();

async function handleSubmit(): void {
    startLoading();

    try {
        await AuthRepository.login(state);
    } finally {
        endLoading();
    }
}
```
