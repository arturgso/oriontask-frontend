<script setup lang="ts">
import { styles } from '@/styles/DefaultStyles';
import { EFFORT_LABELS, type EffortLevel } from '@/types/Types';

defineProps<{ level: EffortLevel }>();

function getBadgeColor(level: EffortLevel) {
    switch (level) {
        case 'HIGH':
            return '#EF4444';
        case 'LOW':
            return '#14B8A6';
        case 'MEDIUM':
            return '#F59E0B';
        default:
            return '#000000';
    }
}
</script>

<template>
    <span :class="styles.badge" :style="{ backgroundColor: getBadgeColor(level) }">
        {{ EFFORT_LABELS[level] }}
    </span>
</template>
