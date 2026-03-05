<script setup lang="ts">
import type { Dharma, EditDharmaProps } from '@/types/Dharma';
import { ref } from 'vue';
import ColorPicker from './ColorPicker.vue';
import ActionButton from '@/components/common/ActionButton.vue';
import FormInput from '@/components/common/FormInput.vue';
import { Trash } from 'lucide-vue-next';
import { useDharmaStore } from '@/stores/dharmaStore';
import { toast } from 'vue3-toastify';

const props = defineProps<{
    dharma: Dharma;
}>();
const emit = defineEmits<{
    (e: 'success', action: 'updated' | 'deleted'): void;
}>();
const dharmaStore = useDharmaStore();
const loading = ref(false);
const error = ref<string | null>(null);

const form = ref<EditDharmaProps>({
    name: props.dharma.name,
    color: props.dharma.color,
    hidden: props.dharma.hidden,
});

function getErrorMessage(err: unknown, fallback: string): string {
    const maybeError = err as {
        response?: { data?: { message?: string; error?: string } };
        message?: string;
    };

    return (
        maybeError?.response?.data?.message ||
        maybeError?.response?.data?.error ||
        maybeError?.message ||
        fallback
    );
}

async function handleSave() {
    if (loading.value) return;

    loading.value = true;
    error.value = null;

    try {
        await dharmaStore.updateDharma(props.dharma.id, form.value);
        toast.success('Dharma atualizado');
        emit('success', 'updated');
    } catch (err) {
        console.error(err);
        error.value = getErrorMessage(err, 'Não foi possível salvar o dharma');
        toast.error(error.value);
    } finally {
        loading.value = false;
    }
}

async function handleDelete() {
    if (loading.value) return;

    loading.value = true;
    error.value = null;

    try {
        await dharmaStore.deleteDharma(props.dharma.id);
        toast.success('Dharma deletado');
        emit('success', 'deleted');
    } catch (err) {
        console.error(err);
        error.value = getErrorMessage(err, 'Não foi possível deletar o dharma');
        toast.error(error.value);
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <form class="mt-1 flex flex-col gap-4" @submit.prevent="handleSave">
        <FormInput id="dharma-name" v-model="form.name" label="Nome" :placeholder="dharma.name" />
        <ColorPicker v-model:color="form.color" />
        <div class="flex items-center gap-2">
            <ActionButton
                type="submit"
                text="Salvar"
                :disabled="loading"
                extra-class="!rounded-sm !font-medium !text-sm !hover:shadow-none"
            />
            <button
                type="button"
                :disabled="loading"
                class="p-2.5 mt-1 rounded-sm border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                @click="handleDelete"
            >
                <Trash :size="18" />
            </button>
        </div>
        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
    </form>
</template>
