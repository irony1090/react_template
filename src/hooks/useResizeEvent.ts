import { useEffect, MutableRefObject } from "react";
import {useRecoilValue} from 'recoil';

import { BasicLayout, windowLayoutSelector, getBasicLayout} from 'recoilStates/layout';

const useResizeEvent = <T extends HTMLElement|null>(
  elementRef:MutableRefObject<T>, 
  effectCallback: (layout:BasicLayout) => (void | ((layout:BasicLayout) => void | undefined))
) => {
  const windowLayout = useRecoilValue(windowLayoutSelector);

  useEffect(() => {
    const ref = elementRef.current;
    if(ref){
      const endEffect = effectCallback( getBasicLayout(ref) );
      return () => {
        if(endEffect)
          endEffect( getBasicLayout(ref) );
      }
    }
  }, [windowLayout, elementRef ])
}

export default useResizeEvent;