import { Button, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { createTheme } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authAction } from '../authSlice';
import { useNavigate } from "react-router-dom";

const theme = createTheme()

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
  },
  box: {
    padding: theme.spacing(3),
  }
})

export default function LoginPage() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLogging = useAppSelector(state => state.auth.logging)

  const handleLoginClick = () => {
    //get username+pwd from form login
    dispatch(authAction.login({
      username: '',
      password: '',
      onSuccess: () => {
        navigate("/admin/dashboard")
      },
      onError: () => {
        navigate("/login")
      }
    }))
  }

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant='h5' component='h1'>Student Management</Typography>
        <Box mt={4}> 
          <Button fullWidth variant='contained' color='primary' onClick={handleLoginClick}>
            {isLogging &&  <CircularProgress size={20} color="secondary" />} &nbsp;
            Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
