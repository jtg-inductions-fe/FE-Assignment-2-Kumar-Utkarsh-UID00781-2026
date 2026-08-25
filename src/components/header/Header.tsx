import { Link as RouterLink } from 'react-router-dom';

import { Box, Link, Typography } from '@mui/material';

import CompanyLogo from '@assets/images/company-logo.png';
import { ROUTES } from '@constant';

import AccountMenu from './AccountMenu';
import CartButton from './CartButton';

const Header = () => (
    <Box
        position="sticky"
        top="0"
        className="header"
        sx={{
            display: 'flex',
            backgroundColor: 'background.paper',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: { xs: 4, md: 8 },
        }}
    >
        <Link
            component={RouterLink}
            to={ROUTES.HOME}
            color="inherit"
            underline="none"
        >
            <Box
                className="header__logo-container"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 2, md: 3, lg: 4 },
                }}
            >
                <Box
                    className="header__logo-img-container"
                    sx={{
                        borderRadius: '100%',
                        overflow: 'hidden',
                        width: { xs: '4rem', md: '4.8rem', lg: '5.6rem' },
                        aspectRatio: '1 / 1',
                    }}
                >
                    <img src={CompanyLogo} alt="Foodiee Logo" width="100%" />
                </Box>

                <Typography
                    sx={{
                        fontSize: { xs: '2.8rem', md: '3.2rem', lg: '3.6rem' },
                    }}
                    fontWeight="bold"
                    component="span"
                    color="text.main"
                    letterSpacing="-0.05rem"
                >
                    Foodiee
                </Typography>
            </Box>
        </Link>
        <Box>
            <CartButton />
            <AccountMenu />
        </Box>
    </Box>
);

export default Header;
