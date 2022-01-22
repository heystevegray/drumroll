import { createContext, Dispatch, SetStateAction } from 'react';

interface AppProps {
    duration: number;
    setDuration: Dispatch<SetStateAction<number>>;
}

export const initialState: AppProps = {
    duration: -1,
    setDuration: () => {},
};

export const localStorageKey = 'drumroll-settings';

export const AppContext = createContext<AppProps>(initialState);
