import type { EffortLevel, KarmaType } from './Types';

export interface NewTaskProps {
    title: string;
    karmaType: KarmaType;
    effortLevel: EffortLevel;
}
