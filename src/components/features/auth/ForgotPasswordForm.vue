<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft, Send } from 'lucide-vue-next';
import { toast } from 'vue3-toastify';
import FormInput from '@/components/common/FormInput.vue';

const emit = defineEmits(['back']);

const email = ref('');
const loading = ref(false);
const sent = ref(false);

async function submit() {
    if (!email.value) return;

    loading.value = true;
    try {
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        sent.value = true;
        toast.success('Email de recuperação enviado!');
    } catch (e) {
        toast.error('Erro ao enviar email de recuperação');
        console.error(e);
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div v-if="!sent" class="flex flex-col gap-4">
            <p class="text-text-secondary text-sm leading-relaxed">
                Insira seu email abaixo para receber as instruções de recuperação de senha.
            </p>

            <form class="flex flex-col gap-4" @submit.prevent="submit">
                <FormInput
                    id="email"
                    v-model="email"
                    type="email"
                    label="Email"
                    placeholder="johndoe@mail.com"
                    autocapitalize="none"
                    required
                />

                <button
                    type="submit"
                    :disabled="loading"
                    class="bg-accent p-2.5 rounded-sm mt-1 text-white font-medium cursor-pointer transition-all duration-150 hover:bg-accent-hover flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    <Send v-if="!loading" :size="18" />
                    <div
                        v-else
                        class="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                    ></div>
                    {{ loading ? 'Enviando...' : 'Enviar link de recuperação' }}
                </button>
            </form>
        </div>

        <div v-else class="flex flex-col items-center gap-4 py-4 text-center">
            <div
                class="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-2"
            >
                <Send :size="24" />
            </div>
            <h3 class="text-text-primary font-semibold text-lg">Email Enviado!</h3>
            <p class="text-text-secondary text-sm leading-relaxed">
                Enviamos um link de recuperação para <strong>{{ email }}</strong
                >. Por favor, verifique sua caixa de entrada e spam.
            </p>
            <button
                class="text-accent text-sm font-medium hover:underline mt-2"
                @click="sent = false"
            >
                Tentar outro email
            </button>
        </div>

        <button
            type="button"
            class="flex items-center justify-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
            @click="emit('back')"
        >
            <ArrowLeft :size="16" />
            Voltar para o login
        </button>
    </div>
</template>
