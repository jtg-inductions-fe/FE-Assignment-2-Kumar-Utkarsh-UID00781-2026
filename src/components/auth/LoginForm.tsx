import React from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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

import { login } from '@store/slices/auth';
import { showSnackbar } from '@store/slices/snackbar';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

type LoginInputs = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
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

    const users = useAppSelector((state) => state.auth.users);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const simulateLogin = (data: { email: string; password: string }) => {
        dispatch(login(data));

        const isAuthenticated = users.some(
            (user) =>
                user.email === data.email && user.password === data.password,
        );
        if (isAuthenticated) {
            dispatch(
                showSnackbar({
                    message: 'Logged in successfully',
                    severity: 'success',
                    duration: 3000,
                }),
            );
            navigate('/');
        } else {
            dispatch(
                showSnackbar({
                    message: 'User not found',
                    severity: 'error',
                    duration: 3000,
                }),
            );
        }
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubmit: SubmitHandler<LoginInputs> = (data) => {
        simulateLogin(data);
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
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Invalid email address format',
                        },
                    })}
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
                        {...register('password', {
                            required: 'Password is required',

                            minLength: {
                                value: 6,
                                message:
                                    'Your password must be atleast 6 characters long',
                            },
                            maxLength: {
                                value: 20,
                                message:
                                    'Your password must not exceed 20 characters',
                            },
                        })}
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
                <Button type="submit" variant="contained" color="secondary">
                    Login
                </Button>
                <Stack
                    direction="row"
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Typography variant="body2" color="grey.600">
                        Don&apos;t have an account?
                    </Typography>
                    <RouterLink to="/auth/signup">
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
