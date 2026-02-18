<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
import ActionButton from '../ui/ActionButton.vue';
import Modal from '../modals/Modal.vue';
import { ref } from 'vue';

const isModalOpen = ref(false);

function toggleModal() {
    isModalOpen.value = !isModalOpen.value;
}
</script>

<template>
    <ActionButton type="button" text="Nova task" width="auto" :icon="Plus" @click="toggleModal" />

    <Modal :open="isModalOpen" title="Nova Task" @close="toggleModal">
        <h1>Task</h1>
    </Modal>
</template>
