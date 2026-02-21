<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
    text: string;
    icon: Component;
}>();
</script>

<template>
    <div class="flex justify-center">
        <button
            type="button"
            class="border border-accent/30 bg-accent/10 text-accent flex items-center min-w-28 justify-center gap-2 px-3 py-2 rounded-sm text-sm font-medium hover:bg-accent/15 transition-colors"
        >
            <Component :is="icon" :size="18" />
            <p>
                {{ text }}
            </p>
        </button>
    </div>
</template>
