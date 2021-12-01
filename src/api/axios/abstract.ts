/**
 * API基础构建
 */

 import Vue from 'vue'
 import instance from './instance'
 import { AxiosRequest, CustomResponse } from './types'
 import { Toast } from 'vant'
 
class Abstract {
  // 自定义header头
  protected headers: object = {
    ContentType: 'application/json;charset=UTF-8'
  }
  private apiAxios({ headers = this.headers, method, url, data, params, responseType }: AxiosRequest): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      instance({
      // headers,
        method,
        url,
        params,
        data,
        responseType
      }).then((res) => {
        resolve({ 
          status: res.status,
          data: res.data, 
          config: res?.config || {},
          headers: res?.headers || {},
          request: res?.request || {} 
        })
      }).catch((err) => {
        const message = err?.data?.errorMessage || err?.message || err?.statusText || '网络请求失败'
        Toast(message)
        reject(err)
      })
    })
  }

  /**
   * GET类型的网络请求
  */
  protected getReq({ headers, url, data, params, responseType }: AxiosRequest) {
    return this.apiAxios({ headers, method: 'GET', url, data, params, responseType })
  }

  /**
   * POST类型的网络请求
  */
  protected postReq({ headers, url, data, params, responseType }: AxiosRequest) {
    return this.apiAxios({ headers, method: 'POST', url, data, params, responseType })
  }

  /**
   * PUT类型的网络请求
  */
  protected putReq({ headers, url, data, params, responseType }: AxiosRequest) {
    return this.apiAxios({ headers, method: 'PUT', url, data, params, responseType })
  }

  /**
   * DELETE类型的网络请求
  */
  protected deleteReq({ headers, url, data, params, responseType }: AxiosRequest) {
    return this.apiAxios({ headers, method: 'DELETE', url, data, params, responseType })
  }
}

export default Abstract