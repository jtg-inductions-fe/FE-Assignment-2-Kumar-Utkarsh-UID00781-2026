import { z } from 'zod';

export const orderStatusArray = [
    'pending',
    'rejected',
    'accepted',
    'preparing',
    'out_for_delivery',
    'delivered',
];
export const orderStatusSchema = z.enum(orderStatusArray);

export const orderItemSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    quantity: z.number(),
    price: z.number(),
    type: z.enum(['veg', 'non-veg']),
});

export const orderSchema = z.object({
    id: z.uuid(),
    status: orderStatusSchema,
    restaurantId: z.uuid(),
    customerId: z.uuid(),
    time: z.iso.datetime(),
    items: z.array(orderItemSchema),
});

export const orderCartItemDetailSchema = z.object({
    id: z.uuid(),
    quantity: z.number(),
    name: z.string(),
    price: z.number().nonnegative(),
    type: z.enum(['veg', 'non-veg']),
});

export const pushOrderPayloadSchema = z.object({
    customerId: z.uuid(),
    restaurantId: z.uuid(),
    cartDetails: z.array(orderCartItemDetailSchema),
});

export const updateOrderStatusPayloadSchema = z.object({
    orderId: z.uuid(),
    newStatus: orderStatusSchema,
});

export type OrderType = z.infer<typeof orderSchema>;
export type OrderItemType = z.infer<typeof orderItemSchema>;
export type PushOrderPayloadType = z.infer<typeof pushOrderPayloadSchema>;
export type UpdateOrderStatusPayloadType = z.infer<
    typeof updateOrderStatusPayloadSchema
>;
