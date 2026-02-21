<script lang="ts" setup>
import { computed, type Component } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface Props {
    icon: Component;
    text: string;
    push: string;
    closed: boolean;
    title?: string;
}

const props = defineProps<Props>();
const router = useRouter();
const route = useRoute();

const normalizedPush = computed(() => (props.push.startsWith('/') ? props.push : `/${props.push}`));
const isActive = computed(() => {
    const target = normalizedPush.value;
    return route.path === target || route.path.startsWith(`${target}/`);
});

function handlePush() {
    router.push(props.push);
}
</script>

<template>
    <button
        :class="[
            'w-full flex items-center gap-3 rounded-sm px-2.5 py-2 border text-sm transition-colors',
            closed ? 'justify-center px-2' : '',
            isActive
                ? 'border-accent/30 bg-accent/10 text-accent'
                : 'border-transparent text-text-primary hover:bg-surface',
        ]"
        :title="props.title"
        @click="handlePush"
    >
        <component :is="props.icon" :size="18" />
        <p :class="[closed ? 'hidden' : '', 'min-w-0 truncate']">{{ props.text }}</p>
    </button>
</template>
