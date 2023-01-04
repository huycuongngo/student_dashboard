import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Student } from 'model';
import { makeStyles } from '@mui/styles';
import { Button, Box } from '@mui/material';
import { createTheme } from '@mui/system';
import { capitallizeString, getMarkNumber } from 'utils';

export interface StudentTableProp {
  studentList: Student[],
  onEdit?: (student: Student) => void
  onRemove?: (student: Student) => void
}

const theme = createTheme()

const useStyle = makeStyles({
  table: {},
  edit: {
    marginRight: theme.spacing(1)
  }
})

export default function StudentTable({ studentList, onEdit, onRemove }: StudentTableProp) {
  const classes = useStyle();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table" >
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
                  <TableCell size="small">{student.city}</TableCell>
                  <TableCell size="small" align="right">
                    <Button className={classes.edit} variant="contained" color="secondary" onClick={() => onEdit?.(student)}>Edit</Button>
                    <Button variant="outlined" color="secondary" onClick={() => onRemove?.(student)}>Remove</Button>
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
