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
            class="bg-surface border border-border flex items-center min-w-28 justify-center gap-2 p-2 rounded-md hover:bg-surface/60 transition duration-200"
        >
            <Component :is="icon" :size="18" />
            <p>
                {{ text }}
            </p>
        </button>
    </div>
</template>
