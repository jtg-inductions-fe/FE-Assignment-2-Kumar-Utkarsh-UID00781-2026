import { useState } from 'react';

import { Delete, Edit } from '@mui/icons-material';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CardMediaProps,
    Divider,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import imgNotFound from '@assets/images/imgNotFound.webp';
import nonVegIcon from '@assets/images/non-veg-icon.png';
import vegIcon from '@assets/images/veg-logo.png';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { FoodItemType } from '@schemas/restaurants.schema';
import { editFoodItem } from '@store/slices/restaurants';
import { showSnackbar } from '@store/slices/snackbar';

import AddToCartButton from './AddToCartButton';
import EditStockButton from './EditStockButton';

type FoodItemCardProp = {
    foodItemData: FoodItemType;
    isOwner: boolean;
    onEdit: (foodItemData: FoodItemType) => void;
    onDelete: (foodItemData: FoodItemType) => void;
};

const FoodItemContainer = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'none',
});

const FoodItemContent = styled(CardContent)({
    display: 'flex',
    width: '100%',
    padding: 0,
    borderRadius: 0,
});

const FoodItemTextContent = styled(Stack)(({ theme }) => ({
    flex: 1,
    padding: 0,
    paddingRight: theme.spacing(3),

    '&:last-child': {
        paddingBottom: 0,
    },
}));

const FoodTypeIcon = styled('img')(({ theme }) => ({
    width: 12,
    [theme.breakpoints.up('md')]: {
        width: 16,
    },
}));

const FoodImage = styled(CardMedia)<CardMediaProps>(({ theme }) => ({
    height: 120,
    width: 120,
    flexGrow: 0,
    flexShrink: 0,
    objectFit: 'cover',
    borderRadius: '2.8rem',
    [theme.breakpoints.up('sm')]: {
        height: 160,
        width: 160,
    },
    [theme.breakpoints.up('md')]: {
        height: 180,
        width: 180,
    },
}));

const FoodItemCardActions = styled(CardActions)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    paddingTop: theme.spacing(4),
    paddingInline: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
        paddingTop: 'null',
    },
}));

const FoodItemCardOwnerActions = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    [theme.breakpoints.up('sm')]: {
        gap: theme.spacing(2),
    },
}));

const FoodItemDivider = styled(Divider)(({ theme }) => ({
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
}));

const FoodItemCard = ({
    foodItemData,
    isOwner,
    onEdit,
    onDelete,
}: FoodItemCardProp) => {
    const [imgSrc, setImgSrc] = useState<string>(
        foodItemData.img_src ?? imgNotFound,
    );
    const dispatch = useAppDispatch();

    const currentRestaurant = useAppSelector(
        (state) => state.restaurants.currentRestaurant,
    );

    const { name, description, price, type, stock, id } = foodItemData;

    const handleStockChange = async (newStock: number) => {
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
                            availableStock={stock}
                            handleStockEdit={(newStock: number) =>
                                void handleStockChange(newStock)
                            }
                        />
                    ) : (
                        <AddToCartButton
                            availableStock={stock}
                            foodItemId={id}
                            restaurantId={currentRestaurant?.id ?? ''}
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
        </>
    );
};

export default FoodItemCard;
