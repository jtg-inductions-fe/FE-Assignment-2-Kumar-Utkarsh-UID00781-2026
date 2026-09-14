import { useEffect, useState } from 'react';

import { Delete, Edit } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';

import imgNotFound from '@assets/images/imgNotFound.webp';
import nonVegIcon from '@assets/images/non-veg-icon.png';
import vegIcon from '@assets/images/veg-logo.png';
import ReplaceCartDialog from '@components/cart/ReplaceCartDialog';
import AddToCartButton from '@components/restaurant/AddToCartButton';
import EditStockButton from '@components/restaurant/EditStockButton';
import { FoodItemType } from '@components/restaurant/foodItem.schema';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import {
    addItem,
    clearCart,
    setItemQuantity,
    setRestaurant,
} from '@store/slices/cart';
import { editFoodItem } from '@store/slices/restaurants';
import { showSnackbar } from '@store/slices/snackbar';

type FoodItemCardProp = {
    foodItemData: FoodItemType;
    isOwner: boolean;
    onEdit: (foodItemData: FoodItemType) => void;
    onDelete: (foodItemData: FoodItemType) => void;
};

import {
    FoodImage,
    FoodItemCardActions,
    FoodItemCardOwnerActions,
    FoodItemContainer,
    FoodItemContent,
    FoodItemDivider,
    FoodItemTextContent,
    FoodTypeIcon,
} from '@components/restaurant/FoodItemCard.styles';

const FoodItemCard = ({
    foodItemData,
    isOwner,
    onEdit,
    onDelete,
}: FoodItemCardProp) => {
    const dispatch = useAppDispatch();

    // Selectors
    const cart = useAppSelector((state) => state.cart);
    const cartItem = useAppSelector((state) =>
        state.cart.items.find((item) => item.id === foodItemData.id),
    );
    const foodItemStatus = useAppSelector(
        (state) => state.restaurants.foodItemStatus,
    );

    const currentRestaurant = useAppSelector(
        (state) => state.restaurants.currentRestaurant,
    );

    // States
    const [isEditingStock, setIsEditingStock] = useState(false);
    const [localStock, setLocalStock] = useState(foodItemData.stock);
    const [replaceDialogOpen, setReplaceDialogOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState<string>(
        foodItemData.img_src ?? imgNotFound,
    );
    const isUpdatingStockState = foodItemStatus === 'pending';

    const quantity = cartItem?.quantity ?? 0;

    // Effects
    useEffect(() => {
        if (quantity >= foodItemData.stock) {
            dispatch(
                showSnackbar({
                    message: `Only ${foodItemData.stock} units available`,
                    severity: 'warning',
                    duration: 2000,
                }),
            );
        }
    }, [quantity, foodItemData.stock, dispatch]);

    const { name, description, price, type, stock } = foodItemData;

    // Event Handlers

    // Cart Handlers

    /**
     * Triggers when an AddToCart button is first clicked, it sets the item's quantity to 1 in cart by dispatching addItem.
     * If no cart restaurant is currently unset, it sets the item's restaurant as the cart's restaurant by dispatching setRestaurant.
     * If a cart restaurant is set, it simply returns and does not add the item to cart.
     * This is to ensure that item from a different restaurant is only added after user confirms, they want to replace the cart.
     */
    const handleCartAdd = () => {
        if (cart.restaurantId && cart.restaurantId !== currentRestaurant?.id) {
            setReplaceDialogOpen(true);
            return;
        }

        if (!currentRestaurant) return;

        if (!cart.restaurantId) {
            dispatch(
                setRestaurant({
                    restaurantId: currentRestaurant.id,
                }),
            );
        }

        dispatch(
            addItem({
                foodItemId: foodItemData.id,
                quantity: 1,
            }),
        );
    };

    /**
     * Checks if quantity has exceeded the available stock and shows a snackbar informing user about availability.
     * Else, increments the food item's quantity in cart
     */
    const handleCartIncrement = () => {
        if (quantity >= foodItemData.stock) {
            dispatch(
                showSnackbar({
                    message: `Only ${foodItemData.stock} units available`,
                    severity: 'warning',
                    duration: 2000,
                }),
            );

            return;
        }

        dispatch(
            setItemQuantity({
                foodItemId: foodItemData.id,
                quantity: quantity + 1,
            }),
        );
    };

    /**
     * Decrements the food item's quantity in cart
     */
    const handleCartDecrement = () => {
        dispatch(
            setItemQuantity({
                foodItemId: foodItemData.id,
                quantity: quantity - 1,
            }),
        );
    };

    /**
     * Checks if the quantity entered by user exceeds the stock. If so, informs the user of the availability via a snackbar.
     * Otherwise, sets the items new quantity in cart.
     *
     * @param newQuantity - {number}: The value manually entered by user in the provided field for quantity in field.
     */
    const handleCartChange = (newQuantity: number) => {
        if (newQuantity > foodItemData.stock) {
            dispatch(
                showSnackbar({
                    message: `Only ${foodItemData.stock} units available`,
                    severity: 'warning',
                    duration: 2000,
                }),
            );

            return;
        }

        dispatch(
            setItemQuantity({
                foodItemId: foodItemData.id,
                quantity: newQuantity,
            }),
        );
    };

    // Stock Handlers

    /**
     * Sets the isEditing state to true which renders the counter component of Edit Stock button in place of the initial simple button with text "Edit Stock"
     */
    const handleStockEditStart = () => {
        setIsEditingStock(true);
    };

    const handleStockIncrement = () => {
        setLocalStock((prev) => prev + 1);
    };
    const handleStockDecremenet = () => {
        setLocalStock((prev) => prev - 1);
    };
    const handleStockConfirm = () => {
        void handleStockStateChange(localStock);
        setIsEditingStock(false);
    };
    const handleStockCancel = () => {
        setIsEditingStock(false);
        setLocalStock(foodItemData.stock);
    };
    const handleStockChange = (newQuantity: number) => {
        setLocalStock(newQuantity);
    };

    /**
     * If the new stock quantity is the same as already present stock, it simply returns.
     * Otherwise, dispatches editFoodItem to update the stock of food item.
     * Informs user of the success / failure of the attempted change via snackbar.
     *
     * @param newStock - {number}: The new stock quantity to be updated.
     */
    const handleStockStateChange = async (newStock: number) => {
        if (newStock === stock) return;
        try {
            await dispatch(
                editFoodItem({
                    ...foodItemData,
                    stock: newStock,
                    restaurantId: currentRestaurant?.id ?? '',
                }),
            ).unwrap();

            dispatch(
                showSnackbar({
                    message: 'Stock updated successfully',
                    severity: 'success',
                    duration: 2000,
                }),
            );
        } catch (error) {
            dispatch(
                showSnackbar({
                    message: error as string,
                    severity: 'error',
                    duration: 2000,
                }),
            );
        }
    };

    // Replace Dialog Handlers
    const handleCloseReplaceDialog = () => {
        setReplaceDialogOpen(false);
    };

    /**
     * If the user confirms that they want to replace the cart:
     * 1. Clears the previous cart by dispatch clearCart()
     * 2. Sets the cart restaurant to be the currentRestaurant i.e., the restaurant being viewed currently
     * 3. Adds the food item to cart with quantity 1
     * 4. Closes the dialog
     */
    const handleConfirmation = () => {
        dispatch(clearCart());
        if (currentRestaurant) {
            dispatch(
                setRestaurant({
                    restaurantId: currentRestaurant.id,
                }),
            );

            dispatch(
                addItem({
                    foodItemId: foodItemData.id,
                    quantity: 1,
                }),
            );
        }

        setReplaceDialogOpen(false);
    };

    return (
        <>
            <FoodItemContainer>
                <FoodItemContent>
                    <FoodItemTextContent>
                        <FoodTypeIcon
                            src={type === 'veg' ? vegIcon : nonVegIcon}
                        />
                        <Stack spacing={4}>
                            <Stack spacing={1}>
                                <Typography
                                    variant="h6"
                                    component="h2"
                                    fontWeight={700}
                                >
                                    {name}
                                </Typography>
                                <Typography variant="body1" fontWeight={500}>
                                    ₹{price}
                                </Typography>
                            </Stack>

                            <Typography
                                variant="body1"
                                color="secondary.light"
                                sx={(theme) => ({
                                    ...theme.mixins.lineClamp(2),
                                })}
                            >
                                {description}
                            </Typography>
                            {isOwner && (
                                <Typography variant="body2">
                                    Current Stock: {stock}
                                </Typography>
                            )}
                        </Stack>
                    </FoodItemTextContent>

                    <FoodImage
                        component="img"
                        image={imgSrc}
                        title={name}
                        onError={() => setImgSrc(imgNotFound)}
                    />
                </FoodItemContent>
                <FoodItemCardActions>
                    {isOwner ? (
                        <EditStockButton
                            quantity={localStock}
                            isEditing={isEditingStock}
                            isDisabled={isUpdatingStockState}
                            onIncrement={handleStockIncrement}
                            onDecrement={handleStockDecremenet}
                            onChange={(newQuantity: number) =>
                                handleStockChange(newQuantity)
                            }
                            onCancel={handleStockCancel}
                            onClick={handleStockEditStart}
                            onConfirm={handleStockConfirm}
                            availableStock={stock}
                            handleStockEdit={(newStock: number) =>
                                void handleStockStateChange(newStock)
                            }
                        />
                    ) : (
                        <AddToCartButton
                            availableStock={stock}
                            quantity={quantity}
                            onAdd={handleCartAdd}
                            onChange={() => handleCartChange(quantity)}
                            onIncrement={handleCartIncrement}
                            onDecrement={handleCartDecrement}
                        />
                    )}
                    {isOwner ? (
                        <FoodItemCardOwnerActions>
                            <IconButton
                                aria-label="Edit food item"
                                color="secondary"
                                size="large"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onEdit(foodItemData);
                                }}
                            >
                                <Edit />
                            </IconButton>
                            <IconButton
                                aria-label="Delete food item"
                                color="error"
                                size="large"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onDelete(foodItemData);
                                }}
                            >
                                <Delete />
                            </IconButton>
                        </FoodItemCardOwnerActions>
                    ) : (
                        <></>
                    )}
                </FoodItemCardActions>
            </FoodItemContainer>
            <FoodItemDivider />
            <ReplaceCartDialog
                open={replaceDialogOpen}
                onClose={handleCloseReplaceDialog}
                onConfirmation={handleConfirmation}
            />
        </>
    );
};

export default FoodItemCard;
