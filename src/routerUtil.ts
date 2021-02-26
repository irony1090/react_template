import { NextRouter } from "next/router"
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ParsedUrlQuery } from "querystring";
import { UrlObject } from "url";
import { pick } from "./util";


export const pushAsCurrentPage = (urlOption: UrlObject, router: NextRouter) => {
  // const router_ = router||useRouter();
  const {query, pathname} = router;
  router.push(urlOption, {pathname, query});
}

type SavePage = {
  pathname: string,
  query: ParsedUrlQuery
}
export const saveCurrentPage = (router: NextRouter) => {
  const {pathname, query} = router;
  const {dialogType, ...query_} = query
  setCookie(
    null, 
    `${process.env.NEXT_PUBLIC_BOOKMARK_PAGE}`, 
    JSON.stringify({pathname, query: query_}),
    {path: '/'}
  );
}

export const getBookmarkPage = ():SavePage|undefined => {
  const cookies = parseCookies();
  try{
    const bookmarkPage = pick<SavePage>(JSON.parse(cookies[`${process.env.NEXT_PUBLIC_BOOKMARK_PAGE}`] ));
    return bookmarkPage
  }catch(_){
    return undefined
  }
}

export const removeBookmarpage = () => 
  destroyCookie(null, `${process.env.NEXT_PUBLIC_BOOKMARK_PAGE}`);
