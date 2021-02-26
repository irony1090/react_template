
type Type_certificationToken = {
  certificationType :  string | 'FACEBOOK' | "KAKAO" | "GOOGLE" | "NAVER";
  
  access_token : string;
  refreshToken : string |undefined;
  createdDate : Date;
  createNumber : number;
  expireDate : Date | undefined ;
  expireNumber : number | undefined;
  token_type : string | undefined;
  scope : string | undefined;

}

export default class CertificationToken implements Type_certificationToken{
  certificationType: string;    
  access_token: string;
  refreshToken: string | undefined;
  createdDate: Date;
  createNumber: number;
  expireDate: Date | undefined;
  expireNumber: number | undefined;
  token_type: string | undefined;
  scope: string | undefined;

  constructor(certificationType:string, 
      access_token:string, refreshToken:string | undefined, createdDate:Date, 
      expireDate:Date | undefined, token_type?:string, scope?:string)
  {
      this.certificationType = certificationType;
      this.refreshToken = refreshToken;
      this.access_token = access_token;
      this.createdDate = createdDate;
      this.createNumber = createdDate.getTime();
      if(!!expireDate)
      {
          this.expireDate = expireDate;
          this.expireNumber = expireDate.getTime();
      }
      this.token_type = token_type;
      this.scope = scope;
  }


}