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
import { signup } from '@store/slices/auth';
import { showSnackbar } from '@store/slices/snackbar';

type SingupInputs = {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
    role: 'customer' | 'owner';
};

const SignupForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const users = useAppSelector((state) => state.auth.users);
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

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm<SingupInputs>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            role: 'customer',
        },
    });
    const onSubmit: SubmitHandler<SingupInputs> = (data) => {
        simulateSignup(data);
    };

    /**
     * Dispatches signup action from auth slice to update users state if validation succeeds
     * Upon success / failure, notifies the user with a snackbar
     *
     * @param {{
     *         username: string;
     *         email: string;
     *         password: string;
     *         role: 'customer' | 'owner';
     *     }} data : The form data
     */
    const simulateSignup = (data: {
        username: string;
        email: string;
        password: string;
        role: 'customer' | 'owner';
    }) => {
        const alreadyExists: boolean = users.some(
            (user) => data.email === user.email,
        );
        dispatch(signup(data));

        if (!alreadyExists) {
            dispatch(
                showSnackbar({
                    message: 'Signed up successfully',
                    severity: 'success',
                    duration: 3000,
                }),
            );
            navigate(ROUTES.LOGIN);
        } else {
            dispatch(
                showSnackbar({
                    message: 'User with this email already exists',
                    severity: 'error',
                    duration: 3000,
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
                <TextField
                    label="Username"
                    placeholder="Enter your username (no spaces)"
                    fullWidth
                    {...register('username', {
                        required: 'Username is required',
                        pattern: {
                            value: /^[0-9A-Za-z]+$/,
                            message: 'Invalid email address format',
                        },
                        minLength: {
                            value: 6,
                            message:
                                'Username must be at least 6 character long',
                        },
                        maxLength: {
                            value: 16,
                            message: 'Username must not exceed 20 characters',
                        },
                    })}
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
                        {...register('password', {
                            required: 'Password is required',

                            minLength: {
                                value: 6,
                                message:
                                    'Password must be at least 6 characters long',
                            },
                            maxLength: {
                                value: 20,
                                message:
                                    'Password must not exceed 20 characters',
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
                <FormControl variant="outlined">
                    <InputLabel htmlFor="confirm-password">
                        Confirm Password
                    </InputLabel>
                    <OutlinedInput
                        id="vonfirm-password"
                        fullWidth
                        placeholder="Re-enter your password"
                        type={showPassword ? 'text' : 'password'}
                        {...register('confirm_password', {
                            required: 'Confirm password is required',
                            validate: (val: string) => {
                                if (watch('password') != val) {
                                    return 'Passwords do no match';
                                }
                            },
                        })}
                        error={!!errors.confirm_password}
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
                        label="Confirm Password"
                    />
                    <FormHelperText
                        id={`confirm_password-helper-text`}
                        error={!!errors.confirm_password}
                    >
                        {errors.confirm_password?.message}
                    </FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel id={`role-label`}>Role</FormLabel>
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
                        id={`role-helper-text`}
                        error={!!errors.role}
                    >
                        {errors.role?.message}
                    </FormHelperText>
                </FormControl>
                <Button type="submit" variant="contained" color="secondary">
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
