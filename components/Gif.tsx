import { Paper, Link, Grid, Typography } from '@mui/material';
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
        width: 380,
        height: 204,
        alt: 'drum roll Please GIF',
    },
    {
        credit: 'https://giphy.com/gifs/feeder-ItItdif4XcSiSNw9Zh',
        source: 'https://media.giphy.com/media/ItItdif4XcSiSNw9Zh/giphy.gif',
        width: 394,
        height: 394,
        alt: 'drum roll Cat Dog GIF By Feeder',
    },
    {
        credit: 'https://giphy.com/gifs/GBvkxysAR8Svm',
        source: 'https://media.giphy.com/media/GBvkxysAR8Svm/giphy.gif',
        width: 394,
        height: 222,
        alt: 'drum roll Micheal from the Office GIF',
    },
    {
        credit: 'https://giphy.com/gifs/zdfmagazinroyale-XRQn2ueP2wtbdWp2gt',
        source: 'https://media.giphy.com/media/XRQn2ueP2wtbdWp2gt/giphy.gif',
        width: 394,
        height: 394,
        alt: 'drum roll Fun Reaction GIF By ZDF Magazin Royale',
    },
];

const Gif = ({ show }: Props) => {
    const [selectedGif, setSelectedGif] = useState(gifs[0]);
    const { source, width, height, alt, credit } = selectedGif;

    useEffect(() => {
        setSelectedGif(gifs[0]);
    }, []);

    return (
        <Grid container>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                item
                xs={12}
                sx={(theme) => ({
                    border: `2px solid ${theme.palette.primary.main}`,
                })}
            >
                {show ? (
                    <Image alt={alt} src={source} width={width} height={height} />
                ) : (
                    <Paper square sx={{ width, height }} />
                )}
            </Grid>
            <Grid item xs={12} sx={{ paddingRight: 2, p: 2 }}>
                {show ? (
                    <Grid container justifyContent="flex-end">
                        <Link color="secondary" href={credit} target="_blank">
                            Gif Source
                        </Link>
                    </Grid>
                ) : (
                    <Typography textAlign="center">Click Play to begin</Typography>
                )}
            </Grid>
        </Grid>
    );
};

export default Gif;
