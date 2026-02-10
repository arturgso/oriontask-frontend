<script setup lang="ts">
import { ref } from 'vue';
import { Eye, EyeOff } from 'lucide-vue-next';
import { styles } from '../../styles/DefaultStyles.ts';
import type { SignupProps } from '../../types/Auth.ts';
import { AuthService } from '../../services/AuthService.ts';

const form = ref<SignupProps>({
    name: '',
    email: '',
    username: '',
    password: '',
});

async function submit() {
    const authService = new AuthService();

    try {
        const res = await authService.signup(form.value);
        if (res === 201) {
            alert('Cadastro realizado com sucesso!');
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        }
    } catch (error) {
        alert('Ocorreu um erro ao realizar o cadastro. Por favor, tente novamente.');
        console.error(error);
    }
}

const showPassword = ref(false);

function toggleShowPassword() {
    return (showPassword.value = !showPassword.value);
}
</script>

<template>
    <form class="flex flex-col gap-3" @submit.prevent="submit">
        <div class="flex flex-col gap-2">
            <label form="name">Nome</label>
            <input
                id="name"
                v-model="form.name"
                type="text"
                :class="styles.defaultInput"
                placeholder="John Doe"
                required
            />
        </div>
        <div class="flex flex-col gap-2">
            <label form="username">Nome de usuário</label>
            <input
                id="username"
                v-model="form.username"
                type="text"
                :class="styles.defaultInput"
                placeholder="johndoe"
                required
            />
        </div>

        <div class="flex flex-col gap-2">
            <label form="email">Email</label>
            <input
                id="email"
                v-model="form.email"
                type="email"
                :class="styles.defaultInput"
                placeholder="johndoe@mail.com"
                required
            />
        </div>
        <div class="flex flex-col gap-2 relative">
            <label form="password">Senha</label>
            <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                :class="styles.defaultInput"
                placeholder="************"
                required
            />
            <button :onclick="toggleShowPassword" class="absolute right-2 top-10 cursor-pointer">
                <Eye v-if="showPassword" />
                <EyeOff v-else />
            </button>
        </div>
        <button
            type="submit"
            class="bg-accent p-2 rounded-md mt-2 text-white font-bold hover:bg-accent-hover cursor-pointer transition duration-150"
        >
            Cadastrar
        </button>
    </form>
</template>
