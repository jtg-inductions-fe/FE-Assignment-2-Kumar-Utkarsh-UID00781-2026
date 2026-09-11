import { Add, Remove } from '@mui/icons-material';

type CounterProps = {
    count: number;
    maxCount?: number;
    minCount?: number;
    onIncrement: () => void;
    onDecrement: () => void;
    onChange: (count: number) => void;
};

import {
    QuantityField,
    StyledButton,
} from '../restaurant/QuantityButton.styles';

const Counter = (props: CounterProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value === '' ? 0 : parseInt(e.target.value);

        if (isNaN(newValue)) return;
        if (props.maxCount !== undefined && newValue > props.maxCount) return;
        if (props.minCount !== undefined && newValue < props.minCount) return;

        props.onChange(newValue);
    };
    return (
        <>
            <StyledButton
                onClick={props.onDecrement}
                disabled={
                    props.minCount !== undefined &&
                    props.count <= props.minCount
                }
                aria-label="Decrement quantity"
            >
                <Remove fontSize="small" />
            </StyledButton>
            <QuantityField
                value={props.count}
                onChange={handleChange}
                slotProps={{
                    htmlInput: {
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                    },
                }}
            />
            <StyledButton
                onClick={props.onIncrement}
                aria-label="Increment quantity"
                disabled={
                    props.maxCount !== undefined &&
                    props.count >= props.maxCount
                }
            >
                <Add fontSize="small" />
            </StyledButton>
        </>
    );
};

export default Counter;
