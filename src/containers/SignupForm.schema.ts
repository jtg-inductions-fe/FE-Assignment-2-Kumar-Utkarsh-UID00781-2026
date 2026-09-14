import z from 'zod';

import { userSchema } from '@schemas/user.schema';

export const signupSchema = userSchema
    .omit({ id: true })
    .extend({
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        error: 'Passwords do not match',
        path: ['confirmPassword'],
    });
export type SignupDataType = z.infer<typeof signupSchema>;
