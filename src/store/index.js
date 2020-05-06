import cookie from 'js-cookie'
import cookieKeys from '@/const/cookie-keys'

import {loginByUsername} from '@/service/xpaas-console-api'

const cookiePath = process.env.COOKIE_PATH

export const state = () => ({
  userId: '7d791a0863ae4820ada39ca3d7b43bbd',
  token: '',
  tenantId: 'a43702c52737eb371f7b801e7b5a5000',
  username: '',
  user: {
    id: '7d791a0863ae4820ada39ca3d7b43bbd',
    tenantId: 'a43702c52737eb371f7b801e7b5a5000',
    createdBy: null,
    createdAt: 1565698669000,
    updatedBy: null,
    updatedAt: null,
    dr: 0,
    accountId: 'e7c62f99670e452691573aab356b1ede',
    password: null,
    token: null,
    username: 'guest',
    usernumber: null,
    nickname: 'guest',
    email: 'poc@deepexi.com',
    avatar: null,
    gender: null,
    phone: null,
    status: '1',
    type: '1',
    ext1: null,
    ext2: null,
    ext3: null,
    ext4: null,
    ext5: null,
    extJson: null,
    channel: 'xpaasinit',
    thirdId: '33cda7b58b6e4fde9d2c7b04bf31d7fb',
    birthday: null,
    joinTime: null,
    departureTime: null,
    incumbencyStatus: '1',
    jobLevel: '',
    jobLevelDesc: '',
    formalTime: null,
    socialYear: null,
    usernameEn: '',
    companyLocaltion: '',
    companyLocaltionDesc: '',
    workLocaltion: '',
    workLocaltionDesc: '',
    userClass: '',
    userClassDesc: '',
    education: '',
    educationDate: null,
    lastWorkData: null,
    idtype: null,
    idnumber: null
  }
})

export const mutations = {
  login(state, payload) {
    cookieKeys.forEach(key => {
      state[key] = payload[key]
      cookie.set(key, payload[key], {
        path: cookiePath
      })
    })
  },
  logout(state) {
    cookieKeys.forEach(key => {
      state[key] = ''
      cookie.remove(key, {
        path: cookiePath
      })
    })
    this.$router.replace('/login')
  },
  update(state, payload) {
    Object.keys(payload).forEach(k => {
      state[k] = payload[k]
    })
  }
}

export const actions = {
  // 用户名账号登录
  async loginByUsername({commit, dispatch}, userInfo) {
    try {
      const res = await loginByUsername(userInfo)

      const data = res.payload

      commit('login', data)

      commit('update', {user: data})
      dispatch('permission/fetchThirdId', {tenantId: data.tenantId})
      return data
    } catch (err) {
      return err
    }
  }
}
