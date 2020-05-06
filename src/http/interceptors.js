import Vue from 'vue'
import cookie from 'js-cookie'
import cookieKeys from '@/const/cookie-keys'
import {redirect} from '@/utils'
import qs from 'qs'

/**
 * 给axios 增加拦截器
 * @param {} axios 实例
 */
export default function interceptors(axios) {
  axios.interceptors.request.use(
    config => {
      let url = config.url
      // jwt 验证
      if (cookie.get('token')) {
        config.headers.common['Authorization'] = `Bearer ${cookie.get('token')}`
      }

      let base = url.split('?'),
          isCommon = url.indexOf('/poc/api/v1/common') >= 0

      try{
        base[1] = qs.parse(base[1])
        delete base[1].page
        delete base[1].size

        base[1] = qs.stringify(base[1])
      }catch(e) {
        console.error(e)
      }

      url = base[0] + '?' + base[1]

      if(!isCommon) {
        url += url.indexOf('?') > -1 ? '&' : '?'
        url += `tenantId=${cookie.get('tenantId') || ''}&userId=${cookie.get(
          'userId' || ''
        )}&_=${new Date().getTime()}`
      }

      config.url = url
      return config
    },
    error => error
  )

  axios.interceptors.response.use(
    res => {
      const {data, status} = res
      const code = parseInt(data.code, 10)
      if (code !== 0 && !Number.isNaN(code)) {
        return Promise.reject(
          new Error({
            response: res
          })
        )
      }
      return Promise.resolve(res)
    },
    error => {
      const {status, data} = error.response
      if (process.client) {
        Vue.$notify.error({
          title: status,
          message: data.msg || data.message || data.payload
        })

        if (status === 401) {
          cookieKeys.forEach(key => {
            cookie.remove(key, {
              path
            })
          })
          redirect('/login')
        }
      } else {
        console.log('error', error)
      }
      return Promise.reject(error)
    }
  )

  return axios
}
