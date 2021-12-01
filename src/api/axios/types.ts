/** 
 * 请求交互相关的type和interface
 */

// 请求方式
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
// 返回值类型
export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'
// 请求参数队列
export interface AxiosRequest {
  baseURL?: string;
  url: string;
  data?: any;
  params?: any;
  method?: Method;
  headers?: any;
  timeout?: number;
  responseType?: ResponseType;
}
// 返回字段队列
export interface AxiosResponse {
  data: any;
  headers: any;
  request?: any;
  status: number;
  statusText: string;
  config: AxiosRequest;
}
// 自定义返回值队列
export interface CustomResponse {
  readonly status: number;
  readonly data: object | null | undefined;
  readonly config?: object | null;
  readonly headers?: object | null;
  readonly request?: object | null
}
