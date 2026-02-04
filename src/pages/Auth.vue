<script lang="ts" setup>
import { Eye, EyeOff } from 'lucide-vue-next';
import {ref} from "vue";

interface LoginProps {
  username: string;
  password: string;
  rememberMe: boolean;
}

const form = ref<LoginProps>({
  username: '',
  password: '',
  rememberMe: false,
})

function submit() {
  console.log(form.value);
}

const showPassword = ref(false);

function toggleShowPassword() {
  return showPassword.value = !showPassword.value;
}

const inputStyle = "p-2 border border-border bg-surface rounded-md";
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-background">
    <div class="bg-card shadow-lg border border-border p-8 rounded-md">
      <form @submit.prevent="submit" class="flex flex-col gap-3">
        <div class="flex flex-col gap-2">
          <label form="username">Nome de usuário</label>
          <input
              id="username"
              type="text"
              v-model="form.username"
              :class="inputStyle"
              placeholder="johndoe"
              required
          />
        </div>
        <div class="flex flex-col gap-2 relative">
          <label form="password">Senha</label>
          <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              :class="inputStyle"
              placeholder="************"
              required
          />
          <button :onclick="toggleShowPassword" class="absolute right-2 top-10 cursor-pointer">
            <Eye v-if="showPassword" />
            <EyeOff v-else />
          </button>
        </div>

        <div class="flex items-center justify-between gap-12">
          <div class="flex gap-2">
            <input
                id="rememberMe"
                type="checkbox"
                v-model="form.rememberMe" />
            <label form="rememberMe">Lembrar de mim</label>
          </div>
          <a>
            Esqueceu a senha?
          </a>
        </div>

        <button type="submit" class="bg-accent p-2 rounded-md mt-2 text-white font-bold hover:bg-accent-hover cursor-pointer transition duration-150">
          Entrar
        </button>
      </form>
    </div>

  </div>

</template>