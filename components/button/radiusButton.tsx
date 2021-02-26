import { FC } from "react"
import { Button, ButtonProps, makeStyles } from "@material-ui/core"
import { ComponentSize } from "theme/theme";
import clsx from "clsx";
import { pxToRem } from "src/util";

interface RadiusButtonProps extends Omit<ButtonProps, 'size'> {
  radius?: ComponentSize,
  size?: ComponentSize
}
const useRadiusButtonStyles = makeStyles(theme => ({
  button: {
    borderRadius: theme.spacing(2),
    fontSize: pxToRem(16),
    padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
    '&:not([class~="MuiButton-outlined"])':{
      border: '1px solid transparent'
    },
    '&.radius-sm': {
      borderRadius: theme.spacing(1)
    },
    '&.radius-lg': {
      borderRadius: theme.spacing(4)
    },
    '&.size-sm': { 
      fontSize: pxToRem(13),
      padding: `3.8px ${theme.spacing(2)}px`
    },
    '&.size-lg': { fontSize: pxToRem(20) }
    
  }
}))
const RadiusButton:FC<RadiusButtonProps> = ({children, radius="md", size='md', className, ...buttonProps}) => {
  const classes = useRadiusButtonStyles();
  const buttonClass = clsx(classes.button, className, `radius-${radius}`, `size-${size}`);
  const size_:'small' | 'medium' | 'large' = size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'medium';
  return (
    <Button
      {...buttonProps}
      size={size_}
      className={buttonClass}
    >{children}</Button>
  )
}

export default RadiusButton;