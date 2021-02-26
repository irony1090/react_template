import { ChangeEvent, FC, ReactNode, useRef, useState, useEffect, FocusEvent, MouseEvent } from "react";
// import RootRef from '@material-ui/core/RootRef';
import { Box,  makeStyles, TextField } from "@material-ui/core";
import Swipper from 'components/slider/swiper';
import { useRecoilValue } from "recoil";
import { windowLayoutSelector } from "recoilStates/layout";

type OverViewInputProps = {
  className?: string,
  style?: any,
  fontSize?: number,
  onChange?: (e:ChangeEvent<HTMLInputElement>) => void,
  name?: string,

  list?: string[],
  auto?: any,

  startAdornment?: ReactNode,
}
// const initBoxStyle = {
//   posi
// }
const useOverViewInputStyle = makeStyles(theme => ({
  overViewBox: {
    width: '100%',
    height: '100%',
    left: 0, top: 0,
    cursor: 'text'
  },
  input: {
    '& .MuiInputBase-root': {
      fontSize: 'inherit',
      border: 'none',
      fontWeight: '700'
    },
    '& .MuiInput-underline:before': {
      borderBottom: 'none'
    }
  },
  arrow: {
    borderTop: '0px solid transparent',
    borderLeft: `${theme.spacing(3)}px solid ${theme.palette.secondary.main}`,
    borderRight: '0px solid transparent',
    borderBottom: `${theme.spacing(3)}px solid transparent`,
    content: "",
    position: 'absolute',
    right: theme.spacing(6),
    bottom: -theme.spacing(3)
  }
}))
const OverViewInput:FC<OverViewInputProps> = ({fontSize = 16, onChange, list, auto, name, startAdornment, ...boxProps}) => {
  const classes = useOverViewInputStyle();
  const {style: boxStyle} = boxProps;
  // const wrapperRef = useRef<HTMLElement>();
  const inputRef = useRef<HTMLInputElement>();
  const windowLayout = useRecoilValue(windowLayoutSelector);
  const [height, setHeight] = useState(0);
  const [keyword, setKeyword] = useState('');

  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    if(e.target){
      const {value} = e.target;
      setKeyword(value);
    }
    if(onChange) onChange(e);
  }
  const [hiddenOverView, setHiddenOverView] = useState(false);

  useEffect(() => {
    if(inputRef.current){
      const {offsetHeight} = inputRef.current;
      setHeight(offsetHeight);
    }
  }, [inputRef, windowLayout])

  const inputEventHandler = (e:FocusEvent<HTMLInputElement>) => {
    const {type} = e;
    // if(keyword !== EMPTY )
    if(type === 'blur' && keyword !== '')
      setHiddenOverView(true);
    else
      setHiddenOverView(type !== 'blur');
  }
  const overViewOnClick = (_e:MouseEvent<HTMLElement>) => {
    if(inputRef.current)
      inputRef.current.focus();

  }

  return (
    // <RootRef >
    
      <Box {...boxProps} style={{...boxStyle, position: 'relative' }} display="inline-block" >
        <Box position="relative">
          <TextField 
            className={classes.input}
            style={{fontSize}}
            name={name}
            onChange={onChangeHandler}
            InputProps={{startAdornment}}
            onFocus={inputEventHandler}
            onBlur={inputEventHandler}
            inputRef={inputRef}
          />
          <Box 
            className={classes.overViewBox} 
            position="absolute" hidden={hiddenOverView} 
            onClick={overViewOnClick} 
          >
            <OverView list={list||[]} height={height} fontSize={fontSize} /> 
          </Box>
        </Box>
        <Box className={classes.arrow}/>
      </Box>
    // </RootRef>
  )
}

export default OverViewInput;

const useOverViewStyle = makeStyles(theme => ({
  item: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: theme.palette.grey[600]
  }
}))
type OverViewProps = {
  list: string[],
  height: number,
  fontSize: number,
  auto?: any
}
const OverView:FC<OverViewProps> = ({list, height, fontSize, auto}) => {
  
  if(list.length < 1) return null;
  else  {
    const classes = useOverViewStyle();
    const [detailStyles, setDetailStyles] = useState({paddingLeft: fontSize * 0.8});
    useEffect(() => {
      setDetailStyles({paddingLeft: fontSize * 0.8})
    }, [fontSize])
    return (
      <Swipper auto={auto} axis="y" containerStyle={{height}}>
        {list.map((word, index) => 
          <Box 
            className={classes.item}
            border="red" key={index} 
            style={{height, fontSize, paddingLeft: detailStyles.paddingLeft}}
          >{word}</Box>) 
        }
      </Swipper>
    )
  }
}