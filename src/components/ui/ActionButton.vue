<script setup lang="ts">
import type { ButtonHTMLAttributes, Component } from 'vue';

const props = defineProps<{
    type: ButtonHTMLAttributes['type'];
    text: string;
    width?: string;
    icon?: Component;
    extraClass?: string;
}>();

const emit = defineEmits<{
    (e: 'click'): void;
}>();
</script>

<template>
    <button
        :type="props.type"
        class="p-2 bg-accent rounded-md font-bold text-white text-lg hover:bg-accent-hover transition duration-150 hover:shadow-lg flex items-center gap-1"
        :class="[props.extraClass, !props.icon ? 'justify-center' : 'justify-start']"
        :style="{ width: props.width ?? '100%' }"
        @click="emit('click')"
    >
        <div v-if="icon">
            <component :is="icon" />
        </div>

        {{ props.text }}
    </button>
</template>
