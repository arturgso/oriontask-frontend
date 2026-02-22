<script setup lang="ts">
import TasksCard from '@/components/features/tasks/TasksCard.vue';
import Layout from '@/components/layout/MainLayout.vue';
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
const activeTasks = computed(() => tasks.value.filter((task) => task.status !== 'SNOOZED'));
const snoozedTasks = computed(() => tasks.value.filter((task) => task.status === 'SNOOZED'));

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
        <div class="flex flex-col gap-3">
            <div v-if="activeTasks.length" class="flex flex-col gap-3">
                <div v-for="t in activeTasks" :key="t.id">
                    <TasksCard :task="t" @updated="loadPageData" />
                </div>
            </div>

            <section
                v-if="snoozedTasks.length"
                class="mt-4 border border-border rounded-sm bg-surface/40 p-3"
            >
                <h2 class="text-xs font-medium uppercase tracking-wide text-text-secondary mb-3">
                    Adiadas
                </h2>
                <div class="flex flex-col gap-3">
                    <div v-for="t in snoozedTasks" :key="t.id">
                        <TasksCard :task="t" @updated="loadPageData" />
                    </div>
                </div>
            </section>
        </div>
    </Layout>
</template>
