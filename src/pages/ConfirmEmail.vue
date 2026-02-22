<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AuthService } from '@/services/AuthService';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const authService = new AuthService();

const status = ref<'loading' | 'success' | 'error'>('loading');
const message = ref('Confirmando seu e-mail...');

onMounted(async () => {
    const token = route.query.token as string;

    if (!token) {
        status.value = 'error';
        message.value = 'Token de confirmação não encontrado.';
        return;
    }

    try {
        await authService.confirmEmail(token);
        status.value = 'success';
        message.value = 'E-mail confirmado com sucesso! Agora você já pode fazer login.';
    } catch (error) {
        status.value = 'error';
        message.value =
            'Ocorreu um erro ao confirmar seu e-mail. O link pode ter expirado ou ser inválido.';
        console.error(error);
    }
});

function goToLogin() {
    router.push('/auth');
}
</script>

<template>
    <main class="min-h-screen bg-background flex items-center justify-center px-4">
        <div
            class="w-full max-w-md border border-border rounded-md bg-card p-8 flex flex-col items-center text-center gap-6"
        >
            <div class="flex flex-col items-center gap-2 mb-2">
                <img src="/logo.svg" class="w-12 dark:invert" alt="OrionTask Logo" />
                <h1 class="text-text-primary text-2xl font-bold tracking-tight">OrionTask</h1>
            </div>

            <div v-if="status === 'loading'" class="flex flex-col items-center gap-4 py-4">
                <Loader2 class="w-12 h-12 text-accent animate-spin" />
                <p class="text-text-secondary font-medium">{{ message }}</p>
            </div>

            <div v-else-if="status === 'success'" class="flex flex-col items-center gap-4 py-4">
                <div
                    class="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center"
                >
                    <CheckCircle2 class="w-10 h-10 text-emerald-500" />
                </div>
                <h2 class="text-xl font-semibold text-text-primary">E-mail Confirmado!</h2>
                <p class="text-text-secondary">{{ message }}</p>

                <button
                    class="mt-4 w-full bg-accent text-white font-medium py-2.5 rounded-sm hover:bg-accent-hover transition-colors shadow-lg shadow-accent/10"
                    @click="goToLogin"
                >
                    Ir para o Login
                </button>
            </div>

            <div v-else-if="status === 'error'" class="flex flex-col items-center gap-4 py-4">
                <div class="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                    <XCircle class="w-10 h-10 text-red-500" />
                </div>
                <h2 class="text-xl font-semibold text-text-primary">Ops! Algo deu errado</h2>
                <p class="text-text-secondary">{{ message }}</p>

                <button
                    class="mt-4 w-full border border-border text-text-primary font-medium py-2.5 rounded-sm hover:bg-card-hover transition-colors"
                    @click="goToLogin"
                >
                    Voltar para o Início
                </button>
            </div>
        </div>
    </main>
</template>
