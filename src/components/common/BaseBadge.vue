<script setup lang="ts">
interface Props {
    text: string;
    variantClass?: string;
    extraClass?: string;
}

withDefaults(defineProps<Props>(), {
    variantClass: 'border-border bg-surface text-text-primary',
    extraClass: '',
});
</script>

<template>
    <span
        :class="[
            'text-xs font-medium py-1 px-2 rounded-sm border transition-colors',
            variantClass,
            extraClass,
        ]"
    >
        {{ text }}
    </span>
</template>
