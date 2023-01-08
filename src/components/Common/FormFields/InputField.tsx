import { TextField } from '@mui/material';
import React, {InputHTMLAttributes} from 'react';
import { Control, useController } from 'react-hook-form'


export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement>  {
  name: string;
  control: Control<any>;
  label?: string; 
}

export function InputField({ name, control, label, ...inputProps }: InputFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: {invalid, error}
  } = useController({
    name,
    control
  })
  return (
    <TextField
      size="small"
      helperText={error?.message}
      error={invalid}
      inputRef={ref}
      onBlur={onBlur}
      onChange={onChange}
      fullWidth
      margin="normal"
      value={value}
      label={label}
      variant="outlined"
      inputProps={inputProps}
    />
  );
}
