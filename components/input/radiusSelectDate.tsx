import { FormControl, makeStyles, TextField } from "@material-ui/core";
import clsx from "clsx";
import { FC } from "react";
import { pxToRem } from "src/util";
import { ComponentSize } from "theme/theme";


interface DateSelectProps extends Omit<any, 'variant'>{
  radius?: ComponentSize;
  size?: ComponentSize
}
const useDateSelectStyles = makeStyles(theme => ({
  formControl: {
    '& .MuiInputBase-root': {
      borderRadius: theme.spacing(2),
      fontSize: pxToRem(16),
    },

    '& .MuiFormLabel-root': {
      backgroundColor: 'white'
    },

    '&.radius-sm':{
      '& .MuiInputBase-root':{
        borderRadius: theme.spacing(1)
      }
    },
    '&.radius-lg':{
      '& .MuiInputBase-root':{
        borderRadius: theme.spacing(4)
      }
    },
    
    '&.size-sm': {
      '& .MuiFormLabel-root': {
        fontSize: pxToRem(13),
        '&.MuiInputLabel-outlined': {
          transform: 'translate(14px, 17px) scale(1)',
          '&.MuiInputLabel-shrink':{ transform: 'translate(14px, -6px) scale(0.75)'}
        }
      },
      '& .MuiInputBase-root':{
        fontSize: pxToRem(13),
        
        '& .MuiInputBase-input': {
          padding: `15px 14px`
        }
      }
    },
    '&.size-lg': {
      '& .MuiFormLabel-root': {
        fontSize: pxToRem(20),
        '&.MuiInputLabel-outlined': {
          transform: 'translate(14px, 17px) scale(1)',
          '&.MuiInputLabel-shrink':{ transform: 'translate(14px, -6px) scale(0.75)'}
        }
      },
      '& .MuiInputBase-root':{
        fontSize: pxToRem(20),
        '& .MuiInputBase-input': { padding: `16px 14px` }
      },
      
    }
  }
}))
export const DateSelect:FC<DateSelectProps> = ({children, radius='md', size = 'md', fullWidth,  error, ...textFieldProps}) => {
  const classes =  useDateSelectStyles();
  
  const sizeGrade = `size-${size}`;
  const radiusGrade = `radius-${radius}`;
  const formControlClass = clsx(classes.formControl, sizeGrade, radiusGrade);

  // const inputLabel = !label ? null : <InputLabel hidden={true}>{label}</InputLabel>;

  return (
    <FormControl 
      className={formControlClass} 
      fullWidth={fullWidth}
      variant="outlined"
      error={error}
    >
      {/* {inputLabel} */}
      <TextField
        {...textFieldProps}
        variant="outlined"
        type='date'
      >
        {/* {children} */}
      </TextField>
    </FormControl>
  );
}