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

export interface SignupResponse {
    id: string;
    name: string;
    email: string;
    isConfirmed: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ForgotPasswordProps {
    email: string;
}

export interface ResetPasswordProps {
    token: string;
    newPassword: string;
}

export interface BackendError {
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
}

export interface BackendValidationError extends BackendError {
    errors?: Record<string, string>;
}
