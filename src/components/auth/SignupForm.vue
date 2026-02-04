<script setup lang="ts">
import {ref} from "vue";
import {Eye, EyeOff} from "lucide-vue-next";
import {styles} from "../../styles/DefaultStyles.ts";
import type {SignupProps} from "../../types/Auth.ts";

const form = ref<SignupProps>({
  name: '',
  email: '',
  username: '',
  password: '',
})

function submit() {
  console.log(form.value);
}

const showPassword = ref(false);

function toggleShowPassword() {
  return showPassword.value = !showPassword.value;
}

</script>

<template>
  <form @submit.prevent="submit" class="flex flex-col gap-3">
    <div class="flex flex-col gap-2">
      <label form="name">Nome</label>
      <input
          id="name"
          type="text"
          v-model="form.name"
          :class="styles.defaultInput"
          placeholder="John Doe"
          required
      />
    </div>
    <div class="flex flex-col gap-2">
      <label form="username">Nome de usuário</label>
      <input
          id="username"
          type="text"
          v-model="form.username"
          :class="styles.defaultInput"
          placeholder="johndoe"
          required
      />
    </div>

    <div class="flex flex-col gap-2">
      <label form="email">Email</label>
      <input
          id="email"
          type="email"
          v-model="form.email"
          :class="styles.defaultInput"
          placeholder="johndoe@mail.com"
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
    <button type="submit" class="bg-accent p-2 rounded-md mt-2 text-white font-bold hover:bg-accent-hover cursor-pointer transition duration-150">
      Cadastrar
    </button>
  </form>
</template>