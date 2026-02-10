<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { Dharma } from '@/types/Dharma';
import { Plus } from 'lucide-vue-next';
import Modal from '@/components/modals/Modal.vue';
import NewDharmaForm from '@/components/dharmas/NewDharmaForm.vue';
import { DharmaService } from '@/services/DharmaService';

defineProps<{
    mockDharmas: Dharma[];
    closed: boolean;
}>();

const dharmas = ref<Dharma[]>([]);
const loading = ref(true);

onMounted(async () => {
    loading.value = true;
    const serv = new DharmaService();

    try {
        dharmas.value = await serv.getUserDharmas();
    } catch (err) {
        console.error(err);
    } finally {
        loading.value = false;
    }
});

const modalOpen = ref(false);

function openModal() {
    modalOpen.value = !modalOpen.value;
}
</script>

<template>
    <div v-if="loading">Carregando...</div>
    <div v-else class="flex flex-col gap-3 mt-10 text-text-primary">
        <h1 :class="['text-text-secondary font-semibold text-sm', closed ? 'hidden' : '']">
            Dharmas
        </h1>
        <button
            v-for="d in dharmas"
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
