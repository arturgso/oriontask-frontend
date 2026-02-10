<script lang="ts" setup>
import type { Component } from 'vue';
import { useRouter } from 'vue-router';
import { styles } from '@/styles/DefaultStyles';

interface Props {
    icon: Component;
    text: string;
    push: string;
    closed: boolean;
    title?: string;
}

const props = defineProps<Props>();
const router = useRouter();

function handlePush() {
    router.push(props.push);
}
</script>

<template>
    <button
        :class="[styles.input.navButton.default, closed ? '' : styles.input.navButton.open]"
        :title="props.title"
        @click="handlePush"
    >
        <component :is="props.icon" />
        <p :class="[closed ? 'hidden' : '']">{{ props.text }}</p>
    </button>
</template>
