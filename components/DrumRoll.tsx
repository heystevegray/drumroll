import { PlayArrow, Stop } from '@mui/icons-material';
import { Container, Box, Grid, Typography, Button } from '@mui/material';
import { Howl, Howler } from 'howler';
import { useEffect, useState, useCallback } from 'react';
import Gif from './Gif';

const drumStart = 'drumroll-start.wav';
const drumLoop = 'drumroll-loop.wav';
const drumEnd = 'drumroll-end.wav';
const fontSize = '4rem';
const spacing = 4;
const defaultEmoji = `😐`;

const DrumRoll = () => {
    const [isRolling, setIsRolling] = useState(false);
    const [emoji, setEmoji] = useState(defaultEmoji);
    const [flip, setFlip] = useState(false);
    const [volume] = useState(0.5);
    const config = {
        volume,
    };

    const startSound = new Howl({
        src: [drumStart],
        ...config,
        onend: function () {
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
        setTimeout(() => {
            setEmoji(defaultEmoji);
        }, 2000);
    };

    const handleFlip = useCallback(() => {
        if (isRolling) {
            setFlip(!flip);
        }
    }, [flip, isRolling]);

    useEffect(() => {
        const timerId = setInterval(handleFlip, 1500);
        if (!isRolling) {
            clearInterval(timerId);
        }
        return () => clearInterval(timerId);
    }, [isRolling, handleFlip]);

    return (
        <Container maxWidth="xs" sx={{ p: 4, height: '100%' }}>
            <Box display="flex" sx={{ paddingTop: 8, height: '100%' }} alignItems="flex">
                <Grid container justifyContent="center" spacing={spacing} sx={{ flexGrow: 1 }}>
                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                transform: `scale(${flip ? -1 : 1}, 1)`,
                            }}
                            variant="h2"
                            textAlign="center"
                            fontSize={fontSize}
                        >
                            {emoji}
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} alignItems="center" justifyContent="center" sx={{ flexGrow: 1 }}>
                        <Gif show={isRolling} />
                    </Grid>
                    <Grid container item xs={12} spacing={2} alignItems="flex-end">
                        <Grid container item xs={6} justifyContent="center">
                            <Button
                                disabled={isRolling}
                                fullWidth
                                variant="contained"
                                onClick={playAudio}
                                startIcon={<PlayArrow />}
                            >
                                Play
                            </Button>
                        </Grid>
                        <Grid container item xs={6} justifyContent="center">
                            <Button
                                disabled={!isRolling}
                                fullWidth
                                variant="contained"
                                onClick={stopAudio}
                                startIcon={<Stop />}
                            >
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
