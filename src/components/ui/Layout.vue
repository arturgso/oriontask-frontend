<script setup lang="ts">
import { onMounted } from 'vue';
import Sidebar from './Sidebar.vue';
import { AuthService } from '@/services/AuthService';
import { useRouter } from 'vue-router';

onMounted(async () => {
    const authService = new AuthService();
    const ok = await authService.validateToken();
    const route = useRouter();

    if (!ok) {
        await authService.logout();
        route.push("/auth") 
    }
})

</script>

<template>
    <Sidebar />
    <main class="px-4 mt-16">
       <div class="flex flex-col gap-3">
            <slot />
        </div>
    </main>
</template>