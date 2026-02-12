<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Plus } from 'lucide-vue-next';
import Modal from '@/components/modals/Modal.vue';
import NewDharmaForm from '@/components/dharmas/NewDharmaForm.vue';
import { useDharmaStore } from '@/stores/dharmaStore';

defineProps<{
    closed: boolean;
}>();

const dharmaStore = useDharmaStore();
const modalOpen = ref(false);

onMounted(() => {
    if (!dharmaStore.dharmas.length) {
        dharmaStore.fetchDharmas();
    }
});

function openModal() {
    modalOpen.value = !modalOpen.value;
}
</script>

<template>
    <div v-if="dharmaStore.loading">Carregando...</div>
    <div v-else class="flex flex-col gap-3 text-text-primary">
        <h1 :class="['text-text-secondary font-semibold text-sm', closed ? 'hidden' : '']">
            Dharmas
        </h1>
        <button
            v-for="d in dharmaStore.dharmas"
            :key="d.id"
            :title="d.name"
            :class="[
                'flex flex-row items-center gap-2 rounded-lg hover:bg-card transtion duration-150',
                closed ? '' : 'border border-border p-2',
            ]"
        >
            <div
                :title="d.name"
                :class="['w-4 h-4 rounded-sm', closed ? 'w-6 h-6' : '']"
                :style="{ backgroundColor: d.color }"
            />
            <p :class="['font-semibold', closed ? 'hidden' : '']">
                {{ d.name }}
            </p>
        </button>
        <button
            title="Novo Dharma"
            :class="[
                'flex flex-row items-center',
                closed
                    ? ''
                    : 'gap-2 border-dashed border-2 border-border p-2 rounded-lg hover:bg-card transtion',
            ]"
            @click="openModal"
        >
            <Plus />
            <p :class="[closed ? 'hidden' : '']">Novo Dharma</p>
        </button>
    </div>
    <Modal :open="modalOpen" :on-close="openModal" title="novo dharma">
        <NewDharmaForm @success="modalOpen = false" />
    </Modal>
</template>
