import { CSSProperties, useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { 
  Box, Dialog, DialogActions, DialogContent, DialogTitle, 
  makeStyles, 
  Typography 
} from "@material-ui/core";

import RadiusButton from "components/button/radiusButton";


import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom, UserAsSignup, userAsSignupAtom, userAsSignupInit, requestStateAtom } from 'recoilStates/auth';
import { windowLayoutSelector } from "recoilStates/layout";

import { NextAxios, defError, defSuccess, defForm, RetJsonEntity } from "src/axios";
import { AxiosResponse } from "axios";
import { pick } from "src/util";
import { useQuery } from "react-query";
import CertificationToken from "src/entity/CertificationToken";
import { ParsedUrlQuery } from "querystring";
import { getBookmarkPage } from "src/routerUtil";
import { setCookie } from "src/cookieUtil";
import { loginPromise } from "components/layout/auth/login";



type ErrorResponse = {
  type: string;
  result: 'error';
  query: any;
}
type CertificationResponse = {
  type: string;
  result: 'success';
  certificationToken: CertificationToken
}

// type SnsRedirectProps = GoogleResponse | KakaoResponse | NaverResponse | ErrorResponse;

type SnsTokenProps = CertificationResponse | ErrorResponse;
const SnsRedirectStyles = makeStyles(theme => ({
  dialogContent: {
    minWidth: '350px'
  },
  errorMain: {
    marginBottom: theme.spacing(2)
  },
  errorSub: {
    color: theme.palette.grey[400]
  }
}))
const SnsRedirect:NextPage<SnsTokenProps> = (props) => {
  const classes = SnsRedirectStyles();
  const router = useRouter();
  
  const user = useRecoilValue(userAtom);
  const {height} = useRecoilValue(windowLayoutSelector);
  const setUser = useSetRecoilState(userAtom);
  const setRequestState = useSetRecoilState(requestStateAtom);
  const boxStyle:CSSProperties = {width: '100%', height }
  const [message, setMessage] = useState<undefined|string>(undefined);
  const {type} = props;
  const actions = (
    <DialogActions>
      <RadiusButton color="primary" onClick={_ => router.push('/')}>메인화면으로 가기</RadiusButton>
    </DialogActions> 
  )

  if(props.result === 'error'){
    const {query} = props;
    return (
      <Box style={boxStyle}>
        <Dialog open={true}>
          <DialogTitle disableTypography><Typography variant="subtitle2">로그인 에러</Typography></DialogTitle>
          {/* <DialogContent className={classes.dialogContent}>{JSON.stringify(query)}</DialogContent> */}
          <DialogContent className={classes.dialogContent}>
            <Typography className={classes.errorMain} variant="body1">소셜 계정 제공자의 서버 점검중이거나<br/>올바르지 않은 접속 방법입니다</Typography>
            <Typography className={classes.errorSub} variant="body2">아래의 메세지를 관리자에게 제공해주세요</Typography>
            <Box>{JSON.stringify(query)}</Box>
          </DialogContent>
          {actions}      
        </Dialog>
      </Box>
    )
  }
  
  const typeName = getTypeName(type);
  const {isLoading, data: result} = useQuery('MembershipAble', () => 
    NextAxios().post(
      `${process.env.NEXT_PUBLIC_API_URL}/membership/ext/login/${type}/register`, 
      props.certificationToken
    )
    .then((res:AxiosResponse<RetJsonEntity<{id:string, type:string}>>) => defSuccess(res))
    .catch(err => defError(err))
  )
  
  useEffect(() => {
    if(user)
      router.push(getBookmarkPage()||'/');
  }, [user])

  useEffect(() => {
    if(result){
      // console.log(result);
      if(!result.err){
        const { returnCode, returnMessage, entity } = result.data;
        if(returnCode === 2000){ // 가입 진행
          const {id, type: userType} = entity;
          const userInfo: UserAsSignup = {
            ...userAsSignupInit,
            id, type: userType,
            pwd: '',
            rePwd: ''
            // pwd: `${id}${userType}`,
            // rePwd: `${id}${userType}`
          };
          setCookie(userAsSignupAtom.key, userInfo);

          const bookmark = getBookmarkPage();
          if(bookmark)
            bookmark.query.dialogType = 'signup';
          
          router.push(bookmark||{pathname: '/', query: {dialogType: 'signup', }});
        }else if (returnCode === -1999){  // 로그인
          loginPromise(
            {id: entity.id, pwd: `${entity.id}${type}`},
            setUser, setRequestState
          ).then( loginResult => {
            if(loginResult.success){
              const bookmark = getBookmarkPage();
              if(!bookmark){
                router.push('/');
                return;
              }
              
              const {pathname, query} = bookmark;
              const {dialogType, ...query_} = query;
              router.push({pathname, query:query_})
            }else{
              setMessage(loginResult.data.message);
            }
          })
          // loginProcess(entity)
          // .then((loginData) => {
          //   if(!loginData.err){
          //     const {entity: userInfo} = loginData.data;
          //     setUser(userInfo);
          //     const bookmark = getBookmarkPage();
          //     router.push(bookmark||'/')
          //   }else{
          //     setMessage(loginData.data.message);
          //   }
          // })
        }else {
          setMessage(returnMessage);
        }

      }else{
        
        NextAxios().post(
          `/api/unlink/${type}`,
          props.certificationToken
        ).then(_ => {}).catch(_ => {})
      }
    }
  }, [result])
  

  return (
    <Box style={boxStyle}>
      <Dialog open={true}>
        <DialogTitle disableTypography><Typography variant="subtitle2">{typeName} 로그인</Typography></DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="body1">{getStateName({isLoading, result, message})}</Typography>
        </DialogContent>
        {result?.err||message ? actions : null}
      </Dialog>
    </Box>
  )
}

SnsRedirect.getInitialProps = async ({query}) => {
  const {type, ...excludeType} = query;
  const redirectData = 
    type === 'google' ? googleRedirectProcess(query)
      : type === 'kakao' ? kakaoRedirectProcess(query)
        : type === 'naver' ? naverRedirectProcess(query)
            : undefined
            
  // console.log(redirectData);
  if(!redirectData)
    return {type: type as string,
      result: 'error',
      query: {...excludeType}
    };
  else if(redirectData.result === 'error')
    return redirectData;
    
  // console.log('통과', redirectData);
  
  const {status, data, err} = await NextAxios().get(
    `${process.env.NEXT_PUBLIC_LOCAL}/api/${type}`,
    {params: redirectData}
  ).then(res => defSuccess(res)).catch(axiosError => defError(axiosError));
  // console.log('통신 결과', data)
  if(status === 200){
    return {
      type: type as string,
      result: 'success',
      certificationToken: data as CertificationToken
    };
  }else{
    return {
      type: type as string,
      result: 'error',
      query: {err}
    }
  }
  
}

export default SnsRedirect;

// type MinimumUserInfo = {
//   id:string; 
//   type:string;
// }
// const loginProcess = ({id, type}:MinimumUserInfo) => 
//   NextAxios()
//   .post(`${process.env.NEXT_PUBLIC_API_URL}/membership/sign/in/id`, {id, pwd: `${id}${type}` })
//   .then( (res:AxiosResponse<RetJsonEntity<User>>) => defSuccess(res))
//   .catch( (err:AxiosError) => defError(err))


export type KakaoResponse = {
  type: 'kakao';
  result: 'success';
  code: string // 'V63rbn2ESGP8ZxwPo0i6cdwUK_dj46zvBiLEYCqAchEd9kSg9ztfTPYqIuQvgiZue971uAopyNoAAAF3gAmMJQ'
}
export type GoogleResponse = {
  type: 'google'
  result: 'success';
  code: string; //'4/0AY0e-g6GMT9wKfIMHCLu8oHa_wYhdoAsrirVS8VteiOT2Emq37izDyJFBlJFe-WJtfzPtA',
  scope: string; //'email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
  authuser: string; //'0',
  prompt: string; //'consent';
}
export type NaverResponse = {
  type: 'naver';
  result: 'success';
  code: string; //'gzD5SfcHkjsw1bJL1q', 
  state: string; //'2715',
}

const googleRedirectProcess = (query: ParsedUrlQuery):GoogleResponse|ErrorResponse => {
  let result:GoogleResponse|ErrorResponse;
  const {type, ...excludeType} = query;
  const googleResponse = pick( query, ['code', 'scope', 'authuser', 'prompt'] );
  if(!googleResponse){
    result = {
      type: 'google',
      result: 'error',
      query: excludeType
    }
  } else{
    const {code, scope, authuser, prompt} = googleResponse;
    result = {
      type: 'google', 
      result: 'success',
      code: code as string,
      scope: scope as string,
      authuser: authuser as string,
      prompt: prompt as string
    }
  }
  return result;
}

const kakaoRedirectProcess = (query: ParsedUrlQuery):KakaoResponse|ErrorResponse =>{
  let result:KakaoResponse|ErrorResponse;
  const {type, ...excludeType} = query;
  const kakaoResponse = pick( query, ['code'] );
  
  if(!kakaoResponse){
    result = {
      type: 'kakao',
      result: 'error',
      query: excludeType
    }
  }else{
    const {code} = kakaoResponse;
    result = {
      type: 'kakao', 
      result: 'success',
      code: code as string 
    }
  }
  return result;
}

const naverRedirectProcess = (query: ParsedUrlQuery):NaverResponse|ErrorResponse =>{
  let result:NaverResponse|ErrorResponse;
  const {type, ...excludeType} = query;
  const naverResponse = pick( query, ['code', 'state'] );
    if(!naverResponse){
      result = {
        type: 'naver',
        result: 'error',
        query: excludeType
      }
    }else{
      const {code, state} = naverResponse;
      
      if( naverResponse ){
        result = {
          type: 'naver',
          result: 'success',
          code: code as string,
          state: state as string
        }
      }else{
        result = {
          type: 'naver',
          result: 'error',
          query: excludeType
        }
      }
    }
  return result;
}


const getTypeName = (type:string):string|undefined => {
  if(type === 'google') return '구글';
  else if(type === 'kakao') return '카카오';
  else if(type === 'naver') return '네이버';
  else return undefined
}
// const typeToTypeChar = (type: string): string => {
//   if(type === 'google') return 'G';
//   else if(type === 'kakao') return 'K';
//   else if(type === 'naver') return 'N';
//   else return 'W';
// }

type StateNameParams = {
  isLoading: boolean;
  result: defForm<RetJsonEntity<{id: string; type: string; }>, { code: number; message: string;}> | undefined,
  message?: string
}
const getStateName = ({isLoading, result, message}:StateNameParams):string|undefined => {
  // console.log(result);
  if(isLoading || !result) return '초기화 중입니다';
  else if(message)
    return message;
  else if(!result.err) {
    return '페이지 이동 중입니다';
  }else if(result.err){
    return result.data.message;
  }
  
  return '초기화 실패';
}