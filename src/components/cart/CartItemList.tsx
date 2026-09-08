import CartItem from '@components/cart/CartItem';
import { FoodItemType } from '@schemas/restaurants.schema';

type CartItemsListProps = {
    detailedCart: (FoodItemType & { quantity: number })[];
};

const CartItemList = (props: CartItemsListProps) => (
    <>
        {props.detailedCart.map((itemData) => (
            <CartItem key={itemData.id} item={itemData} />
        ))}
    </>
);

export default CartItemList;
