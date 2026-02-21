<script setup lang="ts">
import { KARMA_LABELS, type KarmaType } from '@/types/Types';

defineProps<{ type: KarmaType }>();

function getBadgeStyle(type: KarmaType) {
    switch (type) {
        case 'ACTION':
            return 'border-amber-200 bg-amber-50 text-amber-800';
        case 'PEOPLE':
            return 'border-pink-200 bg-pink-50 text-pink-700';
        case 'THINKING':
            return 'border-slate-200 bg-slate-100 text-slate-700';
        default:
            return 'border-border bg-surface text-text-primary';
    }
}
</script>

<template>
    <span :class="['text-xs font-medium py-1 px-2 rounded-sm border', getBadgeStyle(type)]">
        {{ KARMA_LABELS[type] }}
    </span>
</template>
