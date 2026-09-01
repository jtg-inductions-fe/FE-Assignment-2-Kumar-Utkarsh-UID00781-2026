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
    price: z.number(),
    stock: z.number(),
    type: z.enum(['veg', 'non-veg']),
});

export const restaurantSchema = z.object({
    id: z.uuid(),
    owner_id: z.uuid(),
    name: z.string().nonempty('Name is required'),
    img_src: z.string().nonempty('Link for the image is required'),
    description: z
        .string()
        .nonempty('Description is required')
        .pipe(
            z.string().max(300, 'Description must not exceed 300 characters'),
        ),
    veg: z.boolean(),
    non_veg: z.boolean(),
    store_timings: z.object({
        open: z.string().nonempty('Opening time is required'),
        close: z.string().nonempty('Closing time is required'),
    }),
    address: z.string().nonempty('Address is required'),
    menu: z.array(foodItemSchema),
});

export const restaurantFormSchema = restaurantSchema
    .omit({
        id: true,
        owner_id: true,
        store_timings: true,
        menu: true,
    })
    .extend({
        open_timing: z.string().nonempty('Opening time is required'),
        close_timing: z.string().nonempty('Closing time is required'),
    });

export type FoodItemType = z.infer<typeof foodItemSchema>;
export type RestaurantType = z.infer<typeof restaurantSchema>;
export type RestaurantFormDataType = z.infer<typeof restaurantFormSchema>;
