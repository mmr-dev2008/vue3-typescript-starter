# src/locales/CLAUDE.md

i18n is managed by `vue-i18n` and accessed exclusively through `LanguageService`.
Supported locales: Persian (`fa`) and English (`en`).

---

## Structure

```
src/locales/
├── fa/
│   ├── index.ts       # merges all fa locale files
│   ├── messages.ts    # UI text
│   └── enums.ts       # enum label translations
└── en/
    ├── index.ts
    ├── messages.ts
    └── enums.ts
```

---

## Pattern

```ts
// src/locales/fa/messages.ts
export default {
    auth: {
        login: {
            title: 'ورود به حساب',
            submit: 'ورود',
            email: 'ایمیل',
            password: 'رمز عبور'
        }
    }
};

// src/locales/fa/enums.ts
export default {
    orderStatus: {
        pending: 'در انتظار',
        approved: 'تأیید شده'
    }
};

// src/locales/fa/index.ts
import Messages from './messages';
import Enums from './enums';

export default Object.assign(Messages, { enums: Enums });
```

---

## Rules

- Keys are nested objects — never flat.
- Enum translations always live under the `enums` key.
- Each locale folder has an `index.ts` that merges all files.
- `fa` and `en` must have the exact same key structure — no missing keys in either locale.
- Never import from `vue-i18n` directly outside of `language.service.ts`.
- In `<script setup>` components, use `const { t } = useI18n()` from `vue-i18n` directly.
- In services or plain TS files, use the exported `t()` from `language.service.ts`.

---

## Changing Locale

```ts
import LanguageService from '@/services/language.service';

LanguageService.set('fa');     // changes locale (reloads the page)
LanguageService.get();         // returns 'fa' | 'en'
LanguageService.isRtl();       // returns true for 'fa'
```
