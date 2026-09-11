import { ButtonGroup, ButtonProps, Typography } from '@mui/material';

import Counter from '@components/common/Counter';

import { StyledButton } from './QuantityButton.styles';

type AddToCartProps = {
    quantity: number;
    availableStock: number;
    onAdd: () => void;
    onIncrement: () => void;
    onDecrement: () => void;
    onChange: (quantity: number) => void;
};

const AddToCartButton = (props: AddToCartProps & ButtonProps) => {
    if (props.availableStock <= 0) {
        return (
            <StyledButton variant="contained" disabled sx={{ width: 140 }}>
                <Typography color="white" fontWeight={700}>
                    Out of Stock
                </Typography>
            </StyledButton>
        );
    }

    if (props.quantity === 0) {
        return (
            <StyledButton
                variant="contained"
                onClick={props.onAdd}
                sx={{ width: 120 }}
            >
                <Typography color="white" fontWeight={700}>
                    Add
                </Typography>
            </StyledButton>
        );
    }

    return (
        <ButtonGroup variant="outlined" color="primary">
            <Counter
                count={props.quantity}
                minCount={0}
                maxCount={props.availableStock}
                onIncrement={props.onIncrement}
                onDecrement={props.onDecrement}
                onChange={props.onChange}
            />
        </ButtonGroup>
    );
};

export default AddToCartButton;
