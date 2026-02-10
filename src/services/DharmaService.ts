import api from '@/Api';
import type { Dharma, NewDharmaProps } from '@/types/Dharma';
import Cookies from 'js-cookie';

export class DharmaService {
    userId = this.getUserId();
    token = this.getToken();

    async create(form: NewDharmaProps): Promise<Dharma> {
        try {
            const res = await api.post(`/dharma/${this.userId}/create`, form, {
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
        const res = await api.get(`/dharma/user/${this.userId}`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });

        return res.data as Dharma[];
    }

    private getUserId(): string {
        const uid = Cookies.get('uid');

        if (!uid) throw new Error('User not Authenticated');

        return uid;
    }

    private getToken(): string {
        const token = Cookies.get('access_token');

        if (!token) throw new Error('User not Authenticated');

        return token;
    }
}
