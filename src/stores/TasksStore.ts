import { TasksService } from '@/services/TasksService';
import type { NewTaskProps, Tasks } from '@/types/Tasks';
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

    async function fetchTasksByDharma(dharmaId: number): Promise<Tasks[]> {
        loading.value = true;
        error.value = null;

        try {
            const res = await serv.fetchByDharma(dharmaId);
            return res as Tasks[];
        } catch (e) {
            console.error(e);
            error.value = 'Erro enquanto fazia fetch das tasks';
            return [];
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

    async function createTask(form: NewTaskProps, dharmaId: number | null): Promise<Tasks> {
        const newTask = await serv.create(form, dharmaId);

        tasks.value.unshift(newTask);

        if (newTask.status === 'NOW') {
            currentTasks.value.unshift(newTask);
        }

        return newTask;
    }

    return {
        tasks,
        currentTasks,
        loading,
        error,
        fetchTasks,
        fetchCurrentTasks,
        fetchTasksByDharma,
        createTask,
    };
});
