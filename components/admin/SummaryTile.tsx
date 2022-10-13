import {
  Card, CardContent, Grid, Typography,
} from '@mui/material';
import React, { FC, ReactNode } from 'react';

interface Props {
  title: string | number;
  subtitle: string;
  icon: ReactNode;
}

export const SummaryTile: FC<Props> = ({ title, subtitle, icon }) => (
  <Grid item xs={12} sm={4} md={3}>
    <Card variant="outlined" sx={{ display: 'flex', px: 2 }}>
      <CardContent sx={{
        width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
      >
        {icon}
      </CardContent>
      <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h3" component="h3">{title}</Typography>
        <Typography variant="caption">{subtitle}</Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default SummaryTile;
