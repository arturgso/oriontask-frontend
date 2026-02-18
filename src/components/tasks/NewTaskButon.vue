<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
import ActionButton from '../ui/ActionButton.vue';
</script>

<template>
    <ActionButton type="button" text="Nova task" width="auto" :icon="Plus" />
</template>
