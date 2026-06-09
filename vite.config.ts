import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import ui from '@nuxt/ui/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        ui({
            prefix: 'V',
            colorMode: false,
            ui: {
                colors: {
                    primary: 'primary',
                    secondary: 'secondary',
                    accent: 'accent',
                    success: 'success',
                    warning: 'warning',
                    error: 'error',
                    info: 'info',
                    neutral: 'neutral'
                }
            }
        })
    ],

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});
