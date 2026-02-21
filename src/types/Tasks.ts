import type { EffortLevel, KarmaType, TaskStatus } from './Types';

export interface NewTaskProps {
    title: string;
    description?: string;
    karmaType: KarmaType;
    effortLevel: EffortLevel;
}

export interface TaskUpdateProps {
    title?: string;
    description?: string;
    karmaType?: KarmaType;
    effortLevel?: EffortLevel;
    hidden?: boolean;
}

export interface Tasks {
    id: number;
    dharmasId: number;
    title: string;
    description: string;
    effortLevel: EffortLevel;
    karmaType: KarmaType;
    status: TaskStatus;
    hidden: boolean;
    completedAt: number;
    snoozedUntil: number;
    createdAt: number;
    updatedAt: number;
}
