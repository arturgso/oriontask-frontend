<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
import ActionButton from '../ui/ActionButton.vue';
import Modal from '../modals/Modal.vue';
import { ref } from 'vue';
import { styles } from '@/styles/DefaultStyles';
import type { NewTaskProps } from '@/types/Tasks';
import { EFFORT_LABELS, EFFORT_LEVEL, KARMA_LABELS, KARMA_TYPES } from '@/types/Types';

const form = ref<NewTaskProps>({
    title: '',
    effortLevel: 'MEDIUM',
    karmaType: 'ACTION',
});

const isModalOpen = ref(true);

function toggleModal() {
    isModalOpen.value = !isModalOpen.value;
}
</script>

<template>
    <ActionButton type="button" text="Nova task" width="auto" :icon="Plus" @click="toggleModal" />

    <Modal :open="isModalOpen" title="Nova Task" @close="toggleModal">
        <form @submit.prevent="" class="flex flex-col gap-3">
            <div :class="styles.input.inputDiv">
                <label form="title">Título</label>
                <input
                    id="username"
                    v-model="form.title"
                    type="text"
                    required
                    placeholder="Saúde"
                    :class="styles.input.defaultInput"
                />
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
            <ActionButton type="submit" text="Criar" />
        </form>
    </Modal>
</template>
