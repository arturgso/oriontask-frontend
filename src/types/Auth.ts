export interface LoginProps {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface SignupProps {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token?: string;
    accessToken?: string;
    id?: string;
    name?: string;
    email?: string;
}
