<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AuthService } from '@/services/AuthService';
import { toast } from 'vue3-toastify';
import { Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-vue-next';
import { styles } from '@/styles/DefaultStyles';
import PasswordValidator from '@/components/features/auth/PasswordValidator.vue';
import { isAxiosError } from 'axios';
import type { BackendValidationError } from '@/types/Auth';

const route = useRoute();
const router = useRouter();
const authService = new AuthService();

const token = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const isPasswordValid = ref(false);
const loading = ref(false);
const success = ref(false);

onMounted(() => {
    token.value = (route.query.token as string) || '';
    if (!token.value) {
        toast.error('Token de recuperação não encontrado.');
        router.push('/auth');
    }
});

function toggleShowPassword() {
    showPassword.value = !showPassword.value;
}

async function submit() {
    if (!isPasswordValid.value) return;
    if (password.value !== confirmPassword.value) {
        toast.error('As senhas não coincidem.');
        return;
    }

    loading.value = true;
    try {
        await authService.resetPassword({
            token: token.value,
            newPassword: password.value,
        });
        success.value = true;
        toast.success('Senha redefinida com sucesso!');
    } catch (e) {
        let message = 'Erro ao redefinir senha';

        if (isAxiosError<BackendValidationError>(e)) {
            const data = e.response?.data;
            if (data?.error === 'Validation Failed' && data.errors) {
                const firstError = Object.values(data.errors)[0] as string;
                toast.error(firstError);
                return;
            }
            message = data?.message || message;
        }

        toast.error(
            message === 'Invalid or expired password reset token'
                ? 'Token inválido ou expirado'
                : message,
        );
        console.error(e);
    } finally {
        loading.value = false;
    }
}

function goToLogin() {
    router.push('/auth');
}
</script>

<template>
    <main class="min-h-screen bg-background flex items-center justify-center px-4">
        <div
            class="w-full max-w-md border border-border rounded-md bg-card p-8 flex flex-col gap-6"
        >
            <div class="flex flex-col items-center gap-2">
                <img src="/logo.svg" class="w-10 dark:invert" />
                <h1 class="text-text-primary text-2xl font-semibold tracking-tight">OrionTask</h1>
                <p class="text-text-secondary text-sm">Redefinir sua senha</p>
            </div>

            <div v-if="success" class="flex flex-col items-center gap-6 py-4 text-center">
                <div
                    class="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center"
                >
                    <CheckCircle2 class="w-10 h-10 text-emerald-500" />
                </div>
                <div class="flex flex-col gap-2">
                    <h2 class="text-xl font-semibold text-text-primary">Tudo certo!</h2>
                    <p class="text-text-secondary leading-relaxed">
                        Sua senha foi redefinida com sucesso. Agora você já pode acessar sua conta.
                    </p>
                </div>
                <button
                    class="w-full bg-accent text-white font-medium py-2.5 rounded-sm hover:bg-accent-hover transition-colors"
                    @click="goToLogin"
                >
                    Ir para o Login
                </button>
            </div>

            <form v-else class="flex flex-col gap-5" @submit.prevent="submit">
                <div class="relative flex flex-col gap-1.5">
                    <label class="text-xs font-medium uppercase tracking-wide text-text-secondary">
                        Nova Senha
                    </label>
                    <div class="relative">
                        <input
                            v-model="password"
                            :type="showPassword ? 'text' : 'password'"
                            :class="`${styles.input.defaultInput} bg-card rounded-sm px-3 py-2.5 pr-10 focus:outline-none focus:ring-0 focus:border-accent w-full`"
                            placeholder="************"
                            required
                        />
                        <button
                            type="button"
                            class="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer text-text-muted hover:text-text-primary transition-colors"
                            @click="toggleShowPassword"
                        >
                            <Eye v-if="showPassword" :size="18" />
                            <EyeOff v-else :size="18" />
                        </button>
                    </div>
                </div>

                <div class="flex flex-col gap-1.5">
                    <label class="text-xs font-medium uppercase tracking-wide text-text-secondary">
                        Confirmar Nova Senha
                    </label>
                    <input
                        v-model="confirmPassword"
                        :type="showPassword ? 'text' : 'password'"
                        :class="`${styles.input.defaultInput} bg-card rounded-sm px-3 py-2.5 focus:outline-none focus:ring-0 focus:border-accent w-full`"
                        placeholder="************"
                        required
                    />
                </div>

                <PasswordValidator
                    :password="password"
                    @update:is-valid="isPasswordValid = $event"
                />

                <button
                    type="submit"
                    :disabled="loading || !isPasswordValid"
                    class="bg-accent p-2.5 rounded-sm mt-1 text-white font-medium hover:bg-accent-hover transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <Loader2 v-if="loading" class="w-5 h-5 animate-spin" />
                    {{ loading ? 'Redefinindo...' : 'Redefinir Senha' }}
                </button>
            </form>
        </div>
    </main>
</template>
