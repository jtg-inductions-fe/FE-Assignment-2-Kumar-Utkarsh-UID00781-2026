import { Link as RouterLink } from 'react-router-dom';

import { Box, Link, Typography } from '@mui/material';

import CompanyLogo from '@assets/images/company-logo.png';
import { ROUTES } from '@constant';
import { useAppSelector } from '@hooks/useAppSelector';

import AccountMenu from './AccountMenu';
import CartButton from './CartButton';
import {
    HeaderContainer,
    HeaderLogoContainer,
    HeaderLogoImgWrapper,
} from './Header.styles';

const Header = () => {
    const currentUser = useAppSelector((state) => state.auth.currentUser);
    const isCustomer = currentUser?.role === 'customer';
    return (
        <HeaderContainer>
            <Link
                component={RouterLink}
                to={ROUTES.HOME}
                color="inherit"
                underline="none"
            >
                <HeaderLogoContainer>
                    <HeaderLogoImgWrapper>
                        <img
                            src={CompanyLogo}
                            alt="Foodiee Logo"
                            width="100%"
                        />
                    </HeaderLogoImgWrapper>

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        component="span"
                        color="text.main"
                        letterSpacing="-0.05rem"
                    >
                        Foodiee
                    </Typography>
                </HeaderLogoContainer>
            </Link>
            <Box>
                {isCustomer && <CartButton />}
                <AccountMenu />
            </Box>
        </HeaderContainer>
    );
};

export default Header;
