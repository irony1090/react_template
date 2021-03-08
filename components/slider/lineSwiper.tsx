import { Box, BoxProps, ButtonBase, Grid, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import AspectRatioBox from "components/shape/aspectRatioBox";
import { Children, CSSProperties, FC, useRef, useEffect, useState, MouseEvent } from "react";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


type LineSwiperDefaultNavigationProps = {
  onNext?: (e:MouseEvent) => void,
  onPrev?: (e:MouseEvent) => void
}
type LineSwiperCustomizeNavigationProps = {
  nextComponent?: any,
  prevComponent?: any
}
type LineSwiperNavigationProps = 
  LineSwiperDefaultNavigationProps & LineSwiperCustomizeNavigationProps;

interface LineSwiperProps extends BoxProps, LineSwiperNavigationProps {
  index: number,
  refresh?: number
}
const useLineSwiperStyles = makeStyles(_theme => ({
  box: {
    position: 'relative',
    whiteSpace: 'nowrap'
  },
  navBoxLeft: {
    '&.MuiGrid-container': { width: 'auto' },
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: -60,
    zIndex: 10,
    '&:hover .sideButton': {
      transform: 'translateX(50%)'
    }
  },
  navBoxRight: {
    '&.MuiGrid-container': { width: 'auto' },
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: -60,
    zIndex: 10,
    '&:hover .sideButton': {
      transform: 'translateX(-50%)'
    }
  }
}))
const LineSwiper:FC<LineSwiperProps> = ({
  children, index:index_, className, refresh=0,
  onNext, onPrev, nextComponent, prevComponent,
  ...boxProps
}) => {
  const classes = useLineSwiperStyles();
  const boxClass = clsx(classes.box, className)
  const items = Children.toArray(children);
  const count = items.length;
  const index = index_ < 0 ? count-1 : index_ % count;
  const select = items[index];

  const nextComponent_ = onNext || nextComponent 
    ? (
      <NavBox className={classes.navBoxRight} onClick={onNext}>
        {nextComponent || <ArrowForwardIosIcon />}
      </NavBox>
    )
    : undefined;

  const prevComponent_ = onPrev || prevComponent 
    ? (
      <NavBox className={classes.navBoxLeft} onClick={onPrev}>
        {prevComponent || <ArrowBackIosIcon />}
      </NavBox>
    )
    : undefined;
  
  return (<Box {...boxProps} className={boxClass} >
    <HideBox>{select}</HideBox>
    {items.map( 
      (c, i) => 
        <Item 
          key={i} 
          selfKey={i} index={index} count={count}
        >{c}</Item>
    )}
    {prevComponent_}
    {nextComponent_}
  </Box>)
}

export default LineSwiper;


interface NavBoxProps extends ArrowButtonProps {
  className: string,
}
const NavBox:FC<NavBoxProps> = ({children, className, onClick}) => {
  return(
    <Grid className={className} container direction="column" justify="center" alignItems="center">
      <Grid item>
        <ArrowButton onClick={onClick}>{children}</ArrowButton>
      </Grid>
    </Grid>
  )
}

type ArrowButtonProps = {
  onClick?: (e: MouseEvent) => void
}
const useArrowButtonStyles = makeStyles(theme => ({
  gridContainer: {
    width: '100%',
    height: '100%',
  },
  button: {
    // backgroundColor: 'rgba(255,255,255, 0.25)',
    borderRadius: theme.spacing(1),
    transition: 'all .2s'
  }
}))
const ArrowButton: FC<ArrowButtonProps> = ({ children, onClick }) => {
  const classes = useArrowButtonStyles();
  const buttonClass = clsx(classes.button, 'sideButton')
  return (
    <ButtonBase  className={buttonClass} onClick={onClick}>
      <AspectRatioBox width="75px" aspectRatio={1}>
        <Grid container className={classes.gridContainer} justify="center" alignItems="center">
          <Grid item>
            {children}
          </Grid>
        </Grid>
      </AspectRatioBox>
    </ButtonBase>
  )
}

const HideBox:FC = ({children}) => {
  // console.log(child)
  const divRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({opacity: 0})
  useEffect(() => {
    if(!divRef.current) return;

    const {offsetHeight} = divRef.current;
    setStyle(state => ({
      ...state,
      minHeight: offsetHeight
    }))
  }, [children])
  // const style:CSSProperties = {opacity: 0};
  return ( <div style={style} ><div ref={divRef}>{children}</div></div> )
}

type ItemProps = {
  index: number,
  selfKey: number,
  count: number,
  children: any
  // ref?: RefObject<HTMLDivElement>,
}
const useItemStlyes = makeStyles( _theme => ({
  item: {
    position: 'absolute',
    top: 0,
    transition: 'all .5s',
    '&.view-active': {
      // position: 'relative',
      transform: 'translateX(0)',
      zIndex: 2
    },
    '&.view-wait': { zIndex: 1 },
    '&[class*=orientation-] > .itemWrapper': {
      transform: 'scale(0.6)'
    },
    '&.orientation-left': {
      transform: 'translateX(-100%)',
    },
    '&.orientation-right': {
      transform: 'translateX(100%)'
    },
    '&.view-hidden': { transform: 'scale(0)' },
    '& > .itemWrapper': {
      transition: 'all .5s',
    }
  }
}))

const Item:FC<ItemProps> = ({children, index: index_, selfKey, count}) => {
  const classes = useItemStlyes();
  const index = index_ % count;
  const view = `view-${getView(index, selfKey, count)}`;
  const itemClass = clsx(
    classes.item, view, 
    {[`orientation-${getOrientation(index, selfKey, count)}`]: view === 'view-wait'}
  )

  return (<Box className={itemClass} display="inline-block" width="100%">
    <Box className="itemWrapper">
      {children}
    </Box>
  </Box>)
    
}

// const Item = forwardRef<HTMLDivElement, ItemProps>(({children, index: index_, selfKey, count}, ref) => {
//   const classes = useItemStlyes();
//   const index = index_ % count;
//   const view = `view-${getView(index, selfKey, count)}`;
//   const itemClass = clsx(
//     classes.item, 
//     view, 
//     {[`orientation-${getOrientation(index, selfKey, count)}`]: view === 'view-wait'}
//   )

//   if(!ref)
//     return (<Box className={itemClass} display="inline-block" width="100%">
//       <Box className="itemWrapper">
//         {children}
//       </Box>
//     </Box>)
//   else  
//     return (<RootRef rootRef={ref}>
//       <Box className={itemClass} display="inline-block" width="100%">
//         <Box className="itemWrapper">
//           {children}
//         </Box>
//       </Box>
//     </RootRef> )
    
// })

const getView = (index: number, selfKey: number, count: number):string => {
  if(index === selfKey){
    return 'active';
  }else if( 
    Math.abs(index - selfKey) > 1 
    && !(index === 0 && (selfKey + 1) === count) 
    && !( (index + 1) === count && selfKey === 0 )
  ){
    return 'hidden';
  }else
    return 'wait'
}
const getOrientation = (index:number, selfKey: number, count: number):string => {
  if(selfKey === 0 && index === count - 1){
    return 'right';
  }else if(count === selfKey + 1 && index === 0){
    return 'left';
  }else if(index > selfKey){
    return 'left';
  }else
    return 'right';
}