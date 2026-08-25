import React, { useState } from 'react';

import { Logout } from '@mui/icons-material';
import {
    Avatar,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';

import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { logout } from '@store/slices/auth';

const AccountMenu = () => {
    const currentUser = useAppSelector((state) => state.auth.currentUser);
    const username = currentUser?.username ?? '';
    const dispatch = useAppDispatch();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        setAnchorEl(null);
        dispatch(logout());
    };
    return (
        <>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar
                        sx={{
                            backgroundColor: 'primary.main',
                            fontWeight: '700',
                        }}
                    >
                        {username[0]}
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ minWidth: '300px' }}
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            minWidth: '300px',
                            p: 4,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 12,
                                height: 12,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Stack>
                        <Typography variant="h6">
                            Logged in as: {username} <br />
                        </Typography>
                        <Typography variant="body1">
                            Role: {currentUser?.role}
                        </Typography>
                    </Stack>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default AccountMenu;
