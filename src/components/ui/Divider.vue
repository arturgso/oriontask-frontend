<script lang="ts" setup>
defineProps<{
    margin?: boolean;
}>();
</script>

<template>
    <div class="w-full border border-border rounded-lg" :class="margin ? 'my-4' : ''"></div>
</template>
