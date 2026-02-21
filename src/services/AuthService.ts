import api from '@/Api';
import type { LoginProps, SignupProps } from '@/types/Auth';
import type { AxiosResponse } from 'axios';
import Cookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

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

    private setAuthCookie(token: string): void {
        try {
            const decoded = jwtDecode<{ sub: string; exp?: number; iat?: number }>(token);
            const expires = decoded.exp ? new Date(decoded.exp * 1000) : undefined;
            const secure = window.location.protocol === 'https:';

            Cookie.set('access_token', token, { expires, path: '/', sameSite: 'Lax', secure });
            Cookie.set('uid', decoded.sub, { expires, path: '/', sameSite: 'Lax', secure });
        } catch {
            const secure = window.location.protocol === 'https:';
            Cookie.set('access_token', token, { path: '/', sameSite: 'Lax', secure });
        }
    }

    async signup(form: SignupProps): Promise<number> {
        const res = await api.post('/auth/signup', {
            name: form.name,
            email: form.email,
            password: form.password,
        });

        if (res.status !== 201) {
            throw new Error('Failed to signup');
        }

        const token = this.extractTokenFromResponse(res);
        if (token) this.setAuthCookie(token);
        return res.status;
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

        this.setAuthCookie(token);

        return res.status;
    }

    async logout(): Promise<void> {
        try {
            await api.post('/auth/logout');
        } finally {
            Cookie.remove('access_token');
            Cookie.remove('uid');
            Cookie.remove('uname');
        }
    }

    async validateToken(): Promise<boolean> {
        const token = Cookie.get('access_token');

        if (!token) {
            return false;
        }

        try {
            const res = await api.post('/auth/validate', undefined, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return res.status === 200 || res.status === 204;
        } catch {
            return false;
        }
    }
}
