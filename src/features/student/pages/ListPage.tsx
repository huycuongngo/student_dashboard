import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { selectStudentFilter, selectStudentList, selectStudentLoading, selectStudentPagination, studentActions } from '../studentSlice';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/system';
import StudentTable from '../components/StudentTable';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const theme = createTheme()

const useStyle = makeStyles({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(4)
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',

    marginTop: theme.spacing(2),
  },
})

export default function ListPage() {
  const studentList = useAppSelector(selectStudentList)
  const pagination = useAppSelector(selectStudentPagination)
  const filter = useAppSelector(selectStudentFilter)
  const loading = useAppSelector(selectStudentLoading)
  
  const dispatch = useAppDispatch()
  const classes = useStyle()


  useEffect(() => { 
    dispatch(studentActions.fetchStudentList(filter))
  }, [dispatch, filter])

  const handlePageChange = (e: any, page: number) => {
    dispatch(studentActions.setFilter({
      ...filter,
      _page: page
    }))
  }


  return (
    <Box className={classes.root}>
      <div className={classes.loading}>
        {loading && <LinearProgress />}
      </div>

      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Button variant="contained" color="primary">Add new student</Button>
      </Box>

      {/* Student List Table */}
      <StudentTable studentList={studentList} />

      {/* Pagination */}
      <Box className={classes.pagination}>
        <Stack spacing={2}>
          <Pagination color='primary' count={Math.ceil(pagination._totalRows / pagination._limit)} page={pagination._page} onChange={handlePageChange} />
        </Stack>
      </Box>
    </Box>
  );
}
