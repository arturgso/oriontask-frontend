<script lang="ts" setup>
import { AuthService } from '@/services/AuthService';
import Cookie from 'js-cookie';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import LoginForm from '@/components/features/auth/LoginForm.vue';
import SignupForm from '@/components/features/auth/SignupForm.vue';
import ForgotPasswordForm from '@/components/features/auth/ForgotPasswordForm.vue';

type AuthStep = 'login' | 'signup' | 'forgot-password';

const step = ref<AuthStep>('login');
const router = useRouter();

function setStep(newStep: AuthStep) {
    step.value = newStep;
}

onMounted(async () => {
    const token = Cookie.get('access_token');
    if (!token) return;

    const authService = new AuthService();
    const ok = await authService.validateToken();

    if (ok) {
        router.push('/');
    }
});
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-background px-4">
        <div class="w-full max-w-[26rem] border border-border rounded-md bg-card p-6 md:p-8">
            <div class="flex flex-col items-center gap-2">
                <img src="/logo.svg" class="w-10 dark:invert" />
                <h1 class="text-text-primary text-2xl font-semibold tracking-tight">OrionTask</h1>
                <p class="text-text-secondary text-sm">Tarefas com propósito</p>
            </div>

            <div v-if="step !== 'forgot-password'" class="mt-7 border-b border-border flex">
                <button
                    :class="[
                        'w-1/2 pb-2 text-sm font-medium transition-colors',
                        step === 'login'
                            ? 'text-accent border-b-2 border-accent -mb-px'
                            : 'text-text-secondary hover:text-text-primary',
                    ]"
                    @click="setStep('login')"
                >
                    Entrar
                </button>
                <button
                    :class="[
                        'w-1/2 pb-2 text-sm font-medium transition-colors',
                        step === 'signup'
                            ? 'text-accent border-b-2 border-accent -mb-px'
                            : 'text-text-secondary hover:text-text-primary',
                    ]"
                    @click="setStep('signup')"
                >
                    Cadastrar
                </button>
            </div>

            <div v-else class="mt-10 mb-4 text-center">
                <h2 class="text-text-primary text-xl font-medium">Recuperar senha</h2>
            </div>

            <div class="mt-6">
                <LoginForm v-if="step === 'login'" @forgot-password="setStep('forgot-password')" />
                <SignupForm v-else-if="step === 'signup'" />
                <ForgotPasswordForm v-else @back="setStep('login')" />
            </div>
        </div>
    </div>
</template>
