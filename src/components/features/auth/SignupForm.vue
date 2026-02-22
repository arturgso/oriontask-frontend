<script setup lang="ts">
import { ref } from 'vue';
import { Eye, EyeOff } from 'lucide-vue-next';
import { styles } from '@/styles/DefaultStyles';
import type { SignupProps } from '@/types/Auth';
import { AuthService } from '@/services/AuthService';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import PasswordValidator from './PasswordValidator.vue';

const form = ref<SignupProps>({
    name: '',
    email: '',
    password: '',
});
const router = useRouter();

const isPasswordValid = ref(false);

async function submit() {
    if (!isPasswordValid.value) {
        return;
    }

    const authService = new AuthService();

    try {
        const signupStatus = await authService.signup(form.value);

        if (signupStatus === 201) {
            const loginStatus = await authService.login({
                email: form.value.email,
                password: form.value.password,
                rememberMe: false,
            });

            if (loginStatus === 200) {
                toast.success('Cadastro realizado e login efetuado');
                setTimeout(() => {
                    router.push('/');
                }, 1500);
            }
        }
    } catch (error) {
        toast.error('Ocorreu um erro ao realizar o cadastro. Por favor, tente novamente.');
        console.error(error);
    }
}

const showPassword = ref(false);

function toggleShowPassword() {
    return (showPassword.value = !showPassword.value);
}
</script>

<template>
    <form class="flex flex-col gap-4 w-full" @submit.prevent="submit">
        <div class="flex flex-col gap-2">
            <label
                class="text-xs font-medium uppercase tracking-wide text-text-secondary"
                form="name"
            >
                Nome
            </label>
            <input
                id="name"
                v-model="form.name"
                type="text"
                :class="`${styles.input.defaultInput} bg-card rounded-sm px-3 py-2.5 focus:outline-none focus:ring-0 focus:border-accent`"
                placeholder="John Doe"
                required
            />
        </div>
        <div class="flex flex-col gap-2">
            <label
                class="text-xs font-medium uppercase tracking-wide text-text-secondary"
                form="email"
            >
                Email
            </label>
            <input
                id="email"
                v-model="form.email"
                type="email"
                autocapitalize="none"
                :class="`${styles.input.defaultInput} bg-card rounded-sm px-3 py-2.5 focus:outline-none focus:ring-0 focus:border-accent`"
                placeholder="johndoe@mail.com"
                required
            />
        </div>
        <div class="relative" :class="styles.input.inputDiv">
            <label
                class="text-xs font-medium uppercase tracking-wide text-text-secondary"
                form="password"
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

        <PasswordValidator :password="form.password" @update:is-valid="isPasswordValid = $event" />

        <button
            type="submit"
            class="bg-accent p-2.5 rounded-sm mt-1 text-white font-medium hover:bg-accent-hover cursor-pointer transition-colors duration-150"
        >
            Cadastrar
        </button>
    </form>
</template>
