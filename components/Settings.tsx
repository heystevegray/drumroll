import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const Settings = ({ open, setOpen }: Props) => {
    return (
        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
            <Typography>Settings</Typography>
        </Drawer>
    );
};

export default Settings;
