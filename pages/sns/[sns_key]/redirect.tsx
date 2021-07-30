import { NextPage, NextPageContext } from "next";
import {Box} from '@material-ui/core'
import { defError, defSuccess, NextAxios } from "src/axios";
import CertificationToken from "src/entity/CertificationToken";
import { useEffect } from "react";
import {useRouter} from 'next/router'


type SnsRedirectProps = {

}
const SnsRedirect:NextPage<SnsRedirectProps> = ({}) => {
  const router = useRouter();
  useEffect(() => {

    const {query} = router;
    console.log(query);
    const {sns_key: snsKey} = query;
    // console.log(query.code);
    let body;
    if('kakao' === snsKey){
      const {code} = query;
      body = {code};
    }else if('naver' === snsKey) {
      const {code, state} = query;
      body = {code, state}
    }else if('google' === snsKey){
      const {code, scope, authuser, prompt} = query;
      body = {code, scope, authuser, prompt};
    }

    NextAxios().post(
      `http://localhost:3000/sns/${snsKey}/token`,
      body
    ).then(res => {
      const {data} = defSuccess<CertificationToken>(res);
      console.log(data);

      NextAxios().get('http://localhost:3000/sns/token')
      .then(getTokenRes => defSuccess<CertificationToken>(getTokenRes))
      .catch(err => defError(err))
      .then(({data: getTokenData}) => {
        console.log(getTokenData);
      })

      NextAxios().post('http://localhost:3000/users?sns', {nickname: 'user-3'})
      .then(userSnsRes => defSuccess(userSnsRes))
      .catch(err => defError(err))
      .then(({data: userSnsError}) => {
        console.log(userSnsError);
      })
      // NextAxios().put('http://localhost:3000/users/sns')
      // .then(userSnsRes => defSuccess(userSnsRes))
      // .catch(err => defError(err))
      // .then(({data: userSnsError}) => {
      //   console.log(userSnsError);
      // })

      // NextAxios().delete('http://localhost:3000/sns/token/unlink')
      // .then(getTokenRes => defSuccess(getTokenRes))
      // .catch(err => defError(err))
      // .then(({data: unlinckData}) => {
      //   console.log(unlinckData);
      // })

    }).catch(err => {
      const errData = defError(err);
      console.log(err);
      console.log(errData.status, errData.data)
    })
      

  }, [])
  return <Box>
  </Box>
}
SnsRedirect.getInitialProps = async (ctx: NextPageContext) => {
  
  
  return {

  }
}

export default SnsRedirect;


