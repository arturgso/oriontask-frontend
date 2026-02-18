import api from '@/Api';
import type { Dharma, NewDharmaProps } from '@/types/Dharma';
import { getCookie } from '@/utils/AuthUtils';

export class DharmaService {
    userId = getCookie('uid');
    token = getCookie('access_token');

    async create(form: NewDharmaProps): Promise<Dharma> {
        try {
            const res = await api.post(`/dharmas/${this.userId}/create`, form, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.token}`,
                },
            });

            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error('Error while creating dharma');
        }
    }

    async getUserDharmas(): Promise<Dharma[]> {
        const res = await api.get(`/dharmas/user/${this.userId}`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });

        return res.data as Dharma[];
    }
}
