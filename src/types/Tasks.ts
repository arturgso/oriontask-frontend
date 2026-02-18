import type { EffortLevel, KarmaType } from './Types';

export interface NewTaskProps {
    title: string;
    description: string;
    karmaType: KarmaType;
    effortLevel: EffortLevel;
}

export interface Tasks {
    id: number;
    dharmasId: number;
    title: string;
    description: string;
    effortLevel: EffortLevel;
    karmaType: KarmaType;
    status: string; //TODO - Change to const, same as EffortLevel or KarmaType
    hidden: boolean;
    completedAt: Date;
    snoozedUntil: Date;
    createdAt: Date;
    updatedAt: Date;
}
