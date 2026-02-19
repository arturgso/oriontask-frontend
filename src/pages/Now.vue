<script lang="ts" setup>
import NewTaskButon from '@/components/tasks/NewTaskButon.vue';
import Layout from '@/components/ui/Layout.vue';
import { useTasksStore } from '@/stores/TasksStore';
import { Zap } from 'lucide-vue-next';
import { onMounted } from 'vue';

const tasksStore = useTasksStore();

onMounted(() => {
    if (!tasksStore.tasks.length) {
        tasksStore.fetchTasks();
    }
});
</script>

<template>
    <Layout title="Agora" :icon="Zap" :side-component="NewTaskButon">
        <div v-for="t in tasksStore.tasks" :key="t.id">
            {{ t.title }}
        </div>
    </Layout>
</template>
