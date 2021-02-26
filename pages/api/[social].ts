import { NextApiRequest, NextApiResponse } from "next";
import {defError, defSuccess, NextAxios} from 'src/axios' 
import CertificationToken from "src/entity/CertificationToken";
import { pick, toQuery } from "src/util";

// type RequestTokenBody = {
//   client_id: string,
//   client_scret: string,
//   code: string,
//   state: string
//   grant_type: string
// }
export default (req:NextApiRequest, res: NextApiResponse) => {
  const {social} = req.query;
  // console.log('쿼리', req.query)
  if(social === 'naver'){
    naverTokenProcess(req, res);
  }else if(social === 'kakao'){
    // console.log('카카오');
    kakaoTokenProcess(req, res);
  }else if(social === 'google'){
    googleTokenProcess(req, res);

  }else{
    res.status(400).json({
      code: -100,
      message: '지원하지 않는 소셜 로그인입니다'
    })
  }

  
}

const kakaoTokenProcess = (req:NextApiRequest, res:NextApiResponse) => {
  const clientReqBody = pick(req.query, ['code']);
  // console.log(clientReqBody)
  if(!clientReqBody) {
    res.status(400).json({
      code: -1,
      message: "프로퍼티 부족합니다"
    })
    return;
  }

  const {code} = clientReqBody;
  const client_id = `${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}`;
  const grant_type = `${process.env.NEXT_PUBLIC_KAKAO_GRANT_TYPE}`;
  const redirect_uri = `${process.env.NEXT_PUBLIC_KAKAO_RETURN_URL}`;
  // const client_secret = `${process.env.KAKAO_CLIENT_SECRET}`;

  const reqUrl = `${process.env.KAKAO_TOKEN_URL}`
  const params = {
    code, client_id, redirect_uri, grant_type
  }
  const headers = {
    'content-type': "application/x-www-form-urlencoded;charset=utf-8"
  }
//   -header 'Content-Type: application/x-www-form-urlencoded' \
// --data-urlencode 'client_id=1234567891011-t28d34tfmfk5i5865hm7kij8nvl7vdax.apps.googleusercontent.com' \
// --data-urlencode 'client_secret=KFcsEpfLjg64ta6TtQ1QibOC' \
// --data-urlencode 'grant_type=refresh_token' \
// --data-urlencode 'refresh_token=1/gb5fEFSu_iwbvbsXZdK8ddrJjNTD1RrXbQqdsT6wuJK'
  // console.log(reqUrl, params, toQuery(params))

  NextAxios().post(
    reqUrl, toQuery(params), {headers}
  ).then(axiosRes => {
    const {data} = defSuccess(axiosRes);
    const cur = new Date();
    // console.log('카카오 성공 ', data);
    const tk = new CertificationToken(
      "KAKAO"
      , data.access_token
      , data.refresh_token
      , cur
      , new Date(cur.getTime() + (data.expires_in * 1000) )
      , data.token_type
      , data.scope
    )
    res.status(200).json(tk);
  }).catch(err => {
    const {data} = defError(err);
    // console.log('카카오 실패 ', data);

    res.status(400).json({
      code: -100,
      entity: data
    })
  })

} 
const googleTokenProcess = (req:NextApiRequest, res:NextApiResponse) => {
  const clientReqBody = pick(req.query, ['code', 'scope', 'authuser', 'prompt', 'social']);
  if(!clientReqBody) {
    res.status(400).json({
      code: -1,
      message: "프로퍼티 부족합니다"
    })
    return;
  }

  const {code} = clientReqBody;
  const client_id = `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`;
  const client_secret = `${process.env.GOOGLE_CLIENT_SECRET}`;
  const grant_type = `${process.env.NEXT_PUBLIC_GOOGLE_GRANT_TYPE}`;
  const redirect_uri = `${process.env.NEXT_PUBLIC_GOOGLE_RETURN_URL}`;

  const reqUrl = `${process.env.GOOGLE_TOKEN_URL}`

  const params = {
    code, client_id, client_secret, redirect_uri, grant_type
  }
//   -header 'Content-Type: application/x-www-form-urlencoded' \
// --data-urlencode 'client_id=1234567891011-t28d34tfmfk5i5865hm7kij8nvl7vdax.apps.googleusercontent.com' \
// --data-urlencode 'client_secret=KFcsEpfLjg64ta6TtQ1QibOC' \
// --data-urlencode 'grant_type=refresh_token' \
// --data-urlencode 'refresh_token=1/gb5fEFSu_iwbvbsXZdK8ddrJjNTD1RrXbQqdsT6wuJK'

  NextAxios().post(
    reqUrl,
    params
  ).then(axiosRes => {
    const {data} = defSuccess(axiosRes);
    const cur = new Date();
    // console.log('구글 성공 ', data);
    const tk = new CertificationToken(
      "GOOGLE"
      , data.access_token
      , data.refresh_token
      , cur
      , undefined
      , undefined
      // , credential.idToken
    );
    res.status(200).json(tk);
  }).catch(err => {
    const {data} = defError(err);
    // console.log('구글 실패 ', data);
    res.status(400).json({
      code: -100,
      // message: data,
      entity: data
    })
  })

} 

const naverTokenProcess = (req:NextApiRequest, res:NextApiResponse) => {

  const clientReqBody = pick(req.query, ['code', 'state']);
  if(!clientReqBody) {
    res.status(400).json({
      code: -1,
      message: "프로퍼티 부족합니다"
    })
    return;
  }

  const {code, state} = clientReqBody;
  const client_id = `${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;
  const client_secret = `${process.env.NAVER_CLIENT_SECRET}`;
  const grant_type = 'authorization_code';
  const reqUrl = `${process.env.NAVER_TOKEN_URL}`
  const params = {
    code, state, 
    client_id, client_secret,
    grant_type
  }
  NextAxios().get(
    reqUrl, 
    { params }
  ).then(axiosRes => {
    const {data} = defSuccess(axiosRes);
    if(data.error)
      throw new Error(data.error_description);
    
    // console.log('SUCCESS', data);

    const cur = new Date();
    res.status(200).json( 
      new CertificationToken(
        "NAVER"
        , data.access_token
        , data.refresh_token
        , cur
        , new Date(cur.getTime() + (data.expires_in * 1000))
        , data.token_type
      ) 
    )
  }).catch(err => {
    const {data} = defError(err);
    // console.log('ERROR', err);
    
    res.status(400).json({
      code: -100,
      entity: data
    })
  });
}