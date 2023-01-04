import { Paper, Typography, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export interface WidgetProps {
  title: string;
  children: React.ReactElement;
}

const theme = createTheme()

const useStyles = makeStyles({
  root: {
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    height: '100%',
  },
}) 

export default function Widget({ title, children }: WidgetProps) {
  const classes = useStyles();


  return (
    <Paper className = {classes.root}>
      <Typography variant='button'>{title}</Typography>
      <Box mt={2}>
        {children}
      </Box>
    </Paper>
  );
}
