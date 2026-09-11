import { useState } from 'react';

import { Typography } from '@mui/material';

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

import { normalizeTime } from '@utils/normalizeTime';

import {
    BannerContent,
    BannerHeaderContainer,
    BannerImg,
    BannerTextContent,
    StyledBox,
} from '../components/restaurant/RestaurantBanner.styles';

const Banner = (props: BannerProps) => {
    const [imgSrc, setImgSrc] = useState<string>(props.imgSrc);

    const shortAddress = props.address.split(',').slice(-3).join(',');

    return (
        <StyledBox>
            <BannerContent>
                <BannerImg
                    src={imgSrc || imgNotFound}
                    alt={`${props.name}`}
                    onError={() => setImgSrc(imgNotFound)}
                />
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
