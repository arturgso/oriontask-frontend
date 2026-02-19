<script setup lang="ts">
import type { Tasks } from '@/types/Tasks';

defineProps<{ task: Tasks }>();
</script>

<template>
    <div class="border-2 border-border">
        {{ task.title }}
    </div>
</template>
