<script setup lang="ts">
import NewTaskButton from '@/components/features/tasks/NewTaskButton.vue';
import TasksCard from '@/components/features/tasks/TasksCard.vue';
import Layout from '@/components/layout/MainLayout.vue';
import { useDharmaStore } from '@/stores/dharmaStore';
import { useTasksStore } from '@/stores/TasksStore';
import type { Tasks } from '@/types/Tasks';
import { ChevronDown } from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
    id: string;
}>();

const showSnoozed = ref(false);

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

function toggleSnoozed() {
    showSnoozed.value = !showSnoozed.value;
}
</script>

<template>
    <Layout :title="dharma?.name ?? 'dharma'" :side-component="NewTaskButton">
        <div class="flex flex-col gap-3">
            <div v-if="activeTasks.length" class="flex flex-col gap-3">
                <div v-for="t in activeTasks" :key="t.id">
                    <TasksCard :task="t" @updated="loadPageData" />
                </div>
            </div>

            <section v-if="snoozedTasks.length" class="mt-4">
                <div class="flex items-center justify-between w-full mb-3">
                    <h2 class="text-xs font-medium uppercase tracking-wide text-text-secondary">
                        Adiadas
                    </h2>
                    <button class="text-text-secondary" @click="toggleSnoozed">
                        <ChevronDown :class="[showSnoozed ? 'rotate-180' : '']" :size="18" />
                    </button>
                </div>

                <Transition name="fade-slide">
                    <div v-if="showSnoozed" class="flex flex-col gap-3">
                        <div v-for="t in snoozedTasks" :key="t.id">
                            <TasksCard :task="t" @updated="loadPageData" />
                        </div>
                    </div>
                </Transition>
            </section>
        </div>
    </Layout>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease-out;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
