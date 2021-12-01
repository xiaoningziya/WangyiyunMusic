/**
 * 基础数据API集合类
 * 集成Abstract
*/
import Abstract from './axios/abstract'
import * as ParamsInterface from './interface'

/**
 * 请求方法
 * GET请求 : 
 *  @方法 getReq
 *  @参数 params
 * POST请求：
 *  @方法 getReq
 *  @参数 data
 */
class API extends Abstract {
  // 歌手热门 50 首歌曲
  artistTopSong (params: ParamsInterface.IArtistTopSong) {
    return this.getReq({ url: '/artist/top/song', params })
  }
}
 
// 单列模式返回对象
let instance
export default (() => {
  if (instance) return instance
  instance = new API()
  return instance
})()
