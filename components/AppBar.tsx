import { GitHub } from '@mui/icons-material';
import { AppBar as MuiAppBar, Toolbar, Typography, Tooltip, IconButton } from '@mui/material';

const AppBar = () => {
    return (
        <MuiAppBar position="static">
            <Toolbar>
                <Typography variant="h6" noWrap component="h1" sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
                    drumroll
                </Typography>
                <Tooltip title="Source Code">
                    <IconButton target="_blank" href="https://github.com/heystevegray/drumroll">
                        <GitHub />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </MuiAppBar>
    );
};

export default AppBar;
