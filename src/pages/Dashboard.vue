<script lang="ts" setup>
import { onMounted } from 'vue';
import Sidebar from '../components/ui/Sidebar.vue';
import { AuthService } from '../services/AuthService';

onMounted(async () => {
    const authService = new AuthService();
    const ok = await authService.validateToken();

    if (!ok) {
        await authService.logout();
        window.location.href = '/auth';
    }
});
</script>

<template>
    <div class="flex">
        <Sidebar />
        <h1 class="text-4xl">Dashboard Page</h1>
    </div>
</template>
