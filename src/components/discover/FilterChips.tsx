import { useState } from 'react';

import { Chip, Stack } from '@mui/material';

interface FilterChipsProps {
    handleChange: (filterTerm: string) => void;
}

const FilterChips = ({ handleChange }: FilterChipsProps) => {
    const [vegSelected, setVegSelected] = useState<boolean>(false);
    const [nonVegSelected, setNonVegSelected] = useState<boolean>(false);
    const handleClick = (filterType: string) => {
        if (filterType === 'veg') {
            setVegSelected(true);
            setNonVegSelected(false);
            handleChange('veg');
        } else if (filterType === 'non-veg') {
            setNonVegSelected(true);
            setVegSelected(false);
            handleChange('non-veg');
        }
    };

    const handleChipDelete = (filterType: string) => {
        if (filterType === 'veg') {
            setVegSelected(false);
        } else if (filterType === 'non-veg') {
            setNonVegSelected(false);
        }
        handleChange('');
    };

    return (
        <Stack direction="row" spacing={1}>
            <Chip
                label="Veg"
                color="success"
                variant="outlined"
                onClick={() => handleClick('veg')}
                onDelete={
                    vegSelected ? () => handleChipDelete('veg') : undefined
                }
            />
            <Chip
                label="Non-veg"
                color="error"
                variant="outlined"
                onClick={() => handleClick('non-veg')}
                onDelete={
                    nonVegSelected
                        ? () => handleChipDelete('non-veg')
                        : undefined
                }
            />
        </Stack>
    );
};

export default FilterChips;
