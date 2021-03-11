import moment from 'moment';

// export const NUMBER = /[0-9]/g;
export const SPECIAL_CHARACTERS = /[~!@\#$%<>^&*\|\\\?\/]/g;
export const OTHER_THEN_NUMBER = /\D/g;
export const OTHER_THEN_NUMBER_AND_RELATION = /[^\d\.\-\+]/g;
export const NUMBER_FORM = /^[\-\+]?\d*(\.\d+)?$/;
export const DIMENSION_FORM = /[\-\+]?\d+(\.\d+)?\s*[^\n\s\b]*/g;
export const EMAIL_FORM = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export const INT_FORM = /^\d+$/;
export const FLOAT_FORM = /^\d+\.\d+$/;
export const TAG_FORM = /\<\/?[a-z]+[^\<\>\\]*\/?\>/gi;
export const SPACE_BAR = /\s/g;
// export const NUMBER_FORM = /^[\-\+]?((\d+\.?)|(\.?\d+)|(\d+\.\d+))$/;
export const WITH_COMMAS = /\B(?=(\d{3})+(?!\d))/g;
export const WITH_HYPHEN=/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/;

const COMMA = ',';
export const EMPTY = '';
export const STRING = 'string';
// const NAN = 'NaN';
const NUMBER = 'number';
// const UNDEFINED = 'undefined';

const ONE_MINUTE = 60 * 1000,
  ONE_HOUR = ONE_MINUTE * 60,
  ONE_DAY = ONE_HOUR * 24,
  ONE_WEEK = ONE_DAY * 7,
  ONE_MONTH = ONE_DAY * 30,
  ONE_YEAR = ONE_DAY * 365;

/** README!!!
 *  문자열 관련
 *  OUTPUT은 반드시 기본값이 들어갈것
 *  (undefind 또는 null이 OUTPUT으로 나오지 않도록)
 */


 /**금액 3자리수마다 콤마 찍기
  * 
  * @param target : 문자열
  * @param def : 기본 값
  */
export const numberWithCommas = (target: string|number|undefined, def:number|string=EMPTY):string => {
  if(!target) return def.toString();

  return target.toString()
    .replace(OTHER_THEN_NUMBER, EMPTY)
    .replace(WITH_COMMAS, COMMA);

}

type LimitNumberOptions ={
  def: number|string;
  max?: number;
  min?: number;
}
const limitNumberOpts:LimitNumberOptions = {
  def: '',
  max: 100
}
/** 입력 숫자 제한
 * 
 * @param target 문자열
 * @param {
 *  def : 기본 값
 *  min : 최소 값
 *  max : 최대 값 
 * }
 */
export const limitNumber = (target: string | undefined,  {def=EMPTY, max=100, min}=limitNumberOpts):string => {
  if(!target || !isNumberForm(target)) return def.toString();
  const stringNum = target.replace(OTHER_THEN_NUMBER_AND_RELATION, EMPTY);
  if(stringNum === EMPTY) return def.toString();
  const num = Number(stringNum);
  if(min && min > num)
    return min.toString();
  else if(max && max < num)
    return max.toString();
  else 
    return target
}

/** 빈 문자열 구분. tag는 전부 테스트에서 제외
 * 
 * @param target : 문자열
 */
export const isBlank = (target:string|number):boolean =>{
  return !isUndeclared(target) 
    && (
      target === EMPTY 
      || (
        typeof target === 'string'
          && target.replace(TAG_FORM, EMPTY).replace(SPACE_BAR, EMPTY) === EMPTY
      )
    )
}
  
// export const isString = (target: any): target is string => {
//   return typeof target === STRING;
// }
/**a와 b의 내용이 같은지 비교
 * 순서가 달라도 다른 내용으로 인식
 * 
 * @param a 비교 대상 a
 * @param b 비교 대상 b
 */
export const isEqual = (a:any, b:any) => 
  JSON.stringify(a) === JSON.stringify(b);

/** undefined, null, NaN 구분
 * 
 * @param target 타겟
 */
// export const isUndeclared = (target:any):boolean =>
//   (
//     target === null || target === undefined 
//     || (typeof target === NUMBER && isNaN(target)) 
//   );
export const isUndeclared = (target:any): target is undefined | null | typeof NaN =>
  (
    target === null || target === undefined 
    || (typeof target === NUMBER && isNaN(target)) 
  );
// export const isNaN = (target:any):boolean => 
//   target === NaN;

/**숫자 포맷 구분
 * 
 * @param target 
 */
export const isNumberForm = ( target: any ) : target is number | string =>
  typeof target === STRING 
    ? NUMBER_FORM.test(target)
    : Number(target) === target;

  // Number(num) === num;
export const isString = (target: any) : target is string => 
    typeof target === STRING;

/*
export const pick = <T, K extends keyof T, F>(
    object: T, 
    keys: Array<K>, 
    filter:(key: K, val:T[K]) => F|T[K] =  (_key, val) => val
  // ): Pick<T, K> | undefined =>{
  ): Record<K, F|T[K]> | undefined =>{
// export const pick = <T, K extends keyof T, F>(object: T, keys: Array<K>, filter?:(key: K, val:T[K]) => F): Pick<T, K>|Record<K, F> | undefined =>{
  const obj:Record<K, F|T[K]>|any = {}; 
  const fail = keys.some(key => {
    let val:T[K]|F = object[key] ;
    if( isUndeclared(val) ) return true;
    val = filter? filter(key, val) as F : val;
    if( isUndeclared(val) ) return true;
    obj[key] = val;
  })

  if(fail) return undefined;

  return obj;
}
*/


// export const isInteger = ( num:any ):boolean => 
//   isNumber(num) && num % 1 === 0;
export const isFloat = ( num:any ):boolean => 
  isNumberForm(num) && Number(num) % 1 !== 0;

export const numberWithHyphen =(val:string | undefined,def=''):string=>{
  if(!val) return def;
  return val.replace(OTHER_THEN_NUMBER,'').replace(WITH_HYPHEN,'$1-$2-$3').replace("--", "-");
}

export const priceCreate =(val:string | undefined,def=0):number=>{
  if(!val) return def;
  const parseVal:number =parseInt(val.replace(OTHER_THEN_NUMBER,''));
  if(val.length>1&&parseInt(val.slice(0,1))<1){
    return parseInt(val.slice(1));
  }
  return isNaN(parseVal)?0:parseVal;
    
}

type PadTextProps = {
  text: string,
  start?: 'left'|'right',
  padChar?: string,
  excludeLength: number
}
export const hideTextExclude = ({
  text,
  start='left',
  padChar='_',
  excludeLength
}:PadTextProps):string => {

  if(start === 'left'){
    const lastNthText = text.substring(0, excludeLength);
    return lastNthText.padEnd( Math.max(excludeLength, text.length) , padChar);
  }else{
    const startNthText = text.slice(-excludeLength);
    return startNthText.padStart( Math.max(excludeLength, text.length), padChar);
  }

}

export const parseDate = (date:string|Date): Date|undefined =>{
  if(typeof date == 'string'){
    const nums:any = date.split(/\D/);
    return new Date( nums[0]*1, nums[1]-1, nums[2]*1, nums[3]*1, nums[4]*1, nums[5]*1 )
  }else if( date instanceof Date){
    return date
  }else{
    return undefined;
  }
}

type TimeOrDateOption = {
  timeSeparator?: string,
  dateSeparator?: string
}
export const timeOrDate = (milliseconds:string|number, opt:TimeOrDateOption={}):string => {
  if(!isNumberForm(milliseconds)) return '알수없음';
  const d = moment(milliseconds).toDate();
  // const d: Date|undefined = moment(date).;
  // if(!d || d.getTime() === NaN)
  //   return '알수없음';

  let cur = new Date();
  cur = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate());

  // let diff =  d.getTime() - cur.getTime();
  const cur_time = cur.getTime();
  const target_time = d.getTime();
  // console.log(d);
  // console.log(`${d.getMonth()}, ${d.getDay()}`)
  if(cur_time < target_time && target_time > (cur_time+ONE_DAY) ){
    let hour = '' + d.getHours(),
    minutes = '' + d.getMinutes();
    hour = hour.length == 1 ? '0' + hour : hour;
    minutes = minutes.length == 1 ? '0' + minutes : minutes
    if(opt.timeSeparator)  
      return `${hour}${opt.timeSeparator}${minutes}`;
    else
      return `${hour}시 ${minutes}분`;
  }else{
    let year = d.getFullYear(),
    month = '' + (d.getMonth() + 1),
    day =  '' + d.getDate();

    month = month.length == 1 ? '0' + month : month;
    day = day.length == 1 ? '0' + day : day;
    if(opt.dateSeparator)
      return `${year !== cur.getFullYear() ? `${year}${opt.dateSeparator}` : ''}${month}${opt.dateSeparator}${day}`;
    else
      return `${year !== cur.getFullYear() ? `${year}년 ` : ''}${month}월 ${day}일` ;
  }
  // return '';
  
}

type aboutDate_opt ={
  cur?: Date ,
  excess?:string,
  under?:string
}
export const aboutDate = (milliseconds:string|number, opt:aboutDate_opt|undefined ): string => {
  if(!isNumberForm(milliseconds)) return '알수없음';
  
  let cur;
  if(opt)
    cur = opt.cur;
  if(!cur) cur = new Date();


  const d = moment(milliseconds).toDate();

  const d_long = d.getTime(),
  cur_long = cur.getTime();

  let diff = cur_long - d_long;

  if(diff > 0){ // 양수. 과거
    if(opt?.under) return opt.under;

    if(diff > ONE_YEAR){
      return `${Math.floor(diff / ONE_YEAR)}년 전`
    }else if(diff > ONE_MONTH){
      return `${Math.floor(diff / ONE_MONTH)}달 전`
    }else if(diff > ONE_WEEK){
      return `${Math.floor(diff / ONE_WEEK)}주일 전`
    }else if(diff > ONE_DAY){
      return `${Math.floor(diff / ONE_DAY)}일 전`
    }else if(diff > ONE_HOUR){
      return `${Math.floor(diff / ONE_HOUR)}시간 전`
    }else if(diff > ONE_MINUTE){
      return `${Math.floor(diff / ONE_MINUTE)}분 전`
    }else {
      return '방금전'
    }
  }else{  //음수. 미래
    if(opt?.excess) return opt.excess;

    diff = Math.abs(diff);
    if(diff > ONE_YEAR){
      return `${Math.floor(diff / ONE_YEAR)}년 후`
    }else if(diff > ONE_MONTH){
      return `${Math.floor(diff / ONE_MONTH)}달 후`
    }else if(diff > ONE_WEEK){
      return `${Math.floor(diff / ONE_WEEK)}주일 후`
    }else if(diff > ONE_DAY){
      return `${Math.floor(diff / ONE_DAY)}일 후`
    }else if(diff > ONE_HOUR){
      return `${Math.floor(diff / ONE_HOUR)}시간 후`
    }else if(diff > ONE_MINUTE){
      return `${Math.floor(diff / ONE_MINUTE)}분 후`
    }else {
      return '잠시후'
    }
  }

}