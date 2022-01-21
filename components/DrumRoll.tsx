import { Container, Box, Grid, Typography, Button } from '@mui/material';
import { Howl, Howler } from 'howler';
import { useState } from 'react';
import Image from 'next/image';

const drumStart = 'drumroll-start.wav';
const drumLoop = 'drumroll-loop.wav';
const drumEnd = 'drumroll-end.wav';
const fontSize = '4rem';
const spacing = 4;
const defaultEmoji = `😐`;

const DrumRoll = () => {
    const [isRolling, setIsRolling] = useState(false);
    const [emoji, setEmoji] = useState(defaultEmoji);
    const [volume] = useState(0.5);
    const config = {
        volume,
    };

    const startSound = new Howl({
        src: [drumStart],
        ...config,
        onend: function () {
            console.log('Finished start sound!');
            loopSound.play();
        },
    });

    const endSound = new Howl({
        src: [drumEnd],
        ...config,
    });

    const loopSound = new Howl({
        src: [drumLoop],
        loop: true,
        ...config,
    });

    const playAudio = () => {
        setIsRolling(true);
        setEmoji(`👀`);
        startSound.play();
    };

    const stopAudio = () => {
        setIsRolling(false);
        setEmoji(`🎉`);
        Howler.stop();
        endSound.play();
        endSound.fade(0.25, volume, 250);
        setTimeout(() => setEmoji(defaultEmoji), 1500);
    };
    return (
        <Container maxWidth="xs" sx={{ p: 4 }}>
            <Box display="flex" sx={{ paddingTop: 8 }} alignItems="flex-start">
                <Grid container alignItems="center" justifyContent="center" spacing={spacing}>
                    <Grid item xs={12}>
                        <Typography textAlign="center" fontSize={fontSize}>
                            {emoji}
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} alignItems="center" justifyContent="center">
                        <Image
                            width={100}
                            height={100}
                            layout="fixed"
                            src="/android-chrome-192x192.png"
                            alt="drum with drum sticks"
                        />
                    </Grid>
                    <Grid container item xs={12} spacing={2}>
                        <Grid container item xs={6} justifyContent="center">
                            <Button disabled={isRolling} fullWidth variant="contained" onClick={playAudio}>
                                Play
                            </Button>
                        </Grid>
                        <Grid container item xs={6} justifyContent="center">
                            <Button disabled={!isRolling} fullWidth variant="contained" onClick={stopAudio}>
                                Stop
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default DrumRoll;
