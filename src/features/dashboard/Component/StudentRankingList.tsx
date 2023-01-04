import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Student } from 'model';
import { makeStyles } from '@mui/styles';

export interface StudentRankingListProp {
  studentList: Student[],
}


const useStyles = makeStyles({
  table: {},
})

export default function StudentRankingList({ studentList }: StudentRankingListProp) {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell size="small" align="left">#</TableCell>
            <TableCell size="small" align="left">Name</TableCell>
            <TableCell size="small" align="right">Mark</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            studentList.map((student, idx) => {
              if (student.hasOwnProperty("data")) {
                return (
                <TableRow key={student.id}>
                  <TableCell size="small" align='left'>{idx + 1}</TableCell>
                  <TableCell size="small" align='left'>{student.data?.name}</TableCell>
                  <TableCell size="small" align='right'>{student.data?.mark}</TableCell>
                  </TableRow>
                )
              } else {
                return (
                <TableRow key={student.id}>
                  <TableCell size="small" align='left'>{idx + 1}</TableCell>
                  <TableCell size="small" align='left'>{student.name}</TableCell>
                  <TableCell size="small" align='right'>{student.mark}</TableCell>
                  </TableRow>
                )
              }
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
