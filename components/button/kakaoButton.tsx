import { FC } from 'react';
import {
  Avatar, makeStyles
} from '@material-ui/core';
import RadiusButton from "./radiusButton";

import KakaoIcon from 'assets/icon_sm_kakao.png';
import { toQuery } from 'src/util';

import { useRouter } from 'next/router';
import { saveCurrentPage } from 'src/routerUtil';

const useGoogleButtonStyles = makeStyles(theme => ({
  button: {
    position: 'relative',
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    position: 'absolute',
    left: theme.spacing(6),
    top: 12
  }
}))
type RequestKakaoAuthQuery = {
  response_type: 'code',
  client_id: string,
  state?: string,
  redirect_uri: string,
  
}
const KakaoButton:FC = () => {
  const classes = useGoogleButtonStyles();
  const router = useRouter();
  const onSubmit = () => {
    const redirect_uri = `${process.env.NEXT_PUBLIC_KAKAO_RETURN_URL}`;
    
    const query:RequestKakaoAuthQuery = {
      response_type: 'code',
      client_id: `${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}`,
      redirect_uri
    }
    const requestUrl = `${process.env.NEXT_PUBLIC_KAKAO_AUTH_URL}/oauth/authorize?${toQuery(query, true)}`;
    // console.log(query, requestUrl);
    saveCurrentPage(router);
    location.href=requestUrl;
  }
  return (<RadiusButton
    className={classes.button}
    fullWidth
    variant="contained"
    color="primary"
    onClick={onSubmit}
    // radius="lg"
  ><Avatar className={classes.avatar} src={KakaoIcon} />카카오 로그인</RadiusButton>)
}

export default KakaoButton;