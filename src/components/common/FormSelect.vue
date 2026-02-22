<script setup lang="ts">
import { styles } from '@/styles/DefaultStyles';

interface Option {
    value: string | number;
    label: string;
}

interface Props {
    id: string;
    label?: string;
    modelValue?: string | number | null;
    options: Option[];
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
}

withDefaults(defineProps<Props>(), {
    label: '',
    modelValue: '',
    placeholder: 'Selecione uma opção',
    required: false,
    disabled: false,
    error: '',
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number | null): void;
}>();

const onChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    emit('update:modelValue', target.value);
};
</script>

<template>
    <div :class="styles.input.inputDiv">
        <label
            v-if="label"
            :for="id"
            class="text-xs font-medium uppercase tracking-wide text-text-secondary"
        >
            {{ label }}
        </label>
        <select
            :id="id"
            :value="modelValue"
            :required="required"
            :disabled="disabled"
            :class="[
                styles.input.defaultInput,
                'bg-card rounded-sm px-3 py-2.5 focus:outline-none focus:ring-0 focus:border-accent transition-colors w-full cursor-pointer',
                error ? 'border-red-500' : 'border-border',
                disabled ? 'opacity-60 cursor-not-allowed' : '',
            ]"
            @change="onChange"
        >
            <option v-if="placeholder" disabled value="null" hidden>{{ placeholder }}</option>
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.label }}
            </option>
        </select>
        <p v-if="error" class="text-xs text-red-500 mt-1">{{ error }}</p>
    </div>
</template>
