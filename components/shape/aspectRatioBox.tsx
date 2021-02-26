import { CSSProperties, FC, useEffect, useRef, useState} from "react";
import { Box, BoxProps, makeStyles, RootRef } from "@material-ui/core";
// import TourchRipple from '@material-ui/core/ButtonBase/TouchRipple';
import clsx from "clsx";


interface AspectRatioBoxProps extends Omit<BoxProps, 'width'|'position'> {
  width: any;
  aspectRatio: number;
  refresh?: number;
}
const useAspectRatioBoxStyles = makeStyles(_theme => ({
  box: {
    overflow: 'hidden'
  }
}))
const AspectRatioBox:FC<AspectRatioBoxProps> = ({children, className, width, aspectRatio, refresh=0, ...boxProps}) => {
  const classes = useAspectRatioBoxStyles();
  const boxClass = clsx(classes.box, className)
  const boxRef = useRef<HTMLDivElement>(null);
  const [divStyle, setDivStyle] = useState<CSSProperties>({})

  useEffect(() => {
    if(!boxRef.current) return;
    const {offsetWidth} = boxRef.current
    setDivStyle({
      display: 'block',
      paddingTop: `${offsetWidth * aspectRatio}px`
    });

  }, [boxRef.current, aspectRatio, width, refresh])
  return (
    <RootRef rootRef={boxRef}>
      <Box {...boxProps} 
        className={boxClass}
        width={width}
        position='relative'
      >
        <div style={divStyle}/>
        <Box position="absolute" 
          top={0} left={0} bottom={0} right={0}
        >
          {children}
        </Box>
      </Box>
    </RootRef>
  )
}

export default AspectRatioBox;