import React from 'react';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    IconButton,
    InputAdornment,
    InputLabel,
    Link,
    OutlinedInput,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { ROUTES } from '@constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupDataType, signupSchema } from '@schemas/auth.schema';
import { signup } from '@store/slices/auth';
import { showSnackbar } from '@store/slices/snackbar';

const SignupForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authState = useAppSelector((state) => state.auth.status);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    const isSigningUp = authState === 'pending';

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<SignupDataType>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            role: 'customer',
        },
    });

    /**
     * Dispatches signup action from auth slice to update users state if validation succeeds
     * Upon success / failure, notifies the user with a snackbar
     *
     * @param {SignupDataType} data : The signup form data
     */
    const onSubmit: SubmitHandler<SignupDataType> = async (
        data: SignupDataType,
    ) => {
        try {
            await dispatch(signup(data)).unwrap();

            dispatch(
                showSnackbar({
                    message: 'Signed up successfully',
                    severity: 'success',
                }),
            );
            navigate(ROUTES.LOGIN);
        } catch (error) {
            dispatch(
                showSnackbar({
                    message: error as string,
                    severity: 'error',
                }),
            );
        }
    };

    return (
        <Stack spacing={10}>
            <Typography variant="h4" component="h1">
                Signup
            </Typography>
            <Stack
                component="form"
                spacing={8}
                onSubmit={(event) => {
                    void handleSubmit(onSubmit)(event);
                }}
            >
                <TextField
                    label="Email"
                    placeholder="foodie@example.com"
                    fullWidth
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    label="Username"
                    placeholder="Enter your username (no spaces)"
                    fullWidth
                    {...register('username')}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                />
                <FormControl variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        fullWidth
                        placeholder="Enter your password"
                        type={showPassword ? 'text' : 'password'}
                        {...register('password')}
                        error={!!errors.password}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword
                                            ? 'hide the password'
                                            : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                    <FormHelperText
                        id={'password-helper-text'}
                        error={!!errors.password}
                    >
                        {errors.password?.message}
                    </FormHelperText>
                </FormControl>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="confirm-password">
                        Confirm Password
                    </InputLabel>
                    <OutlinedInput
                        id="confirm-password"
                        fullWidth
                        placeholder="Re-enter your password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...register('confirmPassword')}
                        error={!!errors.confirmPassword}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showConfirmPassword
                                            ? 'hide the password'
                                            : 'display the password'
                                    }
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showConfirmPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Confirm Password"
                    />
                    <FormHelperText
                        id={'confirm_password-helper-text'}
                        error={!!errors.confirmPassword}
                    >
                        {errors.confirmPassword?.message}
                    </FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel id={'role-label'}>Role</FormLabel>
                    <Controller
                        name="role"
                        control={control}
                        rules={{ required: 'Role is required' }}
                        render={({ field }) => (
                            <RadioGroup
                                {...field}
                                row
                                aria-labelledby="role-label"
                            >
                                <FormControlLabel
                                    value="customer"
                                    control={<Radio />}
                                    label="Customer"
                                />
                                <FormControlLabel
                                    value="owner"
                                    control={<Radio />}
                                    label="Owner"
                                />
                            </RadioGroup>
                        )}
                    />
                    <FormHelperText
                        id={'role-helper-text'}
                        error={!!errors.role}
                    >
                        {errors.role?.message}
                    </FormHelperText>
                </FormControl>
                <Button
                    loading={isSigningUp}
                    type="submit"
                    variant="contained"
                    color="secondary"
                >
                    Sign up
                </Button>
                <Stack
                    direction="row"
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Typography variant="body2" color="grey.600">
                        Already have an account?
                    </Typography>
                    <RouterLink to={ROUTES.LOGIN}>
                        <Link component="div">
                            <Typography variant="body2">Log in</Typography>
                        </Link>
                    </RouterLink>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default SignupForm;
