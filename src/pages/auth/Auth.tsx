import { Outlet } from 'react-router-dom';

import { FormPaper, StyledAuthContainer } from './Auth.styles';

const Auth = () => (
    <StyledAuthContainer>
        <FormPaper variant="outlined">
            <Outlet />
        </FormPaper>
    </StyledAuthContainer>
);

export default Auth;
