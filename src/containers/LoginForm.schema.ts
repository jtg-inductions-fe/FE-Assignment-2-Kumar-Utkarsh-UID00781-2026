import { z } from 'zod';

import { userSchema } from '@schemas/user.schema';

export const loginSchema = userSchema.pick({ email: true, password: true });
export type LoginDataType = z.infer<typeof loginSchema>;
