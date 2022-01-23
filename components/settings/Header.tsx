import { Grid, Typography, Divider } from '@mui/material';
import { AppContext } from 'providers/App';
import { useContext } from 'react';

interface Props {
    text: string;
}

const Header = ({ text }: Props) => {
    const { defaultGridSpacing } = useContext(AppContext);
    return (
        <Grid container spacing={defaultGridSpacing}>
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
