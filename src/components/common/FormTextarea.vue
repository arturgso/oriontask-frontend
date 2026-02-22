<script setup lang="ts">
import { styles } from '@/styles/DefaultStyles';

interface Props {
    id: string;
    label?: string;
    modelValue?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    maxlength?: number;
    showCounter?: boolean;
    extraClass?: string;
}

withDefaults(defineProps<Props>(), {
    label: '',
    modelValue: '',
    placeholder: '',
    required: false,
    disabled: false,
    error: '',
    maxlength: undefined,
    showCounter: false,
    extraClass: '',
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const onInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
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
        <textarea
            :id="id"
            :value="modelValue"
            :placeholder="placeholder"
            :required="required"
            :disabled="disabled"
            :maxlength="maxlength"
            :class="[
                styles.input.defaultInput,
                'bg-card rounded-sm px-3 py-2.5 focus:outline-none focus:ring-0 focus:border-accent transition-colors min-h-[100px]',
                error ? 'border-red-500' : 'border-border',
                disabled ? 'opacity-60 cursor-not-allowed' : '',
                extraClass,
            ]"
            @input="onInput"
        />
        <div v-if="showCounter && maxlength" class="flex justify-between mt-1">
            <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
            <div v-else></div>
            <p
                class="text-xs transition-colors"
                :class="
                    modelValue.length >= maxlength
                        ? 'text-red-500 font-medium'
                        : 'text-text-secondary'
                "
            >
                {{ modelValue.length }}/{{ maxlength }}
            </p>
        </div>
        <p v-else-if="error" class="text-xs text-red-500 mt-1">{{ error }}</p>
    </div>
</template>
