import GitHubIcon from '@mui/icons-material/GitHub';
import { AppBar as MuiAppBar, Toolbar, Typography, Tooltip, IconButton } from '@mui/material';

const AppBar = () => {
    return (
        <MuiAppBar position="static">
            <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
                    drumroll
                </Typography>
                <Tooltip title="Source Code">
                    <IconButton target="_blank" href="https://github.com/heystevegray/drumroll">
                        <GitHubIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </MuiAppBar>
    );
};

export default AppBar;
