<!--
 * @Description: In User Settings Edit
 * @Author: nemo
 * @Date: 2019-08-15 11:38:17
 * @LastEditTime: 2019-08-19 11:07:33
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="goods-stock">
    <el-data-table ref="dataTable" v-bind="tableConfig"></el-data-table>
  </div>
</template>
<script>
import {stockList, totalStock} from '@/const/api.js'
import {COLLECTION, STOCK_TYPE, formatDate, price} from '@/const/common.js'
import {getNameByCode} from '@/const/area-list.js'

export default {
  name: 'goods-stock',
  components: {},
  head: {title: '商品库存'},
  data() {
    return {
      tableConfig: {
        // url: totalStock,
        // customQuery: {
        //   collection: COLLECTION.warehourse
        // },
        dataPath: 'payload.data',
        hasNew: false,
        hasEdit: false,
        hasView: false,
        hasDelete: false,
        hasOperation: false,
        tableAttrs: {border: true},
        columns: [
          {
            prop: 'goods._id',
            label: '商品代码'
          },
          {
            prop: 'goods.name',
            label: '商品名称'
          },
          {
            prop: 'goods.brand',
            label: '品牌'
          },
          {
            prop: 'goods.weight',
            label: '商品重量',
            formatter: row => {
              return row.goods.weight + '克'
            }
          },
          {
            prop: 'goods.price',
            label: '销售价格',
            formatter: row => {
              return price(row.goods.price)
            }
          },
          {
            prop: 'wh.type',
            label: '仓库类型'
          },
          {
            prop: 'wh.name',
            label: '仓库名称'
          },
          {
            prop: 'stock',
            label: '库存数量'
          },
          {
            prop: '_stock',
            label: '安全库存',
            formatter: row => {
              return '-'
            }
          },
          {
            prop: 'availableStock',
            label: '可销售数量'
          },
          {
            prop: 'name',
            label: '在途数',
            formatter: row => {
              return '-'
            }
          },
          {
            prop: 'saledCount',
            label: '订单占用数'
          }
        ]
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$axios.$get(totalStock).then(res => {
        this.$refs.dataTable.data = res.payload
      })
    },
    handleAdd() {
      this.$router.push('/warehouse-city/add')
    }
  }
}
</script>

<style lang="less">
.goods-stock {
}
</style>
