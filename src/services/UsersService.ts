import api from '@/Api';
import type { UpdateUserProfileProps, UserProfile } from '@/types/User';
export class UsersService {
    private readonly USERS_ENDPOINT = '/users';

    async me(): Promise<UserProfile> {
        try {
            const res = await api.get(`${this.USERS_ENDPOINT}/me`);

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
                },
            });

            return res.data as UserProfile;
        } catch (error) {
            console.error(error);
            throw new Error('Error while updating current user profile');
        }
    }
}
