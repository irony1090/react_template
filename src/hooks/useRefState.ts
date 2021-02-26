import { useState, useRef, MutableRefObject } from 'react'

type StateRef<T> = [
  MutableRefObject<T>,
  (state:T)=>void
]

const useRefState = <T>(state:T):StateRef<T> => {

  const [ , _setInnerState] = useState<T>(state);
  const stateRef = useRef<T>(state);
  const setState = (state_:T) => {
    stateRef.current = state_;
    _setInnerState(state_);
  }

  return [
    stateRef,
    setState
  ]
}

export default useRefState;