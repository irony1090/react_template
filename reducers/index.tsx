import {combineReducers} from 'redux'
import AppReducer from './app/appReducer'
import CommReducer from './comm/commReducer'
import TodoReducer from './todo/todoReducer'

import { ICommState } from './comm/commTypes'
import { IAppState } from './app/appTypes'
import { ITodoState } from './todo/todoTypes'
// import { ICompanyState } from './company/companyTypes'

export interface rootState {
  AppReducer: IAppState;
  CommReducer: ICommState;
  TodoReducer: ITodoState;
}

const rootReducer = combineReducers({
  AppReducer,
  CommReducer,
  TodoReducer
})

export default rootReducer;