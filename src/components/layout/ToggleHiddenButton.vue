<script lang="ts" setup>
import { Eye } from 'lucide-vue-next';
import { useDharmaStore } from '@/stores/dharmaStore';

defineProps<{
    closed: boolean;
    isMobile: boolean;
}>();

const dharmaStore = useDharmaStore();

async function handleToggleHidden() {
    dharmaStore.toggleShowHidden();
    await dharmaStore.fetchDharmas();
}
</script>

<template>
    <button
        title="Mostrar ocultos"
        :class="[
            'w-full flex items-center gap-3 rounded-xl px-2.5 py-2 border text-sm transition-colors',
            closed ? 'justify-center px-2' : '',
            'border-transparent text-text-primary hover:bg-surface',
        ]"
        @click="handleToggleHidden"
    >
        <Eye :size="18" />
        <p :class="[closed ? 'hidden' : '', isMobile ? 'text-xs' : '', 'min-w-0 truncate']">
            Mostrar ocultos
        </p>
    </button>
</template>
