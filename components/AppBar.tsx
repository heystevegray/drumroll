import { GitHub, Settings as SettingsIcon } from '@mui/icons-material';
import { AppBar as MuiAppBar, Toolbar, Typography, Tooltip, IconButton, Grid } from '@mui/material';
import { useState } from 'react';
import Settings from './settings/Settings';

const AppBar = () => {
    const [openSettings, setOpenSettings] = useState(false);

    return (
        <MuiAppBar position="static" elevation={0}>
            <Toolbar>
                <Grid container spacing={2} alignItems="center">
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
            <Settings open={openSettings} setOpen={setOpenSettings} />
        </MuiAppBar>
    );
};

export default AppBar;
