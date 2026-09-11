import { Close, Done } from '@mui/icons-material';
import { ButtonGroup, Stack, Typography } from '@mui/material';

type EditStockProps = {
    quantity: number;
    isEditing: boolean;
    isDisabled: boolean;
    handleStockEdit: (newStock: number) => void;
    onIncrement: () => void;
    onDecrement: () => void;
    onChange: (newQuantity: number) => void;
    onClick: () => void;
    onConfirm: () => void;
    onCancel: () => void;
    availableStock: number;
};
import { StyledButton } from './QuantityButton.styles';
import Counter from '../common/Counter';

const EditStockButton = (props: EditStockProps) =>
    props.isEditing ? (
        <ButtonGroup variant="outlined" color="secondary">
            <StyledButton
                size="small"
                color="error"
                onClick={props.onCancel}
                aria-label="Cancel stock change"
            >
                <Close fontSize="small" />
            </StyledButton>
            <Counter
                count={props.quantity}
                minCount={0}
                onChange={props.onChange}
                onIncrement={props.onIncrement}
                onDecrement={props.onDecrement}
            />
            <StyledButton
                color="success"
                onClick={props.onConfirm}
                aria-label="Confirm stock change"
            >
                <Done fontSize="small" />
            </StyledButton>
        </ButtonGroup>
    ) : (
        <Stack gap={1} alignItems="center">
            <StyledButton
                variant="contained"
                color="secondary"
                onClick={props.onClick}
                disabled={props.isDisabled}
                sx={{ width: 197 }}
            >
                <Typography color="white" fontWeight={700}>
                    Edit Stock
                </Typography>
            </StyledButton>
        </Stack>
    );

export default EditStockButton;
