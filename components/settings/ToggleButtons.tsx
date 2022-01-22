import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { AppContext, localStorageKey } from 'providers/App';
import { useContext } from 'react';
import { useLocalStorage } from 'react-use';

interface Duration {
    value: number;
    label: string;
}

const durations = [
    {
        value: 3,
        label: '3 seconds',
    },
    {
        value: 5,
        label: '5 seconds',
    },
    {
        value: 10,
        label: '10 seconds',
    },
    {
        value: -1,
        label: 'Infinite',
    },
];

export default function ToggleButtons() {
    const { duration, setDuration } = useContext(AppContext);
    const [localStorageValue, setLocalStorage] = useLocalStorage(localStorageKey, duration);


    const handleAlignment = (event, newAlignment) => {
        setDuration(newAlignment);
        setLocalStorage(newAlignment);
    };

    return (
        <ToggleButtonGroup
            value={localStorageValue || duration}
            exclusive
            onChange={handleAlignment}
            aria-label="Drum roll duration in seconds"
        >
            {durations.map(({ value, label }) => (
                <ToggleButton sx={{ textTransform: 'capitalize' }} key={value} value={value} aria-label={label}>
                    {label}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
}
