export const EFFORT_LEVEL = ['LOW', 'MEDIUM', 'HIGH'] as const;
export const KARMA_TYPES = ['ACTION', 'PEOPLE', 'THINKING'] as const;
export const TASKS_STATUS = ['NOW', 'NEXT', 'WAITING', 'SNOOZED', 'DONE'] as const;

export type EffortLevel = (typeof EFFORT_LEVEL)[number];
export type KarmaType = (typeof KARMA_TYPES)[number];
export type TaskStatus = (typeof TASKS_STATUS)[number];

export const EFFORT_LABELS: Record<EffortLevel, string> = {
    LOW: 'Baixo',
    MEDIUM: 'Médio',
    HIGH: 'Alto',
};

export const KARMA_LABELS: Record<KarmaType, string> = {
    ACTION: 'Ação',
    PEOPLE: 'Relações',
    THINKING: 'Foco',
};

export const TASKS_LABELS: Record<TaskStatus, string> = {
    NOW: 'Agora',
    NEXT: 'Próximo',
    WAITING: 'Aguardando',
    SNOOZED: 'Adiada',
    DONE: 'Concluída',
};
