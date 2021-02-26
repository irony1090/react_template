import { FC } from "react";

import { Box, BoxProps, makeStyles } from "@material-ui/core";
import clsx from "clsx";


interface UnderLineProps extends BoxProps {
  align: 'center' | 'bottom' | 'top',
  color: string,
  size: number
}
const useUnderLineStyles = makeStyles(_theme => ({
  underLine: {
    position: 'absolute',
    width: '100%',
    left: 0,
    bottom: 0,
    zIndex: 1,
    '&.underLine-bottom': {
      transform: 'translate(0, 100%)'
    },
    '&.underLine-center': {
      transform: 'translate(0, 50%)'
    },
    // '&.underLine-bottom': {
    // }
  },
  children: {
    position: 'sticky',
    zIndex: 2
  }
}))
const UnderLine:FC<UnderLineProps> = ({children, align, color, size, ...boxProps}) => {
  const classes = useUnderLineStyles();
  return (<Box {...boxProps} display="inline-block" position="relative" >
    <Box className={classes.children}>{children}</Box>
    <Box className={clsx(classes.underLine, `underLine-${align}`)} style={{backgroundColor: color, height: size}}/>
  </Box>)
}

export default UnderLine;