import Drawer from '@mui/material/Drawer';
import { Typography, Grid, Container, IconButton, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useContext, useEffect } from 'react';
import ToggleButtons from './ToggleButtons';
import SettingsItem from './SettingsItem';
import Header from './Header';
import { Close } from '@mui/icons-material';
import { AppContext, localStorageKeyGifs } from 'providers/App';
import { useLocalStorage } from 'react-use';

const Settings = () => {
    const { openSettings, setOpenSettings, defaultGridSpacing, showGifs, setShowGifs } = useContext(AppContext);
    const [_localStorageShowGifs, setLocalStorageShowGifs] = useLocalStorage(localStorageKeyGifs, showGifs);

    const handleUseGifs = () => {
        const newState = !showGifs;
        setShowGifs(newState);
        setLocalStorageShowGifs(newState);
    };

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
                            showDivider
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
                    <Grid item xs={12}>
                        <SettingsItem
                            showDivider
                            text="Show GIFs"
                            description="Shows a random GIF when the drums are rolling. If disabled, you will see the basic user interface."
                            component={
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={showGifs}
                                                onChange={handleUseGifs}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        }
                                        label="Show GIFs"
                                    />
                                </FormGroup>
                            }
                        />
                    </Grid>
                </Grid>
            </Container>
        </Drawer>
    );
};

export default Settings;
