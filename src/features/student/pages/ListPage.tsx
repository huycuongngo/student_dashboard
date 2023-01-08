import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { selectStudentFilter, selectStudentList, selectStudentLoading, selectStudentPagination, studentActions } from '../studentSlice';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/system';
import StudentTable from '../components/StudentTable';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import StudentFilters from '../components/StudentFilters';
import { ListParams, Student } from 'model';
import studentApi from 'api/studentApi';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

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
  search: {
    marginBottom: theme.spacing(2),
  },
  link: {
    textDecoration: 'none'
  }
})

export default function ListPage() {
  const {pathname} = useLocation()
  const studentList = useAppSelector(selectStudentList)
  const pagination = useAppSelector(selectStudentPagination)
  const filter = useAppSelector(selectStudentFilter)
  const loading = useAppSelector(selectStudentLoading)
  const cityMap = useAppSelector(selectCityMap)
  const cityList = useAppSelector(selectCityList)

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

  const handleSearchChange = (newFilter: ListParams) => {
    // console.log("search change", newFilter)
    dispatch(studentActions.setFilterWithDebouce(newFilter))
  }

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter))
  }

  const handleRemoveStudent = async (student: Student) => {
    try { 
      await studentApi.deleteStudent(student?.id || '')
      toast.success('Delete student successfully!!')
      const newFilter = {...filter}
      dispatch(studentActions.setFilter(newFilter))
    } catch (error) {
      console.log(error)
      //toast error
    }

  }

  const handleEditStudent = (student: Student) => {
    // console.log("handle edit", student)
  }


  return (
    <Box className={classes.root}>
      <div className={classes.loading}>
        {loading && <LinearProgress />}
      </div>

      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Link to={`${pathname}/add`} className={classes.link}>
          <Button variant="contained" color="primary">Add new student</Button>
        </Link>
      </Box>

      {/* Filter */}
      <Box className={classes.search}>
        <StudentFilters
          filter={filter}
          cityList={cityList}
          onSearchChange={handleSearchChange}
          onChange={handleFilterChange} />
      </Box>

      {/* Student List Table */}
      <StudentTable studentList={studentList} cityMap={cityMap} onEdit={handleEditStudent} onRemove={handleRemoveStudent} />

      {/* Pagination */}
      <Box className={classes.pagination}>
        <Stack spacing={2}>
          <Pagination color='primary' count={Math.ceil(pagination._totalRows / pagination._limit)} page={pagination._page} onChange={handlePageChange} />
        </Stack>
      </Box>
    </Box>
  );
}
