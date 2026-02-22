<script setup lang="ts">
import { TASKS_LABELS, type TaskStatus } from '@/types/Types';
import BaseBadge from '@/components/common/BaseBadge.vue';

defineProps<{ status: TaskStatus }>();

function getBadgeStyle(status: TaskStatus) {
    switch (status) {
        case 'NOW':
            return 'border-blue-200 bg-blue-50 text-blue-700';
        case 'DONE':
            return 'border-emerald-200 bg-emerald-50 text-emerald-700';
        case 'NEXT':
            return 'border-accent/30 bg-accent/10 text-accent';
        case 'WAITING':
            return 'border-amber-200 bg-amber-50 text-amber-700';
        case 'SNOOZED':
            return 'border-slate-200 bg-slate-100 text-slate-700';
        default:
            return 'border-border bg-surface text-text-primary';
    }
}
</script>

<template>
    <BaseBadge :text="TASKS_LABELS[status]" :variant-class="getBadgeStyle(status)" />
</template>
