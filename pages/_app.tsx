import '../styles/globals.css';
import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import theme from '../lib/theme';
import { AppContext, initialAppState, initialUserSettingsState, UserSettings } from 'providers/App';
import useCustomLocalStorage from 'lib/hooks/useLocalStorage';

const App = ({ Component, pageProps }: AppProps) => {
    const { localStorageValue } = useCustomLocalStorage();
    const [duration, setDuration] = useState<UserSettings['duration']>(
        localStorageValue?.duration || initialUserSettingsState.duration
    );
    const [openSettings, setOpenSettings] = useState(false);

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);

    useEffect(() => {
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
                <AppContext.Provider
                    value={{
                        defaultGridSpacing: initialAppState.defaultGridSpacing,
                        duration,
                        setDuration,
                        openSettings,
                        setOpenSettings,
                    }}
                >
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component {...pageProps} />
                </AppContext.Provider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
