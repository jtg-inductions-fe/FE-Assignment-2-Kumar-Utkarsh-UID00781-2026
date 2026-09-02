import { z } from 'zod';

export const userRoleSchema = z.enum(['customer', 'owner']);

export const userSchema = z.object({
    id: z.uuid(),
    email: z
        .string()
        .toLowerCase()
        .nonempty('Email is required')
        .pipe(z.email('Email format is invalid')),
    username: z
        .string()
        .nonempty('Username is required')
        .pipe(
            z
                .string()
                .min(6, 'Username must have at least 6 characters')
                .max(16, 'Username must not exceed 16 characters'),
        ),
    password: z
        .string()
        .nonempty('Password is required')
        .pipe(
            z
                .string()
                .min(6, 'Password must have at least 6 characters')
                .max(20, 'Password must not exceed 20 characters'),
        ),
    role: userRoleSchema,
});

export const userApiResponseSchema = userSchema.omit({
    password: true,
});

export type UserType = z.infer<typeof userSchema>;
export type UserApiResponseType = z.infer<typeof userApiResponseSchema>;
export type UserRoleType = z.infer<typeof userRoleSchema>;
