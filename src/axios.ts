import Axios from 'axios';
import type {AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios'
import type {NextPageContext} from 'next'

export enum ContentType {
  MULTIPART= 'multipart/form-data',
  JSON= 'application/json'
}

Axios.defaults.headers.post['Content-Type'] = ContentType.JSON;
Axios.defaults.headers.put['Content-Type'] = ContentType.JSON;
Axios.defaults.headers.patch['Content-Type'] = ContentType.JSON;
Axios.defaults.headers.delete['Content-Type'] = ContentType.JSON;

Axios.defaults.timeout = 5000;
// Axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

Axios.defaults.withCredentials = true
const GET_TIMEOUT:number = 2500;

// export type defForm<T> = {
//   status: number,
//   data: T,
//   err?: any  
// }
interface ResultType<T> {
  success: boolean;
  err: T;
}
export type defForm<S, F> = DefSuccess<S> | DefError<F>

interface DefSuccess<T> extends ResultType<undefined>{
  status: number;
  data: T;
  success: true;
  // err: undefined;
}
interface DefError<T> extends ResultType<AxiosError>{
  status: number;
  data: T;
  success: false;
  // err: AxiosError  ;
}


export type RetJsonEntity<T=any> = {
  returnCode: number,
  returnMessage: string,
  entity: T
}

const defSuccess = <T=any>(res:AxiosResponse<T>):DefSuccess<T> => {
  const {status, data } = res;
  if(status == 204){
    return { status, data, success:true, err: undefined } 
  }else
    return { status, data, success:true, err: undefined }
}
const defError = (err:AxiosError):DefError<{code:number, message: string}> => {
  if(err.response){
    const {status, data} = err.response;
    return { status, data, success: false, err }
  }else{
    return {status: -1, data: {code: -1, message: '에러 메세지를 확인해주세요'}, success: false, err: err || {}}
  }

}



// const NextAxios = (ctx?:NextPageContext) => {
//   if(!ctx || !ctx.req)
//     return Axios;

//   const clientHeaders = ctx.req.headers;
//   Object
//     .keys(clientHeaders)
//     .forEach( key => Axios.defaults.headers.common[key] = clientHeaders[key] )

//   return Axios;
// }

const NextAxios = (ctx?:NextPageContext) => {
  if(ctx && ctx.req){
    const clientHeaders = ctx.req.headers;
    const {cookie} = clientHeaders
    if(cookie)
      Axios.defaults.headers.Cookie = cookie;
    // Object
    //   .keys(clientHeaders)
    //   .forEach( key => Axios.defaults.headers.common[key] = clientHeaders[key] )
  }
  return {
    ...Axios,
    get: (url: string, config?: AxiosRequestConfig) => {
      return Axios.get(url, {
        timeout: GET_TIMEOUT,
        ...config
      })
    },
    multipart: (url: string, data?: any, config?: AxiosRequestConfig) =>{
      const headers = config?.headers || {}; 
      
      return Axios.post(url, data, {
        ...config,
        headers: {
          ...headers,
          'content-type': ContentType.MULTIPART
        }
      })
    }
  }
}
  

export {
  NextAxios,
  defSuccess,
  defError
};

export default Axios;