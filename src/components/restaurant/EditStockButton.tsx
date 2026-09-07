import { useEffect, useState } from 'react';

import { Add, Close, Done, Remove } from '@mui/icons-material';
import {
    Button,
    ButtonGroup,
    ButtonProps,
    Stack,
    TextField,
    TextFieldProps,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { useAppSelector } from '@hooks/useAppSelector';

type EditStockProps = {
    handleStockEdit: (newStock: number) => void;
    availableStock: number;
};

const QuantityField = styled(TextField)<TextFieldProps>(({ theme }) => ({
    height: '100%',
    '&.MuiTextField-root': {
        padding: 0,
    },
    '& .MuiOutlinedInput-root': {
        height: '100%',
        borderRadius: 0,
        width: 40,
    },
    '& .MuiOutlinedInput-input': {
        ...theme.typography.body1,
        fontWeight: 700,
        paddingBlock: theme.spacing(3.4),
        paddingInline: 0,
        textAlign: 'center',
    },
}));

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
    width: 40,
    padding: theme.spacing(3),
}));

const EditStockButton = ({
    availableStock,
    handleStockEdit,
}: EditStockProps) => {
    const [quantity, setQuantity] = useState<number>(availableStock);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const foodItemStatus = useAppSelector(
        (state) => state.restaurants.foodItemStatus,
    );

    useEffect(() => {
        setQuantity(availableStock);
    }, [availableStock]);

    const handleClick = () => {
        setIsEditing((prev) => !prev);
    };

    const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };
    const handleDecrement = () => {
        setQuantity((prevQuantity) => prevQuantity - 1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setQuantity(0);
            return;
        }
        setQuantity(parseInt(e.target.value));
    };

    const handleConfirm = () => {
        handleStockEdit(quantity);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setQuantity(availableStock);
    };
    const isLoading = foodItemStatus === 'pending';
    return (
        <>
            {isEditing ? (
                <>
                    <ButtonGroup variant="outlined" color="secondary">
                        <StyledButton
                            size="small"
                            color="error"
                            onClick={handleCancel}
                            aria-label="Cancel stock change"
                        >
                            <Close fontSize="small" />
                        </StyledButton>
                        <StyledButton
                            onClick={handleDecrement}
                            disabled={quantity === 0}
                            aria-label="Decrement stock quantity"
                        >
                            <Remove fontSize="small" />
                        </StyledButton>
                        <QuantityField
                            value={quantity}
                            onChange={handleChange}
                            slotProps={{
                                htmlInput: {
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                },
                            }}
                        />
                        <StyledButton
                            onClick={handleIncrement}
                            aria-label="Increment stock quantity"
                        >
                            <Add fontSize="small" />
                        </StyledButton>
                        <StyledButton
                            color="success"
                            onClick={handleConfirm}
                            aria-label="Confirm stock change"
                        >
                            <Done fontSize="small" />
                        </StyledButton>
                    </ButtonGroup>
                </>
            ) : (
                <Stack gap={1} alignItems="center">
                    <StyledButton
                        variant="contained"
                        color="secondary"
                        onClick={handleClick}
                        disabled={isLoading}
                        sx={{ width: 197 }}
                    >
                        <Typography color="white" fontWeight={700}>
                            Edit Stock
                        </Typography>
                    </StyledButton>
                </Stack>
            )}
        </>
    );
};

export default EditStockButton;
