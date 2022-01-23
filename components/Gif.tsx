import { Paper, Link, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Props {
    show: boolean;
}

interface GifProps {
    credit: string;
    source: string;
    width: number;
    height: number;
    alt: string;
}

const gifs: GifProps[] = [
    {
        credit: 'https://giphy.com/gifs/please-drumroll-ogGmxeqA8L3sA',
        source: 'https://media.giphy.com/media/ogGmxeqA8L3sA/giphy.gif',
        width: 394,
        height: 222,
        alt: 'Please GIF',
    },
    {
        credit: 'https://giphy.com/gifs/feeder-ItItdif4XcSiSNw9Zh',
        source: 'https://media.giphy.com/media/ItItdif4XcSiSNw9Zh/giphy.gif',
        width: 394,
        height: 394,
        alt: 'Cat Dog GIF By Feeder',
    },
    {
        credit: 'https://giphy.com/gifs/GBvkxysAR8Svm',
        source: 'https://media.giphy.com/media/GBvkxysAR8Svm/giphy.gif',
        width: 394,
        height: 222,
        alt: 'The Office Drum GIF',
    },
    {
        credit: 'https://giphy.com/gifs/zdfmagazinroyale-XRQn2ueP2wtbdWp2gt',
        source: 'https://media.giphy.com/media/XRQn2ueP2wtbdWp2gt/giphy.gif',
        width: 394,
        height: 394,
        alt: 'Fun Reaction GIF By ZDF Magazin Royale',
    },
    {
        credit: 'https://giphy.com/gifs/Concertgebouw-drum-drumroll-concertgebouw-srZc9418DEY41rNe5K',
        source: 'https://media.giphy.com/media/srZc9418DEY41rNe5K/giphy.gif',
        width: 392,
        height: 392,
        alt: 'Drums GIF By Het Concertgebouw',
    },
    {
        credit: 'https://giphy.com/gifs/suspense-XujzWKelSd5S',
        source: 'https://media.giphy.com/media/XujzWKelSd5S/giphy.gif',
        width: 392,
        height: 206,
        alt: 'Suspense GIF',
    },
];

const Gif = ({ show }: Props) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [selectedGif, setSelectedGif] = useState(gifs[0]);
    const { source, width, height, alt, credit } = selectedGif;
    const mobileOffset = 2;
    const maxGifHeight = 450;
    let maxHeight = isMobile ? maxGifHeight / mobileOffset : maxGifHeight;
    let gifWidth = isMobile ? width / mobileOffset : width;
    let gifHeight = isMobile ? height / mobileOffset : height;
    let drumSize = isMobile ? 50 : 100;

    const shuffleGifs = () => {
        const min = 0;
        const max = gifs.length - 1;
        setSelectedGif(gifs[Math.floor(Math.random() * (max - min + 1)) + min]);
    };

    useEffect(() => {
        if (!show) {
            shuffleGifs();
        }
    }, [show]);

    return (
        <Grid container alignItems="center" justifyContent="center">
            <Paper square sx={{ gifWidth, gifHeight }}>
                <Grid
                    container
                    item
                    xs={12}
                    sx={(theme) => ({
                        minHeight: isMobile ? maxHeight : undefined,
                        border: `2px solid ${theme.palette.primary.main}`,
                    })}
                >
                    {show ? (
                        <Image alt={alt} src={source} width={gifWidth} height={gifHeight} />
                    ) : (
                        <Grid
                            container
                            sx={{ height: isMobile ? undefined : gifHeight, width: gifWidth }}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Image
                                width={drumSize}
                                height={drumSize}
                                layout="fixed"
                                src="/android-chrome-192x192.png"
                                alt="drum with drum sticks"
                            />
                        </Grid>
                    )}
                </Grid>
            </Paper>
            <Grid
                container
                item
                xs={12}
                sx={{ p: 2, maxWidth: isMobile ? undefined : gifWidth }}
                justifyContent="center"
            >
                {show ? (
                    <Grid container item xs={12} justifyContent="center">
                        <Link color="secondary" textAlign="center" href={credit} target="_blank">
                            {alt} Source
                        </Link>
                    </Grid>
                ) : (
                    <Grid item xs={12}>
                        <Typography color="textSecondary" textAlign="center">
                            Click Play to begin
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export default Gif;
