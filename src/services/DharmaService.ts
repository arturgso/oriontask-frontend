import api from '@/Api';
import type { Dharma, NewDharmaProps } from '@/types/Dharma';
export class DharmaService {
    private unwrapDharmasResponse(data: unknown): Dharma[] {
        if (Array.isArray(data)) {
            return data as Dharma[];
        }

        if (
            data &&
            typeof data === 'object' &&
            Array.isArray((data as { content?: unknown[] }).content)
        ) {
            return (data as { content: Dharma[] }).content;
        }

        return [];
    }

    async create(form: NewDharmaProps): Promise<Dharma> {
        try {
            const res = await api.post(`/dharmas`, form, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error('Error while creating dharma');
        }
    }

    async getUserDharmas(): Promise<Dharma[]> {
        const res = await api.get(`/dharmas`);

        return this.unwrapDharmasResponse(res.data);
    }
}
