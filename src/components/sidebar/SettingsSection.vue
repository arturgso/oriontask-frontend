<script lang="ts" setup>
import NavButton from './NavButton.vue';
import {Settings2} from 'lucide-vue-next';

defineProps<{
  closed: boolean;
}>();

</script>

<template>
  <NavButton title="Configurações" :icon="Settings2" text="Configurações" push="settings" :closed="closed"/>
</template>