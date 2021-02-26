import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { DIMENSION_FORM, isNumberForm, isUndeclared, OTHER_THEN_NUMBER } from "./format";
import moment from 'moment';

const ONE_MINUTE = 60 * 1000,
  ONE_HOUR = ONE_MINUTE * 60,
  ONE_DAY = ONE_HOUR * 24,
  ONE_WEEK = ONE_DAY * 7,
  ONE_MONTH = ONE_DAY * 30,
  ONE_YEAR = ONE_DAY * 365;

export const clone = <T>(obj: T):T => 
  JSON.parse(JSON.stringify(obj)) as T;

export const pxToRem = (value:number, rootSize:number|undefined = 16) => 
  `${value / rootSize}rem`;



const UNIT_FORM = /[^\s\,\.]+/;
const NUMBER_FORM = /[\-\+]?\d*(\.\d+)?/;
type DigitAndUnit = {
  digit?: number,
  unit?: string
}
export const getDigitAndUnitList = (dimension: string): Array<DigitAndUnit> => {
  
  const arr:RegExpMatchArray|null = dimension.match(DIMENSION_FORM);
  if(!arr || arr.length === 0) return [];

  return arr.filter(keyword => keyword).map(keyword => {
      const numberForm:RegExpMatchArray|null = keyword.match(NUMBER_FORM)

      if( !numberForm || numberForm.length === 0 ) return {};
      const digit = Number(numberForm[0]);

      const unitForm:RegExpMatchArray|null = keyword.replace(numberForm[0], '').trim().match(UNIT_FORM);
      if( !unitForm || unitForm.length === 0) return {digit};
      const unit = unitForm[0];
      return {
        digit, unit
      }
    }).filter(digitAndUnit => digitAndUnit.digit);
}

export const getDigitAndUnit = (dimension: string): DigitAndUnit|{} =>{
  const digitAndUnitList = getDigitAndUnitList(dimension);
  return digitAndUnitList.length === 0 ? {} : digitAndUnitList[0];
}

type NumberAndPad = {
  value: any;
  start?: string;
  end?: string;
}
export const isNumberAndPad = ({value, start='', end=''}:NumberAndPad):string|undefined => {
  if(!isNumberForm(value) || !value) return ;

  return `${start}${value}${end}`;
}



export const randomInt = (max: number, min: number) => {
  Math.random() * (max - min);
  return Math.floor(Math.random() * (max - min)) + min;
}

export const initNumber = (obj: any, def?: number): number => {
  let result = obj * 1;
  if(Number.isInteger(result))
    return result;
  else if(!def) return NaN;
  else
    return def;
}
export const initString = (obj: string|string[]|undefined, def?: string): string|null|undefined => {
  if(!obj)
    return def;
  else if(Array.isArray(obj))
    return obj[0];
  else
    return obj;
  
}

export const toQuery = (obj:any, encode?: any):String => {
  let result = '';
  if(obj && typeof obj === 'object')
    Object.keys(obj).forEach(k =>{
      const item:any = obj[k];
      if(Array.isArray(item)){
        item.forEach(v => {
          if( !isUndeclared(v) ) result += `${k}=${ !isUndeclared(encode) ? encodeURIComponent(v): v}&`
        })
      }else if( !isUndeclared(item) ){
        result += `${k}=${!isUndeclared(encode) ? encodeURIComponent(item) : item}&`
      }
      // console.log(item);
    })
  
  if(result.endsWith('&')) result = result.substr(0, result.length-1);
  // if(result.endsWith('?')) result = '';
  return result;
}

export const getProperty = <T, K extends keyof T>(o: T, name: K): T[K] => o[name];

// getProperty({src:'sss', sss: 'asd'}, 'src');
export const makeCSSProperties = 
  < T extends Record<string, CSSProperties>>(properties: T): T => properties;

export const pick = <T, K extends keyof T = keyof T>(
  object: T, 
  keys?: Array<K>
// ): Pick<T, K> | undefined =>{
): Pick<T, K> | undefined =>{
// export const pick = <T, K extends keyof T, F>(object: T, keys: Array<K>, filter?:(key: K, val:T[K]) => F): Pick<T, K>|Record<K, F> | undefined =>{
  const obj:Record<K, Exclude<T[K], undefined>>|any = {}; 
  const keys_: Array<any> = keys || Object.keys(object);
  const fail = keys_.some(key => {
    let val:T[K] = object[key] ;
    if( isUndeclared(val) ) return true;
    // val = filter? filter(key, val) as F : val;
    // if( isUndeclared(val) ) return true;
    obj[key] = val;
  })

  if(fail) return undefined;

  return obj;
}

type BirthGenderProps = {
  year: string;
  month: string;
  day: string;
  gender: 'M' | 'F';
  age: number;
}
export const privateNumberToBirthGender = (privateNumber:string):BirthGenderProps|undefined => {
  const onlyNumber = privateNumber.replace(OTHER_THEN_NUMBER, '');
  if(onlyNumber.length < 7) return undefined;

  const firstOfRear = Number( onlyNumber.substring(6, 7) );
  if( firstOfRear === 1 || firstOfRear === 2
      || firstOfRear === 5 || firstOfRear === 6
  ){
    const year = `19${onlyNumber.substring(0, 2)}`;
    return {
      year,
      month: onlyNumber.substring(2, 4),
      day: onlyNumber.substring(4, 6),
      gender: firstOfRear === 1 || firstOfRear === 5 ? 'M' : 'F',
      age: Number(moment().format('yyyy')) - Number(year)
    }
  }else if( firstOfRear === 9 || firstOfRear === 0 ){
    const year = `18${onlyNumber.substring(0, 2)}`;
    return {
      year,
      month: onlyNumber.substring(2, 4),
      day: onlyNumber.substring(4, 6),
      gender: firstOfRear === 9 ? 'M' : 'F',
      age: Number(moment().format('yyyy')) - Number(year)
    }
  }else{
    const year = `20${onlyNumber.substring(0, 2)}`;
    return {
      year,
      month: onlyNumber.substring(2, 4),
      day: onlyNumber.substring(4, 6),
      gender: 
        firstOfRear === 3 
        || firstOfRear === 7
          ? 'M' : 'F',
      age: Number(moment().format('yyyy')) - Number(year)
    }
  }

  // if( firstOfRear === 1 || firstOfRear === 2 ) {        // 1900

  // }else if( firstOfRear === 3 || firstOfRear === 4 ) {  //2000

  // }else if( firstOfRear === 9 || firstOfRear === 0 ) {  // 1800

  // }else if( firstOfRear === 5 || firstOfRear === 6 ){   // 1900 

  // }else if( firstOfRear === 7 || firstOfRear === 8){    // 2000

  // } 
} 

export const createArr = (startOrEnd:number, end?:number):Array<number> => {
  const list = [];
  if(end){
    for(let i=startOrEnd; i<end; i++)
      list.push(i);
  }else{
    for(let i=0; i<startOrEnd; i++)
      list.push(i);
  }
  return list;
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

// const makeProperties = <V, T extends Record<string, V> >(properties: T):T => properties;
// const makeProperties = <V, K>(properties: Map<K, V>):Map<K, V> => properties

// type Nullable<Origin, Nullable extends keyof Origin> ={
//   [P in Nullable ]?: Origin[P]
// }

// export const makeProperties = 
//   <V, T=V>(properties: T): Record<string, T> => {
//     const result:any = {} ;

//     for(const key in properties)
//       result[key] = properties[key];
    
//     return result as Record<typeof T, V>;
//   };
// export const makeProperties = 
//   <T = >(properties: T): T => properties
