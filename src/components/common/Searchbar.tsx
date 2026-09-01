import { useRef, useState } from 'react';

import { Search as SearchIcon } from '@mui/icons-material';
import { InputBase } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 8,
    border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
    backgroundColor: theme.palette.common.white,
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.03),
        border: `1px solid ${theme.palette.secondary.light}`,
    },
    marginRight: theme.spacing(3),
    width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',

    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingBlock: theme.spacing(3),
        paddingLeft: `calc(1em + ${theme.spacing(8)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

interface SearchbarProps {
    onChange: (searchTerm: string) => void;
}

const Searchbar = ({ onChange }: SearchbarProps) => {
    const [searchText, setSearchText] = useState<string>('');
    const timeoutRef = useRef<number | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchText(searchTerm);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            onChange(searchTerm);
        }, 1000);
    };
    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search restaurants…"
                value={searchText}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'search restaurants' }}
            />
        </Search>
    );
};

export default Searchbar;
