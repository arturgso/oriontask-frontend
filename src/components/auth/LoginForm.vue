<script setup lang="ts">
import {ref} from "vue";
import type {LoginProps} from "../../types/Auth.ts";
import {Eye, EyeOff} from "lucide-vue-next";
import {styles} from "../../styles/DefaultStyles.ts";
import {useRouter} from "vue-router";
import { AuthService } from "../../services/AuthService.ts";

const router = useRouter();

const form = ref<LoginProps>({
  login: '',
  password: '',
  rememberMe: false,
})

async function submit() {
  const authService = new AuthService();

  try {
   const res = await authService.login(form.value);
   if (res === 200) {
    alert("Logado com sucesso");
     setTimeout(() => {
       router.push("/")
     }, 1500)
   }
  } catch (e) {
    console.error(e);
  }
}

const showPassword = ref(false);

function toggleShowPassword() {
  return showPassword.value = !showPassword.value;
}
</script>

<template>
  <form @submit.prevent="submit" class="flex flex-col gap-3">
    <div class="flex flex-col gap-2">
      <label form="username">Nome de usuário</label>
      <input
          id="username"
          type="text"
          v-model="form.login"
          :class="styles.defaultInput"
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
          :class="styles.defaultInput"
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
</template>