import { NextPageContext } from "next";
import { destroyCookie, parseCookies, setCookie as setCookie_ } from "nookies";
import { isBlank } from "./format";
import { pick } from "./util";


export const getCookie = <T>(key:string, ctx?:NextPageContext):T|undefined => {
  const valStr = parseCookies(ctx)[key];
  // console.log(key, valStr);
  if(!isBlank(valStr)){
    try {
      return <T>pick(JSON.parse(valStr));
    } catch (_) {
      // console.log('실패');
      return undefined
    }
  }
}

type CookiesOptions = {
  path?: string,
  maxAge?: number //30 * 24 * 60 * 60,
}
export const setCookie = (
    key: string, val: any, 
    option:CookiesOptions = {path: '/', maxAge: 7 * 24 * 60 * 60},  
    ctx?:NextPageContext
  ) => setCookie_(ctx, key, JSON.stringify(val), option);


export const removeCookie = (
    key: string, 
    option:CookiesOptions = {path: '/', maxAge: 7 * 24 * 60 * 60}, 
    ctx?:NextPageContext
  ) => destroyCookie(ctx, key, option);