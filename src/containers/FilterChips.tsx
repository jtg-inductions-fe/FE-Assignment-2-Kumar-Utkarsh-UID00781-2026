import { useState } from 'react';

import { Chip, Stack } from '@mui/material';

interface FilterChipsProps {
    handleChange: (filterTerm: string) => void;
}

const FilterChips = ({ handleChange }: FilterChipsProps) => {
    const [vegSelected, setVegSelected] = useState<boolean>(false);
    const [nonVegSelected, setNonVegSelected] = useState<boolean>(false);
    /**
     * Selects the passed filter and deselects the other for exclusive selection between veg and non-veg filters.
     * Both filters cannot be active at the same time as it is equivalent to having no filters.
     * @param filterType - {string}: The filter that is clicked
     */
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

    /**
     * Triggers when the close button is clicked on a filter and unsets its filter
     * @param filterType - {string}: The filter to be deleted
     */
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
