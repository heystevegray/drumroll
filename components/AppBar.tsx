import { GitHub, Settings as SettingsIcon } from '@mui/icons-material';
import { AppBar as MuiAppBar, Toolbar, Typography, Tooltip, IconButton, Grid } from '@mui/material';
import { AppContext } from 'providers/App';
import { useContext } from 'react';
import Settings from './settings/Settings';

const AppBar = () => {
    const { openSettings, setOpenSettings, defaultGridSpacing } = useContext(AppContext);

    return (
        <MuiAppBar position="static">
            <Toolbar>
                <Grid container spacing={defaultGridSpacing} alignItems="center">
                    <Grid item xs sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" noWrap component="h1">
                            drumroll
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Source Code">
                            <IconButton target="_blank" href="https://github.com/heystevegray/drumroll">
                                <GitHub />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Settings">
                            <IconButton onClick={() => setOpenSettings(!openSettings)}>
                                <SettingsIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Toolbar>
            <Settings />
        </MuiAppBar>
    );
};

export default AppBar;
