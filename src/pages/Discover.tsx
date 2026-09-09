import { useEffect, useState } from 'react';

import { Button, Grid2 as Grid, Typography } from '@mui/material';

import Searchbar from '@components/common/Searchbar';
import ContainerizedBox from '@components/ContainerizedBox';
import DeleteDialog from '@components/discover/DeleteDialog';
import FilterChips from '@components/discover/FilterChips';
import RestaurantCard from '@components/discover/RestaurantCard';
import RestaurantDialog from '@components/discover/RestaurantDialog';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { RestaurantType } from '@schemas/restaurants.schema';
import { deleteRestaurant, fetchRestaurants } from '@store/slices/restaurants';
import { showSnackbar } from '@store/slices/snackbar';
const Discover = () => {
    const restaurantsData = useAppSelector(
        (state) => state.restaurants.restaurants,
    );

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterTerm, setFilterTerm] = useState<string>('');

    const restaurantsStatus = useAppSelector(
        (state) => state.restaurants.status,
    );

    const currentUser = useAppSelector((state) => state.auth.currentUser);

    const dispatch = useAppDispatch();

    useEffect(() => {
        try {
            if (restaurantsStatus === 'idle') {
                void dispatch(fetchRestaurants()).unwrap();
            }
        } catch (error) {
            dispatch(
                showSnackbar({ message: error as string, severity: 'error' }),
            );
        }
    }, [currentUser, restaurantsStatus, dispatch]);

    const [restaurantDialogOpen, setRestaurantDialogOpen] = useState(false);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [selectedRestaurant, setSelectedRestaurant] =
        useState<RestaurantType | null>(null);

    const handleAddRestaurant = () => {
        setSelectedRestaurant(null);
        setRestaurantDialogOpen(true);
    };

    const vegFilter = filterTerm === 'veg';
    const nonVegFilter = filterTerm === 'non-veg';

    const filteredRestaurants = restaurantsData.filter(
        (restaurant) =>
            restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!vegFilter && !nonVegFilter
                ? true
                : restaurant.veg === vegFilter &&
                  restaurant.non_veg === nonVegFilter),
    );

    const updateSearchedRestaurants = (term: string) => {
        setSearchTerm(term);
    };

    const updateFilteredRestaurants = (term: string) => {
        setFilterTerm(term);
    };

    const handleEditRestaurant = (restaurant: RestaurantType) => {
        setSelectedRestaurant(restaurant);
        setRestaurantDialogOpen(true);
    };

    const handleOpenDeleteDialog = (restaurant: RestaurantType) => {
        setSelectedRestaurant(restaurant);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteRestaurantDialog = () => {
        setSelectedRestaurant(null);
        setDeleteDialogOpen(false);
    };

    const handleDeleteRestaurant = async (restaurant: RestaurantType) => {
        try {
            await dispatch(deleteRestaurant(restaurant.id)).unwrap();
            setDeleteDialogOpen(false);
            setSelectedRestaurant(null);
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

    const handleCloseRestaurantDialog = () => {
        setRestaurantDialogOpen(false);
        setSelectedRestaurant(null);
    };

    return (
        <ContainerizedBox sx={{ flexGrow: 1 }}>
            <Grid container spacing={4}>
                <Grid size={12} container direction="column" spacing={4}>
                    <Typography fontWeight="700" variant="h3">
                        Discover Restaurants
                    </Typography>
                    <Grid size={12}>
                        <Searchbar onChange={updateSearchedRestaurants} />
                    </Grid>
                    <Grid size={12}>
                        <FilterChips handleChange={updateFilteredRestaurants} />
                    </Grid>
                    {currentUser?.role === 'owner' && (
                        <Grid size={12}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="secondary"
                                onClick={handleAddRestaurant}
                            >
                                Add Restaurant
                            </Button>
                        </Grid>
                    )}
                </Grid>
                {filteredRestaurants.length !== 0 ? (
                    filteredRestaurants.map((restaurantData) => (
                        <Grid
                            key={restaurantData.id}
                            size={{ xs: 12, sm: 6, md: 4 }}
                        >
                            <RestaurantCard
                                restaurantData={restaurantData}
                                onEdit={handleEditRestaurant}
                                onDelete={handleOpenDeleteDialog}
                            />
                        </Grid>
                    ))
                ) : (
                    <Typography
                        variant="h6"
                        textAlign="center"
                        color="secondary.light"
                        width="100%"
                        p={5}
                    >
                        No restaurants available
                    </Typography>
                )}
            </Grid>
            <RestaurantDialog
                open={restaurantDialogOpen}
                mode={selectedRestaurant ? 'edit' : 'add'}
                restaurant={selectedRestaurant ?? undefined}
                onClose={handleCloseRestaurantDialog}
            />
            <DeleteDialog
                open={deleteDialogOpen}
                restaurant={selectedRestaurant}
                onConfirmation={(restaurant) => {
                    void handleDeleteRestaurant(restaurant);
                }}
                onClose={handleCloseDeleteRestaurantDialog}
            />
        </ContainerizedBox>
    );
};

export default Discover;
