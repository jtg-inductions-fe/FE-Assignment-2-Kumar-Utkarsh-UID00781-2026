import { useState } from 'react';

import { ShoppingCart } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';

const maxVisibleCartCount = 99;
const CartButton = () => {
    // TODO: Redirect to checkout page
    const handleClick = () => {
        setCartCount(cartCount + 1);
    };
    // TODO: To be hooked with global cart state
    const [cartCount, setCartCount] = useState<number>(2);
    return (
        <IconButton
            onClick={handleClick}
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
    );
};

export default CartButton;
