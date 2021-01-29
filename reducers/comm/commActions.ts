import {
  CommActionType,
  SETUP_COMPANY_INFO,
  OPEN_COMPANY_FORM,
  CLOSE_COMPANY_FORM,
  OPEN_MODAL_FORM,
  CLOSE_MODAL_FORM
  // SETUP_ARTWORK_CATEGORIES
} from './commTypes'
import type {
  Company
  // ArtworkCategory
} from './commTypes'

export default {
  [SETUP_COMPANY_INFO]: (company: Company|null):CommActionType => ({ 
    type: SETUP_COMPANY_INFO,
    company,
  }),
  [OPEN_COMPANY_FORM]: ():CommActionType => ({
    type: OPEN_COMPANY_FORM
  }),
  [CLOSE_COMPANY_FORM]: ():CommActionType => ({
    type: CLOSE_COMPANY_FORM
  }),
  [OPEN_MODAL_FORM]: ():CommActionType => ({
    type: OPEN_MODAL_FORM
  }),
  [CLOSE_MODAL_FORM]: ():CommActionType => ({
    type: CLOSE_MODAL_FORM
  }),
  // [SETUP_ARTWORK_TYPES]: (types: Array<ArtworkType>|null):CommActionType => ({
  //   type: SETUP_ARTWORK_TYPES,
  //   artworkTypes: types
  // }),
  // [MODIFY_ARTWORK_TYPE]: (type:ArtworkType):CommActionType => {
  //   return {
  //     type: MODIFY_ARTWORK_TYPE,
  //     artworkType: type
  //   }
  // },
  // [SETUP_ARTWORK_CATEGORIES]: (categories: Array<ArtworkCategory>|null):CommActionType => ({
  //   type: SETUP_ARTWORK_CATEGORIES,
  //   artworkCategories: categories
  // })
  
}