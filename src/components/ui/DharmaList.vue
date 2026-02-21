<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Plus } from 'lucide-vue-next';
import Modal from '@/components/modals/Modal.vue';
import NewDharmaForm from '@/components/dharmas/NewDharmaForm.vue';
import { useDharmaStore } from '@/stores/dharmaStore';
import { useRouter } from 'vue-router';

defineProps<{
    closed: boolean;
}>();

const router = useRouter();
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
        <h1
            :class="[
                'text-text-secondary font-medium text-xs uppercase tracking-wide',
                closed ? 'hidden' : '',
            ]"
        >
            Dharmas
        </h1>
        <button
            v-for="d in dharmaStore.dharmas"
            :key="d.id"
            :title="d.name"
            :class="[
                'flex flex-row items-center gap-2 rounded-sm text-sm border transition-colors duration-150',
                closed
                    ? 'justify-center border-transparent px-2 py-2 hover:bg-surface'
                    : 'border-transparent px-2.5 py-2 hover:bg-surface',
            ]"
            @click="router.push(`/dharmas/${d.id}`)"
        >
            <div
                :title="d.name"
                :class="['w-3.5 h-3.5 rounded-sm', closed ? 'w-5 h-5' : '']"
                :style="{ backgroundColor: d.color }"
            />
            <p :class="['font-medium min-w-0 truncate', closed ? 'hidden' : '']">
                {{ d.name }}
            </p>
        </button>
        <button
            title="Novo Dharma"
            :class="[
                'flex flex-row items-center rounded-sm text-sm transition-colors',
                closed
                    ? 'justify-center px-2 py-2 hover:bg-surface'
                    : 'gap-2 px-2.5 py-2 border border-dashed border-border hover:bg-surface',
            ]"
            @click="openModal"
        >
            <Plus :size="18" />
            <p :class="[closed ? 'hidden' : '', 'font-medium']">Novo Dharma</p>
        </button>
    </div>
    <Modal :open="modalOpen" title="novo dharma" @close="openModal">
        <NewDharmaForm @success="modalOpen = false" />
    </Modal>
</template>
