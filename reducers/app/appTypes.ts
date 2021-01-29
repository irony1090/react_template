export const SET_LAYOUT = "SET_LAYOUT"
export const OPEN_DRAWER = 'OPEN_DRAWER'
export const CLOSE_DRAWER = 'CLOSE_DRAWER' 


export type Layout = {
  width: number,
  height: number,
  grade?: Size
}

export type IAppState = {
  header: Layout | null | undefined,
  drawer: Layout | null | undefined,
  contents: Layout | null | undefined,
  footer: Layout | null | undefined,
  showDrawer: boolean,
  aboveLayout:Layout | null | undefined
}
export const DRAWER_MAX_WIDTH = 250;

export enum Size {
  XL='XL',LG="LG",MD="MD",US="US"
}
export const SIZE_INFO = {
  US:{grade: Size.US, max: 360 },
  MD:{grade: Size.MD, max: 640 },
  LG:{grade: Size.LG, max: 960},
  XL:{grade: Size.XL }
}
export enum Components {
  HEADER= 'header',
  DRAWER="drawer",
  CONTENTS= 'contents',
  FOOTER= 'footer',
  ABOVE='aboveLayout'
}

// export type SetLayout = {
//   component: Components,
//   ...LAYOUT
// }

interface setLayout {
  type: typeof SET_LAYOUT,
  component: Components,
  layout: Layout| null
}
interface openDrawer {
  type: typeof OPEN_DRAWER
}
interface closeDrawer {
  type: typeof CLOSE_DRAWER
}

export type AppActionType = 
  setLayout 
  | openDrawer 
  | closeDrawer;