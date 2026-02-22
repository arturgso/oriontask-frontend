<script setup lang="ts">
import { ref } from 'vue';
import { Eye, EyeOff } from 'lucide-vue-next';
import { styles } from '@/styles/DefaultStyles';
import type { SignupProps } from '@/types/Auth';
import { AuthService } from '@/services/AuthService';
import { toast } from 'vue3-toastify';
import PasswordValidator from './PasswordValidator.vue';
import FormInput from '@/components/common/FormInput.vue';
import SignupSuccess from './SignupSuccess.vue';

const form = ref<SignupProps>({
    name: '',
    email: '',
    password: '',
});
const isPasswordValid = ref(false);
const isSignedUp = ref(false);

async function submit() {
    if (!isPasswordValid.value) {
        return;
    }

    const authService = new AuthService();

    try {
        const response = await authService.signup(form.value);

        if (response.id) {
            isSignedUp.value = true;
            toast.success('Cadastro realizado com sucesso!');
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
    <SignupSuccess v-if="isSignedUp" :email="form.email" @back="isSignedUp = false" />
    <form v-else class="flex flex-col gap-4 w-full" @submit.prevent="submit">
        <FormInput id="name" v-model="form.name" label="Nome" placeholder="John Doe" required />
        <FormInput
            id="email"
            v-model="form.email"
            type="email"
            label="Email"
            placeholder="johndoe@mail.com"
            autocapitalize="none"
            required
        />
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
