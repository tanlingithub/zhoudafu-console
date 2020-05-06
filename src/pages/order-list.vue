<!--
 * @Description: In User Settings Edit
 * @Author: nemo
 * @Date: 2019-08-15 11:38:17
 * @LastEditTime: 2019-08-19 11:17:07
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="order-list">
    <el-data-table ref="dataTable" v-bind="tableConfig"></el-data-table>
  </div>
</template>
<script>
import {stockList, totalStock} from '@/const/api.js'
import {COLLECTION, STOCK_TYPE, formatDate, price} from '@/const/common.js'
import {getNameByCode} from '@/const/area-list.js'

export default {
  name: 'order-list',
  head: {title: '订单列表'},
  components: {},
  data() {
    return {
      stock: [],
      tableConfig: {
        url: 'https://easy-mock.com/mock/5d6f65e63d1f3b4e858d5026/order-list',
        customQuery: {
          collection: COLLECTION.wh_sales_order
        },
        dataPath: 'payload.data',
        hasNew: false,
        hasEdit: false,
        hasView: false,
        hasDelete: false,
        hasOperation: false,
        tableAttrs: {border: true, maxWidth: '1000px'},
        columns: [
          {
            prop: '_id',
            label: '订单号'
          },
          {
            prop: 'goods.name',
            label: '发货状态',
            formatter: row => {
              return '待发货'
            }
          },
          {
            prop: 'goods.brand',
            label: '订单状态',
            formatter: row => {
              return '已支付'
            }
          },
          {
            prop: 'order_no',
            label: '订单编号'
          },
          {
            prop: 'recv__phone',
            label: '会员账号',
            formatter: row => {
              return row.recv_phone
            }
          },
          {
            prop: 'channel_name',
            label: '渠道名称'
          },
          {
            prop: 'store_name',
            label: '店铺名称'
          },
          {
            prop: 'order_price',
            label: '订单金额',
            formatter: row => {
              return '￥' + price(row.order_price)
            }
          },
          {
            prop: 'pay_price',
            label: '支付金额',
            formatter: row => {
              return '￥' + price(row.pay_price)
            }
          },
          {
            prop: 'count',
            label: '商品数量'
          },
          {
            prop: 'wh_id',
            label: '发货策略',
            formatter: row => {
              let item = this.stock.find(i => i._id == row.wh_id) || {}

              return item.name
            }
          },
          {
            prop: 'deliver_wh_name',
            label: '建议发货仓库'
          },
          {
            prop: 'recv_username',
            label: '收货人'
          },
          {
            prop: 'recv_phone',
            label: '联系电话'
          },
          {
            prop: 'recv_province',
            label: '所在区域'
          },
          {
            prop: 'recv_address',
            label: '详细地址'
          }
        ]
      }
    }
  },
  mounted() {
    this.getStock()
  },
  methods: {
    getStock() {
      this.$axios
        .$get(stockList, {
          params: {collection: COLLECTION.warehourse}
        })
        .then(res => {
          this.stock = res.payload.data
        })
    },
    handleAdd() {
      this.$router.push('/warehouse-city/add')
    }
  }
}
</script>

<style lang="less">
.order-list {
}
</style>
