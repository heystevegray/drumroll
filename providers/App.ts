import { createContext, Dispatch, SetStateAction } from 'react';

interface AppProps {
    defaultGridSpacing: number;
    duration: number;
    setDuration: Dispatch<SetStateAction<number>>;
    openSettings: boolean;
    setOpenSettings: Dispatch<SetStateAction<boolean>>;
    isRolling: boolean;
    setIsRolling: Dispatch<SetStateAction<boolean>>;
}

export const infinityValue = -1;
export interface UserSettings {
    duration: number;
}

export const initialUserSettingsState: UserSettings = {
    duration: infinityValue,
};

export const initialAppState: AppProps = {
    defaultGridSpacing: 2,
    duration: initialUserSettingsState.duration || infinityValue,
    setDuration: () => {},
    openSettings: false,
    setOpenSettings: () => {},
    isRolling: false,
    setIsRolling: () => {},
};

export const localStorageKeyGifs = 'drumroll-use-gifs';
export const localStorageKeyDuration = 'drumroll-duration';

export const AppContext = createContext<AppProps>(initialAppState);
