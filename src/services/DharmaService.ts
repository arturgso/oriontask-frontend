import api from '@/Api';
import type { Dharma, NewDharmaProps } from '@/types/Dharma';
import Cookies from 'js-cookie';

export class DharmaService {
    async create(form: NewDharmaProps): Promise<Dharma> {
        const userId = this.getUserId();
        const token = this.getToken();

        try {
            const res = await api.post(`/dharma/${userId}/create`, form, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error('Error while creating dharma');
        }
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
