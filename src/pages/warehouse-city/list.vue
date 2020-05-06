<!--
 * @Description: In User Settings Edit
 * @Author: nemo
 * @Date: 2019-08-15 11:38:17
 * @LastEditTime: 2019-08-19 11:12:02
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="warehouse-city-list">
    <el-row class="head-bt-box">
      <el-button type="primary" size="mini" @click="handleAdd">新增</el-button>
      <span class="subfix">根据收货城市确定最终发货的实物仓库</span>
    </el-row>
    <el-data-table ref="dataTable" v-bind="tableConfig"></el-data-table>
  </div>
</template>
<script>
import {stockList} from '@/const/api.js'
import {COLLECTION, STOCK_TYPE, formatDate} from '@/const/common.js'
import {getNameByCode} from '@/const/area-list.js'

export default {
  name: 'warehouse-city-list',
  head: {title: '仓库覆盖城市-列表'},
  components: {},
  data() {
    return {
      tableConfig: {
        url:
          'http://39.100.141.76:3000/mock/307/warehouse-city-list',
        customQuery: {
          collection: COLLECTION.warehourse,
          type: STOCK_TYPE.real
        },
        dataPath: 'payload.data',
        hasNew: false,
        hasEdit: false,
        hasView: false,
        hasDelete: false,
        hasOperation: false,
        tableAttrs: {border: true},
        columns: [
          {
            prop: 'code',
            label: '仓库代码'
          },
          {
            prop: 'name',
            label: '仓库名称'
          },
          {
            prop: 'type',
            label: '仓库类型'
          },
          {
            prop: 'city',
            label: '覆盖省份',
            formatter: row => {
              return getNameByCode(row.province_ids || []).join('、')
            }
          },
          {
            prop: 'status',
            label: '状态',
            formatter: row => {
              return row.status ? '启用' : '禁用'
            }
          },
          {
            prop: 'updateTime',
            label: '更新时间',
            formatter: row => {
              return formatDate(row.updateTime, 'YYYY-MM-DD')
            }
          }
        ]
      }
    }
  },
  methods: {
    handleAdd() {
      this.$router.push('/warehouse-city/add')
    }
  }
}
</script>

<style lang="less">
.warehouse-city-list {
  .head-bt-box {
    padding: 10px 0;

    .subfix {
      margin-left: 10px;
    }
  }
}
</style>
