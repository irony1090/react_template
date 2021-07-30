import { FC } from 'react';
import {
  Avatar, makeStyles
} from '@material-ui/core'
import RadiusButton from "./radiusButton";

import NaverIcon from 'assets/icon_sm_naver.png';
import { randomInt, toQuery } from 'src/util';
import { saveCurrentPage } from 'src/routerUtil';
import { useRouter } from 'next/router';

type RequestNaverAuthQuery = {
  response_type: 'code',
  client_id: string,
  state: number,
  redirect_uri: string
}
const useNaverButtonStyles = makeStyles(theme => ({
  button: {
    position: 'relative',
    backgroundColor: '#34A853',
    color: 'white',
    '&:hover': {
      backgroundColor: '#22893E'
    }
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    position: 'absolute',
    left: theme.spacing(6),
    top: 12
  }
}))
const NaverButton:FC = () => {
  const classes = useNaverButtonStyles();
  const router =useRouter();
  const onSubmit = () => {
    const state = randomInt(100, 3333);
    const redirect_uri = `${process.env.NEXT_PUBLIC_NAVER_RETURN_URL}`;
    const query:RequestNaverAuthQuery = {
      response_type: 'code',
      client_id: `${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`,
      state,
      redirect_uri
    }
    const requestUrl = `${process.env.NEXT_PUBLIC_NAVER_AUTH_URL}/oauth2.0/authorize?${toQuery(query, true)}`;
    saveCurrentPage(router);
    location.href=requestUrl;
  }
  return (<RadiusButton
    className={classes.button}
    fullWidth
    variant="contained"
    onClick={onSubmit}
    // radius="lg"
  ><Avatar className={classes.avatar} src={NaverIcon} />네이버 로그인</RadiusButton>)
}

export default NaverButton;