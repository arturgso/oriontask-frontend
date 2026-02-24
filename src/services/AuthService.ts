import api from '@/Api';
import type {
    ForgotPasswordProps,
    LoginProps,
    ResetPasswordProps,
    SignupProps,
    SignupResponse,
} from '@/types/Auth';
import type { AxiosResponse } from 'axios';
import { useAuthStore } from '@/stores/AuthStore';

export class AuthService {
    private extractTokenFromResponse(response: AxiosResponse): string | null {
        const { data, headers } = response;

        if (typeof data === 'string' && data.trim().length > 0) {
            return data.trim();
        }

        if (data && typeof data === 'object') {
            const obj = data as {
                token?: string;
                accessToken?: string;
                data?: { token?: string; accessToken?: string };
            };

            if (obj.token) return obj.token;
            if (obj.accessToken) return obj.accessToken;
            if (obj.data?.token) return obj.data.token;
            if (obj.data?.accessToken) return obj.data.accessToken;
        }

        const authHeader = headers?.authorization ?? headers?.Authorization;
        if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
            return authHeader.replace(/^Bearer\s+/i, '').trim();
        }

        return null;
    }

    async signup(form: SignupProps): Promise<SignupResponse> {
        const res = await api.post<SignupResponse>('/auth/signup', {
            name: form.name,
            email: form.email,
            password: form.password,
        });

        if (res.status !== 201) {
            throw new Error('Failed to signup');
        }

        return res.data;
    }

    async login(form: LoginProps): Promise<number> {
        const res = await api.post(
            '/auth/login',
            {
                email: form.email,
                password: form.password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        if (res.status !== 200) {
            throw new Error('Failed to login');
        }

        const token = this.extractTokenFromResponse(res);
        if (!token) {
            throw new Error('Token not found in login response');
        }

        const authStore = useAuthStore();
        authStore.setToken(token);

        return res.status;
    }

    async logout(): Promise<void> {
        try {
            await api.post('/auth/logout');
        } finally {
            const authStore = useAuthStore();
            authStore.clearAuth();
            localStorage.clear();
        }
    }

    async confirmEmail(token: string): Promise<void> {
        await api.post(`/auth/confirm-email?token=${token}`);
    }

    async forgotPassword(data: ForgotPasswordProps): Promise<void> {
        await api.post('/auth/forgot-password', data);
    }

    async resetPassword(data: ResetPasswordProps): Promise<void> {
        await api.post('/auth/reset-password', data);
    }

    async validateToken(): Promise<boolean> {
        try {
            const res = await api.post('/auth/validate');

            if (res.status === 200 || res.status === 204) {
                const token = this.extractTokenFromResponse(res);
                if (token) {
                    const authStore = useAuthStore();
                    authStore.setToken(token);
                }
                return true;
            }
            return false;
        } catch {
            return false;
        }
    }
}
