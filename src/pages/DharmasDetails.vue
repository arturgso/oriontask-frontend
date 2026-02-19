<script setup lang="ts">
import TasksCard from '@/components/tasks/TasksCard.vue';
import Layout from '@/components/ui/Layout.vue';
import { useDharmaStore } from '@/stores/dharmaStore';
import { useTasksStore } from '@/stores/TasksStore';
import type { Tasks } from '@/types/Tasks';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
    id: string;
}>();
const store = useDharmaStore();
const tasksStore = useTasksStore();

const dharmaId = computed(() => Number(props.id));
const dharma = computed(() => store.dharmaById(dharmaId.value));
const tasks = ref<Tasks[]>([]);

async function loadPageData() {
    if (!store.dharmas.length) {
        await store.fetchDharmas();
    }

    tasks.value = await tasksStore.fetchTasksByDharma(dharmaId.value);
}

watch(() => props.id, loadPageData, { immediate: true });
</script>

<template>
    <Layout :title="dharma?.name ?? 'dharma'">
        <div v-for="t in tasks" :key="t.id">
            <TasksCard :task="t" />
        </div>
    </Layout>
</template>
