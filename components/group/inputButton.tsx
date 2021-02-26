import { FC, useState, FocusEvent } from "react";
import {
  Button,
  ButtonProps as ButtonProps_,
  FormControl,
  Grid,
  InputLabel,
  InputProps as InputProps_,
  makeStyles, OutlinedInput, Paper
} from '@material-ui/core';
import { ComponentSize } from "theme/theme";
import clsx from "clsx";
import { pxToRem } from "src/util";



interface InputButtonProps  {
  className?: string;
  border?: number;
  radius?: ComponentSize;
  size?: ComponentSize;
  InputProps?: InputProps_;
  ButtonProps?: ButtonProps_;
  label?: string;
  error?: boolean;
}
const useInputButtonStyles = makeStyles(theme => ({
  paper: {
    border: 'none',
    '&.error': {
      '& .inputGrid, & .buttonGrid': {borderColor: theme.palette.error.main}
    },
    '& .inputGrid, & .buttonGrid': {
      border: `1px solid ${theme.palette.grey['A200']}`
    },
    '& .inputGrid': {
      borderTopLeftRadius: theme.spacing(2),
      borderBottomLeftRadius: theme.spacing(2),
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderRight: 'none'
    },
    '& .buttonGrid': {
      overflow: 'hidden',
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderLeft: 'none'
    },
    '&.radius-sm':{
      '& .inputGrid': {
        borderTopLeftRadius: theme.spacing(1),
        borderBottomLeftRadius: theme.spacing(1),
      },
      '& .buttonGrid': {
        borderTopRightRadius: theme.spacing(1),
        borderBottomRightRadius: theme.spacing(1),
      }
    },
    '&.radius-lg':{
      '& .inputGrid': {
        borderTopLeftRadius: theme.spacing(4),
        borderBottomLeftRadius: theme.spacing(4),
      },
      '& .buttonGrid': {
        borderTopRightRadius: theme.spacing(4),
        borderBottomRightRadius: theme.spacing(4),
      }
    },
    '&.focus .inputGrid, &.focus .buttonGrid ': {
      borderColor: theme.palette.primary.main
    },
    '& .MuiFormLabel-root': {
      backgroundColor: 'white', 
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    },

    '& .MuiInputBase-root, & .MuiButtonBase-root': {
      fontSize: pxToRem(16),
    },
    '& .MuiButtonBase-root': { 
      padding: `14px 14px`,
      borderRadius: 0
    },


    '&.size-sm': {
      '& .MuiInputBase-root, & .MuiFormLabel-root, & .MuiButtonBase-root': {
        fontSize: pxToRem(13),
      },
      '& .MuiButtonBase-root': { padding: `11.52px 14px` },
      '& .MuiFormLabel-root': {
        '&.MuiInputLabel-outlined': {
          transform: 'translate(14px, 17px) scale(1)',
          '&.MuiInputLabel-shrink':{ transform: 'translate(14px, -6px) scale(0.75)'}
        }
      },
      '& .MuiInputBase-root':{
        '& .MuiInputBase-input': { padding: `15px 14px` }
      }
    },
    '&.size-lg': {
      '& .MuiInputBase-root, & .MuiFormLabel-root, & .MuiButtonBase-root': {
        fontSize: pxToRem(20),
      },
      '& .MuiButtonBase-root': { padding: `10.675px 14px` },
      '& .MuiFormLabel-root': {
        '&.MuiInputLabel-outlined': {
          transform: 'translate(14px, 17px) scale(1)',
          '&.MuiInputLabel-shrink':{ transform: 'translate(14px, -6px) scale(0.75)'}
        }
      },
      '& .MuiInputBase-root':{
        '& .MuiInputBase-input': { padding: `16px 14px` }
      },
    },
    
  },
  input: {
    // border: 'none',
    // '& .MuiInputBase-input': {
    //   padding: '18.5px 14px',
    // },
    '&:before, &:after':{display: 'none'},
    '& fieldset': {
      display: 'none'
    },
    
  },
  inputGrid: {
    flex: 1
  },
  // button: {
  //   borderRadius: 0,
  //   padding: '16px 14px'
  // }
}))
const InputButton:FC<InputButtonProps> = ({children, className, radius='md', size='md', label, error, InputProps = {}, ButtonProps = {}}) => {
  const classes = useInputButtonStyles();
  const [isFocus, setIsFocus] = useState(false);
  const sizeGrade = `size-${size}`;
  const paperClass = clsx(classes.paper, className, `radius-${radius}`, sizeGrade, {focus: isFocus}, {error: error});
  
  const {className:inputClass_, onFocus, onBlur} = InputProps;

  const inputClass = clsx(inputClass_, classes.input, 'inputGrid');

  const {className:buttonClass_} = ButtonProps;
  const buttonClass = clsx(buttonClass_);

  const inputOnEventHandler = (e:FocusEvent<HTMLInputElement>) => {
    const {type} = e;
    setIsFocus(type !== 'blur');
    if(type ==='focus'){
      if(onFocus) onFocus(e);
    }else{
      if(onBlur) onBlur(e);
    }

  }

  const inputLabel = !label ? null : <InputLabel hidden={true}>{label}</InputLabel>;


  return (
    <Paper className={paperClass} variant="outlined" >
      <Grid container alignItems="center">
        <Grid item className={classes.inputGrid}>
          <FormControl style={{height:'100%'}} fullWidth variant="outlined">
            {inputLabel}
            <OutlinedInput 
                {...InputProps}
                className={inputClass}
                onFocus={inputOnEventHandler}
                onBlur={inputOnEventHandler}
            />
            {/* <Input 
              {...InputProps}
              fullWidth className={inputClass}  
              onFocus={inputEventHandler} onBlur={inputEventHandler}
            /> */}
          </FormControl>
        </Grid>
        <Grid item className="buttonGrid">
          <Button
            {...ButtonProps}
            className={buttonClass}
            variant="contained"
          >
            {children}
          </Button>
        </Grid>
      </Grid>
      
    </Paper>
  )
}

export default InputButton;