import { Link as RouterLink } from 'react-router-dom';

import { ShoppingCart } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';

import { ROUTES } from '@constant';
import { useAppSelector } from '@hooks/useAppSelector';

const maxVisibleCartCount = 99;
const CartButton = () => {
    const cartCount = useAppSelector((state) =>
        state.cart.items.reduce(
            (count, currentItem) => (count += currentItem.quantity),
            0,
        ),
    );
    return (
        <RouterLink to={ROUTES.CHECKOUT}>
            <IconButton
                aria-label={`Open Cart, ${cartCount} item${cartCount == 1 ? '' : 's'}`}
            >
                <Badge
                    badgeContent={cartCount}
                    max={maxVisibleCartCount}
                    color="primary"
                >
                    <ShoppingCart color="secondary" fontSize="large" />
                </Badge>
            </IconButton>
        </RouterLink>
    );
};

export default CartButton;
