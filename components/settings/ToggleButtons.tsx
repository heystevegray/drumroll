import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import useCustomLocalStorage from 'lib/hooks/useLocalStorage';
import { AppContext } from 'providers/App';
import { useContext } from 'react';

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
    const { localStorageValue, setCustomStorage } = useCustomLocalStorage();

    const handleAlignment = (event, newAlignment) => {
        setDuration(newAlignment);
        setCustomStorage({ duration: newAlignment });
    };

    return (
        <ToggleButtonGroup
            value={localStorageValue?.duration || duration}
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
