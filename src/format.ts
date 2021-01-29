export const OTHER_THEN_NUMBER = /\D/g;
export const OTHER_THEN_NUMBER_AND_RELATION = /[^\d\.\,\-\+]/g;
export const NUMBER_FORM = /^[\-\+]?\d*(\.\d+)?$/;
export const INT_FORM = /^\d+$/;
export const FLOAT_FORM = /^\d+\.\d+$/;
export const TAG_FORM = /\<\/?[a-z]+[^\<\>\\]*\/?\>/gi;
export const SPACE_BAR = /\s/g;
// export const NUMBER_FORM = /^[\-\+]?((\d+\.?)|(\.?\d+)|(\d+\.\d+))$/;
export const WITH_COMMAS = /\B(?=(\d{3})+(?!\d))/g;
export const WITH_HYPHEN=/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/;

const COMMA = ',';
export const EMPTY = '';
const STRING = 'string';
// const NAN = 'NaN';
const NUMBER = 'number';
// const UNDEFINED = 'undefined';

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
  return !isNotDecared(target) 
    && (
      target === EMPTY 
      || (
        typeof target === 'string'
          && target.replace(TAG_FORM, EMPTY).replace(SPACE_BAR, EMPTY) === EMPTY
      )
    )
}
  
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
export const isNotDecared = (target:any):boolean =>
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
export const isNumberForm = ( target: any ) =>
  typeof target === STRING 
    ? NUMBER_FORM.test(target)
    : Number(target) === target;

  // Number(num) === num;

// export const isInteger = ( num:any ):boolean => 
//   isNumber(num) && num % 1 === 0;
export const isFloat = ( num:any ):boolean => 
  isNumberForm(num) && num % 1 !== 0;

export const numberWithHyphen =(val:string | undefined,def=''):string=>{
  if(!val) return def;
  return val.replace(OTHER_THEN_NUMBER,'').replace(WITH_HYPHEN,'"$1-$2-$3"').replace("--", "-");
}