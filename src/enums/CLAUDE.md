# src/enums/CLAUDE.md

Enums are used for all fixed, meaningful constant values.
Never use `const object` or `Object.freeze` as a substitute for an enum.

---

## Pattern

```ts
// src/enums/ExampleEnum.ts

enum ExampleEnum {
    FIRST_VALUE = 'FIRST_VALUE',
    SECOND_VALUE = 'SECOND_VALUE'
}

export default ExampleEnum;
```

---

## Rules

- Always `export default` — no named exports.
- String enums use string values; numeric enums use number values.
- No trailing comma on the last member.
- Never duplicate HTTP-related values — use the existing HTTP enums.
- File name: `PascalCase.ts` (e.g. `HttpMethod.ts`) — matches the exported enum name.

---

## Available Enums

| Enum | Description |
|---|---|
| `HttpMethod` | HTTP methods (GET, POST, PUT, PATCH, DELETE, ...) |
| `HttpStatusCode` | HTTP status codes with JSDoc links to MDN |
| `HttpHeader` | Common HTTP request/response header names |
| `MimeType` | Common MIME types (application/json, ...) |

---

## Usage Example

```ts
import HttpHeader from '@/enums/HttpHeader';
import MimeType from '@/enums/MimeType';

ApiRepository.setHeader(HttpHeader.CONTENT_TYPE, MimeType.APPLICATION_JSON);
```
