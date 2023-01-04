import { Box } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { Header, SideBar, Main } from 'components/Common/index';
import { createTheme } from '@mui/system';
import { Route, Routes } from 'react-router-dom';
import Student from 'features/student';
import Dashboard from 'features/dashboard';

const theme = createTheme()

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr', 
    gridTemplateColumns: '240px 1fr',
    gridTemplateAreas: `"header header"  "sidebar main"`,

    minHeight: '100vh',
  },
  header: {
    gridArea: 'header',
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: '1px solid black',
    backgroundColor: 'white',
  },
  main: {
    gridArea: 'main',
    backgroundColor: 'white',
    padding: theme.spacing(2, 3)
  },
})

export function AdminLayout() {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Box className={classes.header}><Header /></Box>
      <Box className={classes.sidebar}><SideBar /></Box>
      <Box className={classes.main}>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/student/*' element={<Student />} />
        </Routes>
      </Box>
    </Box>
  );
}
