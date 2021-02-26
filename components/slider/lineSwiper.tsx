import { Box, BoxProps, makeStyles, RootRef } from "@material-ui/core";
import clsx from "clsx";
import { Children, FC, useEffect, useRef, forwardRef, useState, CSSProperties } from "react";


interface LineSwiperProps extends BoxProps {
  index: number,
  refresh?: number
}
const useLineSwiperStyles = makeStyles(_theme => ({
  box: {
    position: 'relative',
    whiteSpace: 'nowrap'
  }
}))
const LineSwiper:FC<LineSwiperProps> = ({
  children, index, className, refresh=0,
  ...boxProps
}) => {
  const classes = useLineSwiperStyles();
  const boxClass = clsx(classes.box, className)
  const [boxStyle, setBoxStyle] = useState<CSSProperties>({})
  const count = Children.count(children);

  const firstItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!firstItemRef.current) return;
    setBoxStyle({
      height: firstItemRef.current.offsetHeight
    })
  }, [firstItemRef.current, refresh])

  
  // return(
  //   <Item
  //     selfKey={0} index={index} count={count}
  //   ></Item>
  // )
  return (<Box {...boxProps} className={boxClass} style={boxStyle}>
    {Children.map(children, (c, i) => 
      <Item 
        ref={i === 0 ? firstItemRef : undefined}
        key={i} 
        selfKey={i} index={index} count={count}
      >{c}</Item>)
    }
  </Box>)
}

export default LineSwiper;



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

const Item = forwardRef<HTMLDivElement, ItemProps>(({children, index: index_, selfKey, count}, ref) => {
  const classes = useItemStlyes();
  const index = index_ % count;
  const view = `view-${getView(index, selfKey, count)}`;
  const itemClass = clsx(
    classes.item, 
    view, 
    {[`orientation-${getOrientation(index, selfKey, count)}`]: view === 'view-wait'}
  )

  if(!ref)
    return (<Box className={itemClass} display="inline-block" width="100%">
      <Box className="itemWrapper">
        {children}
      </Box>
    </Box>)
  else  
    return (<RootRef rootRef={ref}>
      <Box className={itemClass} display="inline-block" width="100%">
        <Box className="itemWrapper">
          {children}
        </Box>
      </Box>
    </RootRef> )
    
})

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