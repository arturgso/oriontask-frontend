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
            class="border border-accent/30 bg-accent/10 text-accent flex items-center min-w-28 justify-center gap-2 px-3 py-2 rounded-sm text-sm font-medium hover:bg-accent/15 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            @click="emit('click')"
        >
            <Component :is="props.icon" :size="18" />
            <p>
                {{ props.text }}
            </p>
        </button>
    </div>
</template>
