import { Button, Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import { Howl } from 'howler';

const drumStart = 'drumroll-start.wav';
const drumLoop = 'drumroll-loop.wav';
const drumEnd = 'drumroll-end.wav';

export default function Home() {
    const sound = new Howl({
        // src: [drumStart, drumLoop, drumEnd],
        src: [drumEnd],
        // autoplay: true,
        // loop: true,
        volume: 0.5,
        onend: function () {
            console.log('Finished!');
        },
    });

    const playAudio = () => {
        console.log('Play!');
        console.log({ sound });
        sound.play();
    };

    return (
        <div>
            <Head>
                <title>Virturoll</title>
                <meta name="description" content="Virtual drum roll" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container maxWidth="xs" sx={{ p: 4 }}>
                <Grid container alignItems="center" justifyContent="center">
                    <Grid item xs={12}>
                        <Typography textAlign="center">Drumroll</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography textAlign="center" fontSize="6rem">
                            🥁
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} justifyContent="center">
                        <Button fullWidth variant="contained" onClick={playAudio}>
                            Play
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
