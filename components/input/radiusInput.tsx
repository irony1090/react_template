import { FC, useState, FocusEvent } from 'react';
import { makeStyles, OutlinedInputProps,  FormControl, OutlinedInput, InputLabel, Box, BoxProps } from "@material-ui/core"
import { ComponentSize } from 'theme/theme';
import clsx from 'clsx';
import { pxToRem } from 'src/util';


export interface RadiusInputProps extends OutlinedInputProps{
  border?: number;
  radius?: ComponentSize;
  secondPlaceholder?: string;
  size?: ComponentSize,
  secondPlaceholderProps?: BoxProps
}
const useRadiuseInputStyles = makeStyles(theme => ({
  formControl: {
    '& .MuiInputBase-root': {
      borderRadius: theme.spacing(2),
      fontSize: pxToRem(16),
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
  },
  // outLinedInput: {
    // borderRadius: theme.spacing(2),
    // fontSize: pxToRem(16),
    // '&.radius-sm':{ borderRadius: theme.spacing(1) },
    // '&.radius-lg':{ borderRadius: theme.spacing(4) },
    // '&.size-sm': { fontSize: pxToRem(13) },
    // '&.size-lg': { fontSize: pxToRem(20) }
  // },
  secondPlaceholder: {
    color: theme.palette.grey[400],
    fontSize: pxToRem(14),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'inline-block',
    maxWidth: '50%',
    right: '14px',
    top: 17.5,
    '&.hidden': { display: 'none' },
    '&.size-sm': {
      fontSize: pxToRem(11),
      top: 15
    },
    // '&.size-lg': {
    //   fontSize: pxToRem(16),
    //   top: 17.5,
    // }
  }
}))

const RadiusInput:FC<RadiusInputProps> = ({children, radius='md', size='md', secondPlaceholder, error, secondPlaceholderProps, ...outLinedInputProps}) => {
  const classes =  useRadiuseInputStyles();
  const {fullWidth, label, onFocus, onBlur} = outLinedInputProps;
  // const radiusInputClass = clsx(classes.outLinedInput, className, `radius-${radius}`, `size-${size}`);
  const [isFocus, setIsFocus] = useState(false);
  const sizeGrade = `size-${size}`;
  const radiusGrade = `radius-${radius}`;
  const formControlClass = clsx(classes.formControl, sizeGrade, radiusGrade);
  // const size_:'small' | 'medium' | 'large' = size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'medium';


  const  inputOnEventHandler = (e:FocusEvent<HTMLInputElement>) => {
    const {type} = e;
    setIsFocus(type !== 'blur');
    if(type ==='focus'){
      if(onFocus) onFocus(e);
    }else{
      if(onBlur) onBlur(e);
    }
  }

  const inputLabel = !label ? null : <InputLabel hidden={true}>{label}</InputLabel>;

  const {className: boxClassName, ...secondPlaceholderProps_} = secondPlaceholderProps||{};
  const secondPlaceholderClass = clsx(classes.secondPlaceholder, {hidden: isFocus}, sizeGrade, boxClassName)


  return (
    <FormControl className={formControlClass} variant="outlined" fullWidth={fullWidth} error={error}>
      {inputLabel}
      <OutlinedInput 
          {...outLinedInputProps}
          onFocus={inputOnEventHandler}
          onBlur={inputOnEventHandler}
      />
      <Box 
        {...secondPlaceholderProps_}
        className={secondPlaceholderClass} 
        position="absolute"
      >{secondPlaceholder}</Box>
    </FormControl>
    // <TextField {...textFieldProps_} className={radiusInputClass} 
    //   InputProps={{...InputProps, className: baseInputClass}} 
    //   variant="outlined" 
    // />
  )
}

export default RadiusInput;