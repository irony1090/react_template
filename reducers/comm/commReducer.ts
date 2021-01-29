import {
  CommActionType,
  SETUP_COMPANY_INFO,
  OPEN_COMPANY_FORM,
  CLOSE_COMPANY_FORM,
  OPEN_MODAL_FORM,
  CLOSE_MODAL_FORM,
  // SETUP_ARTWORK_CATEGORIES,
  ICommState
} from './commTypes'
import type {Company} from './commTypes'
// const EMPTY = '미등록';
// const LOADING = '로딩중'
const initialState: ICommState = {
  company: {
    id: null,
    name: null,
    tel: null,
    hp: null,
    fax: null,
    zipCode: null,
    addressDep1: null,
    addressDep2: null    
  },
  showFormOfCompany: false,
  showModal: false,
  // artworkCategories: null
}

const commReducer = (
  state:ICommState = initialState,
  action: CommActionType
): ICommState => {
  switch(action.type) {
    case SETUP_COMPANY_INFO:
      const { 
        id, name=null, tel=null, hp=null, fax=null, zipCode=null, 
        addressDep1=null, addressDep2=null
      }:Company = Object.assign({}, action.company) ;
      return {
        ...state,
        company: {
          id, name, tel, hp, fax, zipCode,
          addressDep1, addressDep2
        }
      }
    case OPEN_COMPANY_FORM:
      return {
        ...state,
        showFormOfCompany: true
      }
    case CLOSE_COMPANY_FORM:
      return {
        ...state,
        showFormOfCompany: false
      }
    case OPEN_MODAL_FORM:
      return {
        ...state,
        showModal: true
      }
    case CLOSE_MODAL_FORM:
      return {
        ...state,
        showModal: false
      }
    default: 
      return state;
  }
}

export default commReducer;