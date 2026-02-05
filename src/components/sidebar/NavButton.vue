<script lang="ts" setup>
import type {Component} from 'vue'
import {useRouter} from "vue-router";

interface Props {
  icon: Component
  text: string
  push: string
  closed: boolean
}

const props = defineProps<Props>()
const router = useRouter()

function handlePush() {
  router.push(props.push)
}
</script>

<template>
  <button
      @click="handlePush"
      :class="['text-text-primary flex flex-row items-center gap-3 w-full rounded-md  transition duration-200',
        closed ? '' : 'p-2 border-b-2 border-border shadow-sm border-border hover:bg-card hover:shadow-md'
      ]"
  >
    <component :is="props.icon"/>
    <p :class="[closed ? 'hidden': '']">{{ props.text }}</p>
  </button>
</template>