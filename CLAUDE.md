# CLAUDE.md — vue3-starter-template-typescript

This is a Vue 3 + TypeScript starter template. All new frontend projects are cloned from this repo.
Do not scaffold from scratch — clone and start building.

---

## External LLM Docs

Before working with Nuxt UI components or Valibot schemas, read the official LLM docs for those libraries.
They contain component APIs, props, slots, and usage patterns that must be followed exactly.

- **Nuxt UI v4:** https://ui.nuxt.com/llms.txt
- **Valibot:** https://valibot.dev/llms.txt

Before using any Nuxt UI component, also fetch its individual raw doc to check the exact API:

```
https://ui.nuxt.com/raw/docs/components/{component-name}.md
```

Examples:
- `https://ui.nuxt.com/raw/docs/components/button.md`
- `https://ui.nuxt.com/raw/docs/components/form.md`
- `https://ui.nuxt.com/raw/docs/components/input.md`

Use the kebab-case component name without the `V` prefix.

---

## Sub-directory Rules

Each directory has its own `CLAUDE.md`. Read the relevant file before editing code in that area:

- [`src/composables/CLAUDE.md`](src/composables/CLAUDE.md)
- [`src/enums/CLAUDE.md`](src/enums/CLAUDE.md)
- [`src/locales/CLAUDE.md`](src/locales/CLAUDE.md)
- [`src/repositories/CLAUDE.md`](src/repositories/CLAUDE.md)
- [`src/router/CLAUDE.md`](src/router/CLAUDE.md)
- [`src/services/CLAUDE.md`](src/services/CLAUDE.md)
- [`src/stores/CLAUDE.md`](src/stores/CLAUDE.md)
- [`src/types/CLAUDE.md`](src/types/CLAUDE.md)
- [`src/views/CLAUDE.md`](src/views/CLAUDE.md)

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Vue 3 (Composition API) | ^3.5 |
| Language | TypeScript | ~6.0 |
| Build Tool | Vite | ^8.0 |
| UI Library | Nuxt UI (standalone Vue mode) | ^4.8 |
| Styling | Tailwind CSS v4 | ^4.3 |
| State | Pinia | ^3.0 |
| Router | Vue Router | ^5.0 |
| HTTP | Axios (wrapped by ApiRepository) | ^1.17 |
| i18n | vue-i18n | ^11.4 |
| Validation | Valibot | ^1.4 |
| Font | Dana (Persian/Latin) | — |
| Package Manager | pnpm | — |

---

## Project Structure

```
src/
├── assets/css/        # Global styles — Tailwind + Dana font
├── composables/       # Reusable composition functions
├── enums/             # TypeScript enums (HTTP, etc.)
├── locales/           # i18n translation files (fa + en)
├── repositories/      # HTTP layer — ApiRepository + feature repos + middleware
├── router/            # Vue Router config
├── services/          # Business logic services (static classes)
├── stores/            # Pinia stores
├── types/             # Shared TypeScript types and interfaces
└── views/             # Page-level Vue components (one per route)
```

---

## TypeScript

- All files in `src/` are TypeScript — no `.js` files allowed.
- Use `type` for object shapes; use `interface` only when you need to extend.
- Never use `any`. Use `unknown` when the type is undetermined.
- Always define generics on functions and classes that work with variable data.
- Shared types go in `src/types/`.
- Always use `import type` for type-only imports.

---

## Vue Components

- Always use `<script setup lang="ts">`.
- Block order: `<template>` → `<script setup>` → `<style>` (only if needed).
- Never use `<style scoped>` — all styling via Tailwind classes.
- Type props with `defineProps<{...}>()`.
- Type emits with `defineEmits<{...}>()`.

---

## Code Style

- All service and repository classes use only `static` methods — never instantiate them.
- Use `enum` — never `const object` or `Object.freeze`.
- Semicolons at the end of every statement.
- Single quotes for strings.
- 4-space indent (no tabs).

### Import grouping

Always separate imports into named groups with a blank line between each. Order: external packages → internal (`@/`) → type-only (`import type`):

```ts
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import StorageService from '@/services/storage.service';
import AuthRepository from '@/repositories/auth.repository';

import type { User } from '@/types/user';
```

### Path aliases

Always use `@/` for imports from inside `src/`. Relative paths only for files directly adjacent in the same folder.

---

## Naming Conventions

- **Files:** `kebab-case` for all files
  - Views: `LoginView.vue`
  - Composables: `loading.composable.ts`
  - Services: `language.service.ts`
  - Repositories: `api.repository.ts`
  - Stores: `auth.store.ts`
  - Types: `api.ts` or `auth.types.ts`
  - Enums: `HttpMethod.ts` (PascalCase — matches the exported enum name)
- **Variables / Functions:** `camelCase`
- **Classes / Enums:** `PascalCase`
- **Constants:** `UPPER_SNAKE_CASE` only for `private static readonly` inside classes

### Boolean variable and prop naming

Prefix every boolean variable and prop with a modal verb:

| Prefix | Use for | Examples |
|---|---|---|
| `is` | singular state | `isOpen`, `isLoading`, `isVisible` |
| `has` | possession / completion | `hasError`, `hasChanged` |
| `are` | plural state — never `is` for plurals | `areItemsLoaded` |
| `should` | intent / conditional logic | `shouldRedirect`, `shouldFetch` |
| `can` | permission / capability | `canEdit`, `canSubmit` |
| `will` | future action | `willChange`, `willRedirect` |

```ts
// ✗ avoid
const open = ref<boolean>(false);
const loading = ref<boolean>(false);

// ✓ correct
const isOpen = ref<boolean>(false);
const isLoading = ref<boolean>(false);
```

### No abbreviated variable names

Callback and lambda parameters must use full descriptive names:

```ts
// ✗ avoid
files.find(f => f.is_main);

// ✓ correct
files.find(file => file.is_main);
```

### Functions and methods start with an imperative verb

```ts
// ✓ correct
function openModal() { ... }
function handleSubmit() { ... }
const getPostRoute = (post: Post) => ({ ... });
```

Exception: anonymous callbacks passed to `watch`, array methods, and event handlers are exempt.

### Interface names describe the data shape

```ts
// ✗ avoid
interface GetPostsParams { ... }

// ✓ correct
interface PostsFilter { ... }
```

---

## Control Flow

### Guard clauses over nested conditionals

Use early returns instead of deeply nested `if/else` blocks:

```ts
// ✗ avoid
function handleResult(result: Result | null) {
    if (result !== null) {
        if (result.ok) {
            doSomething(result);
        }
    }
}

// ✓ correct
function handleResult(result: Result | null) {
    if (result === null) {
        return;
    }

    if (result.ok === false) {
        return;
    }

    doSomething(result);
}
```

### Always use braces for `if` blocks

Every `if` (and `else`) body must use curly braces — even single-statement bodies:

```ts
// ✗ avoid
if (isOpen) return;

// ✓ correct
if (isOpen) {
    return;
}
```

### Explicit boolean checks — false only

Never use `!` to negate a boolean. For a **false** check, compare explicitly with `=== false`. For a **true** check, use the value directly — never write `=== true`:

```ts
// ✗ avoid
if (!response.ok) { ... }
if (response.ok === true) { ... }

// ✓ correct
if (response.ok === false) { ... }
if (response.ok) { ... }
```

### No optional chaining

Never use `?.`. Use explicit conditions instead:

```ts
// ✗ avoid
const title = post?.title ?? '';

// ✓ correct
if (post === null) {
    return '';
}
return post.title;
```

### Array first-item access

Never use a ternary to guard `array[0]`. Use a length check and return directly:

```ts
// ✗ avoid
const first = items[0];
return first !== undefined ? first : null;

// ✓ correct
if (items.length === 0) {
    return null;
}
return items[0];
```

### No inline index access without guard

Never access an array element by index without first assigning it to a named `const` and guarding against `undefined`:

```ts
// ✗ avoid
return post.files[0].path;

// ✓ correct
const firstFile = post.files[0];

if (firstFile === undefined) {
    return null;
}

return firstFile.path;
```

---

## Arrow vs Function Style

One-line body → arrow function. Multi-line body → `function` keyword. This applies to all functions — standalone, callbacks, and array methods:

```ts
// ✓ one-liner — arrow
const getLabel = (key: string) => t(key);
files.find((file: File) => file.is_main);

// ✓ multi-line — named function
function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en', {
        year: 'numeric',
        month: 'long'
    });
}
```

### Early returns for multi-condition functions and computeds

When a function or `computed` has **more than one condition**, use early returns. When it has **exactly one condition**, use a one-line arrow with a ternary:

```ts
// ✓ one condition — arrow + ternary
const isEdit = computed<boolean>(() => state.value === null ? false : state.value.id !== 0);

// ✓ more than one condition — function keyword + early returns
function handleSubmit() {
    if (state.value === null) {
        return;
    }

    if (isSubmitting.value) {
        return;
    }

    // ...
}
```

Nested ternaries are banned — once you have a second condition, switch to early-return style.

---

## Formatting

### No trailing comma on last item

```ts
// ✗ avoid
const options = {
    baseUrl: 'https://example.com',
    timeout: 5000,
};

// ✓ correct
const options = {
    baseUrl: 'https://example.com',
    timeout: 5000
};
```

### Long arrays — one item per line

Arrays with more than two items must place each item on its own line:

```ts
// ✗ avoid
colors: ['primary', 'secondary', 'accent', 'success'];

// ✓ correct
colors: [
    'primary',
    'secondary',
    'accent',
    'success'
];
```

### Destructuring with 3+ bindings — one per line

```ts
// ✗ avoid
const { data: posts, pending, refresh } = someCall();

// ✓ correct
const {
    data: posts,
    pending,
    refresh
} = someCall();

// ✓ two bindings — inline is fine
const { data: post, pending } = someCall();
```

### Functions with more than 3 parameters — one per line

```ts
// ✗ avoid
createUser(firstName, lastName, email, role);

// ✓ correct
createUser(
    firstName,
    lastName,
    email,
    role
);
```

### Two-argument callback APIs — opening line carries both arguments

When a function takes two arguments where the second is a callback, keep both on the opening line:

```ts
// ✗ avoid
watch(
    () => props.category,
    function(value) { ... }
);

// ✓ correct
watch(() => props.category, function(value) {
    // ...
});
```

For three-argument calls, the third argument goes on its own line:

```ts
watch(filters, async function() {
    // ...
}, { deep: true });
```

---

## Template Rules

### Props — more than two bindings go on multiple lines

Any element or component with **more than two** bindings must place each on its own line:

```vue
<!-- ✓ two bindings — inline OK -->
<VInput v-model="state.name" class="w-full" />

<!-- ✗ three bindings inline — not allowed -->
<VFormField :label="t('form.name')" name="name" required />

<!-- ✓ three bindings — one per line -->
<VFormField
    :label="t('form.name')"
    name="name"
    required
/>
```

### No inline objects or arrays in template bindings

Never pass an object literal or array literal directly as a prop binding. Define a `const` and bind that:

```vue
<!-- ✗ avoid -->
<VButton :ui="{ base: 'font-bold' }" />

<!-- ✓ correct -->
<script setup lang="ts">
    const buttonUi = { base: 'font-bold' };
</script>
<VButton :ui="buttonUi" />
```

### Blank line between sibling elements

Add a blank line between adjacent sibling elements at each level of nesting:

```vue
<!-- ✗ avoid -->
<div>
    <p>First</p>
    <h1>Title</h1>
    <p>Second</p>
</div>

<!-- ✓ correct -->
<div>
    <p>First</p>

    <h1>Title</h1>

    <p>Second</p>
</div>
```

### Don't define a method just to set a ref

For a setter that only assigns to a ref, write the assignment inline at the call site:

```ts
// ✗ avoid
function updateOpen(value: boolean) {
    isOpen.value = value;
}
```

```vue
<!-- ✗ avoid -->
<VButton @click="updateOpen(false)" />

<!-- ✓ correct -->
<VButton @click="isOpen = false" />
```

---

## UI Components (Nuxt UI)

- All Nuxt UI components use the prefix `V` (e.g. `VButton`, `VInput`, `VForm`, `VFormField`).
- When given raw HTML with Tailwind classes, **do not implement it as-is** — check Nuxt UI first and map the pattern to an existing component.
- Colors are defined in `@theme static` inside `main.css` — never hardcode hex values in components.
- `colorMode: false` — dark mode is not supported unless explicitly added.

Common pattern-to-component mappings:

| UI pattern | Nuxt UI component |
|---|---|
| Form wrapper with validation | `VForm` |
| Form field with label | `VFormField` |
| Text input | `VInput` |
| Button | `VButton` |
| Modal / dialog | `VModal` |
| Dropdown menu | `VDropdownMenu` |
| Tabs | `VTabs` |
| Accordion | `VAccordion` |

### Slots over props

When a Nuxt UI component exposes a slot for a piece of content, always use the slot — never the equivalent prop:

```vue
<!-- ✗ avoid — using the prop -->
<VCard title="Post title" />

<!-- ✓ correct — using the slot -->
<VCard>
    <template #header>
        Post title
    </template>
</VCard>
```

---

## Validation (Valibot)

- Define schemas with `v.object({...})`.
- Derive state types with `v.InferOutput<typeof schema>`.
- Persian error messages are handled automatically via `@valibot/i18n/fa` — no manual messages needed.
- Read https://valibot.dev/llms.txt for the full schema and pipeline reference.

---

## i18n

- Never hardcode Persian or English text in templates — always use `t('key')`.
- Keys are nested objects separated by `.` (e.g. `auth.login.submit`).
- Locale file structure: `messages.ts` for UI text, `enums.ts` for enum label translations.

---

## Entry Point & Bootstrap

- `main.ts` only mounts the app — no extra logic.
- All initial setup (axios headers, middleware registration, valibot locale) lives in `bootstrap.ts`.
- `main.ts` imports `./bootstrap` first, before anything else.

---

## Environment Variables

- All env variables are prefixed with `VITE_`.
- Access via `import.meta.env.VITE_XXX` — never use `process.env`.
- Keep `.env.example` up to date whenever you add a new variable.
