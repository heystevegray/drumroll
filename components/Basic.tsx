import { Container, Box, Grid, Typography } from '@mui/material';
import { useEffect, useState, useCallback, useContext } from 'react';
import Image from 'next/image';
import { AppContext } from 'providers/App';

const defaultEmoji = `😐`;

const Basic = () => {
    const { isRolling, defaultGridSpacing } = useContext(AppContext);
    const [emoji, setEmoji] = useState(defaultEmoji);
    const [flip, setFlip] = useState(false);

    const handleFlip = useCallback(() => {
        if (isRolling) {
            setFlip(!flip);
        }
    }, [flip, isRolling]);

    useEffect(() => {
        const timerId = setInterval(handleFlip, 1500);

        if (isRolling) {
            setEmoji(`👀`);
        } else {
            setEmoji(`🎉`);
            setTimeout(() => {
                setEmoji(defaultEmoji);
            }, 2000);
            clearInterval(timerId);
        }

        return () => clearInterval(timerId);
    }, [isRolling, handleFlip]);

    useEffect(() => {
        setEmoji(defaultEmoji);
    }, []);

    return (
        <Container maxWidth="xs" sx={{ p: 4 }}>
            <Box display="flex" sx={{ paddingTop: 8 }} alignItems="flex-start">
                <Grid container alignItems="center" justifyContent="center" spacing={defaultGridSpacing}>
                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                transform: `scale(${flip ? -1 : 1}, 1)`,
                            }}
                            variant="h2"
                            textAlign="center"
                            fontSize="4rem"
                        >
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
                </Grid>
            </Box>
        </Container>
    );
};

export default Basic;
