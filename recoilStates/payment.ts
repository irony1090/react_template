export type RequestPayment = {
  uk: string;
  title: string;
  price: number;
  remaining: number;
  isApplyID: number;
  upt_date?: number;
  reg_date: number;

  histories: Array<PaidHistory>;
  buyer: ExternalBuyer;
  bank: ExternalBank;
}

export type PaidHistory = {
  id: number;

  price: number;

  negativePoint?: NegativePoint;

  externalPayment?: ExternalPayment;
}

export type ExternalPayment = {
  uk?: string;
  type: string;
  pg: string;
  method: string;
  price: number;
  isApplyID: number;
  upt_date?: number;
  reg_date: number;
  bank?: ExternalBank;
  buyer?: ExternalBuyer;
}

export type ExternalBank = {
  id: number;
  title: string;
  name: string;
  number: string;
  refundCode: string;
  refundTitle: string;
  refundName: string;
  refundNumber: string;
}

export type ExternalBuyer = {

  id: number;
  name: string;
  tel: string;
  email: string;
}

export type NegativePoint ={
  id: number;
  title: string;
  price: number;
  reg_date: number;
  member: PositivePointMember;
}

export type PositivePointMember = {
  user: User;
  manager: Manager;
}

export type Manager = {
  id: number;
  uk: string ;
  identity: string;
  type: 'Manager';
  roles: Array<Role>;
  nickname: string;
  upt_date?: number;
  reg_date: number;
}
export type Role = {
  id: number;
  key: string;
  name: string;
}
export type User = {
  id: number;
  uk: string ;
  identity: string;
  type: 'User';
  roles: Array<Role>;
  nickname: string;
  upt_date?: number;
  reg_date: number;
}

export type IamportResponse = {
  apply_num: string // "",
  bank_name: string|null // null,
  buyer_addr: string // "",
  buyer_email: string //"irony1090@kakao.com",
  buyer_name: string //"배정호",
  buyer_postcode: string //"",
  buyer_tel: string //"010-8236-0642",
  card_name: string|null // null,
  card_number: string //"",
  card_quota: number//0,
  currency: string //"KRW",
  custom_data: string|null //null,
  imp_uid: string //"imp_964042785323",
  merchant_uid: string //"20210611042043632fc4a54f04477682572000c4",
  name: string //"더미 상품 주문",
  paid_amount: number //935,
  paid_at: number //0,
  pay_method: string //"vbank",
  pg_provider: string //"html5_inicis",
  pg_tid: string //"StdpayVBNKINIpayTest20210611162222496059",
  pg_type: string //"payment",
  receipt_url: string //"https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/mCmReceipt_head.jsp?noTid=StdpayVBNKINIpayTest20210611162222496059&noMethod=1",
  status: string //"ready",
  success: boolean //true,
  vbank_date: string //"2021-06-11 23:59:59",
  vbank_holder: string //"（주）케이지이니시",
  vbank_name: string //"케이뱅크",
  vbank_num: string //"70112003235577"
}