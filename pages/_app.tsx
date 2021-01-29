import React, {FC} from 'react';
import Head from 'next/head';
import { AppProps, } from 'next/app';
import type { AppContext, } from 'next/app'
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles';

import theme from 'theme/theme';

import {RecoilRoot} from 'recoil';

import appActions from 'reducers/app/appActions';


import { Components } from 'reducers/app/appTypes';
import { wrapper } from 'reducers/store';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from 'reducers';

// import 'theme/main.css'

export type CommProps = {
}



const MyApp = (props: AppProps<CommProps>) => {
  const { Component, pageProps } = props;
  // let size = pageProps.sizeInfo.grade
  const dispatch = useDispatch();
  const appReducer = useSelector((state: rootState) => state.AppReducer);
  
  
  const { aboveLayout } = appReducer;
  
  React.useEffect(() => {
    // Remove the server-side injected CSS.

    const jssStyles = document.querySelector('#jss-server-side');
    dispatch(appActions.SET_LAYOUT(Components.ABOVE, { width: window.innerWidth, height: window.innerHeight }))
    if (!window["flag"]) {
      window.addEventListener('resize', () => {

        window["flag"] = true;
        dispatch(appActions.SET_LAYOUT(Components.ABOVE, { width: window.innerWidth, height: window.innerHeight }))
      })
    }


    if (jssStyles) 
      jssStyles.parentElement!.removeChild(jssStyles);
    

    return () => {
      window.removeEventListener("resize", () =>
        dispatch(appActions.SET_LAYOUT(Components.ABOVE, null))
      )
    }
  }, [aboveLayout?.grade]);

  return (
    <Wrapper>
      <Head>
        <title>ToDoList</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        {/* <link href="https://fonts.googleapis.com/css?family=Playfair+Display:700" rel="stylesheet" /> */}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Wrapper>
  );
}
MyApp.getInitialProps = async (context: AppContext) => {
  const { ctx, Component, } = context;
  // const {store} = ctx;
  let pageProps: any = {};
  // 비동기작업 한번에 처리. 스레드 블럭.
  if (Component.getInitialProps) {
    const new_ctx = {
      ...ctx,
      // user: ctx.store.getState().AuthReducer.user,
      // company: ctx.store.getState().CommReducer.company,
      // artworkTypes: ctx.store.getState().CommReducer.artworkTypes
    }
    pageProps = await Component.getInitialProps(new_ctx);
  }

  return {
    pageProps: {
      ...pageProps,
    }
  }

}
export default wrapper.withRedux(MyApp);

const Wrapper:FC = ({children}) => {
  return <RecoilRoot>
    {children}
  </RecoilRoot>
}