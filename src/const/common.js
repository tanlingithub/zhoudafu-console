import dayjs from 'dayjs'

export const COLLECTION = {
  warehourse: 'zhoudafu_warehourse',
  channels: 'zhoudafu_channels',
  wh_sales_order: 'zhoudafu_wh_sales_order'
}

// 仓库类型
export const STOCK_TYPE = {
  all: '全部',
  real: '实物仓库',
  sale: '销售仓库',
  center: '中央仓库'
}

export const Object2Array = obj => {
  return Object.keys(obj).map(k => ({
    label: obj[k],
    value: k
  }))
}

export function formatDate(time, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!time) {
    return ''
  }
  return dayjs(time).format(format)
}

/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
export function price(val) {
  if (!!!val) return '0.00'
  // 保留两位小数点
  val = (+val).toFixed(2)
  let realPrice = Number.parseFloat(val)
  // 完全是整数, 需要添加小数点
  if (realPrice.toString().indexOf('.') === -1) realPrice += '.00'

  return realPrice
}
