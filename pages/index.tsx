import { Button, Container, Grid, Typography, Box, AppBar, Toolbar } from '@mui/material';
import Head from 'next/head';
import { Howl, Howler } from 'howler';
import { useEffect, useState } from 'react';

const drumStart = 'drumroll-start.wav';
const drumLoop = 'drumroll-loop.wav';
const drumEnd = 'drumroll-end.wav';

const min = 1000;
const max = 4000;
const fontSize = '8rem';

export default function Home() {
    const [isRolling, setIsRolling] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const startSound = new Howl({
        src: [drumStart],
        volume,
        onend: function () {
            console.log('Finished start sound!');
            loopSound.play();
        },
    });

    const endSound = new Howl({
        src: [drumEnd],
        volume,
        onend: function () {
            console.log('Finished end sound!');
        },
    });

    const loopSound = new Howl({
        src: [drumLoop],
        loop: true,
        volume,
        onplay: function () {
            console.log('Started loop sound!');
        },
    });

    const playAudio = () => {
        setIsRolling(true);
        startSound.play();
    };

    const stopAudio = () => {
        setIsRolling(false);
        Howler.stop();
        endSound.play();
        endSound.fade(0.25, volume, 250);
    };

    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar>
                        <Typography textAlign="center">drumroll</Typography>
                </Toolbar>
            </AppBar>
        <Container maxWidth="xs" sx={{ p: 4 }}>
            <Box display="flex" height="100vh" alignItems="center">
                <Head>
                    <title>Virturoll</title>
                    <meta name="description" content="Virtual drum roll" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Grid container alignItems="center" justifyContent="center" spacing={2}>
                   
                    <Grid item xs={12}>
                        <Typography
                            textAlign="center"
                            fontSize={fontSize}
                        >
                            {isRolling ? `👀` : `😐`}
                        </Typography>
                        <Typography textAlign="center" fontSize={fontSize}>
                            🥁
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} justifyContent="center">
                        <Button fullWidth variant="contained" onClick={playAudio}>
                            Play
                        </Button>
                    </Grid>
                    <Grid container item xs={12} justifyContent="center">
                        <Button fullWidth variant="contained" onClick={stopAudio}>
                            Stop
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            </Container>
        </>
    );
}
