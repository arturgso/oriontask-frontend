export interface Dharma {
    id: number;
    user: string;
    name: string;
    description?: string;
    color: string;
    hidden: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface NewDharmaProps {
    name: string;
    color?: string;
}

export interface EditDharmaProps {
    name: string;
    color?: string;
    hidden: boolean;
}
