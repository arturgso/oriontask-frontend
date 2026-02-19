<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
import ActionButton from '../ui/ActionButton.vue';
import Modal from '../modals/Modal.vue';
import { ref } from 'vue';
import { styles } from '@/styles/DefaultStyles';
import type { NewTaskProps } from '@/types/Tasks';
import { EFFORT_LABELS, EFFORT_LEVEL, KARMA_LABELS, KARMA_TYPES } from '@/types/Types';
import { TasksService } from '@/services/TasksService';
import { useDharmaStore } from '@/stores/dharmaStore';
import { toast } from 'vue3-toastify';

const form = ref<NewTaskProps>({
    title: '',
    description: '',
    effortLevel: 'MEDIUM',
    karmaType: 'ACTION',
});

const DESCRIPTION_LIMIT = 200;
const dharmasStore = useDharmaStore();
const selectedDharma = ref<number | null>(null);

const isModalOpen = ref(false);

function toggleModal() {
    isModalOpen.value = !isModalOpen.value;
}

async function handleSubmit() {
    const service = new TasksService();

    const res = await service.create(form.value, selectedDharma.value);

    if (res) {
        toast.success('Task criado com sucesso');
    }
}
</script>

<template>
    <ActionButton type="button" text="Nova task" width="auto" :icon="Plus" @click="toggleModal" />

    <Modal :open="isModalOpen" title="Nova Task" @close="toggleModal">
        <form class="flex flex-col gap-3" @submit.prevent="handleSubmit">
            <div :class="styles.input.inputDiv">
                <label for="dharmas">Dharmas</label>
                <select
                    id="Dharmas"
                    v-model="selectedDharma"
                    :class="styles.input.defaultInput"
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
                <label form="title">Título</label>
                <input
                    id="username"
                    v-model="form.title"
                    type="text"
                    required
                    placeholder="Saúde"
                    autocomplete="off"
                    :class="styles.input.defaultInput"
                />
            </div>
            <div :class="styles.input.inputDiv">
                <label form="description">Descrição</label>
                <textarea
                    id="description"
                    v-model="form.description"
                    :maxlength="DESCRIPTION_LIMIT"
                    :class="styles.input.defaultInput"
                    autocomplete="off"
                    placeholder="Digite a descrição"
                    class="min-h-28 max-h-28"
                ></textarea>
                <p
                    class="text-end text-sm"
                    :class="
                        form.description.length >= DESCRIPTION_LIMIT
                            ? 'text-red-500'
                            : 'text-text-secondary'
                    "
                >
                    {{ form.description.length }}/{{ DESCRIPTION_LIMIT }}
                </p>
            </div>
            <div :class="styles.input.inputDiv">
                <label form="effortLevel">Esforço</label>
                <select
                    id="effortLevel"
                    v-model="form.effortLevel"
                    :class="styles.input.defaultInput"
                    class="w-full"
                >
                    <option v-for="option in EFFORT_LEVEL" :key="option" :value="option">
                        {{ EFFORT_LABELS[option] }}
                    </option>
                </select>
            </div>

            <div :class="styles.input.inputDiv">
                <label form="karmaType">Karma</label>
                <select
                    id="karmaType"
                    v-model="form.karmaType"
                    :class="styles.input.defaultInput"
                    class="w-full"
                >
                    <option v-for="option in KARMA_TYPES" :key="option" :value="option">
                        {{ KARMA_LABELS[option] }}
                    </option>
                </select>
            </div>
            <ActionButton type="submit" text="Criar" extra-class="mt-4" />
        </form>
    </Modal>
</template>
