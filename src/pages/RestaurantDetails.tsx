import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import {
    Button,
    Grid2 as Grid,
    LinearProgress,
    Typography,
} from '@mui/material';

import ContainerizedBox from '@components/ContainerizedBox';
import DeleteDialog from '@components/restaurant/DeleteDialog';
import FoodItemCard from '@components/restaurant/FoodItemCard';
import FoodItemDialog from '@components/restaurant/FoodItemDialog';
import RestaurantBanner from '@components/restaurant/RestaurantBanner';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { FoodItemType } from '@schemas/restaurants.schema';
import { deleteFoodItem, fetchRestaurantById } from '@store/slices/restaurants';
import { showSnackbar } from '@store/slices/snackbar';

const RestaurantDetails = () => {
    const [foodItemDialogOpen, setFoodItemDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [selectedFoodItem, setSelectedFoodItem] =
        useState<FoodItemType | null>(null);
    const params = useParams();

    const dispatch = useAppDispatch();

    const currentUser = useAppSelector((state) => state.auth.currentUser);

    const currentRestaurant = useAppSelector(
        (state) => state.restaurants.currentRestaurant,
    );

    const currentRestaurantStatus = useAppSelector(
        (state) => state.restaurants.currentRestaurantStatus,
    );

    const selectedRestaurantId = params.restaurantId ?? '';

    useEffect(() => {
        if (selectedRestaurantId) {
            void dispatch(fetchRestaurantById(selectedRestaurantId));
        }
    }, [dispatch, selectedRestaurantId]);

    const isLoadingRestaurant = currentRestaurantStatus === 'pending';

    const restaurantNotFound =
        currentRestaurantStatus === 'succeeded' && !currentRestaurant;

    const handleAddFoodItem = () => {
        setSelectedFoodItem(null);
        setFoodItemDialogOpen(true);
    };

    const handleEditFoodItem = (foodItem: FoodItemType) => {
        setSelectedFoodItem(foodItem);
        setFoodItemDialogOpen(true);
    };

    const handleCloseFoodItemDialog = () => {
        setSelectedFoodItem(null);
        setFoodItemDialogOpen(false);
    };

    const handleOpenDeleteDialog = (foodItem: FoodItemType) => {
        setSelectedFoodItem(foodItem);
        setDeleteDialogOpen(true);
    };
    const handleCloseDeleteFoodItemDialog = () => {
        setSelectedFoodItem(null);
        setDeleteDialogOpen(false);
    };

    const handleDeleteFoodItem = async (foodItem: FoodItemType) => {
        try {
            await dispatch(
                deleteFoodItem({
                    foodItemId: foodItem.id,
                    restaurantId: currentRestaurant?.id ?? '',
                }),
            ).unwrap();
            setDeleteDialogOpen(false);
            setSelectedFoodItem(null);
            dispatch(
                showSnackbar({
                    message: 'Restaurant deleted successfully',
                    severity: 'success',
                }),
            );
        } catch (error) {
            dispatch(
                showSnackbar({
                    message: (error as string) ?? 'Could not delete restaurant',
                    severity: 'error',
                }),
            );
        }
    };

    return (
        <ContainerizedBox>
            {isLoadingRestaurant ? (
                <LinearProgress />
            ) : restaurantNotFound ? (
                <Typography textAlign="center">
                    Could not find this restaurant
                </Typography>
            ) : (
                <>
                    <Grid
                        container
                        columnSpacing={4}
                        rowSpacing={12}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid size={12}>
                            <RestaurantBanner
                                name={currentRestaurant?.name ?? ''}
                                description={
                                    currentRestaurant?.description ?? ''
                                }
                                address={currentRestaurant?.address ?? ''}
                                imgSrc={currentRestaurant?.img_src ?? ''}
                                openTiming={
                                    currentRestaurant?.store_timings.open ?? ''
                                }
                                closeTiming={
                                    currentRestaurant?.store_timings.close ?? ''
                                }
                            />
                        </Grid>
                        <Grid container size={12} alignItems="center">
                            <Grid size="auto">
                                <Typography variant="h4" component="h2">
                                    Menu
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 2, sm: 6, md: 7, lg: 8 }}></Grid>
                            {currentUser?.id ===
                                currentRestaurant?.owner_id && (
                                <Grid size="grow">
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="secondary"
                                        onClick={handleAddFoodItem}
                                    >
                                        Add Item
                                    </Button>
                                </Grid>
                            )}
                        </Grid>
                        <Grid container rowSpacing={2}>
                            {currentRestaurant?.menu.map((foodItem) => (
                                <Grid size={12} key={foodItem.id}>
                                    <FoodItemCard
                                        foodItemData={foodItem}
                                        isOwner={
                                            currentUser?.id ===
                                            currentRestaurant.owner_id
                                        }
                                        onDelete={handleOpenDeleteDialog}
                                        onEdit={handleEditFoodItem}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </>
            )}
            <FoodItemDialog
                open={foodItemDialogOpen}
                mode={selectedFoodItem ? 'edit' : 'add'}
                foodItem={selectedFoodItem ?? undefined}
                onClose={handleCloseFoodItemDialog}
            />
            <DeleteDialog
                open={deleteDialogOpen}
                foodItem={selectedFoodItem}
                onConfirmation={(foodItem) => {
                    void handleDeleteFoodItem(foodItem);
                }}
                onClose={handleCloseDeleteFoodItemDialog}
            />
        </ContainerizedBox>
    );
};

export default RestaurantDetails;
