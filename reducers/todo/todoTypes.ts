export const SET_LIST = 'SET_LIST'
export const SET_TEMP_LIST = 'SET_TEMP_LIST'
// export const  = 'OPEN_MODIFY'
export const SET_TARGET = 'SET_TARGET'
export const SET_ADDER = 'SET_ADDER'
// export 

export type Todo = {
  id: undefined|number,
  title: string,
  modify: boolean
}
export type ITodoState = {
  list: Array<Todo>,
  tempList: Array<Todo>,
  target: undefined|Todo,
  open: boolean
}

interface setList {
  type: typeof SET_LIST,
  list: Array<Todo>
}
interface setTempList {
  type: typeof SET_TEMP_LIST,
  tempList: Array<Todo>
}
interface setTarget {
  type: typeof SET_TARGET,
  target: undefined|Todo
}
interface setAdder {
  type: typeof SET_ADDER,
  open: boolean
}

export type TodoActionType = 
  setList
  | setTempList
  | setTarget
  | setAdder
;