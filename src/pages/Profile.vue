<script setup lang="ts">
import Layout from '@/components/ui/Layout.vue';
import { UsersService } from '@/services/UsersService';
import type { UpdateUserProfileProps } from '@/types/User';
import { UserRound } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';

const usersService = new UsersService();
const loading = ref(false);
const saving = ref(false);

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
                <div class="flex flex-col gap-2">
                    <label
                        class="text-xs font-medium uppercase tracking-wide text-text-secondary"
                        for="profile-name"
                    >
                        Nome
                    </label>
                    <input
                        id="profile-name"
                        v-model="form.name"
                        type="text"
                        minlength="3"
                        maxlength="50"
                        required
                        class="p-2 border border-border bg-card rounded-sm px-3 py-2.5 focus:outline-none focus:ring-0 focus:border-accent"
                    />
                </div>

                <div class="flex flex-col gap-2">
                    <label
                        class="text-xs font-medium uppercase tracking-wide text-text-secondary"
                        for="profile-email"
                    >
                        Email
                    </label>
                    <input
                        id="profile-email"
                        v-model="form.email"
                        type="email"
                        required
                        class="p-2 border border-border bg-card rounded-sm px-3 py-2.5 focus:outline-none focus:ring-0 focus:border-accent"
                    />
                </div>

                <button
                    type="submit"
                    :disabled="!canSave"
                    class="mt-1 p-2.5 rounded-sm bg-accent text-white font-medium hover:bg-accent-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {{ saving ? 'Salvando...' : 'Salvar alterações' }}
                </button>
            </form>
        </section>
    </Layout>
</template>
