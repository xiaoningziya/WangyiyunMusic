import API from './axios'
interface IKeywords {
  keywords: string
}
// 搜索歌曲
export function searchMusic (params: IKeywords) {
  return API({
    method: 'get',
    url: '/search',
    params
  })
}

// 默认关键词
export function defaultKeywords () {
  return API({
    method: 'get',
    url: 'search/default'
  })
}
