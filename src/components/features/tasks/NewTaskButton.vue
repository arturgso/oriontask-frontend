<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
import ActionButton from '@/components/common/ActionButton.vue';
import Modal from '@/components/common/modals/Modal.vue';
import FormInput from '@/components/common/FormInput.vue';
import FormSelect from '@/components/common/FormSelect.vue';
import FormTextarea from '@/components/common/FormTextarea.vue';
import { ref, computed } from 'vue';
import type { NewTaskProps } from '@/types/Tasks';
import { EFFORT_LABELS, EFFORT_LEVEL, KARMA_LABELS, KARMA_TYPES } from '@/types/Types';
import { useDharmaStore } from '@/stores/dharmaStore';
import { useTasksStore } from '@/stores/TasksStore';
import { toast } from 'vue3-toastify';

const form = ref<NewTaskProps>({
    title: '',
    description: '',
    effortLevel: 'MEDIUM',
    karmaType: 'ACTION',
});

const DESCRIPTION_LIMIT = 200;
const dharmasStore = useDharmaStore();
const tasksStore = useTasksStore();
const selectedDharma = ref<number | null>(null);

const isModalOpen = ref(false);

function toggleModal() {
    isModalOpen.value = !isModalOpen.value;
}

const dharmaOptions = computed(() =>
    dharmasStore.dharmas.map((d) => ({ value: d.id, label: d.name })),
);

const effortOptions = EFFORT_LEVEL.map((level) => ({ value: level, label: EFFORT_LABELS[level] }));
const karmaOptions = KARMA_TYPES.map((type) => ({ value: type, label: KARMA_LABELS[type] }));

async function handleSubmit() {
    const res = await tasksStore.createTask(form.value, selectedDharma.value);

    if (res) {
        toast.success('Task criado com sucesso');
        isModalOpen.value = false;
    }
}
</script>

<template>
    <ActionButton
        type="button"
        text="Nova task"
        width="auto"
        :icon="Plus"
        extra-class="!bg-accent/10 !text-accent !border !border-accent/30 !rounded-sm !text-sm !font-medium !hover:bg-accent/15 !hover:shadow-none"
        @click="toggleModal"
    />

    <Modal :open="isModalOpen" title="Nova Task" @close="toggleModal">
        <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
            <FormSelect
                id="dharmas"
                v-model="selectedDharma"
                label="Dharmas"
                placeholder="Selecione o Dharma"
                :options="dharmaOptions"
            />

            <FormInput
                id="task-title"
                v-model="form.title"
                label="Título"
                placeholder="Ex: Saúde"
                required
            />

            <FormTextarea
                id="description"
                v-model="form.description"
                label="Descrição"
                placeholder="Digite a descrição"
                :maxlength="DESCRIPTION_LIMIT"
                show-counter
            />

            <FormSelect
                id="effortLevel"
                v-model="form.effortLevel"
                label="Esforço"
                :options="effortOptions"
            />

            <FormSelect
                id="karmaType"
                v-model="form.karmaType"
                label="Karma"
                :options="karmaOptions"
            />
            <ActionButton
                type="submit"
                text="Criar"
                extra-class="mt-2 rounded-sm font-medium text-base hover:shadow-none"
            />
        </form>
    </Modal>
</template>
