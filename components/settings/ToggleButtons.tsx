import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import useCustomLocalStorage from 'lib/hooks/useLocalStorage';
import { AppContext, infinityValue, localStorageKeyDuration } from 'providers/App';
import { useContext, MouseEvent } from 'react';
import { useLocalStorage } from 'react-use';

interface Duration {
    value: number;
    label: string;
}

const durations: Duration[] = [
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
        value: infinityValue,
        label: 'Infinite',
    },
];

export default function ToggleButtons() {
    const { duration, setDuration, isRolling } = useContext(AppContext);
    const [localStorageDuration, setLocalStorageDuration] = useLocalStorage(localStorageKeyDuration, duration);

    const handleDuration = (_event: MouseEvent<HTMLElement>, value: number) => {
        const newDuration = value ? value : infinityValue;
        setDuration(newDuration);
        setLocalStorageDuration(newDuration);
    };

    return (
        <ToggleButtonGroup
            value={localStorageDuration}
            exclusive
            disabled={isRolling}
            onChange={handleDuration}
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
