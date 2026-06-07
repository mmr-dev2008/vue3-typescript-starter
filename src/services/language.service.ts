import { createI18n as createVueI18N } from 'vue-i18n';

import StorageService from './storage.service';

import en from '@/locales/en/index';
import fa from '@/locales/fa/index';

import type { Locale } from '@/types/locale';

class LanguageService {
    static readonly STORAGE_KEY: string = 'locale';

    static readonly DEFAULT: Locale = 'en';

    static set(value: string): void {
        StorageService.set<string>(this.STORAGE_KEY, value);
        location.reload();
    }

    static get(): Locale {
        return StorageService.get<Locale>(this.STORAGE_KEY) ?? this.DEFAULT;
    }

    static isRtl(): boolean {
        return ['fa'].includes(this.get());
    }
}

export default LanguageService;

const i18n = createVueI18N({
    locale: LanguageService.get(),
    fallbackLocale: LanguageService.DEFAULT,
    messages: { en, fa }
});

export function createI18n() {
    return i18n;
}

export function t(key: string, ...args: unknown[]): string {
    return i18n.global.t(key, ...(args as []));
}
