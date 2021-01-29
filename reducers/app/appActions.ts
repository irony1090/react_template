import {
  AppActionType,
  SET_LAYOUT, OPEN_DRAWER, CLOSE_DRAWER
} from './appTypes'
import type { Components, Layout} from './appTypes'

export default { 
  [SET_LAYOUT]: (component:Components, layout: Layout|null):AppActionType => ({
      type: SET_LAYOUT,
      component,
      layout
    }
  ),
  [OPEN_DRAWER]: ():AppActionType => ({ type: OPEN_DRAWER }),
  [CLOSE_DRAWER]: ():AppActionType => ({ type: CLOSE_DRAWER })
}