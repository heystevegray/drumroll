import { AppBar, Grid, Link, Toolbar, Typography } from '@mui/material';
import { MY_WEBSITE_URL } from 'lib/config';

const Footer = () => {
    return (
        <AppBar position="static" color="transparent">
            <Toolbar>
                <Grid container justifyContent="center" alignItems="center">
                    <Typography textAlign="center">
                        Created by{' '}
                        <Link color="secondary" target="_blank" href={MY_WEBSITE_URL}>
                            Steve Gray
                        </Link>
                    </Typography>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
