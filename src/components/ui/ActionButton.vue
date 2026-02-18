<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';

const props = defineProps<{
    type: ButtonHTMLAttributes['type'];
    text: string;
}>();

const emit = defineEmits<{
    (e: 'click'): void;
}>();
</script>

<template>
        <button
            :type="props.type"
            class="w-full p-2 bg-accent rounded-md font-bold text-white text-lg mt-4 hover:bg-accent-hover transition duration-150 hover:shadow-lg"
            @click="emit('click')"
        >
            {{ props.text }}
        </button>

</template>