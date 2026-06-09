<template>
    <VApp>
        <RouterView/>
    </VApp>
</template>

<script setup lang="ts">
    import * as v from 'valibot';

    v.setGlobalConfig({ lang: 'fa' });
</script>
