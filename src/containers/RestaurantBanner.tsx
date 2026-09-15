import { useState } from 'react';

import { Box, Skeleton, Typography } from '@mui/material';

import imgNotFound from '@assets/images/imgNotFound.webp';
import { theme } from '@theme';

type BannerProps = {
    name: string;
    description: string;
    imgSrc: string;
    address: string;
    openTiming: string;
    closeTiming: string;
};

import {
    BannerContent,
    BannerHeaderContainer,
    BannerImg,
    BannerTextContent,
    StyledBox,
} from '@components/restaurant/RestaurantBanner.styles';
import { normalizeTime } from '@utils/normalizeTime';

const Banner = (props: BannerProps) => {
    const [imgSrc, setImgSrc] = useState<string>(props.imgSrc);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const shortAddress = props.address.split(',').slice(-3).join(',');

    return (
        <StyledBox>
            <BannerContent>
                <Box position="relative">
                    <BannerImg
                        src={imgSrc || imgNotFound}
                        alt={`${props.name}`}
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
                                borderRadius: 4,
                                position: 'absolute',
                                inset: 0,
                                height: '100%',
                            }}
                        />
                    )}
                </Box>
                <BannerTextContent>
                    <BannerHeaderContainer>
                        <Typography
                            variant="h3"
                            component="h1"
                            color={theme.palette.secondary.contrastText}
                        >
                            {props.name}
                        </Typography>
                        <Typography
                            variant="body1"
                            component="p"
                            fontWeight={500}
                            color={theme.palette.grey[600]}
                        >
                            {shortAddress} &nbsp;&nbsp;&bull;&nbsp;&nbsp;
                            {normalizeTime(props.openTiming)}&nbsp;-&nbsp;
                            {normalizeTime(props.closeTiming)}
                        </Typography>
                    </BannerHeaderContainer>
                    <Typography color={theme.palette.secondary.contrastText}>
                        {props.description}
                    </Typography>
                </BannerTextContent>
            </BannerContent>
        </StyledBox>
    );
};

export default Banner;
