export type UserRole = 'customer' | 'owner';

export interface User {
    id: string;
    email: string;
    username: string;
    password: string;
    role: UserRole;
}
