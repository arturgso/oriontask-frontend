<script setup lang="ts">
import Layout from '@/components/ui/Layout.vue';
import { useDharmaStore } from '@/stores/dharmaStore';
import { computed, watch } from 'vue';

const props = defineProps<{
    id: string;
}>();
const store = useDharmaStore();

const dharmaId = computed(() => Number(props.id));
const dharma = computed(() => store.dharmaById(dharmaId.value));

watch(
    () => props.id,
    async () => {
        if (!store.dharmas.length) {
            await store.fetchDharmas();
        }
    },
    { immediate: true },
);
</script>

<template>
    <Layout :title="dharma?.name ?? 'dharma'">
        <h1>Dharma ID: {{ props.id }}</h1>
    </Layout>
</template>
