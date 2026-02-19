import api from '@/Api';
import type { NewTaskProps, Tasks } from '@/types/Tasks';
import { getCookie } from '@/utils/AuthUtils';

export class TasksService {
    private token = getCookie('access_token');
    private uid = getCookie('uid');
    private TASKS_ENDPOINT = '/tasks';

    async create(form: NewTaskProps, dharmaId: number | null): Promise<Tasks> {
        if (dharmaId === null) {
            throw new Error('id not defined');
        }

        try {
            const res = await api.post(`${this.TASKS_ENDPOINT}/${dharmaId}/create`, form, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.token}`,
                },
            });

            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error('Error while creating task');
        }
    }

    async listAllUserTasks(): Promise<Tasks[]> {
        try {
            const res = await api.get(`${this.TASKS_ENDPOINT}/user/${this.uid}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });

            return res.data.content;
        } catch (e) {
            console.error(e);
            throw new Error('Error while fetching user tasks');
        }
    }

    async fetchTasksByStatus(status: string): Promise<Tasks[]> {
        try {
            const res = await api.get(`${this.TASKS_ENDPOINT}/user/${this.uid}/status/${status}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });

            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error('Error while fetching user tasks');
        }
    }
}
