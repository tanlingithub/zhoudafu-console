/**
 * api常量放置处
 * @author barret
 * @date 2019/05/06
 */
const apiVersion = '/api/v1'

/**
 * 商品中心部分接口
 */
export const commodityCenter = `/spaas-commodity-center${apiVersion}`
// export const commodityCenter = apiVersion;

// 属性组管理
export const commodityPropertyGroups = `${commodityCenter}/commodity/property/groups/pages`

// 属性管理
export const commodityPropertyList = `${commodityCenter}/commodity/properties`

// 展示类目-根据类目Id获取未关联属性
export const backCategoryPropertyRelation = ({id}) =>
  `${commodityCenter}/commodity/backCategorys/${id}/propertys/relation`

// 展示类目-根据类目Id获取已关联属性
export const backCategoryPropertyNotRelation = ({id}) =>
  `${commodityCenter}/commodity/backCategorys/${id}/propertys/notRelation`

// 类目管理前台-根据类目Id获取关联属性
export const frontCategoryPropertyRelation = ({id}) =>
  `${commodityCenter}/commodity/frontCategorys/${id}/propertys/relation`

// 类目管理前台-根据类目Id获取关联属性
export const frontCategoryPropertyNotRelation = ({id}) =>
  `${commodityCenter}/commodity/frontCategorys/${id}/propertys/notRelation`

export const categoryBrandList = id =>
  `${commodityCenter}/commodity/backCategorys/${id}/brands`

export const frontCategoryBrandList = id =>
  `${commodityCenter}/commodity/frontCategorys/${id}/brands`
// 分页查询品牌列表
export const categoryVocationalBrandList = `${commodityCenter}/commodity/backCategorys/vocational/brands`

// 分页查询品牌列表
export const frontCategoryVocationalBrandList = `${commodityCenter}/commodity/frontCategorys/vocational/brands`

// const pocCenter = process.env.MODE == 'prod' ? process.env.API_POC_SERVER + '/poc/api/v1' : '/poc/api/v1'
const pocCenter = 'http://dcp.deepexi.top/poc-center/poc/api/v1'

export const stockList = pocCenter + '/common/list'

export const commonUpdate = pocCenter + '/common/update'

export const commonCreate = pocCenter + '/common/create'

export const totalStock = 'http://39.100.141.76:3000/mock/307/totalStock'
