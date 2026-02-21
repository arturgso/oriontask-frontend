import api from '@/Api';
import type { UpdateUserProfileProps, UserProfile } from '@/types/User';
import { getCookie } from '@/utils/AuthUtils';

export class UsersService {
    private readonly USERS_ENDPOINT = '/users';

    private getAuthHeaders() {
        const token = getCookie('access_token');
        return { Authorization: `Bearer ${token}` };
    }

    async me(): Promise<UserProfile> {
        try {
            const res = await api.get(`${this.USERS_ENDPOINT}/me`, {
                headers: {
                    ...this.getAuthHeaders(),
                },
            });

            return res.data as UserProfile;
        } catch (error) {
            console.error(error);
            throw new Error('Error while fetching current user profile');
        }
    }

    async updateMe(form: UpdateUserProfileProps): Promise<UserProfile> {
        try {
            const res = await api.patch(`${this.USERS_ENDPOINT}/me`, form, {
                headers: {
                    'Content-Type': 'application/json',
                    ...this.getAuthHeaders(),
                },
            });

            return res.data as UserProfile;
        } catch (error) {
            console.error(error);
            throw new Error('Error while updating current user profile');
        }
    }
}
