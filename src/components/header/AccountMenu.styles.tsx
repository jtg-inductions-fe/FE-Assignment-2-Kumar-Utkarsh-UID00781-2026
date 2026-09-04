import { Avatar, Menu, MenuProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const MenuAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    fontWeight: 700,
}));

const StyledMenu = styled(Menu)<MenuProps>(({ theme }) => ({
    '& .MuiMenu-paper': {
        minWidth: 300,
        boxShadow: 'none',
        overflow: 'visible',
        borderRadius: 16,
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.2))',
        marginTop: theme.spacing(1.5),
        padding: theme.spacing(4),
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
            backgroundColor: theme.palette.background.paper,
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
}));

export { MenuAvatar, StyledMenu };
