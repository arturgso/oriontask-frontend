<script lang="ts" setup>
defineProps<{
    margin?: boolean;
}>();
</script>

<template>
    <div class="w-full border-t border-border" :class="margin ? 'my-4' : 'my-5'"></div>
</template>
