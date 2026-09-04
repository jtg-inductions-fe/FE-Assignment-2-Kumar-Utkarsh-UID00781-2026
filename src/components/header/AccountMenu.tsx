import React, { useState } from 'react';

import { Logout } from '@mui/icons-material';
import {
    IconButton,
    ListItemIcon,
    MenuItem,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';

import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { logout } from '@store/slices/auth';

import { MenuAvatar, StyledMenu } from './AccountMenu.styles';

const AccountMenu = () => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state) => state.auth.currentUser);
    const username = currentUser?.username ?? '';
    const usernameInitial = username[0];

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
                    <MenuAvatar>{usernameInitial}</MenuAvatar>
                </IconButton>
            </Tooltip>
            <StyledMenu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
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
            </StyledMenu>
        </>
    );
};

export default AccountMenu;
