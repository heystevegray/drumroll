import { PlayArrow, Stop } from '@mui/icons-material';
import { Container, Grid, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { Howl, Howler } from 'howler';
import { AppContext, infinityValue } from 'providers/App';
import { useEffect, useState, useContext, useCallback } from 'react';
import Gif from './Gif';

const drumStart = 'drumroll-start.wav';
const drumLoop = 'drumroll-loop.wav';
const drumEnd = 'drumroll-end.wav';
const fontSize = '4rem';
const defaultEmoji = `😐`;

const DrumRoll = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const { duration, setOpenSettings, defaultGridSpacing, isRolling, setIsRolling } = useContext(AppContext);
    const [emoji, setEmoji] = useState(defaultEmoji);
    const [flip, setFlip] = useState(false);
    const [timer, setTimer] = useState(duration || 0);
    const [helperText, setHelperText] = useState('');
    const [rollInterval, setRollInterval] = useState<NodeJS.Timer | null>(null);
    const [volume] = useState(0.5);
    const config = useCallback(() => {
        return {
            volume,
        };
    }, [volume]);

    const loopSound = useCallback(() => {
        return new Howl({
            src: [drumLoop],
            loop: true,
            ...config,
        });
    }, [config]);

    const startSound = useCallback(() => {
        return new Howl({
            src: [drumStart],
            ...config,
            onend: function () {
                loopSound().play();
            },
        });
    }, [config, loopSound]);

    const endSound = useCallback(() => {
        return new Howl({
            src: [drumEnd],
            ...config,
        });
    }, [config]);

    const handleDurationTimeout = () => {
        if (duration && duration > 0) {
            // Start the countdown timer.
            setTimer(duration);
            setRollInterval(
                setInterval(() => {
                    setTimer((previousTime) => previousTime - 1);
                }, 1000)
            );
        }
    };

    const playAudio = () => {
        setIsRolling(true);
        setEmoji(`👀`);
        startSound().play();

        handleDurationTimeout();
    };

    const reset = useCallback(() => {
        setEmoji(defaultEmoji);
        if (duration) {
            // Reset the timer.
            setTimer(duration);
        }
    }, [duration]);

    const stopAudio = useCallback(() => {
        // Stop the audio.
        Howler.stop();

        // Play the end sound
        endSound().fade(volume, 1, 250).play();

        setTimer(0);
        setIsRolling(false);
        setEmoji(`🎉`);

        // If the interval is set, clear it
        if (rollInterval) {
            clearInterval(rollInterval);
            console.log(`Cleared interval ${rollInterval}`);
        }

        // Wait a bit then reset the UI
        setTimeout(() => {
            reset();
        }, 2000);
    }, [rollInterval, endSound, volume, reset]);

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

    useEffect(() => {
        if (timer === 0) {
            if (isRolling) {
                console.log('Stopping audio in useEffect....');
                stopAudio();
                setRollInterval(null);
            }
        }
    }, [duration, isRolling, rollInterval, stopAudio, timer]);

    useEffect(() => {
        // Reset the duration if the settings change
        if (!isRolling && duration && timer !== duration) {
            setTimer(duration);
        }

        if (duration === infinityValue) {
            setHelperText(`Duration set to infinite. Let the good times roll.`);
        } else {
            setHelperText(`Rolling for ${timer} seconds`);
        }
    }, [duration, isRolling, timer]);

    useEffect(() => {
        startSound().load();
        loopSound().load();
        endSound().load();
        return () => {
            startSound().unload();
            loopSound().unload();
            endSound().unload();
        };
    }, [endSound, loopSound, startSound]);

    return (
        <Container maxWidth="xs" sx={{ p: 2, height: '100%' }}>
            <Grid
                container
                spacing={defaultGridSpacing}
                sx={{ height: isLargeScreen ? '80%' : '90%' }}
                alignItems="flex-end"
            >
                <Grid
                    container
                    item
                    xs={12}
                    alignItems={'flex-end'}
                    justifyContent="center"
                    spacing={defaultGridSpacing}
                >
                    <Grid item xs={12} sx={{ height: '100%' }}>
                        <Gif />
                    </Grid>
                </Grid>
                <Grid container item justifyContent="center" alignItems="center" spacing={defaultGridSpacing}>
                    <Grid container spacing={defaultGridSpacing} sx={{ marginBottom: isLargeScreen ? 4 : 0 }}>
                        <Grid item xs={12}>
                            <Typography textAlign="center">{helperText}</Typography>
                        </Grid>
                        <Grid container item xs={12} justifyContent="center">
                            <Button color="secondary" onClick={() => setOpenSettings(true)}>
                                Configure
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={defaultGridSpacing} alignItems="flex-end">
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
            </Grid>
        </Container>
    );
};

export default DrumRoll;
