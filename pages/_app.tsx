import '../styles/globals.css';
import { useEffect, useMemo, useState } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Analytics } from '@vercel/analytics/react';

import theme from '../lib/theme';
import {
    AppContext,
    initialAppState,
    initialUserSettingsState,
    localStorageKeyDuration,
    UserSettings,
} from 'providers/App';
import { useLocalStorage } from 'react-use';

export const isDevelopmentEnvironment = () => process?.env?.NODE_ENV === 'development';

const App = ({ Component, pageProps }: AppProps) => {
    const [isRolling, setIsRolling] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);

    // Use localStorageValue if it exists, otherwise use initialUserSettingsState
    const [durationInitialState] = useLocalStorage(localStorageKeyDuration, initialUserSettingsState.duration);
    const [duration, setDuration] = useState<UserSettings['duration']>(
        durationInitialState || initialUserSettingsState.duration
    );

    const memoAppState = useMemo(
        () => ({
            defaultGridSpacing: initialAppState.defaultGridSpacing,
            duration,
            setDuration,
            openSettings,
            setOpenSettings,
            isRolling,
            setIsRolling,
        }),
        [duration, isRolling, openSettings]
    );

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function () {
                navigator.serviceWorker.register('/service-worker.js').then(
                    function (registration) {
                        console.log('Service Worker registration successful with scope: ', registration.scope);
                    },
                    function (err) {
                        console.log('Service Worker registration failed: ', err);
                    }
                );
            });
        }
    }, []);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <AppContext.Provider value={memoAppState}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component {...pageProps} />
                    {isDevelopmentEnvironment() ? null : <Analytics />}
                </AppContext.Provider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
