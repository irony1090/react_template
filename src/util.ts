import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { DIMENSION_FORM, isNumberForm, isUndeclared, OTHER_THEN_NUMBER } from "./format";
import moment from 'moment';

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
