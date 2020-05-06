/*
 * 周大福POC接口请求列表
 * @author wangyj
 * @date 2019-8-16
 */
import axios from '@/http'
const apiVersion = '/api/v1'
const serviceType = '/spaas-commodity-center'
const basicUrl = `${serviceType}${apiVersion}`

export const putZoudafuSkuP = (type, data) => {
  const url = `/poc/api/v1/zhoudafu/goods/sku/${type}`
  const params = {
    ...data
  }
  return axios.$put(url, params)
}
export const putZoudafuGoodShelves= (type, data) => {
  const url = `/poc/api/v1/zhoudafu/goods/${type}`
  const params = {
    ...data
  }
  return axios.$put(url, params)
}

