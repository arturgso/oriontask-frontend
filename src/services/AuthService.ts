import api from "../Api";
import type { AuthResponse, LoginProps, SignupProps } from "../types/Auth";
import Cookie from "js-cookie";

export class AuthService {
    async signup(form: SignupProps): Promise<number> {
        const res = await api.post('/auth/signup', form);

        if (res.status !== 201) {
            throw new Error('Failed to signup');
        }

        const data = res.data as AuthResponse;

        Cookie.set('access_token', data.token);
        return res.status;
    }

    async login(form: LoginProps): Promise<number> {
        const res = await api.post("/auth/login", form, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (res.status !== 200) {
            throw new Error('Failed to login');
        }
        
        const data = res.data as AuthResponse;

        Cookie.set('access_token', data.token);
        return res.status;
    }

    async logout(): Promise<void> {
        try {
            await api.post("/auth/logout");
        } finally {
            Cookie.remove('access_token');
            Cookie.remove('uid');
            Cookie.remove('uname');
        }
    }

    async validateToken(): Promise<boolean> {
        const token = Cookie.get('access_token');
        if (!token) return false;

        try {
            const res = await api.post("/auth/validate", null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return res.status === 200;
        } catch {
            return false;
        }
    }
}