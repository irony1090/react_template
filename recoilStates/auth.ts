import { useEffect } from "react";
import { atom, useRecoilValue } from "recoil";
import { getCookie } from "src/cookieUtil";


export type User = {
	uniqueKey: string;
  id: string;
  nickName?: string;
  name: string;
  gender: string;
  age: number;
  job?: string;
  birth: string;
  email: string;
  phone: string;
  liveLocal?: string;
  wantLocal?: string;
  tel?: string;
  bankInfo?: string;
  contents?: string;
  profileImg: string; // xml
  type: string; //가입 경로 kakao, google, naver, web
  // pwd: string
}

// export type UserWrapper = {
//   user: User|undefined
// }
export type UserAsSignup = 
  Pick<
    User, 
    'id' | 'phone' | 'name' | 'liveLocal' | 'wantLocal' | 'job' | 'email' | 'type'
  > & {
    pwd: string, 
    rePwd: string, 
    privateNumber: string,
    agreeService: boolean, 
    agreePrivacy: boolean, 
    agreeSms: boolean
  };

export const userAsSignupInit = {
  id: '',
  pwd: '',
  rePwd: '',
  phone: '',
  name: '',
  privateNumber: '',
  email: '',
  agreeService: false,
  agreePrivacy: false,
  agreeSms: false,
  type: 'web' 
}
export const userAsSignupAtom = atom<UserAsSignup>({
  key: 'userAsSignupAtom',
  default: {...(getCookie<UserAsSignup>('userAsSignupAtom')|| userAsSignupInit)}
})

export const loginDialogOpenAtom = atom<boolean>({
  key: 'loginDialogOpenAtom',
  default: false
})

export const signupDialogOpenAtom = atom<boolean>({
  key: 'signupDialogOpenAtom',
  default: false
})

export const userAtom = atom<User|undefined>({
  key: 'userAtom',
  default: undefined
})

export enum REQUEST_STATE {
  WAITING = -1,
  REQUESTING = 0,
  LOADED = 1,
}
export const requestStateAtom = atom<REQUEST_STATE>({
  key: 'requestStateAtom',
  default: REQUEST_STATE.WAITING
})

// type UseUserInfoProps = {
//   state: REQUEST_STATE,
//   user: User | undefined
// }
export const useUser = (
  effectCallback: (user:User|undefined) => (void | (() => void | undefined))
) => {
  const requestState = useRecoilValue(requestStateAtom);
  const user = useRecoilValue(userAtom)
  useEffect(() => {
    if(requestState === REQUEST_STATE.LOADED){
      const endEffect =       effectCallback(user);
      
      if(endEffect && !user)  endEffect()
    }
  }, [requestState, user])
}