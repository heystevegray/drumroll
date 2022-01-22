import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#A1000A',
        },
        secondary: {
            main: '#FA5050',
        },
        background: {
            default: '#000',
            paper: '#1a1a1a',
        },
    },
});

export default theme;
