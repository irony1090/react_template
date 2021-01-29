// import { createStore, applyMiddleware} from "redux";
import { createStore } from "redux";
// import logger from "redux-logger"
// import { MakeStore, createWrapper, Context } from "next-redux-wrapper";
import { MakeStore, createWrapper } from "next-redux-wrapper";

import rootReducer, {rootState} from './index'

// export const makeStore: MakeStore<rootState> = (context: Context) =>
export const makeStore: MakeStore<rootState> = () =>
  // createStore(reducer, applyMiddleware(logger));
  createStore(rootReducer);

export const wrapper = createWrapper<rootState>(makeStore, { debug: process.env.NEXT_PUBLIC_ACTIVE === 'dev' });