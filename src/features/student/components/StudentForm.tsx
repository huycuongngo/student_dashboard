import { Box, Button, CircularProgress } from '@mui/material';
import { Student } from 'model';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { InputField, RadioGroupField, SelectField } from 'components/Common/FormFields';
import { useAppSelector } from 'app/hooks';
import { selectCityOption } from 'features/city/citySlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Alert from '@mui/material/Alert';

export interface StudentFormProps {
  initialValue?: Student;
  onSubmit?: (formValues: Student) => void
}

export default function StudentForm({ initialValue, onSubmit }: StudentFormProps) {
  const [error, setError] = useState<string>('')

  const cityOptions = useAppSelector(selectCityOption)

  const handleFormSubmit = async (formValues: Student) => {
    // console.log('submit: ', formValues)
    // await new Promise((resolve) => {
    //   setTimeout(resolve, 3000)
    // })
    try {
      setError('')
      await onSubmit?.(formValues)
    } catch (error:any) {
      console.log('Failed to update student', error)
      setError(error.message)
      // toast
    }
  }


  const schema = yup.object({
    name: yup
      .string()
      .required('Please enter name!')
    .test('two-words', 'Please enter at least two words', (value) => {
      if (!value) return true;
      // truthy
      return (value?.split(' ') || []).filter((x) => !!x).length >= 2
    }),
    age: yup
      .number()
      .min(18, 'Min is 18')
      .max(60, 'Max is 60')
      .integer('Please enter an interger!')
      .required('Please enter an age!')
      .typeError('Please enter a valid number'),
    mark: yup
      .number()
      .min(0, 'Min is 0')
      .max(10, 'Max is 10')
      .required('Please enter a mark!')
      .typeError('Please enter a valid number'),
    gender: yup.string().oneOf(['male', 'female'], 'Please select either male or female').required('Please select gender'),
    city: yup.string().required('Please select a city')
  }).required();

  const { control, handleSubmit, formState: {isSubmitting} } = useForm<Student>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  })

  return (
    <Box maxWidth={350}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full name" />
        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />

        <RadioGroupField name="gender" control={control} label="Gender" options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" }
        ]} />

        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField name="city" control={control} label="City" options={cityOptions} />
        )}

        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={3}>
          <Button type='submit' variant='contained' color='primary' disabled={isSubmitting}>
            { isSubmitting && <CircularProgress size={16} />}&nbsp;Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
