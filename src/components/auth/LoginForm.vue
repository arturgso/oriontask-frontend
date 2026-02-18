<script setup lang="ts">
import { ref } from 'vue';
import type { LoginProps } from '@/types/Auth';
import { Eye, EyeOff } from 'lucide-vue-next';
import { styles } from '@/styles/DefaultStyles';
import { useRouter } from 'vue-router';
import { AuthService } from '@/services/AuthService';
import { toast } from 'vue3-toastify';

const router = useRouter();

const form = ref<LoginProps>({
    login: '',
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
    <form class="flex flex-col gap-3 w-full" @submit.prevent="submit">
        <div class="flex flex-col gap-2">
            <label form="username">Nome de usuário</label>
            <input
                id="username"
                v-model="form.login"
                type="text"
                autocapitalize="none"
                :class="styles.input.defaultInput"
                placeholder="johndoe"
                required
            />
        </div>
        <div class="flex flex-col gap-2 relative">
            <label form="password">Senha</label>
            <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                :class="styles.input.defaultInput"
                placeholder="************"
                required
            />
            <button
                type="button"
                :onclick="toggleShowPassword"
                class="absolute right-2 top-10 cursor-pointer"
            >
                <Eye v-if="showPassword" />
                <EyeOff v-else />
            </button>
        </div>

        <div class="flex items-center justify-between gap-12 text-sm">
            <div class="flex gap-2 items-center">
                <input id="rememberMe" v-model="form.rememberMe" type="checkbox" />
                <label form="rememberMe">Lembrar de mim</label>
            </div>
            <a class="whitespace-nowrap cursor-pointer hover:underline"> Esqueceu a senha? </a>
        </div>
        <button
            type="submit"
            class="bg-accent p-2 rounded-md mt-2 text-white font-bold hover:bg-accent-hover cursor-pointer transition duration-150"
        >
            Entrar
        </button>
    </form>
</template>
