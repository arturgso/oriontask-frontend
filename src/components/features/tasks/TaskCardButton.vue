<script setup lang="ts">
import type { Component } from 'vue';

const props = withDefaults(
    defineProps<{
        text: string;
        icon: Component;
        disabled?: boolean;
    }>(),
    {
        disabled: false,
    },
);

const emit = defineEmits<{
    (e: 'click'): void;
}>();
</script>

<template>
    <div class="flex justify-center">
        <button
            type="button"
            :disabled="props.disabled"
            :title="props.text"
            class="border border-accent/30 bg-accent/10 text-accent flex items-center justify-center rounded-sm text-xs sm:text-sm font-medium hover:bg-accent/15 transition-colors disabled:opacity-60 disabled:cursor-not-allowed h-9 w-9 sm:h-auto sm:w-auto sm:min-w-28 px-0 sm:px-2.5 py-0 sm:py-2 gap-0 sm:gap-1.5"
            @click="emit('click')"
        >
            <Component :is="props.icon" :size="16" />
            <p class="hidden sm:block whitespace-nowrap">
                {{ props.text }}
            </p>
        </button>
    </div>
</template>
