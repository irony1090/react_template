declare module '*.png';
// declare module "*.png" {
//   const content: string;
//   export default content;
// }
// declare module "*.png" {
//   const value: any;
//   export = value;
// }
declare module '*.jpg';
// declare module "*.jpg" {
//   const content: string;
//   export default content;
// }
// declare module '*.json';
declare module '*.svg';

declare var IMP: any;

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_ACTIVE: string;
    NEXT_PUBLIC_SESSION_NAME: string;
    NEXT_PUBLIC_BOOKMARK_PAGE: string;
    NEXT_PUBLIC_REMEMBER_ID: string;
    NEXT_PUBLIC_LOCAL: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_ACTIVE_IMG_URL: string;
    NEXT_PUBLIC_API_IMG: string;
    NEXT_PUBLIC_API_IMG_ORIGIN: string;
    NEXT_PUBLIC_API_IMG_PREVIEW: string;

    KAKAO_JS_KEY: string;
    NEXT_PUBLIC_KAKAO_JS_KEY: string;
    NEXT_PUBLIC_KAKAO_API_URL: string;
    NEXT_PUBLIC_KAKAO_AUTH_URL: string;
    NEXT_PUBLIC_KAKAO_CLIENT_ID: string;
    KAKAO_CLIENT_SECRET: string;
    KAKAO_TOKEN_URL: string;
    KAKAO_ADMIN_KEY: string;
    NEXT_PUBLIC_KAKAO_RETURN_URL: string;
    NEXT_PUBLIC_KAKAO_GRANT_TYPE: string;

    NEXT_PUBLIC_GOOGLE_AUTH_URL: string;
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXT_PUBLIC_GOOGLE_RETURN_URL: string;

    GOOGLE_TOKEN_URL: string;
    NEXT_PUBLIC_GOOGLE_GRANT_TYPE: string;

    NEXT_PUBLIC_NAVER_AUTH_URL: string;
    NAVER_TOKEN_URL: string;
    NEXT_PUBLIC_NAVER_CLIENT_ID: string;
    NAVER_CLIENT_SECRET: string;
    NEXT_PUBLIC_NAVER_RETURN_URL: string;
  }
}