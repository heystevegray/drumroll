import Drawer from '@mui/material/Drawer';
import { Typography, Grid, Container, Divider } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import ToggleButtons from './ToggleButtons';

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const Settings = ({ open, setOpen }: Props) => {
    return (
        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
            <Container sx={{ p: 2 }} maxWidth="xs">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h2">
                            Settings
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid container item xs={12} justifyContent="center" spacing={2}>
                        <Grid item xs={12}>
                            Default drumroll length
                        </Grid>
                        <Grid item xs={12}>
                            <ToggleButtons />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Drawer>
    );
};

export default Settings;
