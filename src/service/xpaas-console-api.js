/*
 * @Description: console-api 服务接口列表
 * @Author: barret
 * @Date: 2019-08-13 16:50:18
 * @LastEditTime: 2019-08-13 16:56:47
 * @LastEditors: barret
 */
/*
 * 登录模块接口
 * @author barret
 * @date 2019/05/02
 */
import axios from '@/http'

const apiVersion = '/api/v1'
const serviceType = '/spaas-console-api'
const basicUrl = `${serviceType}${apiVersion}`

// 用户名密码登录
// export const loginByUsername = `${basicUrl}/users/login`
/**
 *
 * @param {*} userInfo
 * username: 用户名
 * password: 密码
 * channel 频道
 * code ???
 * {username: "pms1", password: "abd1234", channel: "sPaaS", code: "pms1"}
 */
export const loginByUsername = userInfo =>
  axios.$post(`${basicUrl}/users/login`, userInfo)

// 根据appId获取左侧菜单
export const getUserMenuTree = ({appId}) =>
  axios.$get(`http://39.100.141.76:3000/mock/109/zhoudafu/menu`)
