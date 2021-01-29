import {
  TodoActionType,
  ITodoState,
  SET_LIST,
  SET_TEMP_LIST,
  SET_TARGET,
  SET_ADDER
} from './todoTypes'
import {
  clone
} from 'src/util'

const initialState: ITodoState = {
  list: [],
  tempList: [],
  target: undefined,
  open: false
}

const todoReducer = (
  state: ITodoState = initialState,
  action: TodoActionType
): ITodoState => {
  switch(action.type){
    case SET_LIST:
      return {
        ...state,
        list: action.list
      }
    case SET_TEMP_LIST:
      return {
        ...state,
        tempList: clone(action.tempList)
      }
    case SET_TARGET:
      return {
        ...state,
        target: action.target
      }
    case SET_ADDER: 
      return {
        ...state,
        open: action.open
      }
    default :
      return {
        ...state
      }
  }
}

export default todoReducer;