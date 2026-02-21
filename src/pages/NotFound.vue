<script setup lang="ts"></script>

<template>
    <main
        class="min-h-screen bg-background text-text-primary flex items-center justify-center px-6"
    >
        <section class="w-full max-w-xl flex flex-col items-center text-center">
            <div class="relative w-44 h-44 mb-6">
                <div
                    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-amber-300 shadow-[0_0_30px_rgba(251,191,36,0.65)] z-20"
                />
                <div
                    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-text-secondary/35"
                />
                <div
                    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border border-text-secondary/30"
                />
                <div
                    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-text-secondary/25"
                />

                <div class="orbit orbit-fast absolute left-1/2 top-1/2 w-28 h-28">
                    <div
                        class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-accent"
                    />
                </div>
                <div class="orbit orbit-mid orbit-reverse absolute left-1/2 top-1/2 w-36 h-36">
                    <div
                        class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-sky-400"
                    />
                </div>
                <div class="orbit orbit-slow absolute left-1/2 top-1/2 w-44 h-44">
                    <div
                        class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-emerald-400"
                    />
                </div>
            </div>

            <p class="text-xs uppercase tracking-wide text-text-secondary">Erro 404</p>
            <h1 class="mt-2 text-3xl font-semibold tracking-tight">Você entrou no vazio</h1>
            <p class="mt-2 text-sm text-text-secondary">
                A página que você tentou acessar não existe.
            </p>

            <RouterLink
                to="/"
                class="mt-6 inline-flex items-center justify-center rounded-sm bg-accent text-white px-4 py-2.5 text-sm font-medium hover:bg-accent-hover transition-colors"
            >
                Voltar para o início
            </RouterLink>
        </section>
    </main>
</template>

<style scoped>
.orbit {
    animation-name: orbit;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}

.orbit-fast {
    animation-duration: 4s;
}

.orbit-mid {
    animation-duration: 6.5s;
}

.orbit-slow {
    animation-duration: 9s;
}

.orbit-reverse {
    animation-direction: reverse;
}

@keyframes orbit {
    from {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}
</style>
