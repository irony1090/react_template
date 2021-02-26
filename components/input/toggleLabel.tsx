import {
  Checkbox, FormControlLabel, FormControlLabelProps, makeStyles, Radio 
} from "@material-ui/core";
import clsx from "clsx";
import { FC, ReactElement } from "react";
import { pxToRem } from "src/util";
import { ComponentSize } from "theme/theme";

// interface RadioLabelProps extends Omit<FormControlLabelProps, 'control' | 'value'>{
//   toggleType: 'radio';
//   groupValue: unknown;
//   value: unknown;

//   size?: ComponentSize;
//   radius?: ComponentSize;
//   activeColor?: 'primary'| 'secondary';
// }
// interface CheckLabelProps extends Omit<FormControlLabelProps, 'control'>{
//   toggleType: 'check';

//   size?: ComponentSize;
//   radius?: ComponentSize;
//   activeColor?: 'primary'| 'secondary';
// }
// type ToggleLabelProps = RadioLabelProps | CheckLabelProps;
interface ToggleLabelProps extends Omit<FormControlLabelProps, 'control'>{
  toggleType: 'check'|'radio';
  size?: ComponentSize;
  radius?: ComponentSize;
  activeColor?: 'primary'| 'secondary';
}
const useToggleLabelStyles = makeStyles(theme => ({
  
  formControlLabel: {
    position: 'relative',
    borderRadius: theme.spacing(2),
    // padding: 0,
    padding: '15.5px 14px',
    textAlign: 'center',
    minWidth: '80px',
    display: 'inline-block',

    margin: 0,
    '& .MuiButtonBase-root': { 
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      padding: 0,
      zIndex: 1,
      // backgroundColor: '#fff',
      border: `1px solid ${theme.palette.grey[400]}`,
      borderRadius: theme.spacing(2),
      
      '& input, & input+div, & input+svg': { display: 'none' },
      '&.Mui-checked': {
        borderColor: 'transparent',
        backgroundColor: theme.palette.secondary.contrastText,
        
      },
      '&.Mui-checked+.MuiTypography-body1': {
        color: theme.palette.secondary.main
      }
    },
    '& .MuiTypography-body1': { 
      fontSize: pxToRem(16),
      position: 'sticky',
      zIndex: 2
    },

    '&.active-primary': {
      '& .MuiButtonBase-root': { 
        '&.Mui-checked': {
          backgroundColor: theme.palette.primary.main,
        },
        '&.Mui-checked+.MuiTypography-body1': {
          color: theme.palette.primary.contrastText
        }
      },
    },

    '&.size-sm': {
      padding: '12.5px 14px',
      '& .MuiTypography-body1': { fontSize: pxToRem(13) },
    },
    '&.size-lg': {
      padding: '12.7px 14px',
      '& .MuiTypography-body1': { fontSize: pxToRem(20) },
    },

    '&.radius-sm':{
      '& .MuiButtonBase-root': { borderRadius: theme.spacing(1) },
    },
    '&.radius-lg':{
      '& .MuiButtonBase-root': { borderRadius: theme.spacing(4) },
    },
  }
}))
const ToggleLabel:FC<ToggleLabelProps> = ({size='md', radius= 'md', activeColor= 'secondary', toggleType, className, onChange, ...formControlLabelProps}) => {
  const classes = useToggleLabelStyles();

  const radiusCls = `radius-${radius}`;
  const sizeCls = `size-${size}`;
  const activeCls = `active-${activeColor}`;
  const formControlLabelClass = clsx(classes.formControlLabel, className, radiusCls, sizeCls, activeCls);
  
  const control:ReactElement<any, any> 
    = toggleType === 'check' 
      ? <Checkbox /> 
      : <Radio  />

  return (
    <FormControlLabel
      {...formControlLabelProps}
      control={control}
      className={formControlLabelClass}
    />
  )
}

export default ToggleLabel;