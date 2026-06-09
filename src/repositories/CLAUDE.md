# src/repositories/CLAUDE.md

Repositories are responsible for **all HTTP communication**.
The HTTP layer is fully isolated — `axios` is never imported anywhere else in the project.

---

## Structure

```
src/repositories/
├── api.repository.ts          # Base HTTP client (axios wrapper — static class)
├── middleware/                # Axios interceptors
│   └── AuthenticateUser.ts   # Redirects to Login on 401
└── [feature].repository.ts   # Feature-specific API calls (static class)
```

---

## ApiRepository — Base Client

`ApiRepository` is a **static class** that wraps a single axios instance.
All feature repositories use this class — never axios directly.

Available methods:

```ts
ApiRepository.get<T>(url, config?)
ApiRepository.post<T>(url, data?, config?)
ApiRepository.put<T>(url, data?, config?)
ApiRepository.patch<T>(url, data?, config?)
ApiRepository.delete<T>(url, config?)
ApiRepository.request<T>(config)

ApiRepository.setHeader(name, value, method?)
ApiRepository.deleteHeader(name, method?)
ApiRepository.addRequestMiddleware(fn)       // returns interceptor id
ApiRepository.removeRequestMiddleware(id)
ApiRepository.addResponseMiddleware(fn, onRejected?)  // returns interceptor id
ApiRepository.removeResponseMiddleware(id)
```

Base URL and timeout are read from `VITE_API_BASE_URL` and `VITE_API_TIMEOUT`.

---

## Feature Repository Pattern

Feature repositories are also **static classes** — no instantiation:

```ts
// src/repositories/auth.repository.ts

import ApiRepository from './api.repository';

import type { ApiResponse } from '@/types/api';
import type { LoginPayload, LoginResponse } from '@/types/auth';

class AuthRepository {
    private static readonly BASE: string = '/auth';

    static login(payload: LoginPayload): Promise<ApiResponse<LoginResponse>> {
        return ApiRepository.post<LoginResponse>(`${this.BASE}/login`, payload);
    }

    static logout(): Promise<ApiResponse> {
        return ApiRepository.post(`${this.BASE}/logout`);
    }
}

export default AuthRepository;
```

---

## Rules

- Never import `axios` directly — always go through `ApiRepository`.
- Always provide a generic type: `ApiRepository.get<UserType>(...)`.
- Define the API base path as `private static readonly BASE` at the top of the class.
- Each method body is a single `return` — no logic, no extraction inside the repository.
- File name: `[feature].repository.ts`

```ts
// ✓ correct — single return
static getAll(config?: ApiRequestConfig): Promise<ApiResponse<UsersResponse>> {
    return ApiRepository.get<UsersResponse>(`${this.BASE}/index`, config);
}

// ✗ avoid — extraction inside repository
static async getAll(config?: ApiRequestConfig) {
    const result = await ApiRepository.get(...);
    return result.data.value;
}
```

---

## Middleware Pattern

Middleware are axios interceptors that live in `repositories/middleware/`.
They are registered in `bootstrap.ts` — not inside repository files.

```ts
// src/repositories/middleware/ExampleMiddleware.ts

import type { ApiResponse } from '@/types/api';

export default function(response: ApiResponse): ApiResponse {
    // inspect or transform the response
    return response;
}
```

Middleware file name: `PascalCase.ts` (named export default function).
