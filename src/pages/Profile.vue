<script setup lang="ts">
import Layout from '@/components/layout/MainLayout.vue';
import { UsersService } from '@/services/UsersService';
import type { UpdateUserProfileProps } from '@/types/User';
import { UserRound, KeyRound, Loader2 } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';
import FormInput from '@/components/common/FormInput.vue';
import { AuthService } from '@/services/AuthService';

const usersService = new UsersService();
const authService = new AuthService();
const loading = ref(false);
const saving = ref(false);
const resetting = ref(false);

const initial = ref<UpdateUserProfileProps>({
    name: '',
    email: '',
});

const form = ref<UpdateUserProfileProps>({
    name: '',
    email: '',
});

const canSave = computed(() => {
    return (
        !saving.value &&
        !!form.value.name?.trim() &&
        !!form.value.email?.trim() &&
        (form.value.name !== initial.value.name || form.value.email !== initial.value.email)
    );
});

function normalizeFormData() {
    form.value.name = form.value.name?.trim() ?? '';
    form.value.email = form.value.email?.trim() ?? '';
}

async function loadProfile() {
    loading.value = true;

    try {
        const profile = await usersService.me();
        initial.value = { name: profile.name, email: profile.email };
        form.value = { name: profile.name, email: profile.email };
    } catch (error) {
        console.error(error);
        toast.error('Não foi possível carregar o perfil');
    } finally {
        loading.value = false;
    }
}

async function submit() {
    if (!canSave.value) return;

    normalizeFormData();
    saving.value = true;

    try {
        const updated = await usersService.updateMe({
            name: form.value.name,
            email: form.value.email,
        });

        initial.value = { name: updated.name, email: updated.email };
        form.value = { name: updated.name, email: updated.email };
        toast.success('Perfil atualizado com sucesso');
    } catch (error) {
        console.error(error);
        toast.error('Não foi possível atualizar o perfil');
    } finally {
        saving.value = false;
    }
}

async function handleResetPassword() {
    if (!initial.value.email) return;

    resetting.value = true;
    try {
        await authService.forgotPassword({ email: initial.value.email });
        toast.success('Link de redefinição enviado para seu e-mail');
    } catch (error) {
        console.error(error);
        toast.error('Erro ao solicitar redefinição de senha');
    } finally {
        resetting.value = false;
    }
}

onMounted(() => {
    loadProfile();
});
</script>

<template>
    <Layout title="Meu perfil" :icon="UserRound">
        <section class="max-w-xl border border-border rounded-sm bg-card p-4 md:p-5">
            <p class="text-xs text-text-secondary mb-4">Dados da conta</p>

            <p v-if="loading" class="text-sm text-text-secondary">Carregando perfil...</p>

            <form v-else class="flex flex-col gap-4" @submit.prevent="submit">
                <FormInput
                    id="profile-name"
                    v-model="form.name"
                    label="Nome"
                    minlength="3"
                    maxlength="50"
                    required
                />

                <FormInput
                    id="profile-email"
                    v-model="form.email"
                    type="email"
                    label="Email"
                    required
                />

                <button
                    type="submit"
                    :disabled="!canSave"
                    class="mt-1 p-2.5 rounded-sm bg-accent text-white font-medium hover:bg-accent-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {{ saving ? 'Salvando...' : 'Salvar alterações' }}
                </button>
            </form>
        </section>

        <section class="max-w-xl border border-border rounded-sm bg-card p-4 md:p-5 mt-6">
            <div class="flex items-center gap-3 mb-4">
                <KeyRound :size="18" class="text-text-secondary" />
                <h2 class="text-sm font-medium text-text-primary">Segurança</h2>
            </div>

            <p class="text-xs text-text-secondary mb-4 leading-relaxed">
                Para alterar sua senha, enviaremos um link de redefinição para o seu e-mail
                cadastrado.
            </p>

            <button
                type="button"
                :disabled="resetting || loading"
                class="flex items-center justify-center gap-2 p-2.5 rounded-sm border border-border text-text-primary text-sm font-medium hover:bg-surface transition-colors disabled:opacity-50"
                @click="handleResetPassword"
            >
                <Loader2 v-if="resetting" :size="16" class="animate-spin" />
                Solicitar redefinição de senha
            </button>
        </section>
    </Layout>
</template>
