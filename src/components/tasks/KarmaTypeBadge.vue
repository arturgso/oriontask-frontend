<script setup lang="ts">
import { styles } from '@/styles/DefaultStyles';
import { KARMA_LABELS, type KarmaType } from '@/types/Types';

defineProps<{ type: KarmaType }>();

function getBadgeColor(type: KarmaType) {
    switch (type) {
        case 'ACTION':
            return '#92400E';
        case 'PEOPLE':
            return '#DB2777';
        case 'THINKING':
            return '#475569';
        default:
            return '#000000';
    }
}
</script>

<template>
    <span :class="styles.badge" :style="{ backgroundColor: getBadgeColor(type) }">
        {{ KARMA_LABELS[type] }}
    </span>
</template>
