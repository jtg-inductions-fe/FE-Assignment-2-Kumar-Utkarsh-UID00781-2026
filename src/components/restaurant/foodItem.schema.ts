import { z } from 'zod';

export const foodItemSchema = z.object({
    id: z.uuid(),
    name: z.string().nonempty('Name is required'),
    description: z
        .string()
        .nonempty('Description is required')
        .pipe(
            z.string().max(300, 'Description must not exceed 300 characters'),
        ),
    img_src: z.string().nonempty('Link for the image is required'),
    price: z
        .number('Price must be a number')
        .positive('Price must be positive'),
    stock: z
        .number('Stock must be a number')
        .int('Stock must be an integer')
        .nonnegative('Stock cannot be negative'),
    type: z.enum(['veg', 'non-veg']),
});

export const foodItemFormSchema = foodItemSchema.omit({
    id: true,
});

export type FoodItemType = z.infer<typeof foodItemSchema>;
export type FoodItemFormDataType = z.infer<typeof foodItemFormSchema>;
