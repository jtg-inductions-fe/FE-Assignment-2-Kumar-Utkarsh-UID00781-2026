import FormPaper from 'components/common/FormPaper';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

const Auth = () => (
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100dvh"
        sx={{ backgroundColor: 'grey.200' }}
    >
        <FormPaper variant="outlined">
            <Outlet />
        </FormPaper>
    </Box>
);

export default Auth;
