import { PlayArrow, Stop } from '@mui/icons-material';
import { Container, Grid, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { Howl, Howler } from 'howler';
import { AppContext, infinityValue } from 'providers/App';
import { useEffect, useState, useContext, useCallback } from 'react';
import Basic from './Basic';

const drumStart = 'drumroll-start.wav';
const drumLoop = 'drumroll-loop.wav';
const drumEnd = 'drumroll-end.wav';

const DrumRoll = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const { duration, setOpenSettings, defaultGridSpacing, isRolling, setIsRolling } = useContext(AppContext);
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
        if (duration > 0) {
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
        startSound().play();

        handleDurationTimeout();
    };

    const reset = useCallback(() => {
        // Reset the timer.
        setTimer(duration);
    }, [duration]);

    const stopAudio = useCallback(() => {
        // Stop the audio.
        Howler.stop();

        // Play the end sound
        endSound().fade(volume, 1, 250).play();

        setTimer(0);
        setIsRolling(false);

        // If the interval is set, clear it
        if (rollInterval) {
            clearInterval(rollInterval);
            console.log(`Cleared interval ${rollInterval}`);
        }

        // Wait a bit then reset the UI
        setTimeout(() => {
            reset();
        }, 2000);
    }, [endSound, volume, setIsRolling, rollInterval, reset]);

    useEffect(() => {
        if (timer === 0) {
            if (isRolling) {
                stopAudio();
                setRollInterval(null);
            }
        }
    }, [duration, isRolling, rollInterval, stopAudio, timer]);

    useEffect(() => {
        // Reset the duration if the settings change
        if (!isRolling && timer !== duration) {
            setTimer(duration);
        }

        if (duration === infinityValue) {
            setHelperText(`Drumroll duration set to infinite. Configure the settings below or let the good times roll.`);
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
        <Container maxWidth="xs" sx={{ height: '100%' }}>
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
                        <Basic />
                    </Grid>
                </Grid>
                <Grid container item justifyContent="center" alignItems="center" spacing={defaultGridSpacing}>
                    <Grid
                        container
                        item
                        spacing={defaultGridSpacing}
                        sx={{ marginBottom: isLargeScreen ? 4 : 0 }}
                        justifyContent="center"
                    >
                        <Grid container item md={10} justifyContent="center">
                            <Typography textAlign="center">{helperText}</Typography>
                        </Grid>
                        <Grid container item xs={12} justifyContent="center">
                            <Button color="secondary" onClick={() => setOpenSettings(true)}>
                                Configure Settings
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
