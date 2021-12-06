export interface IBanner {
  type: number;
}
export interface IArtistList {
  limit?: number; // @返回数量: 默认30
  offset?: number; // @偏移数量: 默认0
  initial?: string | number; // @按首字母索引顺序排列查找参数: 热门传-1,#传 0
  type?: number; // 类型
  area?: number; // 地区
}
export interface IArtistDesc {
  id: number | string;
}
export interface IArtistDetail {
  id: number | string;
}
export interface IArtistTopSong {
  id: number | string;
}
export interface IUserDetail {
  uid: number | string;
}
export interface ILogout {

}
export interface ILoginCellphone {
  phone: string; // 手机号码
  password: number | string; // 密码
  countrycode?: number; // 国家码，用于国外手机号登录，例如美国传入：1
  md5_password?: string; // md5 加密后的密码,传入后 password 参数将失效
  captcha?: number; // 验证码,使用 /captcha/sent接口传入手机号获取验证码,调用此接口传入验证码,可使用验证码登录,传入后 password 参数将失效
}
export interface ICaptchaSent {
  phone: string;
  ctcode?: number;
}
export interface IRegisterCellphone {
  captcha: string; // 验证码
  phone: string; // 手机号码
  password: string; // 密码
  nickname: string; // 昵称
  countrycode?: number; // 国家码，用于国外手机号，例如美国传入：1 ,默认 86 即中国
}

export interface IKeywords {
  keywords: string
}

export interface Iids {
  ids: string
}

interface IImgFile {
  name: string;
  data: string;
}
export interface IAvatarUpload {
  readonly cookie: string;
  imgSize?: number;
  imgX?: number;
  imgY?: number;
  timestamp?: number;
}

