import { Control, useController } from 'react-hook-form'
import FormLabel from '@mui/material/FormLabel';
import { FormHelperText } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


export interface SelectFieldOption {
  label?: string;
  value: number | string;
}

export interface SelectFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: SelectFieldOption[]
}

export function SelectField({ name, control, label, disabled, options }: SelectFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error }
  } = useController({
    name,
    control
  })


  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="outlined" disabled={disabled} margin="normal" error={invalid} size="small">


      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select
        labelId={`${name}_label`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoWidth
        label={label}
      >
        {
          options.map(option => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))
        }
      </Select>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
