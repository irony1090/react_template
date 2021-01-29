import {
  TodoActionType,
  SET_LIST,
  SET_TEMP_LIST,
  SET_TARGET,
  SET_ADDER,
  Todo
} from './todoTypes'

export default {
  [SET_LIST]: (list:Array<Todo>):TodoActionType =>({
    type: SET_LIST,
    list
  }),
  [SET_TEMP_LIST]: (tempList:Array<Todo>):TodoActionType =>({
    type: SET_TEMP_LIST,
    tempList
  }),
  [SET_TARGET]: (target:undefined|Todo):TodoActionType =>({
    type: SET_TARGET,
    target
  }),
  [SET_ADDER]: (open:boolean):TodoActionType => ({
    type: SET_ADDER,
    open
  })
}