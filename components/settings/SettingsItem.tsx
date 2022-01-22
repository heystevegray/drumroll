import { Grid, Typography } from '@mui/material';
import { ReactElement } from 'react';

interface Props {
    component: ReactElement;
    text?: string;
    description?: string | ReactElement;
}

const SettingsItem = ({ text, component, description = '' }: Props) => {
    return (
        <Grid container spacing={2}>
            {text && (
                <Grid item xs={12}>
                    <Typography color="textSecondary" variant="h6" component="h4">
                        {text}
                    </Typography>
                </Grid>
            )}
            <Grid item xs={12}>
                {component}
            </Grid>
            {description && (
                <Grid item xs={12}>
                    <Typography color="textSecondary">{description}</Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default SettingsItem;
