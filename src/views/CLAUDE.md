# src/views/CLAUDE.md

Views are page-level components — each one maps directly to a route.

---

## Rules

- Every file in `views/` must correspond to a route in the router.
- File name: `[Name]View.vue` — e.g. `LoginView.vue`, `DashboardView.vue`.
- Views are never imported into other components — only the router uses them.
- For large projects, use sub-folders per section: `views/dashboard/`, `views/auth/`.
- Layout components (e.g. `DashboardLayout.vue`) also live here if they are route-level.
- No `<style>` block — all styling via Tailwind classes.

---

## Pattern

```vue
<!-- src/views/LoginView.vue -->
<template>
    <VForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="handleSubmit"
    >
        <VFormField
            :label="t('auth.login.email')"
            name="email"
        >
            <VInput v-model="state.email" />
        </VFormField>

        <VFormField
            :label="t('auth.login.password')"
            name="password"
        >
            <VInput v-model="state.password" type="password" />
        </VFormField>

        <VButton type="submit" :loading="isLoading">
            {{ t('auth.login.submit') }}
        </VButton>
    </VForm>
</template>

<script setup lang="ts">
    import * as v from 'valibot';
    import { reactive } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRouter } from 'vue-router';

    import { useLoading } from '@/composables/loading.composable';
    import AuthRepository from '@/repositories/auth.repository';
    import TokenService from '@/services/token.service';

    import type { FormSubmitEvent } from '@nuxt/ui';

    const { t } = useI18n();
    const router = useRouter();
    const { isLoading, startLoading, endLoading } = useLoading();

    const schema = v.object({
        email: v.pipe(v.string(), v.email()),
        password: v.pipe(v.string(), v.minLength(8))
    });

    type Schema = v.InferOutput<typeof schema>;

    const state = reactive<Schema>({
        email: '',
        password: ''
    });

    async function handleSubmit(event: FormSubmitEvent<Schema>): Promise<void> {
        startLoading();

        try {
            const response = await AuthRepository.login(event.data);
            TokenService.set(response.data.value.token);
            router.push({ name: 'Dashboard' });
        } finally {
            endLoading();
        }
    }
</script>
```

---

## Notes

- Define validation schemas with Valibot and derive the state type from `v.InferOutput`.
- Get loading state from `useLoading()` — never use a manual `ref(false)` for loading flags.
- Call API methods via repositories — never import or use axios directly.
- Navigate with `router.push({ name: 'RouteName' })` — never raw path strings.
- For Nuxt UI component props and slots, fetch the raw doc before using: `https://ui.nuxt.com/raw/docs/components/{component-name}.md`
