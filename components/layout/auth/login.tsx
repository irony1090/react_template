import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {loginDialogOpenAtom,  requestStateAtom,  REQUEST_STATE, User, userAtom} from 'recoilStates/auth'
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from 'recoil';

import { 
  Box, 
  Button,
  IconButton, 
  Dialog, 
  DialogContent, 
  FormControlLabel,
  Grid, 
  DialogTitle, 
  makeStyles,
  Checkbox,
  Typography
} from "@material-ui/core";
import {makeCSSProperties, pxToRem} from 'src/util'
import CloseIcon from '@material-ui/icons/Close';
// import imgAzit from 'assets/icon_sm_azit.png';
import RadiusInput from 'components/input/radiusInput';
import RadiusButton from 'components/button/radiusButton';
import NaverButton from 'components/button/naverButton';
import GoogleButton from 'components/button/googleButton';
import KakaoButton from 'components/button/kakaoButton';
import { useLayoutGrade } from 'theme/theme';
import {  removeCookie, setCookie } from 'src/cookieUtil';
import { parseCookies} from 'nookies'
import { defError, defForm, defSuccess, NextAxios, RetJsonEntity } from 'src/axios';
import { isBlank } from 'src/format';

// type LoginAtom = {
//   id: string,
//   pw: string,
//   remember: boolean
// }
// const loginAtom = atom<LoginAtom>({
//   key: 'loginAtom',
//   default: {
//     id: '',
//     pw: '',
//     remember: false
//   }
// })

const useLoginStyles = makeStyles( theme => ({
  
  dialogAction: {
    textAlign: 'center'
  },
  azitImg: {
    width: '100px'
  },
  dividerWrapper: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4)
  }
}))
interface LoginProps {

}
const Login:FC<LoginProps> = () => {
  const classes = useLoginStyles();
  const [open, setOpen] = useRecoilState(loginDialogOpenAtom);
  const {isDownSm} = useLayoutGrade();
  const router = useRouter();

  useEffect(() => {
    const {dialogType} = router.query
    if(dialogType && dialogType === 'login')
      setOpen(true);
    else 
      setOpen(false);
    return () => setOpen(false);
  }, [router])

  const close = () => {
    if(router.query.isBackAble)
      router.back();
    else
      setOpen(false);
    
  }

  return (
    <Dialog open={open} onClose={close} scroll="body" fullWidth={isDownSm}>
      <Close />
      <DialogTitle className={classes.dialogAction}>
        {/* <img className={classes.azitImg} src={imgAzit}/> */}
      </DialogTitle>
      <DialogContent>
        <InputAction />
      </DialogContent>
      <DialogContent className={classes.dividerWrapper}>
        <Divider />
      </DialogContent>
      <DialogContent>
        <SnsButtons />
      </DialogContent>
    </Dialog>
  )
}
export default Login;

const snsCommStyles = makeCSSProperties({
  verticalAlign: {
    verticalAlign: 'middle'
  }
})
const useSnsButtons = makeStyles(theme => ({
  membership: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    whiteSpace: 'nowrap',
    textAlign: 'center'
  },
  typography: {
    ...snsCommStyles.verticalAlign,
    paddingRight: theme.spacing(1),
    fontWeight: 400 
  },
  button: {
    ...snsCommStyles.verticalAlign
  }

}))
const SnsButtons:FC = () => {
  const classes = useSnsButtons();
  const router = useRouter();

  const goSignup = () => {
    router.push({query: {dialogType: 'signup'}})
    // pushAsCurrentPage({query: {dialogType: 'signup'}}, router)
  }
  return (
    <>
      <GoogleButton  />
      <Box mb={2}/>
      <KakaoButton  />
      <Box mb={2}/>
      <NaverButton />
      <Box className={classes.membership}>
        <Typography className={classes.typography} variant="body2" component="span">계정이 없으시다면 ?</Typography>
        <Button 
          className={classes.button}
          variant="text"
          onClick={goSignup}
        >가입하기</Button>
      </Box>
    </>
  )
}

const useDividerStyles = makeStyles(theme => ({
  wrapper:{
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  divider:{
    textAlign: 'center',
    position: 'relative'
  },
  typography: {
    position: 'sticky',
    padding: theme.spacing(1),
    backgroundColor: 'white',
    zIndex: 2,
    overflow: 'hidden',
    fontWeight: 400,
    color: theme.palette.grey[700]
  },
  line: {
    transform: 'translate(0, 50%)',
    position: 'absolute',
    width: "100%",
    left: 0,
    top: pxToRem(9),
    height: '1px',
    zIndex: 1,
    backgroundColor: theme.palette.grey[800]
  }
}))
const Divider = () => {
  const classes = useDividerStyles();
  return (
    // <Box className={classes.wrapper}>
      <Box className={classes.divider} display="block" position="relative">
        <Typography className={classes.typography} display="inline" variant="body2">또는 SNS 로그인</Typography>
        <Box className={classes.line} />
      </Box>
    // </Box>
  )
}

const Close:FC = () => {
  const setOpen = useSetRecoilState(loginDialogOpenAtom);
  const router = useRouter();
  const close = () => {
    if(router.query.isBackAble)
      router.back();
    else
      setOpen(false);
  }

  return (
    <Grid container>
      <Grid className="spacer" item></Grid>
      <Grid item>
        <IconButton onClick={close} >
          <CloseIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}
const useInputActionStyles = makeStyles( theme => ({
  inputs: {
    marginBottom: theme.spacing(1)
  },
  formController:{
    '& .MuiTypography-body1': {
      fontSize: pxToRem(14)
    }
  },
  radiusButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  }
  
}))
const InputAction:FC = () => {
  const classes = useInputActionStyles();
  const router = useRouter();

  const setUser = useSetRecoilState(userAtom);
  const setRequestState = useSetRecoilState(requestStateAtom);

  const [id, setId] = useState(parseCookies()[`${process.env.NEXT_PUBLIC_REMEMBER_ID}`]||'');
  const [pwd, setPwd] = useState('');
  const [remember, setRemember] = useState(
    !!parseCookies()[`${process.env.NEXT_PUBLIC_REMEMBER_ID}`]
  );
  const [allowSubmit, setAllowSubmit] = useState(false);

  useEffect(() => {
    setAllowSubmit(!isBlank(id)&&!isBlank(pwd));
  }, [id, pwd])

  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    const {value, name, checked} = e.target;
    // console.log(getCookie(`${process.env.NEXT_PUBLIC_REMEMBER_ID}`));
    // console.log(name, ':' ,value, ':', checked);
    if( !['id', 'pwd', 'remember'].includes(name) ) return;

    if(name === 'id'){
      setId(value);
    }else if( name === 'pwd' ){
      setPwd(value);
    }else {
      setRemember(checked);
    }
  }
  

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginPromise({
      id, pwd
    }, setUser, setRequestState)
    .then(result => {
      if(result.success){
        if(remember)
          setCookie(`${process.env.NEXT_PUBLIC_REMEMBER_ID}`, id);
        else 
          removeCookie(`${process.env.NEXT_PUBLIC_REMEMBER_ID}`);

        const {dialogType, ...query} = router.query;
        router.push({query})
      }else{
        const {message} = result.data;
        alert(message)
      }
    })
  }

  const goFindId = () => {
    const {dialogType, ...query} = router.query;
    router.push({query: {...query, dialogType: 'findId'}})
  }

  return (
    <Box>
      <form onSubmit={submit}>
        <RadiusInput 
          label="아이디"
          placeholder="아이디"
          className={classes.inputs}
          fullWidth
          color="primary"
          name="id"
          autoFocus
          defaultValue={id}
          onChange={onChangeHandler}
          // radius="md"
        />
        <RadiusInput 
          label="비밀번호"
          type="password"
          placeholder="비밀번호"
          className={classes.inputs}
          // radius="sm"
          color="primary"
          fullWidth
          name="pwd"
          defaultValue={pwd}
          onChange={onChangeHandler}
        />
        <Grid container>
          <Grid item>
            <FormControlLabel 
              control={<Checkbox color="primary" size="small" name="remember" checked={remember}  onChange={onChangeHandler} />}
              label="ID기억하기"
              labelPlacement="end"
              className={classes.formController}
            />
          </Grid>
          <Grid className="spacer"/>
          <Grid item>
            <Button onClick={goFindId} >아이디 &#183; 비밀번호찾기</Button>
          </Grid>
        </Grid>
        <RadiusButton
          type="submit"
          className={classes.radiusButton}
          fullWidth
          variant="contained"
          color="primary"
          // onClick={submit}
          disabled={!allowSubmit}
        >로그인</RadiusButton>
      </form>
    </Box>
  )
}

type SignProps = {
  id:string;
  pwd:string;
}
export const loginPromise = (
    body:SignProps, 
    setUser:SetterOrUpdater<User|undefined>, 
    setRequestState:SetterOrUpdater<REQUEST_STATE>
  ):Promise<defForm<User, {code:number, message: string}>> => {
  
  setRequestState(REQUEST_STATE.REQUESTING);
  return NextAxios()
  .post(`${process.env.NEXT_PUBLIC_API_URL}/membership/sign/in/id`, body)
  .then(res => {
    const {data, ...result} = defSuccess<RetJsonEntity<User>>(res);
    
    setUser(data.entity);
    setRequestState(REQUEST_STATE.LOADED);
    return {
      ...result,
      data: data.entity
    };
  })
  .catch(err => {
    const result = defError(err);
    setUser(undefined);
    setRequestState(REQUEST_STATE.LOADED);
    return result;
  })
}

export const logoutPromise = (setUser:SetterOrUpdater<User|undefined>) => {
  // const setUser = useSetRecoilState(userAtom);
  NextAxios()
  .get(`${process.env.NEXT_PUBLIC_API_URL}/membership/sign/out`)
  .then( _ => {}).catch( _ => {})
  .then( _ => setUser(undefined) );
}
