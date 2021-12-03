/**
 * 基础数据API集合类
 * 集成Abstract
*/
import Abstract from './axios/abstract'
import * as ParamsInterface from './interface'
import { CustomResponse } from './axios/types'

/**
 * 请求方法
 * GET请求 : 
 *  @方法 getReq
 *  @参数 params
 * POST请求：
 *  @方法 postReq
 *  @参数 data
 */
class API extends Abstract {
  // 歌手热门 50 首歌曲
  artistTopSong (params: ParamsInterface.IArtistTopSong): Promise<CustomResponse> {
    return this.getReq({ url: '/artist/top/song', params })
  }

  // 获取歌手详情
  artistDetail (params: ParamsInterface.IArtistDetail): Promise<CustomResponse> {
    return this.getReq({ url: '/artist/detail', params })
  }

  // 获取歌手描述
  artistDesc (params: ParamsInterface.IArtistDesc): Promise<CustomResponse> {
    return this.getReq({ url: '/artist/desc', params })
  }

  // 歌手分类列表
  artistList (params: ParamsInterface.IArtistList): Promise<CustomResponse> {
    return this.getReq({ url: '/artist/list', params })
  }

  // 获取Banner
  banner (params: ParamsInterface.IBanner): Promise<CustomResponse> {
    return this.getReq({ url: '/banner', params })
  }

  // 获取用户详情
  userDetail (params: ParamsInterface.IUserDetail): Promise<CustomResponse> {
    return this.getReq({ url: '/user/detail', params })
  }

  // 退出登录
  logout (params: ParamsInterface.ILogout): Promise<CustomResponse> {
    return this.getReq({ url: '/logout', params })
  }

  // 登录--手机号密码
  loginCellphone (params: ParamsInterface.ILoginCellphone): Promise<CustomResponse> {
    return this.getReq({ url: '/login/cellphone', params })
  }

  // 发送验证码
  captchaSent (params: ParamsInterface.ICaptchaSent): Promise<CustomResponse> {
    return this.getReq({ url: '/captcha/sent', params })
  }

  // 注册(修改密码)
  registerCellphone (params: ParamsInterface.IRegisterCellphone): Promise<CustomResponse> {
    return this.getReq({ url: '/register/cellphone', params })
  }

  // 搜索歌曲
  searchMusic (params: ParamsInterface.IKeywords) {
    return this.getReq({ url: '/search', params })
}

  // 默认关键词
  defaultKeywords () {
    return this.getReq({ url: 'search/default' })
  }

  // 热搜列表（简略）
  hotSearchList () {
    return this.getReq({ url: 'search/hot' })
  }

  // 热搜列表（详细）
  detailSearchList () {
    return this.getReq({ url: 'search/hot/detail' })
  }

  // 搜索歌曲
  musicDetail (params: ParamsInterface.Iids) {
    return this.getReq({ url: '/song/detail', params })
  }

  // 更新头像
  avatarUpload (data: ParamsInterface.IAvatarUpload): Promise<CustomResponse> {
    return this.postReq({ url: '/avatar/upload', data })
  }
}
// 单列模式返回对象
let instance
export default (() => {
  if (instance) return instance
  instance = new API()
  return instance
})()
