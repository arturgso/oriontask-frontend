<script setup lang="ts">
import { styles } from '@/styles/DefaultStyles';
import { TASKS_LABELS, type TaskStatus } from '@/types/Types';

defineProps<{ status: TaskStatus }>();

function getBadgeColor(status: TaskStatus) {
    switch (status) {
        case 'NOW':
            return '#3B82F6';
        case 'DONE':
            return '#22C55E';
        case 'NEXT':
            return '#7C3AED';
        case 'WAITING':
            return '#EAB308';
        default:
            return '#000000';
    }
}
</script>

<template>
    <span :class="styles.badge" :style="{ backgroundColor: getBadgeColor(status) }">
        {{ TASKS_LABELS[status] }}
    </span>
</template>
