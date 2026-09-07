import { z } from 'zod';

export const cartFoodItemSchema = z.object({
    id: z.uuid(),
    quantity: z.number(),
});

export const cartSchema = z.object({
    restaurantId: z.uuid().nullable(),
    items: z.array(cartFoodItemSchema),
});

export type CartType = z.infer<typeof cartSchema>;
export type CartFoodItemType = z.infer<typeof cartFoodItemSchema>;
