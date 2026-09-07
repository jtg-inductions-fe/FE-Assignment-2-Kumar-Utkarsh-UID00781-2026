import { useEffect, useState } from 'react';

import { Box, BoxProps, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import imgNotFound from '@assets/images/imgNotFound.webp';
import { theme as muiTheme } from '@theme';

const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
    borderRadius: 32,
    padding: theme.spacing(4),
    backgroundColor: theme.palette.secondary.main,
}));

const BannerImg = styled('img')(() => ({
    borderRadius: 16,
    objectFit: 'cover',
    aspectRatio: '4 / 3',
    width: '100%',
    [muiTheme.breakpoints.up('sm')]: {
        width: '200px',
    },
    [muiTheme.breakpoints.up('md')]: {
        width: '400px',
    },
    [muiTheme.breakpoints.up('lg')]: {
        width: '540px',
    },
}));

const BannerContent = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(8),
    [muiTheme.breakpoints.up('sm')]: {
        flexDirection: 'row',
    },
}));

const BannerTextContent = styled(Stack)(({ theme }) => ({
    paddingBlock: theme.spacing(4),
    gap: theme.spacing(4),
    [muiTheme.breakpoints.up('md')]: {
        gap: theme.spacing(8),
    },
}));

const BannerHeaderContainer = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(1),
}));

type BannerProps = {
    name: string;
    description: string;
    imgSrc: string;
    address: string;
    openTiming: string;
    closeTiming: string;
};

const normalizeTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const meridian = parseInt(hours) > 12 ? 'PM' : 'AM';
    const numericHours = parseInt(hours);
    const normalizedHours =
        numericHours > 12 ? numericHours - 12 : numericHours;

    return `${normalizedHours}:${minutes} ${meridian}`;
};

const Banner = (props: BannerProps) => {
    const [imgSrc, setImgSrc] = useState<string>(props.imgSrc);
    useEffect(() => {
        setImgSrc(props.imgSrc);
    }, [props.imgSrc]);

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
                            color={muiTheme.palette.secondary.contrastText}
                        >
                            {props.name}
                        </Typography>
                        <Typography
                            variant="body1"
                            component="p"
                            fontWeight={500}
                            color={muiTheme.palette.grey[600]}
                        >
                            {shortAddress} &nbsp;&nbsp;&bull;&nbsp;&nbsp;
                            {normalizeTime(props.openTiming)} -{' '}
                            {normalizeTime(props.closeTiming)}
                        </Typography>
                    </BannerHeaderContainer>
                    <Typography color={muiTheme.palette.secondary.contrastText}>
                        {props.description}
                    </Typography>
                </BannerTextContent>
            </BannerContent>
        </StyledBox>
    );
};

export default Banner;
