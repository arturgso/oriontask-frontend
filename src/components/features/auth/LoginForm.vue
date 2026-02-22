<script setup lang="ts">
import { ref } from 'vue';
import type { LoginProps } from '@/types/Auth';
import { Eye, EyeOff } from 'lucide-vue-next';
import { styles } from '@/styles/DefaultStyles';
import { useRouter } from 'vue-router';
import { AuthService } from '@/services/AuthService';
import { toast } from 'vue3-toastify';
import FormInput from '@/components/common/FormInput.vue';

const router = useRouter();
const emit = defineEmits(['forgot-password']);

const form = ref<LoginProps>({
    email: '',
    password: '',
    rememberMe: false,
});

async function submit() {
    const authService = new AuthService();

    try {
        const res = await authService.login(form.value);
        if (res === 200) {
            toast.success('Logado com sucesso');
            setTimeout(() => {
                router.push('/');
            }, 1500);
        }
    } catch (e) {
        toast.error('Email ou senha incorretas');
        console.error(e);
    }
}

const showPassword = ref(false);

function toggleShowPassword() {
    return (showPassword.value = !showPassword.value);
}
</script>

<template>
    <form class="flex flex-col gap-4 w-full" @submit.prevent="submit">
        <FormInput
            id="email"
            v-model="form.email"
            type="email"
            label="Email"
            placeholder="johndoe@mail.com"
            autocapitalize="none"
            required
        />
        <div class="flex flex-col gap-2 relative">
            <label
                class="text-xs font-medium uppercase tracking-wide text-text-secondary"
                for="password"
            >
                Senha
            </label>
            <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                :class="`${styles.input.defaultInput} bg-card rounded-sm px-3 py-2.5 pr-10 focus:outline-none focus:ring-0 focus:border-accent`"
                placeholder="************"
                required
            />
            <button
                type="button"
                class="absolute right-2.5 top-9 cursor-pointer text-text-muted hover:text-text-primary transition-colors"
                @click="toggleShowPassword"
            >
                <Eye v-if="showPassword" :size="18" />
                <EyeOff v-else :size="18" />
            </button>
        </div>

        <div class="flex items-center justify-between gap-6 text-sm">
            <div class="flex gap-2 items-center">
                <input
                    id="rememberMe"
                    v-model="form.rememberMe"
                    type="checkbox"
                    class="h-4 w-4 rounded-sm border-border text-accent focus:ring-0"
                />
                <label class="text-text-secondary" for="rememberMe">Lembrar de mim</label>
            </div>
            <button
                type="button"
                @click="$emit('forgot-password')"
                class="whitespace-nowrap cursor-pointer text-text-secondary hover:text-text-primary transition-colors bg-transparent border-none p-0"
            >
                Esqueceu a senha?
            </button>
        </div>
        <button
            type="submit"
            class="bg-accent p-2.5 rounded-sm mt-1 text-white font-medium cursor-pointer transition-colors duration-150 hover:bg-accent-hover"
        >
            Entrar
        </button>
    </form>
</template>
