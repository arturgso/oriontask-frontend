export interface UserProfile {
    id?: number;
    name: string;
    email: string;
}

export interface UpdateUserProfileProps {
    name?: string;
    email?: string;
}
