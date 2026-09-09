import { Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useAppSelector } from '@hooks/useAppSelector';

const StyledButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(3),
    ...theme.typography.body2,
}));

type UpdateStatusButtonProps = {
    onUpdate: (newStatus?: string) => void;
    currStatus: string;
};

const ButtonsContainer = styled(Stack)(({ theme }) => ({
    flexDirection: 'column',
    gap: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
    },
}));

const UpdateStatusButton = ({
    onUpdate,
    currStatus,
}: UpdateStatusButtonProps) => {
    const updateStatus = useAppSelector((state) => state.orders.updateStatus);
    const isUpdating = updateStatus === 'pending';

    const handleUpdate = (newStatus?: string) => {
        onUpdate(newStatus);
    };
    return (
        <>
            {currStatus === 'pending' ? (
                <ButtonsContainer>
                    <StyledButton
                        disabled={isUpdating}
                        variant="contained"
                        color="success"
                        onClick={() => handleUpdate('accepted')}
                    >
                        Accept
                    </StyledButton>
                    <StyledButton
                        disabled={isUpdating}
                        variant="contained"
                        color="error"
                        onClick={() => handleUpdate('rejected')}
                    >
                        Reject
                    </StyledButton>
                </ButtonsContainer>
            ) : (
                <StyledButton
                    disabled={
                        isUpdating ||
                        currStatus === 'rejected' ||
                        currStatus === 'delivered'
                    }
                    variant="contained"
                    color="secondary"
                    onClick={() => handleUpdate()}
                >
                    Advance Status
                </StyledButton>
            )}
        </>
    );
};

export default UpdateStatusButton;
