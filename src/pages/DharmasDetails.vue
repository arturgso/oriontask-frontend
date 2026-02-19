<script setup lang="ts">
const props = defineProps<{
    id: string;
}>();
</script>

<template>
    <h1>Dharma ID: {{ props.id }}</h1>
</template>
