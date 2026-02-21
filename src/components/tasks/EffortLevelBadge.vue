<script setup lang="ts">
import { EFFORT_LABELS, type EffortLevel } from '@/types/Types';

defineProps<{ level: EffortLevel }>();

function getBadgeStyle(level: EffortLevel) {
    switch (level) {
        case 'HIGH':
            return 'border-rose-200 bg-rose-50 text-rose-700';
        case 'LOW':
            return 'border-teal-200 bg-teal-50 text-teal-700';
        case 'MEDIUM':
            return 'border-orange-200 bg-orange-50 text-orange-700';
        default:
            return 'border-border bg-surface text-text-primary';
    }
}
</script>

<template>
    <span :class="['text-xs font-medium py-1 px-2 rounded-sm border', getBadgeStyle(level)]">
        {{ EFFORT_LABELS[level] }}
    </span>
</template>
