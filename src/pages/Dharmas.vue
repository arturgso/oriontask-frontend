<script setup lang="ts">
import EditDharmaForm from '@/components/dharmas/EditDharmaForm.vue';
import Layout from '@/components/ui/Layout.vue';
import { useDharmaStore } from '@/stores/dharmaStore';
import { ChevronDown } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

const dharmaStore = useDharmaStore();
const openById = ref<Record<number, boolean>>({});

onMounted(() => {
    if (!dharmaStore.dharmas.length) {
        dharmaStore.fetchDharmas();
    }
});

const toggleOpen = (id: number) => {
    openById.value[id] = !openById.value[id];
};

const isOpen = (id: number) => !!openById.value[id];
</script>

<template>
    <Layout>
        <div class="flex flex-col lg:grid lg:grid-cols-2 lg:items-start gap-3">
            <div
                v-for="d in dharmaStore.dharmas"
                :key="d.id"
                class="border-2 rounded-md border-border w-full h-fit flex flex-col p-3 bg-card hover:shadow-md transition duration-150 relative"
                @click="toggleOpen(d.id)"
            >
                <div class="flex gap-3 items-center">
                    <div :style="{ backgroundColor: d.color }" class="h-5 w-5 rounded-full" />
                    <p class="text-lg font-bold capitalize">{{ d.name }}</p>
                </div>

                <!-- Chevron -->
                <button class="absolute right-4">
                    <ChevronDown
                        class="transition-transform duration-200"
                        :class="isOpen(d.id) ? 'rotate-180' : 'rotate-0'"
                    />
                </button>

                <div v-if="isOpen(d.id)">
                    <EditDharmaForm :dharma="d"/>
                </div>
            </div>
        </div>
    </Layout>
</template>
