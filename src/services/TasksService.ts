import api from '@/Api';
import type { NewTaskProps, TaskUpdateProps, Tasks } from '@/types/Tasks';
import type { TaskStatus } from '@/types/Types';
export class TasksService {
    private readonly TASKS_ENDPOINT = '/tasks';

    private unwrapTasksResponse(data: unknown): Tasks[] {
        if (Array.isArray(data)) {
            return data as Tasks[];
        }

        if (
            data &&
            typeof data === 'object' &&
            Array.isArray((data as { content?: unknown[] }).content)
        ) {
            return (data as { content: Tasks[] }).content;
        }

        return [];
    }

    async create(form: NewTaskProps, dharmaId: number | null): Promise<Tasks> {
        if (dharmaId == null) {
            throw new Error('id not defined');
        }

        try {
            const res = await api.post(
                this.TASKS_ENDPOINT,
                {
                    ...form,
                    dharmasId: dharmaId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error('Error while creating task');
        }
    }

    async fetchByDharma(dharmaId: number, page = 0, size = 20): Promise<Tasks[]> {
        if (dharmaId == null) {
            throw new Error('id not defined');
        }

        try {
            const res = await api.get(this.TASKS_ENDPOINT, {
                params: {
                    dharmaId,
                    page,
                    size,
                },
            });

            return this.unwrapTasksResponse(res.data);
        } catch (e) {
            console.error(e);
            throw new Error('Error while fetching tasks');
        }
    }

    async listAllUserTasks(page = 0, size = 20): Promise<Tasks[]> {
        try {
            const res = await api.get(this.TASKS_ENDPOINT, {
                params: {
                    page,
                    size,
                },
            });

            return this.unwrapTasksResponse(res.data);
        } catch (e) {
            console.error(e);
            throw new Error('Error while fetching user tasks');
        }
    }

    async fetchTasksByStatus(status: TaskStatus, page = 0, size = 20): Promise<Tasks[]> {
        try {
            const res = await api.get(this.TASKS_ENDPOINT, {
                params: {
                    status,
                    page,
                    size,
                },
            });

            return this.unwrapTasksResponse(res.data);
        } catch (e) {
            console.error(e);
            throw new Error('Error while fetching user tasks');
        }
    }

    async update(taskId: number, form: TaskUpdateProps): Promise<Tasks> {
        try {
            const res = await api.patch(`${this.TASKS_ENDPOINT}/${taskId}`, form, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error('Error while updating task');
        }
    }

    async moveToNow(taskId: number): Promise<Tasks> {
        try {
            const res = await api.patch(`${this.TASKS_ENDPOINT}/${taskId}/now`, null);

            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error('Error while moving task to NOW');
        }
    }

    async snooze(taskId: number): Promise<Tasks> {
        try {
            const res = await api.patch(`${this.TASKS_ENDPOINT}/${taskId}/snooze`, null);

            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error('Error while snoozing task');
        }
    }

    async changeStatus(taskId: number, status: TaskStatus): Promise<Tasks> {
        try {
            const res = await api.patch(`${this.TASKS_ENDPOINT}/${taskId}/change-status`, null, {
                params: { status },
            });

            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error('Error while changing task status');
        }
    }

    async done(taskId: number): Promise<Tasks> {
        try {
            const res = await api.patch(`${this.TASKS_ENDPOINT}/${taskId}/done`, null);

            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error('Error while completing task');
        }
    }

    async delete(taskId: number): Promise<void> {
        try {
            await api.delete(`${this.TASKS_ENDPOINT}/${taskId}`);
        } catch (e) {
            console.error(e);
            throw new Error('Error while deleting task');
        }
    }
}
