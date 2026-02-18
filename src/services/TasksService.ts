import api from '@/Api';
import type { NewTaskProps, Tasks } from '@/types/Tasks';
import { getCookie } from '@/utils/AuthUtils';

export class TasksService {
    private token = getCookie('access_token');
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
}
