import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { City, Student } from 'model';
import { Button, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/system';
import { capitallizeString, getMarkNumber } from 'utils';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, useLocation } from 'react-router-dom';


export interface StudentTableProp {
  studentList: Student[],
  cityMap: {
    [key: string]: City
  }
  onEdit?: (student: Student) => void
  onRemove?: (student: Student) => void
}

const theme = createTheme()

const useStyle = makeStyles({
  table: {},
  edit: {
    display: 'flex',
    justifyContent: 'space-between',

    width: '70%',
    marginLeft: 'auto'
  },
  link: {
    textDecoration: 'none'
  }
})

export default function StudentTable({ studentList, cityMap, onEdit, onRemove }: StudentTableProp) {
  const {pathname} = useLocation()
  const classes = useStyle();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>()

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = (student: Student) => { 
    setSelectedStudent(student)
    setOpen(true)
  }

  const handleDeleteConfirm = (student: Student) => {
    // call onRemove
    onRemove?.(student)
    setOpen(false)
  }
  

  return (
    <>
      <TableContainer>
        <Table aria-label="simple table" >
          <TableHead>
            <TableRow>
              <TableCell size="small">ID</TableCell>
              <TableCell size="small">Name</TableCell>
              <TableCell size="small">Gender</TableCell>
              <TableCell size="small">Mark</TableCell>
              <TableCell size="small">City</TableCell>
              <TableCell size="small" align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              studentList.map((student, idx) => {
                return (
                  <TableRow key={student.id}>
                    <TableCell size="small">{student.id}</TableCell>
                    <TableCell size="small">{student.name}</TableCell>
                    <TableCell size="small">{capitallizeString(student.gender)}</TableCell>
                    <TableCell size="small">
                      <Box color={getMarkNumber(student.mark)} fontWeight="bold">
                        {student.mark}
                      </Box>
                    </TableCell>
                    <TableCell size="small">{cityMap[student.city]?.name}</TableCell>
                    <TableCell size="small" align="right">
                      <Box className={classes.edit}>
                        <Link to={`${pathname}/${student.id}`} className={classes.link}>
                          <Button variant="contained" color="secondary" onClick={() => onEdit?.(student)}>Edit</Button>
                        </Link>
                        <Button variant="outlined" color="secondary" onClick={() => handleDeleteClick(student)}>Remove</Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>

      {/* Remove dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete student?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are you sure to delete student named "${selectedStudent?.name}"`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' variant='outlined'>Cancel</Button>
          <Button onClick={() => handleDeleteConfirm(selectedStudent as Student)}
            autoFocus color='secondary' variant='contained'>Delete</Button> 
        </DialogActions>
      </Dialog>
    </>
  );
}
