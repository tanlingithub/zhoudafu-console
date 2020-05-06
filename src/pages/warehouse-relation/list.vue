<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 17:31:27
 * @LastEditTime: 2019-08-19 11:10:43
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="warehouse-relation-list">
    <sub-container style="margin:10px;">
      <el-button size="small" @click="handleAdd" type="primary">设置</el-button>
    </sub-container>
    <div class="flow-list">
      <sub-container
        class="flow-item"
        v-for="(info,index) in flowData"
        :key="index"
        v-loading="initLoading"
      >
        <relation-flow :flowInfo="info" v-loading="initLoading"></relation-flow>
      </sub-container>
    </div>
  </div>
</template>
<script>
import {stockList, commonCreate, commonUpdate} from '@/const/api'
import dayjs from 'dayjs'
export default {
  name: 'warehouse-relation-list',
  head: {title: '仓库对应关系'},
  components: {
    'relation-flow': () =>
      import('@/container/warehouse-relation/relation-flow')
  },
  data() {
    return {
      flowData: [],
      initLoading: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    handleAdd() {
      this.$router.push('/warehouse-relation/add')
    },
    async initData() {
      try {
        this.initLoading = true
        const url = `${stockList}?collection=zhoudafu_warehourse&type=中央仓库`
        const {
          payload: {data}
        } = {
          success: true,
          payload: {
            data: [
              {
                _id: '5d56a23d97c32c01387cf14a',
                code: 'ZY001',
                name: '中央仓库A',
                type: '中央仓库',
                user: 'kun',
                phone: 15521250922,
                area: null,
                address: null,
                enable: true,
                province_ids: [],
                source_strategy: {
                  title: 'demo演示',
                  description: 'demo演示',
                  centerSelect: '5d56a23d97c32c01387cf14a',
                  list: [
                    {
                      _id: '5d57d43c97c32c71ba6dd5d3',
                      code: 'SW001',
                      name: '武汉仓',
                      type: '实物仓库',
                      user: 'kun',
                      phone: 15521250922,
                      area: null,
                      address: null,
                      province_ids: [],
                      status: true,
                      updateTime: 1566024649900,
                      updatedAt: 1566024650018,
                      _show: true,
                      priority: 1,
                      id: '5d57d43c97c32c71ba6dd5d3'
                    },
                    {
                      _id: '5d57d3d897c32c71ba6dd5d2',
                      code: 'SW002',
                      name: '深圳仓',
                      type: '实物仓库',
                      user: 'kun',
                      phone: 15521250922,
                      area: null,
                      address: null,
                      province_ids: [],
                      status: true,
                      updateTime: 1566024649900,
                      updatedAt: 1566024650018,
                      _show: true,
                      priority: 2,
                      id: '5d57d3d897c32c71ba6dd5d2'
                    }
                  ]
                },
                sales_limit_strategy: {
                  list: [
                    {
                      _id: '5d5424fe97c32c01387cf140',
                      code: 'XS001',
                      name: '天猫仓',
                      type: '销售仓库',
                      user: 'kun',
                      phone: 15521250922,
                      area: null,
                      address: null,
                      _show: true,
                      rate: 0.5
                    }
                  ]
                },
                goods_limit_strategy: [],
                createdAt: 1565859830171,
                updatedAt: 1566286223186
              }
            ],
            total: 1
          }
        }
        this.flowData = this.formateData(data)
      } catch (err) {
        this.$message.error(err)
      } finally {
        this.initLoading = false
      }
    },
    formateData(data) {
      return data.map(item => ({
        time: dayjs(item.createdAt).format('YYYY-MM-DD'),
        relationType: item.source_strategy.relationType,
        mainName: item.name,
        subList: item.source_strategy.list
          .map(ele => ({
            name: ele.name,
            sort: ele.priority
          }))
          .sort((a, b) => a.sort - b.sort)
      }))
    }
  }
}
</script>
<style lang="less">
.flow-list {
  display: flex;

  .flow-item {
    width: 30%;
    margin: 15px;
  }
}
</style>
