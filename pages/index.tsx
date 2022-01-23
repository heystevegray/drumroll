import { Box, useMediaQuery, useTheme } from '@mui/material';
import DrumRoll from 'components/DrumRoll';
import Footer from 'components/Footer';
import Head from 'next/head';
import AppBar from '../components/AppBar';

export default function Home() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    /*
    Get the total heights of the app bars (header and footer).
    App bar size changes based on screen size.
    */

    const totalAppBarHeight = matches ? 112 : 128;

    return (
        <>
            <Head>
                <title>drumroll</title>
                <meta name="description" content="When you need a drumroll on demand 🥁" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box sx={{ height: `calc(100vh - ${totalAppBarHeight}px)` }}>
                <AppBar />
                <Box sx={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <DrumRoll />
                </Box>
                <Footer />
            </Box>
        </>
    );
}
