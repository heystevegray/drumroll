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
            paper: '#050505',
        },
    },
});

export default theme;
