export interface IBanner {
  type: number
}
export interface IArtistList {
  limit?: number, // @返回数量: 默认30
  offset?: number, // @偏移数量: 默认0
  initial?: string | number // @按首字母索引顺序排列查找参数: 热门传-1,#传 0
  type?: number, // 类型
  area?: number // 地区
}
export interface IArtistDesc {
  id: number | string
}
export interface IArtistDetail {
  id: number | string
}
export interface IArtistTopSong {
  id: number | string
}