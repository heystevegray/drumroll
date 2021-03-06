import { Divider, Grid, Typography } from '@mui/material';
import { AppContext } from 'providers/App';
import { ReactElement, useContext } from 'react';

interface Props {
    component: ReactElement;
    text?: string;
    description?: string | ReactElement;
    showDivider?: boolean;
}

const SettingsItem = ({ text, component, description = '', showDivider = false }: Props) => {
    const { defaultGridSpacing } = useContext(AppContext);
    return (
        <Grid container spacing={defaultGridSpacing}>
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
            {showDivider && (
                <Grid item xs={12}>
                    <Divider />
                </Grid>
            )}
        </Grid>
    );
};

export default SettingsItem;
