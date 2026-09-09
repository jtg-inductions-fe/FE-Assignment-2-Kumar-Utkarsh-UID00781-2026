import React from 'react';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Stack,
    TextField,
} from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import {
    RestaurantFormDataType,
    restaurantFormSchema,
    RestaurantType,
} from '@schemas/restaurants.schema';
import { addRestaurant, editRestaurant } from '@store/slices/restaurants';
import { showSnackbar } from '@store/slices/snackbar';
interface RestaurantFormProps {
    mode: 'add' | 'edit';
    restaurant?: RestaurantType;
    onSuccess: () => void;
    onCancel: () => void;
}

const RestaurantForm = ({
    mode,
    restaurant,
    onSuccess,
    onCancel,
}: RestaurantFormProps) => {
    // ...

    const currentUser = useAppSelector((state) => state.auth.currentUser);
    const dispatch = useAppDispatch();
    const restaurantsStatus = useAppSelector(
        (state) => state.restaurants.status,
    );

    const isSubmitting = restaurantsStatus === 'pending';

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<RestaurantFormDataType>({
        resolver: zodResolver(restaurantFormSchema),
        defaultValues: {
            name: '',
            img_src: '',
            description: '',
            veg: false,
            non_veg: false,
            address: '',
            open_timing: '',
            close_timing: '',
        },
    });
    React.useEffect(() => {
        if (mode === 'edit' && restaurant) {
            reset({
                name: restaurant.name,
                description: restaurant.description,
                img_src: restaurant.img_src,
                veg: restaurant.veg,
                non_veg: restaurant.non_veg,
                open_timing: restaurant.store_timings.open,
                close_timing: restaurant.store_timings.close,
                address: restaurant.address,
            });
        }

        if (mode === 'add') {
            reset({
                name: '',
                description: '',
                img_src: '',
                veg: false,
                non_veg: false,
                open_timing: '',
                close_timing: '',
                address: '',
            });
        }
    }, [mode, restaurant, reset]);

    const onSubmit: SubmitHandler<RestaurantFormDataType> = async (data) => {
        if (!currentUser || currentUser.role !== 'owner') {
            return;
        }

        try {
            if (mode === 'add') {
                await dispatch(
                    addRestaurant({
                        ...data,
                    }),
                ).unwrap();
            } else {
                if (!restaurant) return;

                await dispatch(
                    editRestaurant({
                        ...data,
                        id: restaurant.id,
                    }),
                ).unwrap();
            }

            onSuccess();
        } catch (error) {
            dispatch(
                showSnackbar({
                    message:
                        (error as string) ?? `Could not ${mode} restaurant`,
                    severity: 'error',
                }),
            );
        }
    };
    return (
        <Stack
            component="form"
            spacing={8}
            paddingBlock={2}
            onSubmit={(event) => {
                void handleSubmit(onSubmit)(event);
            }}
        >
            <TextField
                label="Restaurant name"
                placeholder="Enter restaurant name"
                fullWidth
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
            />

            <TextField
                label="Description"
                placeholder="Describe your restaurant"
                fullWidth
                multiline
                rows={4}
                {...register('description')}
                error={!!errors.description}
                helperText={errors.description?.message}
            />

            <TextField
                label="Image URL"
                placeholder="https://..."
                fullWidth
                {...register('img_src')}
                error={!!errors.img_src}
                helperText={errors.img_src?.message}
            />

            <FormGroup>
                <Controller
                    name="veg"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={field.value}
                                    onChange={(event) =>
                                        field.onChange(event.target.checked)
                                    }
                                />
                            }
                            label="Veg"
                        />
                    )}
                />
                <Controller
                    name="non_veg"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={field.value}
                                    onChange={(event) =>
                                        field.onChange(event.target.checked)
                                    }
                                />
                            }
                            label="Non-Veg"
                        />
                    )}
                />
            </FormGroup>

            <Stack direction="row" spacing={4}>
                <TextField
                    label="Opening time"
                    type="time"
                    fullWidth
                    {...register('open_timing')}
                    error={!!errors.open_timing}
                    helperText={errors.open_timing?.message}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />

                <TextField
                    label="Closing time"
                    type="time"
                    fullWidth
                    {...register('close_timing')}
                    error={!!errors.close_timing}
                    helperText={errors.close_timing?.message}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />
            </Stack>

            <TextField
                label="Address"
                placeholder="Enter restaurant address"
                fullWidth
                multiline
                rows={3}
                {...register('address')}
                error={!!errors.address}
                helperText={errors.address?.message}
            />

            <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button
                    type="button"
                    color="secondary"
                    variant="outlined"
                    onClick={onCancel}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    loading={isSubmitting}
                >
                    {mode === 'add' ? 'Add Restaurant' : 'Save Changes'}
                </Button>
            </Stack>
        </Stack>
    );
};

export default RestaurantForm;
