import { Link as RouterLink } from 'react-router-dom';

import { Button, Grid2 as Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { ROUTES } from '@constant';

const CenteringGrid = styled(Grid)(({ theme }) => ({
    minHeight: '100dvh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(12),
}));

const StyledLink = styled(RouterLink)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.secondary.main,
}));

const NotFound = () => (
    <CenteringGrid container size={12}>
        <Grid size={12}>
            <Stack alignItems="center" spacing={8}>
                <Stack spacing={2}>
                    <Typography variant="h1" color="primary" textAlign="center">
                        404
                    </Typography>
                    <Typography
                        variant="h6"
                        component="p"
                        color="secondary"
                        textAlign="center"
                    >
                        The page you&apos;re looking for does not exist.
                    </Typography>
                </Stack>
                <Button
                    component={StyledLink}
                    to={ROUTES.HOME}
                    variant="contained"
                >
                    Back to Home
                </Button>
            </Stack>
        </Grid>
    </CenteringGrid>
);

export default NotFound;
