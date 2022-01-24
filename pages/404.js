import { Container, Typography, Grid } from '@mui/material';
import Head from 'next/head';
import Link from 'components/Link';

const Custom404 = () => {
    return (
        <Container sx={{ paddingTop: 10 }}>
            <Head>
                <title>404 | drumroll</title>
                <meta name="description" content="Ooof you're off beat 🥁" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                    <Typography textAlign="center" variant="h1">
                        404{' '}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography textAlign="center" variant="h4" component="h2">
                        {`Ooof you're off beat 🥁`}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography textAlign="center" variant="h5" component="h3">
                        👋 This is not the page you are looking for...
                    </Typography>
                </Grid>
                <Grid container item xs={12} justifyContent="center">
                    <Link href="/" color="secondary" label='Go Back' />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Custom404;
