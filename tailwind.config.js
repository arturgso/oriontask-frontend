/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                accent: {
                    DEFAULT: '#7c3aed',
                    hover: '#6d28d9',
                },
                card: '#ffffff',
                background: '#f9fafb',
                border: '#e5e7eb',
                surface: '#f3f4f6',
                text: {
                    primary: '#1f2937',
                    secondary: '#6b7280',
                    muted: '#9ca3af',
                },
            },
        },
    },
    plugins: [],
};
