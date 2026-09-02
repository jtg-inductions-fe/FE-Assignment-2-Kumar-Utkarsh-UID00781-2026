import React from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    Link,
    OutlinedInput,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { ROUTES } from '@constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginDataType, loginSchema } from '@schemas/auth.schema';
import { login } from '@store/slices/auth';
import { showSnackbar } from '@store/slices/snackbar';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

const LoginForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authStatus = useAppSelector((state) => state.auth.status);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

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

    const isAuthenticating = authStatus === 'pending';

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginDataType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    /**
     * Dispatches login action from auth slice to update currentUser state if verification succeeds
     * Upon success / failure, notifies the user with a snackbar
     * @param {{ email: string; password: string }} data: The form data
     */
    const onSubmit: SubmitHandler<LoginDataType> = async (
        data: LoginDataType,
    ) => {
        try {
            await dispatch(login(data)).unwrap();

            dispatch(
                showSnackbar({
                    message: 'Logged in successfully',
                    severity: 'success',
                }),
            );

            navigate('/');
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
                Login
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
                        id={`password-helper-text`}
                        error={!!errors.password}
                    >
                        {errors.password?.message}
                    </FormHelperText>
                </FormControl>
                <Button
                    type="submit"
                    loading={isAuthenticating}
                    variant="contained"
                    color="secondary"
                >
                    Login
                </Button>
                <Stack
                    direction="row"
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Typography variant="body2" color="grey.600">
                        Don&apos;t have an account?
                    </Typography>
                    <RouterLink to={ROUTES.SIGNUP}>
                        <Link component="div">
                            <Typography variant="body2">Sign up</Typography>
                        </Link>
                    </RouterLink>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default LoginForm;
