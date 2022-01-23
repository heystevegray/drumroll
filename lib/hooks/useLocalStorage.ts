import { UserSettings, initialUserSettingsState, localStorageKey } from 'providers/App';
import { useLocalStorage } from 'react-use';

interface StorageProps {
    localStorageValue: UserSettings | undefined;
    setCustomStorage: (value: Partial<UserSettings>) => void;
}

const useCustomLocalStorage = (): StorageProps => {
    const [localStorageValue, setLocalStorage] = useLocalStorage<UserSettings>(
        localStorageKey,
        initialUserSettingsState
    );

    const setCustomStorage = (value: Partial<UserSettings>) => {
        setLocalStorage({ ...initialUserSettingsState, ...localStorageValue, ...value });
    };

    return { localStorageValue, setCustomStorage };
};

export default useCustomLocalStorage;
