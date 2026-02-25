import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const accessToken = ref<string | null>(null);
    const lastValidated = ref<number>(0);

    const isAuthenticated = computed(() => accessToken.value !== null);

    function setToken(token: string) {
        accessToken.value = token;
        lastValidated.value = Date.now();
    }

    function setLastValidated() {
        lastValidated.value = Date.now();
    }

    function clearAuth() {
        accessToken.value = null;
        lastValidated.value = 0;
    }

    return {
        accessToken,
        isAuthenticated,
        lastValidated,
        setToken,
        setLastValidated,
        clearAuth,
    };
});
