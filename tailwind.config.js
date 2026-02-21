/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                accent: {
                    DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
                    hover: 'rgb(var(--color-accent-hover) / <alpha-value>)',
                },
                card: 'rgb(var(--color-card) / <alpha-value>)',
                background: 'rgb(var(--color-background) / <alpha-value>)',
                border: 'rgb(var(--color-border) / <alpha-value>)',
                surface: 'rgb(var(--color-surface) / <alpha-value>)',
                text: {
                    primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
                    secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
                    muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
                },
            },
        },
    },
    plugins: [],
};
