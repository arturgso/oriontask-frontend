<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
import ActionButton from '@/components/common/ActionButton.vue';
import Modal from '@/components/common/modals/Modal.vue';
import { ref } from 'vue';
import { styles } from '@/styles/DefaultStyles';
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
            <div :class="styles.input.inputDiv">
                <label
                    class="text-xs font-medium uppercase tracking-wide text-text-secondary"
                    for="dharmas"
                >
                    Dharmas
                </label>
                <select
                    id="Dharmas"
                    v-model="selectedDharma"
                    :class="`${styles.input.defaultInput} bg-card rounded-sm px-3 py-2.5 focus:outline-none focus:ring-0 focus:border-accent`"
                    class="w-full"
                >
                    <option disabled value="null" hidden>Selecione o Dharma</option>
                    <option
                        v-for="option in dharmasStore.dharmas"
                        :key="option.id"
                        :value="option.id"
                    >
                        {{ option.name }}
                    </option>
                </select>
            </div>

            <div :class="styles.input.inputDiv">
                <label
                    class="text-xs font-medium uppercase tracking-wide text-text-secondary"
                    form="title"
                >
                    Título
                </label>
                <input
                    id="username"
                    v-model="form.title"
                    type="text"
                    required
                    placeholder="Saúde"
                    autocomplete="off"
                    :class="`${styles.input.defaultInput} bg-card rounded-sm px-3 py-2.5 focus:outline-none focus:ring-0 focus:border-accent`"
                />
            </div>
            <div :class="styles.input.inputDiv">
                <label
                    class="text-xs font-medium uppercase tracking-wide text-text-secondary"
                    form="description"
                >
                    Descrição
                </label>
                <textarea
                    id="description"
                    v-model="form.description"
                    :maxlength="DESCRIPTION_LIMIT"
                    :class="`${styles.input.defaultInput} bg-card rounded-sm px-3 py-2.5 focus:outline-none focus:ring-0 focus:border-accent`"
                    autocomplete="off"
                    placeholder="Digite a descrição"
                    class="min-h-28 max-h-28"
                ></textarea>
                <p
                    class="text-end text-sm"
                    :class="
                        (form.description?.length ?? 0) >= DESCRIPTION_LIMIT
                            ? 'text-red-500'
                            : 'text-text-secondary'
                    "
                >
                    {{ form.description?.length ?? 0 }}/{{ DESCRIPTION_LIMIT }}
                </p>
            </div>
            <div :class="styles.input.inputDiv">
                <label
                    class="text-xs font-medium uppercase tracking-wide text-text-secondary"
                    form="effortLevel"
                >
                    Esforço
                </label>
                <select
                    id="effortLevel"
                    v-model="form.effortLevel"
                    :class="`${styles.input.defaultInput} bg-card rounded-sm px-3 py-2.5 focus:outline-none focus:ring-0 focus:border-accent`"
                    class="w-full"
                >
                    <option v-for="option in EFFORT_LEVEL" :key="option" :value="option">
                        {{ EFFORT_LABELS[option] }}
                    </option>
                </select>
            </div>

            <div :class="styles.input.inputDiv">
                <label
                    class="text-xs font-medium uppercase tracking-wide text-text-secondary"
                    form="karmaType"
                >
                    Karma
                </label>
                <select
                    id="karmaType"
                    v-model="form.karmaType"
                    :class="`${styles.input.defaultInput} bg-card rounded-sm px-3 py-2.5 focus:outline-none focus:ring-0 focus:border-accent`"
                    class="w-full"
                >
                    <option v-for="option in KARMA_TYPES" :key="option" :value="option">
                        {{ KARMA_LABELS[option] }}
                    </option>
                </select>
            </div>
            <ActionButton
                type="submit"
                text="Criar"
                extra-class="mt-2 rounded-sm font-medium text-base hover:shadow-none"
            />
        </form>
    </Modal>
</template>
