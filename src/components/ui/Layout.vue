<script setup lang="ts">
import { Menu } from 'lucide-vue-next';
import { ref, type Component } from 'vue';
import Sidebar from './Sidebar.vue';

const isMobileMenuOpen = ref(false);

const props = defineProps<{
    icon?: Component;
    title: string;
}>();
</script>

<template>
    <main class="flex gap-3 min-h-screen">
        <header
            class="md:hidden fixed top-0 left-0 right-0 z-30 h-16 px-4 border-b border-border bg-surface flex items-center justify-between"
        >
            <button class="text-text-muted" @click="isMobileMenuOpen = true">
                <Menu />
            </button>

            <div class="flex items-center gap-2">
                <img src="/logo.svg" class="w-8" />
                <h1 class="font-bold text-text-primary text-lg">OrionTask</h1>
            </div>
            <div class="w-6" />
        </header>

        <Sidebar v-model:mobile-menu-open="isMobileMenuOpen" />
        <div class="px-4 w-full pt-20 md:pt-0 md:mt-16">
            <div class="flex flex-col gap-3">
                <div class="flex items-center gap-2">
                    <component :is="props.icon" :size="32" color="#7c3aed" />
                    <h1 class="text-3xl text-text-secondary font-bold">
                        {{ props.title }}
                    </h1>
                </div>
                <slot />
            </div>
        </div>
    </main>
</template>
