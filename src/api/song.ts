import API from './axios'
interface Iids {
  ids: string
}
// 搜索歌曲
export function musicDetail (params: Iids) {
  return API({
    method: 'get',
    url: '/song/detail',
    params
  })
}
