import axios from 'axios';
import { useAuthStore } from '@/stores/AuthStore';
import router from '@/router';

const baseurl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
    baseURL: `${baseurl}/api/v1`,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();
        if (authStore.accessToken) {
            config.headers.Authorization = `Bearer ${authStore.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: unknown) => void; reject: (reason?: unknown) => void }> =
    [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            originalRequest.url !== '/auth/validate' &&
            originalRequest.url !== '/auth/login'
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const authStore = useAuthStore();
                const headers: Record<string, string> = {};
                if (authStore.accessToken) {
                    headers['Authorization'] = `Bearer ${authStore.accessToken}`;
                }

                const response = await axios.post(`${baseurl}/api/v1/auth/validate`, undefined, {
                    withCredentials: true,
                    headers,
                });

                const data = response.data as {
                    token?: string;
                    accessToken?: string;
                    data?: { token?: string; accessToken?: string };
                };
                let newToken =
                    data.token || data.accessToken || data.data?.token || data.data?.accessToken;

                // Sometimes the backend uses the header
                if (!newToken) {
                    const authHeader =
                        response.headers?.authorization ?? response.headers?.Authorization;
                    if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
                        newToken = authHeader.replace(/^Bearer\s+/i, '').trim();
                    }
                }

                if (newToken) {
                    authStore.setToken(newToken);
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    processQueue(null, newToken);
                    return api(originalRequest);
                } else {
                    throw new Error('No token in validate response');
                }
            } catch (err) {
                processQueue(err, null);
                const authStore = useAuthStore();
                authStore.clearAuth();
                router.push('/auth');
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);

export default api;
