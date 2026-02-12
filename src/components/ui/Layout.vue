<script setup lang="ts">
import Sidebar from './Sidebar.vue';
</script>

<template>
    <main class="flex gap-3">
        <Sidebar />
        <div class="px-4 mt-16 w-full">
            <div class="flex flex-col gap-3">
                <slot />
            </div>
        </div>
    </main>
</template>
