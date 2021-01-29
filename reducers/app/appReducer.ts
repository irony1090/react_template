import {
  AppActionType,
  SET_LAYOUT,
  OPEN_DRAWER,
  CLOSE_DRAWER,
  IAppState,
  Size,
  SIZE_INFO,
} from './appTypes'
// import type {Layout, Components} from './appTypes'

const initialState: IAppState = {
  header: null,
  drawer: null,
  contents: null,
  footer: null,
  showDrawer: false,
  aboveLayout:{width:1280,height:1000,grade: Size.XL }
}

const appReducer = (
  state: IAppState = initialState,
  action: AppActionType
): IAppState => {
  // if(action.type === SET_LAYOUT){
  //   return {
  //     ...state,
  //     [action.component]: action.layout
  //   }
  // }else{
  //   return state
  // }

  switch(action.type) {
    case SET_LAYOUT:
      if(action?.layout){
        let width=action.layout.width;
        if(SIZE_INFO.US.max>=width){
          action.layout.grade=Size.US
        }else if(SIZE_INFO.MD.max>=width){
          action.layout.grade=Size.MD
        }else if(SIZE_INFO.LG.max>=width){
          action.layout.grade=Size.LG
        }else{
          action.layout.grade=Size.XL
        }
      }
      return {
        ...state,
        [action.component]: action.layout
      }
      case OPEN_DRAWER:
        return {
          ...state,
          showDrawer: true
        }
      case CLOSE_DRAWER:
        return {
          ...state,
          showDrawer: false
        }
    default:
      return state
  }
}

export default appReducer;