import { Grid, Typography, Divider } from '@mui/material';

interface Props {
    text: string;
}

const Header = ({ text }: Props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" component="h3">
                    {text}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Header;
