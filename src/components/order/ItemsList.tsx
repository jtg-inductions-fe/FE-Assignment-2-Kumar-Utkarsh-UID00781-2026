import OrderItem from '@components/order/OrderItem';
import { OrderItemType } from '@schemas/orders.schema';

type ItemsListProps = {
    items: OrderItemType[];
};

const ItemsList = ({ items }: ItemsListProps) => (
    <div>
        {items.map((item) => (
            <OrderItem item={item} key={item.id} />
        ))}
    </div>
);

export default ItemsList;
