<script setup lang="ts">
import { Menu } from 'lucide-vue-next';
import { ref, type Component } from 'vue';
import Sidebar from './Sidebar.vue';

const isMobileMenuOpen = ref(false);

const props = defineProps<{
    icon?: Component;
    title: string;
    sideComponent?: Component;
}>();
</script>

<template>
    <main class="flex gap-3 min-h-screen">
        <header
            class="md:hidden fixed top-0 left-0 right-0 z-30 h-16 px-4 border-b border-border bg-background/95 backdrop-blur-sm flex items-center justify-between"
        >
            <button
                class="h-9 w-9 flex items-center justify-center rounded-sm border border-transparent text-text-muted transition-colors hover:text-accent hover:bg-surface"
                @click="isMobileMenuOpen = true"
            >
                <Menu :size="18" />
            </button>

            <div class="flex items-center gap-2.5">
                <img src="/logo.svg" class="w-7 dark:invert" />
                <h1 class="font-semibold tracking-tight text-text-primary text-base">OrionTask</h1>
            </div>
            <div class="w-9" />
        </header>

        <Sidebar v-model:mobile-menu-open="isMobileMenuOpen" />
        <div class="px-4 w-full pt-20 md:pt-0 md:mt-16 md:max-w-5xl md:mx-auto">
            <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <h1
                            class="text-2xl text-text-primary font-semibold tracking-tight capitalize"
                        >
                            {{ props.title }}
                        </h1>
                    </div>
                    <div v-if="sideComponent">
                        <component :is="sideComponent" />
                    </div>
                </div>
                <slot />
                <footer class="h-10 md:h-12" />
            </div>
        </div>
    </main>
</template>
