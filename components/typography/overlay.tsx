import { makeStyles } from "@material-ui/core";
import { CSSProperties, FC } from "react";
import { isUndeclared, isNumberForm } from "src/format";

export type OverLayProps = {
  foreGround?: any,
  x?: number|string,
  y?: number|string,
  assistantColor?: string 
}
const useOverlayStyle = makeStyles(_theme => ({
  overlay: {position: 'relative'},
  textArea: {
    position: 'relative',
    zIndex: 2,
    whiteSpace: 'nowrap'
  }
}))
const Overlay:FC<OverLayProps> = ({children, foreGround, x=1,y=1, assistantColor}) => {
  const classes = useOverlayStyle();

  const assistantStyle: CSSProperties  = {
    zIndex: isUndeclared(foreGround) ? 1 : 3, 
    left: isNumberForm(x) ? `${x}px` : `${x}`, top: isNumberForm(y) ? `${y}px` : `${y}`,
    color: assistantColor,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '100%', height: '100%'
  }
  
  return (
    <span className={classes.overlay}>
      <span className={classes.textArea}>
        {children}
      </span>
      <span className={classes.textArea} 
        style={assistantStyle}
      >{children}</span>
    </span>
  )
}
export default Overlay;