import { useEffect, useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { Delete, Edit } from '@mui/icons-material';
import {
    Box,
    CardActionArea,
    IconButton,
    Skeleton,
    Typography,
} from '@mui/material';

import imgNotFound from '@assets/images/imgNotFound.webp';
import nonVegIcon from '@assets/images/non-veg-icon.png';
import vegIcon from '@assets/images/veg-logo.png';
import { ROUTES } from '@constant';
import { useAppSelector } from '@hooks/useAppSelector';
import { RestaurantType } from '@schemas/restaurants.schema';
interface Props {
    restaurantData: RestaurantType;
    onEdit: (restaurantData: RestaurantType) => void;
    onDelete: (restaurantData: RestaurantType) => void;
}
import {
    FoodTypeBadgeStack,
    FoodTypeIcon,
    OwnerCardActions,
    ResponsiveFlexWrapper,
    StyledCard,
    StyledCardContent,
    StyledCardMedia,
} from '@components/discover/RestaurantCard.styles';

const RestaurantCard = ({ restaurantData, onEdit, onDelete }: Props) => {
    const [imgSrc, setImgSrc] = useState<string>(restaurantData.img_src);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const currentUser = useAppSelector((state) => state.auth.currentUser);

    useEffect(() => {
        setImgSrc(restaurantData.img_src);
        setIsLoaded(false);
    }, [restaurantData.img_src]);
    const isOwner = currentUser?.role === 'owner';
    return (
        <StyledCard variant="outlined" component="article">
            <CardActionArea
                component={RouterLink}
                to={`${ROUTES.RESTAURANT}/${restaurantData.id}`}
            >
                <ResponsiveFlexWrapper>
                    <Box position="relative">
                        <StyledCardMedia
                            component="img"
                            image={imgSrc}
                            title={`${restaurantData.name} `}
                            onLoad={() => setIsLoaded(true)}
                            onError={() => {
                                setImgSrc(imgNotFound);
                                setIsLoaded(true);
                            }}
                        />
                        {!isLoaded && (
                            <Skeleton
                                variant="rounded"
                                sx={{
                                    borderRadius: '2.8rem',
                                    position: 'absolute',
                                    inset: 0,
                                    height: '100%',
                                }}
                            />
                        )}
                        {isLoaded && (
                            <FoodTypeBadgeStack>
                                {restaurantData.veg && (
                                    <FoodTypeIcon
                                        src={vegIcon}
                                        alt="Vegetarian"
                                    />
                                )}
                                {restaurantData.non_veg && (
                                    <FoodTypeIcon
                                        src={nonVegIcon}
                                        alt="Non vegetarian"
                                    />
                                )}
                            </FoodTypeBadgeStack>
                        )}
                    </Box>
                    <StyledCardContent>
                        <Typography
                            variant="h5"
                            component="h3"
                            fontWeight={700}
                            mb={1}
                            sx={(theme) => ({ ...theme.mixins.lineClamp(1) })}
                        >
                            {restaurantData.name}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="grey.600"
                            sx={(theme) => ({ ...theme.mixins.lineClamp(3) })}
                        >
                            {restaurantData.description}
                        </Typography>
                    </StyledCardContent>
                </ResponsiveFlexWrapper>
            </CardActionArea>
            {isOwner && (
                <OwnerCardActions>
                    <IconButton
                        aria-label="edit restaurant"
                        color="secondary"
                        onClick={(event) => {
                            event.stopPropagation();
                            onEdit(restaurantData);
                        }}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        aria-label="delete restaurant"
                        color="error"
                        onClick={(event) => {
                            event.stopPropagation();
                            onDelete(restaurantData);
                        }}
                    >
                        <Delete />
                    </IconButton>
                </OwnerCardActions>
            )}
        </StyledCard>
    );
};
export default RestaurantCard;
