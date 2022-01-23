import Drawer from '@mui/material/Drawer';
import { Typography, Grid, Container, IconButton } from '@mui/material';
import { Dispatch, SetStateAction, useContext } from 'react';
import ToggleButtons from './ToggleButtons';
import SettingsItem from './SettingsItem';
import Header from './Header';
import { Close } from '@mui/icons-material';
import { AppContext } from 'providers/App';

const Settings = () => {
    const { openSettings, setOpenSettings, defaultGridSpacing } = useContext(AppContext);
    const handleClose = () => setOpenSettings(false);

    return (
        <Drawer elevation={2} anchor="right" open={openSettings} onClose={handleClose}>
            <Container maxWidth="xs" sx={{ p: 2, height: '100%' }}>
                <Grid container spacing={defaultGridSpacing}>
                    <Grid container item xs={12}>
                        <Grid item xs>
                            <Typography variant="h4" component="h2">
                                Settings
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleClose}>
                                <Close />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Header text="General" />
                    </Grid>
                    <Grid item xs={12}>
                        <SettingsItem
                            text="Default drumroll duration"
                            description={
                                <Grid container spacing={defaultGridSpacing}>
                                    <Grid item xs={12}>
                                        <Typography>
                                            Sets the default drumroll duration in seconds. If Infinite is selected, you
                                            will have to stop the drumroll manually with the Stop button.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>
                                            You can also use the Stop button to stop the drumroll before the duration
                                            has expired.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            }
                            component={
                                <Grid container item xs={12}>
                                    <ToggleButtons />
                                </Grid>
                            }
                        />
                    </Grid>
                </Grid>
            </Container>
        </Drawer>
    );
};

export default Settings;
