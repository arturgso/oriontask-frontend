<script lang="ts" setup>
import NewTaskButon from '@/components/tasks/NewTaskButon.vue';
import Layout from '@/components/ui/Layout.vue';
import { Zap } from 'lucide-vue-next';
</script>

<template>
    <Layout title="Agora" :icon="Zap" :side-component="NewTaskButon">
        <h1 class="text-4xl">Dashboard Page</h1>
    </Layout>
</template>
