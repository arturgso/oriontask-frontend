<script lang="ts" setup>
import { onMounted } from 'vue';
import Sidebar from '@/components/ui/Sidebar.vue';
import { AuthService } from '@/services/AuthService';

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
    <div class="flex min-h-screen">
        <Sidebar />
        <main class="flex-1 transition-all duration-300 md:ml-64">
            <h1 class="text-4xl p-8">Dashboard Page</h1>
        </main>
    </div>
</template>
