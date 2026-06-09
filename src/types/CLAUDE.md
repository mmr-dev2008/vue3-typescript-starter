# src/types/CLAUDE.md

This folder contains TypeScript types and interfaces shared across multiple files.

---

## Rules

- If a type is used in more than one file, move it here — do not define it inline in a feature file.
- For feature-specific types, create a dedicated file: `[feature].types.ts` or `[feature].ts`.
- Always use named exports: `export type` or `export interface` — no default exports.
- Use `type` for object shapes; use `interface` only when you need to extend.

---

## Pattern

```ts
// src/types/user.ts

export type UserRole = 'admin' | 'manager' | 'user';

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole
}

export type CreateUserPayload = Omit<User, 'id'>;
export type UpdateUserPayload = Partial<CreateUserPayload>;
```

---

## Response type pattern

`api.ts` holds the shared API envelope types only — never put entity shapes there.
Each domain file defines its own response types:

```ts
// src/types/api.ts
export interface ApiResponseData<T = unknown> {
    code: number;
    message: string;
    error: string[];
    value: T
}

export interface ApiResponse<T = unknown> extends AxiosResponse<ApiResponseData<T>> {}
```

```ts
// src/types/auth.ts
interface LoginResponseValue {
    token: string
}

export interface LoginResponse extends ApiResponse<LoginResponseValue> {}
```

Access pattern in components and composables: `response.data.value.token`

---

## Available Types

### `api.ts`

```ts
ApiRequestConfig<T>     // extends AxiosRequestConfig
ApiResponseData<T>      // { code: number, message: string, error: string[], value: T }
ApiResponse<T>          // extends AxiosResponse<ApiResponseData<T>>
RequestOnFulfilled      // type for axios request interceptors
ResponseOnFulfilled<T>  // type for axios response interceptors
ResponseOnRejected      // type for axios error interceptors
```

Always use these types in repositories and middleware — never import axios types directly for these shapes.
