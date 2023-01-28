import { ChevronLeft } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import studentApi from 'api/studentApi';
import { Student } from 'model';
import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { toast } from 'react-toastify';


export default function AddEditPage() {
  const navigate = useNavigate()
  const { studentId } = useParams<{ studentId: string }>()
  const isEdit = Boolean(studentId)
  const [student, setStudent] = useState<Student>()
  
  useEffect(() => {
    if (!studentId) return;

    (async () => {
      try {
        const data: Student = await studentApi.getStudentById(studentId)
        setStudent(data)
      } catch (error) {
        console.log('Failed to fetch student details',error)
      } 
    })()
  }, [studentId])


  const handleStudentFormSubmit = async (formValues: Student) => {
    if (isEdit) {
      await studentApi.updateStudent(formValues)
      toast.success('Update student successfully')

    } else {
      await studentApi.addNewStudent(formValues)
      toast.success('Add student successfully')

    }
    navigate('/admin/student')
  }

  const initialValue: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student

  return (
    <Box>
      <Link to='/admin/student'>
        <Typography variant="caption" style={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <ChevronLeft /> Back to list student
        </Typography>
      </Link>

      <Typography variant='h4'>
        {isEdit ? 'Update student info' : 'Add new student' }
      </Typography>

      {(!isEdit || Boolean(student)) &&
        (
        <Box mt={3}>
          <StudentForm initialValue={initialValue} onSubmit={handleStudentFormSubmit} />
        </Box>
        )
      }
    </Box>
  );
}
