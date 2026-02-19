<script setup lang="ts">
import Layout from '@/components/ui/Layout.vue';
import { useDharmaStore } from '@/stores/dharmaStore';

const props = defineProps<{
    id: string;
}>();

const store = useDharmaStore();
const dharma = store.dharmaById(Number(props.id));
</script>

<template>
    <Layout :title="dharma?.name ?? 'dharma'">
        <h1>Dharma ID: {{ props.id }}</h1>
    </Layout>
</template>
