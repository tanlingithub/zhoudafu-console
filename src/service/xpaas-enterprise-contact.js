/*
 * 登录模块接口
 * @author barret
 * @date 2019/05/02
 */
import axios from '@/http'

const apiVersion = '/api/v1'
const serviceType = '/spaas-enterprise-contact'
const basicUrl = `${serviceType}${apiVersion}`

// 获取头部导航栏thirdId
export const getAdminUser = () => axios.$get(`${basicUrl}/users/adminUser`)
