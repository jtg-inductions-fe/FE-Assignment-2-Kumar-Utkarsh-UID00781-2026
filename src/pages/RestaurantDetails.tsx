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
import { FoodItemType } from '@components/restaurant/foodItem.schema';
import FoodItemDialog from '@components/restaurant/FoodItemDialog';
import FoodItemCard from '@containers/FoodItemCard';
import RestaurantBanner from '@containers/RestaurantBanner';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
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

    /**
     * This effect fetches the current restaurant from the restaurantId received as prop
     *
     */
    useEffect(() => {
        if (selectedRestaurantId) {
            void dispatch(fetchRestaurantById(selectedRestaurantId));
        }
    }, [dispatch, selectedRestaurantId]);

    const isLoadingRestaurant = currentRestaurantStatus === 'pending';

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

    /**
     * After the user confirms they want to delete the food item, this handler:
     * 1. Dispatched deleteFoodItem action to delete the foodItem from currentRestaurant's menu
     * 2. Closes the delete dialog
     * 3. Sets the currentFoodItem to null (as no item is being edited or deleted)
     * 4. Informs user of the success / failure of attempted deletion.
     *
     * @param foodItem - {FoodItemType}: The food item to be deleted
     */
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

    if (isLoadingRestaurant) {
        return (
            <ContainerizedBox>
                <LinearProgress />
            </ContainerizedBox>
        );
    } else if (!currentRestaurant) {
        return (
            <ContainerizedBox>
                <Typography textAlign="center">
                    Could not find this restaurant
                </Typography>
            </ContainerizedBox>
        );
    }

    return (
        <ContainerizedBox>
            <Grid
                container
                columnSpacing={4}
                rowSpacing={12}
                alignItems="center"
                justifyContent="center"
            >
                <Grid size={12}>
                    <RestaurantBanner
                        name={currentRestaurant.name}
                        description={currentRestaurant.description}
                        address={currentRestaurant.address}
                        imgSrc={currentRestaurant.img_src}
                        openTiming={currentRestaurant.store_timings.open}
                        closeTiming={currentRestaurant.store_timings.close}
                    />
                </Grid>
                <Grid container size={12} alignItems="center">
                    <Grid size="auto">
                        <Typography variant="h4" component="h2">
                            Menu
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 6, md: 7, lg: 8 }}></Grid>
                    {currentUser?.id === currentRestaurant?.owner_id && (
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
