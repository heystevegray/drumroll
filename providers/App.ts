import { createContext, Dispatch, SetStateAction } from 'react';

interface AppProps {
    duration: number;
    setDuration: Dispatch<SetStateAction<number>>;
    openSettings: boolean;
    setOpenSettings: Dispatch<SetStateAction<boolean>>;
}

export interface UserSettings {
    duration: number;
}

export const initialUserSettingsState: UserSettings = {
    duration: -1,
};

export const initialState: AppProps = {
    duration: initialUserSettingsState.duration,
    setDuration: () => {},
    openSettings: false,
    setOpenSettings: () => {},
};

export const localStorageKey = 'drumroll-settings';

export const AppContext = createContext<AppProps>(initialState);
