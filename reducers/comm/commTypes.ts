export const SETUP_COMPANY_INFO = 'SETUP_COMPANY_INFO';
export const OPEN_COMPANY_FORM = 'OPEN_COMPANY_FORM';
export const CLOSE_COMPANY_FORM = 'CLOSE_COMPANY_FORM';
export const OPEN_MODAL_FORM = 'OPEN_MODAL_FORM';
export const CLOSE_MODAL_FORM = 'CLOSE_MODAL_FORM';
export interface ICommState {
/** 회사 정보
 *  [GET] $NEXT_PUBLIC_API_URL/company
 */
  company: Company,
  showFormOfCompany: boolean,
  showModal: boolean,
}



export type Company = {
  id: number | null;          // 고유넘버
  name: string | null;        // 회사명
  hp: string | null;          // 전화번호
  tel: string | null;         // 휴대폰
  fax: string | null;         // 팩스
  zipCode: string | null;     // 우편번호
  addressDep1: string | null; // 주소1
  addressDep2: string | null; // 주소2
}

/** 파일 업로드
 *  [POST&MULTIPART] $NEXT_PUBLIC_API_URL/attachments
 */
export type Attachment = {
  id: string,             // 고유키
  state: string,          // 업로드 상태 [UPLOADING, UPLOADED]
  originName: string,     // 원본 이름
  storedFileName: string,  // 서버에 저장된 이름
  fileSize: number,       // 사이즈
  contentType: string,    // mime type
  extension: string,      // 확장자 "."제외
  path: string,           // url에서 접근가능한 경로
  upt_date: number,       // 업데이트된 날짜
  reg_date: number,       // 저장된 날짜
  width?: number,         // 이미지일 경우 가로 크기
  height?: number         // 이미지일 경우 세로 크기
}

/** 페이지 정보
 *  페이지 기능이 들어간 리스트의 공통된 형태
 */
export type Page = {
  curPage: number;        // 현재 페이지
  pageBlock:number;       // 블럭 위치
  rowPerPage:number;      // 1페이지에 나올 로우의 갯수
  pagePerBlock:number;    // 한 블럭에 나올 페이지의 갯수
  totalRow:number;        // 모든 로우의 전체 갯수
  virtualNum:number;      // ...?
  totalPage:number;       // 모든 페이지의 갯수
  totalBlock:number;      // 모든 블럭의 갯수
  startPage:number;       // 현재 블럭에서 시작되는 페이지 번호
  endPage:number;         // 현재 블럭에서 끝나는 페이지 번호
  isPrevBlock:number;     // 이전 블럭 존재 유무[0,1]
  isNextBlock:number;     // 다음 블럭 존재 유무[0,1]
  isPrevPage:number;      // 이전 페이지 존재 유무[0,1]
  isNextPage:number;      // 다음 페이지 존재 유무[0,1]
  startRow:number;        // 현재 페이지에서 시작되는 로우 번호
  endRow:number;          // 현재 페이지에서 끝나는 로우 번호
}

interface setupCompanyInfo {
  type: typeof SETUP_COMPANY_INFO,
  company: Company|null
}

interface openCompanyForm {
  type: typeof OPEN_COMPANY_FORM
}
interface closeCompanyForm {
  type: typeof CLOSE_COMPANY_FORM
}
interface openModalForm {
  type: typeof OPEN_MODAL_FORM
}
interface closeModalForm {
  type: typeof CLOSE_MODAL_FORM
}


export type CommActionType = 
  setupCompanyInfo
  | openCompanyForm
  | closeCompanyForm
  | openModalForm
  | closeModalForm
  ;