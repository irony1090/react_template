import { FC } from 'react';
import {
  Avatar, makeStyles
} from '@material-ui/core';
import RadiusButton from "./radiusButton";

import GoogleIcon from 'assets/icon_sm_google.png';
import { toQuery } from 'src/util';
import { useRouter } from 'next/router';
import { saveCurrentPage } from 'src/routerUtil';

type RequestGoogleAuthQuery = {
  response_type: 'code',
  scope: string,
  access_type: string,
  include_granted_scopes: boolean,
  state?: string,
  redirect_uri: string,
  client_id: string
}
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


const GoogleButton:FC = () => {
  const classes = useGoogleButtonStyles();
  const router = useRouter();
  const onSubmit = () => {
    const redirect_uri = `${process.env.NEXT_PUBLIC_GOOGLE_RETURN_URL}`;
    const query:RequestGoogleAuthQuery = {
      scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
      response_type: 'code',
      access_type: 'offline',
      include_granted_scopes: false,
      // state: 'state_parameter_passthrough_value',
      client_id: `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`,
      redirect_uri
    }
    const requestUrl = `${process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL}/o/oauth2/v2/auth?${toQuery(query, true)}`;
    saveCurrentPage(router);
    location.href=requestUrl;
  }

  return (<RadiusButton
    className={classes.button}
    fullWidth
    variant="outlined"
    onClick={onSubmit}
    // radius="lg"
  ><Avatar className={classes.avatar} src={GoogleIcon} />구글 로그인</RadiusButton>)
}

export default GoogleButton;