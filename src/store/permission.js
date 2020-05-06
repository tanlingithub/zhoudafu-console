/*
 * @Description: 侧边栏，应用列表权限
 * @Author: barret
 * @Date: 2019-06-22 23:37:31
 * @LastEditTime: 2019-08-13 17:05:00
 * @LastEditors: barret
 */
/**
 * 动态路由信息
 * @author barret
 * @date 2019/05/02
 */
import cookie from 'js-cookie'

import {getAdminUser} from '@/service/xpaas-enterprise-contact'
import {SPA_NAME} from '@/const/const'
import {getXpaasTag} from '@/service/deepexi-dashboard'
import {getUserMenuTree} from '@/service/xpaas-console-api'

const cookiePath = process.env.COOKIE_PATH

export const state = () => ({
  thirdId: '',
  menuList: [
    {
			"name": "库存中心",
			"id": "storecenter",
			"parentId": null,
			"url": null,
			"children": [{
					"name": "商品库存",
					"id": "goodsstock",
					"parentId": "storecenter",
					"url": "/goods-stock",
					"title": "商品库存-列表"
				}, {
					"name": "仓库信息",
					"id": "warehouseinfo",
					"parentId": "storecenter",
					"url": "/warehouse-info-list",
					"title": "仓库信息-列表"
				},
				{
					"name": "仓库对应关系",
					"id": "warehouserelation",
					"parentId": "storecenter",
					"url": "/warehouse-relation/list",
					"title": "仓库对应关系-列表"
				},
				{
					"name": "仓库覆盖城市",
					"id": "warehousecity",
					"parentId": "storecenter",
					"url": "/warehouse-city/list",
					"title": "仓库覆盖城市"
				},
				{
					"name": "仓库覆盖渠道",
					"id": "warehousechannel",
					"parentId": "storecenter",
					"url": "/warehouse-channel/list",
					"title": "仓库覆盖渠道"
				},
				{
					"name": "分仓策略",
					"id": "warehouse-sperate",
					"parentId": "storecenter",
					"url": "/separate-warehouse",
					"title": "分仓策略"
				}

			]
		},
		{
			"name": "订单中心",
			"id": "ordercenter",
			"parentId": null,
			"url": null,
			"children": [{
				"name": "订单列表",
				"id": "orderlist",
				"parentId": "ordercenter",
				"url": "/order-list",
				"title": "订单列表"
			}]
		},
		{
			"id": "67f8bde31cf04e55be346872798826f2",
			"tenantId": null,
			"createdBy": null,
			"createdAt": 1558610849000,
			"updatedBy": null,
			"updatedAt": 1559044085000,
			"dr": 0,
			"appId": "kebc2dRRbRCQf266ZfJrf0EGBLvyWWoU",
			"name": "商品管理",
			"parentId": null,
			"url": null,
			"icon": null,
			"type": null,
			"mark": null,
			"sort": 188,
			"tag": null,
			"remark": null,
			"resourceTypeId": null,
			"resourceElements": [],
			"resourceType": null,
			"children": [{
					"id": "636cc38ee6c5459497ef7140cb6fabeb",
					"tenantId": null,
					"createdBy": null,
					"createdAt": 1559044027000,
					"updatedBy": null,
					"updatedAt": 1559044037000,
					"dr": 0,
					"appId": "kebc2dRRbRCQf266ZfJrf0EGBLvyWWoU",
					"name": "发布新商品",
					"parentId": "67f8bde31cf04e55be346872798826f2",
					"url": "/new-commodity",
					"title": "发布新商品",
					"icon": null,
					"type": null,
					"mark": null,
					"sort": 0,
					"tag": null,
					"remark": null,
					"resourceTypeId": null,
					"resourceElements": [],
					"resourceType": null,
					"children": null,
					"ext1": null,
					"ext2": null,
					"ext3": null,
					"extJson": null
				},
				{
					"id": "4e1jw3og7jvkh8xg7kp8hta68efta7m8",
					"tenantId": null,
					"createdBy": null,
					"createdAt": 1559044027000,
					"updatedBy": null,
					"updatedAt": 1559044037000,
					"dr": 0,
					"appId": "kebc2dRRbRCQf266ZfJrf0EGBLvyWWoU",
					"name": "上下架管理",
					"parentId": "67f8bde31cf04e55be346872798826f2",
					"url": "/shelves-management",
					"title": "上下架管理",
					"icon": null,
					"type": null,
					"mark": null,
					"sort": 0,
					"tag": null,
					"remark": null,
					"resourceTypeId": null,
					"resourceElements": [],
					"resourceType": null,
					"children": null,
					"ext1": null,
					"ext2": null,
					"ext3": null,
					"extJson": null
				},
				{
					"id": "gflg615yaluoij83ygvej1j4mci9peiz",
					"tenantId": null,
					"createdBy": null,
					"createdAt": 1559044027000,
					"updatedBy": null,
					"updatedAt": 1559044037000,
					"dr": 0,
					"appId": "kebc2dRRbRCQf266ZfJrf0EGBLvyWWoU",
					"name": "组合商品发布",
					"parentId": "67f8bde31cf04e55be346872798826f2",
					"url": "/goods-compose",
					"title": "组合商品发布",
					"icon": null,
					"type": null,
					"mark": null,
					"sort": 0,
					"tag": null,
					"remark": null,
					"resourceTypeId": null,
					"resourceElements": [],
					"resourceType": null,
					"children": null,
					"ext1": null,
					"ext2": null,
					"ext3": null,
					"extJson": null
				},
				{
					"id": "b01e04cbd9fc43879e6e6ab5132afebb",
					"tenantId": null,
					"createdBy": null,
					"createdAt": 1559044076000,
					"updatedBy": null,
					"updatedAt": 1559128832000,
					"dr": 0,
					"appId": "kebc2dRRbRCQf266ZfJrf0EGBLvyWWoU",
					"name": "商品列表",
					"parentId": "67f8bde31cf04e55be346872798826f2",
					"url": "/commodity-list/associated/commodity-list-onshelves",
					"title": "商品列表",
					"icon": null,
					"type": null,
					"mark": null,
					"sort": 1,
					"tag": null,
					"remark": null,
					"resourceTypeId": null,
					"resourceElements": [],
					"resourceType": null,
					"children": null,
					"ext1": null,
					"ext2": null,
					"ext3": null,
					"extJson": null
				},
				{
					"id": "dYF5eT180ey9Ya3jpSS6WxbnsCrG04fz",
					"tenantId": null,
					"createdBy": null,
					"createdAt": 1559044027000,
					"updatedBy": null,
					"updatedAt": 1559044037000,
					"dr": 0,
					"appId": "kebc2dRRbRCQf266ZfJrf0EGBLvyWWoU",
					"name": "sku列表",
					"parentId": "67f8bde31cf04e55be346872798826f2",
					"url": "/sku-list",
					"title": "sku列表",
					"icon": null,
					"type": null,
					"mark": null,
					"sort": 0,
					"tag": null,
					"remark": null,
					"resourceTypeId": null,
					"resourceElements": [],
					"resourceType": null,
					"children": null,
					"ext1": null,
					"ext2": null,
					"ext3": null,
					"extJson": null
				},
				{
					"id": "05cde0f9064f4137935174cb05c346aa",
					"tenantId": null,
					"createdBy": null,
					"createdAt": 1558610874000,
					"updatedBy": null,
					"updatedAt": null,
					"dr": 0,
					"appId": "kebc2dRRbRCQf266ZfJrf0EGBLvyWWoU",
					"name": "展示类目管理",
					"parentId": "67f8bde31cf04e55be346872798826f2",
					"url": "/frontdesk-category",
					"title": "展示类目管理",
					"icon": null,
					"type": null,
					"mark": null,
					"sort": 2,
					"tag": null,
					"remark": null,
					"resourceTypeId": null,
					"resourceElements": [],
					"resourceType": null,
					"children": null,
					"ext1": null,
					"ext2": null,
					"ext3": null,
					"extJson": null
				}
			],
			"ext1": null,
			"ext2": null,
			"ext3": null,
			"extJson": null
		},
		{
			"id": "db5e271caec1400fa628edc15b6d4064",
			"tenantId": null,
			"createdBy": null,
			"createdAt": 1558610898000,
			"updatedBy": null,
			"updatedAt": null,
			"dr": 0,
			"appId": "kebc2dRRbRCQf266ZfJrf0EGBLvyWWoU",
			"name": "基础信息设置",
			"parentId": null,
			"url": null,
			"icon": null,
			"type": null,
			"mark": null,
			"sort": 190,
			"tag": null,
			"remark": null,
			"resourceTypeId": null,
			"resourceElements": [],
			"resourceType": null,
			"children": [{
					"id": "28405edee8e54e8ab3466367aba944eb",
					"tenantId": null,
					"createdBy": null,
					"createdAt": 1558610919000,
					"updatedBy": null,
					"updatedAt": null,
					"dr": 0,
					"appId": "kebc2dRRbRCQf266ZfJrf0EGBLvyWWoU",
					"name": "基础类目管理",
					"parentId": "db5e271caec1400fa628edc15b6d4064",
					"url": "/afterdesk-category",
					"title": "基础类目管理",
					"icon": null,
					"type": null,
					"mark": null,
					"sort": 0,
					"tag": null,
					"remark": null,
					"resourceTypeId": null,
					"resourceElements": [],
					"resourceType": null,
					"children": null,
					"ext1": null,
					"ext2": null,
					"ext3": null,
					"extJson": null
				},
				{
					"id": "2f1c1bdb4d814ab19dc0a3585d16ee39",
					"tenantId": null,
					"createdBy": null,
					"createdAt": 1558610940000,
					"updatedBy": null,
					"updatedAt": null,
					"dr": 0,
					"appId": "kebc2dRRbRCQf266ZfJrf0EGBLvyWWoU",
					"name": "属性管理",
					"parentId": "db5e271caec1400fa628edc15b6d4064",
					"url": "/property-manage",
					"title": "属性管理",
					"icon": null,
					"type": null,
					"mark": null,
					"sort": 1,
					"tag": null,
					"remark": null,
					"resourceTypeId": null,
					"resourceElements": [],
					"resourceType": null,
					"children": null,
					"ext1": null,
					"ext2": null,
					"ext3": null,
					"extJson": null
				},
				{
					"id": "2oBH0CJbF85VBbQyXvL4FnphAxtBUsZS",
					"tenantId": null,
					"createdBy": null,
					"createdAt": 1558610940000,
					"updatedBy": null,
					"updatedAt": null,
					"dr": 0,
					"appId": "kebc2dRRbRCQf266ZfJrf0EGBLvyWWoU",
					"name": "渠道管理",
					"parentId": "db5e271caec1400fa628edc15b6d4064",
					"url": "/goods/channels",
					"title": "渠道管理",
					"icon": null,
					"type": null,
					"mark": null,
					"sort": 1,
					"tag": null,
					"remark": null,
					"resourceTypeId": null,
					"resourceElements": [],
					"resourceType": null,
					"children": null,
					"ext1": null,
					"ext2": null,
					"ext3": null,
					"extJson": null
				},
				{
					"id": "4ebeb31c59a540d0851e5dc5b76490b2",
					"tenantId": null,
					"createdBy": null,
					"createdAt": 1558610959000,
					"updatedBy": null,
					"updatedAt": null,
					"dr": 0,
					"appId": "kebc2dRRbRCQf266ZfJrf0EGBLvyWWoU",
					"name": "品牌管理",
					"parentId": "db5e271caec1400fa628edc15b6d4064",
					"url": "/brand-management",
					"title": "品牌管理",
					"icon": null,
					"type": null,
					"mark": null,
					"sort": 2,
					"tag": null,
					"remark": null,
					"resourceTypeId": null,
					"resourceElements": [],
					"resourceType": null,
					"children": null,
					"ext1": null,
					"ext2": null,
					"ext3": null,
					"extJson": null
				}
			],
			"ext1": null,
			"ext2": null,
			"ext3": null,
			"extJson": null
		}
  ],
  // 面包屑组件占位符
  breadcrumbPlaceholder: {}
})

export const mutations = {
  update(state, payload) {
    Object.keys(payload).forEach(k => {
      state[k] = payload[k]
    })
  },

  // 设置面包屑组件占位符
  // index 占位符位置
  // replaceTxt 占位符替换文本
  setBreadcrumbPlaces(state, payload) {
    if (!Array.isArray(payload)) {
      throw new Error('参数有误，请输入数组')
      return
    }

    // 临时保存占位符变量
    const placeholderTemp = state.breadcrumbPlaceholder

    payload.forEach(({index, replaceTxt}) => {
      if (!(+index >= 0)) {
        throw new Error('请输入正常的位置参数')
        return
      }
      placeholderTemp[`p${index}`] = replaceTxt
    })

    // 重新更新 breadcrumbPlaceholder
    Vue.set(state, 'breadcrumbPlaceholder', Object.assign({}, placeholderTemp))
  }
}

export const actions = {
  // 获取头部列表的thirdId
  async fetchThirdId({commit, dispatch}, {tenantId}) {
    dispatch('fetchUserMenuTree', {appId: ''})

    let {payload} = await getAdminUser()
    const {thirdId} = payload || {}

    commit('update', {
      thirdId
    })

    try {
      cookie.set('thirdId', thirdId, {
        path: cookiePath
      })
      const headMenu = await dispatch('fetchHeadMenu', {thirdId})

      // 根据当前的项目名称来请求左侧菜单
      for (let item of headMenu) {
        if (item.name === SPA_NAME) {
          dispatch('fetchUserMenuTree', {appId: item.id})
          break
        }
      }
    } catch (e) {
      console.error('fetchHeadMenu error: ', e)
    }
  },
  // 根据thirdId获取头部导航栏列表
  async fetchHeadMenu({commit, dispatch}, {thirdId}) {
    let headMenuListRes = await getXpaasTag({thirdId})
    const payload = headMenuListRes.payload || []
    commit('update', {
      headMenuList: payload
    })
    return payload
  },
  // 根据appId获取左侧菜单, 并设置当前的mainHead值
  async fetchUserMenuTree({commit}, {appId}) {
    let userMenuTreeRes = await getUserMenuTree({appId})
    const payload = userMenuTreeRes.payload || []
    // 获取路由对应的页面名

    commit('update', {
      menuList: payload
    })
  }
}

export const getters = {
  // 获取面包屑组件占位符
  getBreadcrumbPlaceholder: state => index => {
    if (!(+index >= 0)) {
      throw new Error('请输入正常的位置参数')
      return
    }
    return state.breadcrumbPlaceholder[`p${index}`]
  }
}
