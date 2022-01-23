import { createContext, Dispatch, SetStateAction } from 'react';

interface AppProps {
    defaultGridSpacing: number;
    duration: number | undefined;
    setDuration: Dispatch<SetStateAction<number | undefined>>;
    openSettings: boolean;
    setOpenSettings: Dispatch<SetStateAction<boolean>>;
}

export const infinityValue = -1;
export interface UserSettings {
    duration?: number;
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
};

export const localStorageKey = 'drumroll-settings';

export const AppContext = createContext<AppProps>(initialAppState);
