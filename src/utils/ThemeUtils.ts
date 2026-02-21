export type Theme = 'light' | 'dark';
export type ThemeMode = Theme | 'system';

const THEME_STORAGE_KEY = 'oriontask-theme';

function getSystemTheme(): Theme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
}

function applyThemeMode(mode: ThemeMode) {
    applyTheme(mode === 'system' ? getSystemTheme() : mode);
}

export function getThemeMode(): ThemeMode {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;

    return 'system';
}

export function getTheme(): Theme {
    const mode = getThemeMode();
    return mode === 'system' ? getSystemTheme() : mode;
}

export function setThemeMode(mode: ThemeMode) {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
    applyThemeMode(mode);
}

export function initTheme() {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
        if (getThemeMode() === 'system') {
            applyThemeMode('system');
        }
    };

    applyThemeMode(getThemeMode());
    media.addEventListener('change', handleSystemChange);
}
