export type CartFoodItemType = {
    id: string;
    quantity: number;
};

export type CartType = {
    restaurantId: string | null;
    items: CartFoodItemType[];
};
