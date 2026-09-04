import {
    Box,
    Card,
    CardContent,
    CardMedia,
    CardMediaProps,
    CardProps,
    Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)<CardProps>(() => ({
    height: '100%',
    padding: 8,
    borderRadius: '3.2rem',
}));

const ResponsiveFlexWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'column',
    },
}));

const StyledCardMedia = styled(CardMedia)<CardMediaProps>(({ theme }) => ({
    width: 'auto',
    height: '110px',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    objectPosition: 'center',
    borderRadius: '2.8rem',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
        width: '100%',
        height: 'auto',
    },
}));

const FoodTypeBadgeStack = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    gap: theme.spacing(1),
    backgroundColor: 'white',
    borderEndStartRadius: 8,
    position: 'absolute',
    top: 0,
    right: 0,
    paddingInline: theme.spacing(1),
    paddingBlock: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
        paddingInline: theme.spacing(2),
        paddingBlock: theme.spacing(2),
    },
}));

const FoodTypeIcon = styled('img')(({ theme }) => ({
    width: 12,
    [theme.breakpoints.up('md')]: {
        width: 16,
    },
    [theme.breakpoints.up('lg')]: {
        width: 20,
    },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    paddingBlock: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
        paddingBlock: theme.spacing(4),
    },
    [theme.breakpoints.up('lg')]: {
        paddingBlock: theme.spacing(8),
    },
    '&:last-child': {
        paddingBottom: 0,
        [theme.breakpoints.up('sm')]: {
            paddingBottom: theme.spacing(6),
        },
    },
}));

const OwnerCardActions = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing(3),
}));

export {
    StyledCard,
    StyledCardContent,
    StyledCardMedia,
    OwnerCardActions,
    FoodTypeBadgeStack,
    FoodTypeIcon,
    ResponsiveFlexWrapper,
};
