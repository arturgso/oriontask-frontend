<script lang="ts" setup>
import NewTaskButon from '@/components/tasks/NewTaskButon.vue';
import TasksCard from '@/components/tasks/TasksCard.vue';
import Layout from '@/components/ui/Layout.vue';
import { useDharmaStore } from '@/stores/dharmaStore';
import { useTasksStore } from '@/stores/TasksStore';
import { Zap } from 'lucide-vue-next';
import { onMounted } from 'vue';

const tasksStore = useTasksStore();
const dharmaStore = useDharmaStore();

async function loadNowPageData() {
    if (!dharmaStore.dharmas.length) {
        await dharmaStore.fetchDharmas();
    }

    await tasksStore.fetchCurrentTasks();
}

onMounted(() => {
    loadNowPageData();
});
</script>

<template>
    <Layout title="Tasks em foco" :icon="Zap" :side-component="NewTaskButon">
        <section>
            <p class="text-xs text-text-secondary mb-4">
                {{ tasksStore.currentTasks.length }} em Agora
            </p>

            <div class="flex flex-col gap-3">
                <p v-if="tasksStore.loading" class="text-sm text-text-secondary">
                    Carregando tasks...
                </p>
                <p v-else-if="tasksStore.error" class="text-sm text-red-500">
                    {{ tasksStore.error }}
                </p>
                <p v-else-if="!tasksStore.currentTasks.length" class="text-sm text-text-secondary">
                    Nenhuma task marcada como Agora.
                </p>
                <div v-else class="flex flex-col gap-3">
                    <div v-for="t in tasksStore.currentTasks" :key="t.id">
                        <TasksCard :task="t" @updated="loadNowPageData" />
                    </div>
                </div>
            </div>
        </section>
    </Layout>
</template>
