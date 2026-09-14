import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CardMediaProps,
    Divider,
    Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const FoodItemContainer = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'none',
});

export const FoodItemContent = styled(CardContent)({
    display: 'flex',
    width: '100%',
    padding: 0,
    borderRadius: 0,
});

export const FoodItemTextContent = styled(Stack)(({ theme }) => ({
    flex: 1,
    padding: 0,
    paddingRight: theme.spacing(3),

    '&:last-child': {
        paddingBottom: 0,
    },
}));

export const FoodTypeIcon = styled('img')(({ theme }) => ({
    width: 12,
    [theme.breakpoints.up('md')]: {
        width: 16,
    },
}));

export const FoodImage = styled(CardMedia)<CardMediaProps>(({ theme }) => ({
    height: 120,
    width: 120,
    flexGrow: 0,
    flexShrink: 0,
    objectFit: 'cover',
    borderRadius: '2.8rem',
    [theme.breakpoints.up('sm')]: {
        height: 160,
        width: 160,
    },
    [theme.breakpoints.up('md')]: {
        height: 180,
        width: 180,
    },
}));

export const FoodItemCardActions = styled(CardActions)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    paddingTop: theme.spacing(4),
    paddingInline: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
        paddingTop: 'null',
    },
}));

export const FoodItemCardOwnerActions = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    [theme.breakpoints.up('sm')]: {
        gap: theme.spacing(2),
    },
}));

export const FoodItemDivider = styled(Divider)(({ theme }) => ({
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
}));
