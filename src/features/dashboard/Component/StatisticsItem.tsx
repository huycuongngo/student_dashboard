import { Box, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { createTheme } from '@mui/material/styles';

const theme = createTheme()

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`
  },
})

export interface StatisticsItemProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
}

export default function StatisticsItem({ icon, label, value }: StatisticsItemProps) {
  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <Box>{icon}</Box>
      <Box>
        <Typography variant="h5" align="right">{value}</Typography>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </Paper>
  );
}
