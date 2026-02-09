import api from "../Api";
import type { AuthResponse, SignupProps } from "../types/Auth";
import Cookie from "js-cookie";

export class AuthService {
    async signup(form: SignupProps): Promise<number> {
        const res = await api.post('/auth/signup', form);

        if (res.status !== 201) {
            throw new Error('Failed to signup');
        }

        const data = res.data as AuthResponse;

        Cookie.set('access_token', data.token);
        localStorage.setItem('user', JSON.stringify({
            id: data.id,
            username: data.username,
            name: data.name,
        }));
        return res.status;
    }
}