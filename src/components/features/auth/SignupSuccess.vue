<script setup lang="ts">
interface Props {
    email: string;
}

defineProps<Props>();
defineEmits(['back']);
</script>

<template>
    <div
        class="flex flex-col gap-6 w-full text-center py-8 px-4 animate-in fade-in zoom-in duration-300"
    >
        <div class="flex flex-col gap-2">
            <div class="flex justify-center mb-2">
                <div class="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <span class="text-3xl">🚀</span>
                </div>
            </div>
            <h2 class="text-2xl font-bold text-text-primary">Quase lá!</h2>
            <p class="text-text-secondary leading-relaxed">
                Para sua segurança, enviamos um link de confirmação para o e-mail:
                <br />
                <span class="font-semibold text-accent break-all">{{ email }}</span>
            </p>
        </div>

        <div class="bg-card/50 p-4 rounded-lg border border-border/50">
            <p class="text-text-muted text-sm leading-relaxed">
                Você só poderá realizar o login após confirmar sua conta através do link enviado
                para sua caixa de entrada.
            </p>
        </div>

        <button
            class="text-text-secondary text-sm font-medium hover:text-text-primary transition-colors cursor-pointer mt-2"
            @click="$emit('back')"
        >
            Digitou o e-mail errado?
            <span class="text-accent underline underline-offset-4">Voltar para o cadastro</span>
        </button>
    </div>
</template>
