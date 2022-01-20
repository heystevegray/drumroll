import { Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Virturoll</title>
                <meta name="description" content="Virtual drum roll" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Grid container>
                <Container maxWidth="md">
                    <Grid item xs={12}>
                        <Typography>Drumroll</Typography>
                    </Grid>
                </Container>
            </Grid>
        </div>
    );
}
