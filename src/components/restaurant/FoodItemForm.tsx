import React from 'react';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    TextField,
} from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import {
    FoodItemFormDataType,
    foodItemFormSchema,
    FoodItemType,
} from '@schemas/restaurants.schema';
import { addFoodItem, editFoodItem } from '@store/slices/restaurants';
import { showSnackbar } from '@store/slices/snackbar';

type FoodItemFormProps = {
    mode: 'add' | 'edit';
    foodItem?: FoodItemType;
    onSuccess: () => void;
    onCancel: () => void;
};

const FoodItemForm = ({
    mode,
    foodItem,
    onSuccess,
    onCancel,
}: FoodItemFormProps) => {
    const currentUser = useAppSelector((state) => state.auth.currentUser);
    const currentRestaurant = useAppSelector(
        (state) => state.restaurants.currentRestaurant,
    );
    const dispatch = useAppDispatch();
    const foodItemStatus = useAppSelector(
        (state) => state.restaurants.foodItemStatus,
    );

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<FoodItemFormDataType>({
        resolver: zodResolver(foodItemFormSchema),
        defaultValues: {
            name: '',
            img_src: '',
            description: '',
            type: 'veg',
            stock: 0,
            price: 0,
        },
    });

    React.useEffect(() => {
        if (mode === 'edit' && foodItem) {
            reset({
                name: foodItem.name,
                description: foodItem.description,
                img_src: foodItem.img_src,
                type: foodItem.type,
                stock: foodItem.stock,
                price: foodItem.price,
            });
        }

        if (mode === 'add') {
            reset({
                name: '',
                img_src: '',
                description: '',
                type: 'veg',
                price: 0,
                stock: 0,
            });
        }
    }, [mode, foodItem, reset]);

    const onSubmit: SubmitHandler<FoodItemFormDataType> = async (data) => {
        if (
            !currentUser ||
            !currentRestaurant ||
            currentUser.id !== currentRestaurant.owner_id
        ) {
            return;
        }

        try {
            if (mode === 'add') {
                await dispatch(
                    addFoodItem({
                        ...data,
                        restaurantId: currentRestaurant.id,
                    }),
                ).unwrap();
            } else {
                if (!foodItem) return;

                await dispatch(
                    editFoodItem({
                        ...data,
                        restaurantId: currentRestaurant.id,
                        id: foodItem.id,
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

    const isSubmitting = foodItemStatus === 'pending';

    return (
        <Stack
            component="form"
            spacing={8}
            paddingTop={2}
            onSubmit={(event) => {
                void handleSubmit(onSubmit)(event);
            }}
        >
            <TextField
                label="Item name"
                placeholder="E.g, Pulao"
                fullWidth
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
            />

            <TextField
                label="Description"
                placeholder="Describe the food item"
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
            <Stack direction="row" spacing={2}>
                <TextField
                    label="Price"
                    placeholder="E.g, 50"
                    fullWidth
                    {...register('price', { valueAsNumber: true })}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                />
                <TextField
                    label="Stock"
                    placeholder="E.g, 50"
                    fullWidth
                    {...register('stock', { valueAsNumber: true })}
                    error={!!errors.stock}
                    helperText={errors.stock?.message}
                    slotProps={{
                        htmlInput: {
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                        },
                    }}
                />
            </Stack>
            <FormControl>
                <FormLabel id={'role-label'}>Role</FormLabel>
                <Controller
                    name="type"
                    control={control}
                    rules={{ required: 'Type is required' }}
                    render={({ field }) => (
                        <RadioGroup {...field} row aria-labelledby="role-label">
                            <FormControlLabel
                                value="veg"
                                control={<Radio />}
                                label="Vegetarian"
                            />
                            <FormControlLabel
                                value="non-veg"
                                control={<Radio />}
                                label="Non-vegetarian"
                            />
                        </RadioGroup>
                    )}
                />
                <FormHelperText id={'role-helper-text'} error={!!errors.type}>
                    {errors.type?.message}
                </FormHelperText>
            </FormControl>

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
                    {mode === 'add' ? 'Add Item' : 'Save Changes'}
                </Button>
            </Stack>
        </Stack>
    );
};

export default FoodItemForm;
