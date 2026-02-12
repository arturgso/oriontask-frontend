<script setup lang="ts">
import Layout from '@/components/ui/Layout.vue';
import { useDharmaStore } from '@/stores/dharmaStore';
import { Pen, Trash } from 'lucide-vue-next';
import { onMounted } from 'vue';

const dharmaStore = useDharmaStore();

onMounted(() => {
    if (!dharmaStore.dharmas.length) {
        dharmaStore.fetchDharmas();
    }
});
</script>

<template>
    <Layout>
        <button
            v-for="d in dharmaStore.dharmas"
            :key="d.id"
            class="border-2 rounded-md border-border w-full flex justify-between p-3 bg-card hover:bg-surface hover:shadow-md transition duration-150"
        >
            <div class="flex gap-3 items-center">
                <div :style="{ backgroundColor: d.color }" class="h-5 w-5 rounded-full" />
                <p class="text-lg font-bold capitalize">{{ d.name }}</p>
            </div>
            <div class="flex gap-3 items-center">
                <button class="border border-border rounded-md bg-surface p-1">
                    <Pen :size="20" />
                </button>

                <button class="border border-border rounded-md bg-red-400 p-1 text-white">
                    <Trash :size="20" />
                </button>
            </div>
        </button>
    </Layout>
</template>
