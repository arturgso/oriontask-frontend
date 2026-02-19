import { TasksService } from '@/services/TasksService';
import type { Tasks } from '@/types/Tasks';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTasksStore = defineStore('tasks', () => {
    const tasks = ref<Tasks[]>([]);
    const currentTasks = ref<Tasks[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const serv = new TasksService();

    async function fetchTasks() {
        loading.value = true;
        error.value = null;

        try {
            tasks.value = await serv.listAllUserTasks();
        } catch (e) {
            console.error(e);
            error.value = 'Erro enquanto fazia fetch das tasks';
        } finally {
            loading.value = false;
        }
    }

    async function fetchCurrentTasks() {
        loading.value = true;
        error.value = null;

        try {
            currentTasks.value = await serv.fetchTasksByStatus('NOW');
        } catch (e) {
            console.error(e);
            error.value = 'Erro enquanto fazia fetch das tasks';
        } finally {
            loading.value = false;
        }
    }

    return {
        tasks,
        currentTasks,
        loading,
        error,
        fetchTasks,
        fetchCurrentTasks,
    };
});
