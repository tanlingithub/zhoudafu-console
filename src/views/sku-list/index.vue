<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 17:52:42
 * @LastEditTime: 2019-08-19 11:21:39
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="sku-list">
    <el-tabs v-model="saleStatus">
      <el-tab-pane label="上架中" name="1"></el-tab-pane>
      <el-tab-pane label="已下架" name="0"></el-tab-pane>
    </el-tabs>
    <el-data-table ref="onShelvesTable" v-bind="tableconfig" :url="skuUrl"></el-data-table>
    <el-dialog title="选择渠道" :visible.sync="visible" width="30%" @close="closeDialog">
      <el-checkbox-group v-model="requestBody.channelIds">
        <el-checkbox v-for="item in channelList" :key="item.name" :label="item._id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>

      <span slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" :loading="submiting" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const addDate = (date, value = 1, type = 'day') => dayjs(date).add(value, type)

const judgeDateiSEqual = ([start, last]) => {
  return {
    startTime: new Date(dayjs(start).format('YYYY-MM-DD HH:mm:ss')),
    endTime: new Date(
      dayjs(start === last ? addDate(last) : last).format('YYYY-MM-DD HH:mm:ss')
    )
  }
}

import dayjs from 'dayjs'
import {putZoudafuSkuP} from '@/service/poc-api.js'

import axios from '@/http'
import {Popover} from 'element-ui'
export default {
  head: {title: 'sku列表'},
  components: {
    ElPopover: Popover
  },
  data() {
    return {
      requestBody: {
        channelIds: [],
        skuIds: [],
        goodsIds: []
      },
      visible: false,
      submiting: false,
      saleStatus: '1',
      goodsIds: [],
      tableconfig: {
        firstPage: 1,
        dataPath: 'payload.data',
        totalPath: 'payload.totalElements',
        hasDialog: false,
        hasNew: false,
        hasEdit: false,
        hasDelete: false,
        hasOperation: true,
        hasPagination: true,
        extraButtons: [
          {
            text: `下架`,
            show: row => {
              return row.saleStatus
            },
            atClick: row => {
              this.requestBody.goodsIds = [...new Set([row.goodsId])]
              this.requestBody.skuIds = [row._id]
              this.openDialog()
              return Promise.resolve(false)
            }
          },
          {
            text: `上架`,
            show: row => {
              return !row.saleStatus
            },
            atClick: row => {
              this.requestBody.goodsIds = [...new Set([row.goodsId])]
              this.requestBody.skuIds = [row._id]
              this.openDialog()
              return Promise.resolve(false)
            }
          }
        ],
        headerButtons: [
          {
            type: 'warning',
            text: '批量下架',
            disabled: selected => {
              return selected.length < 1
            },
            atClick: row => {
              this.requestBody.goodsIds = [
                ...new Set(
                  row.map(item => {
                    return item.goodsId
                  })
                )
              ]
              this.requestBody.skuIds = row.map(item => {
                return item._id
              })
              this.openDialog()
              return Promise.resolve(false)
            }
          }
        ],
        columns: [
          {
            type: 'selection'
          },
          {
            prop: 'goodsName',
            label: '商品'
          },
          {
            prop: 'name',
            label: '规格'
          },
          {
            label: '已上架渠道',
            formatter: row => {
              return (
                <span>
                  {row.skuChannelList
                    .filter(item => item.saleStatus)
                    .map(item => item.name)
                    .join(',')}
                </span>
              )
            }
          },
          {
            prop: 'saleStatus',
            label: '销售状态',
            formatter: row => {
              let saleStatus = row.saleStatus ? '上架中' : '已下架'
              return <span>{saleStatus}</span>
            }
          },
          {
            prop: 'updatedAt',
            label: '更新时间',
            formatter: (v, k, val) => dayjs(val).format('YYYY-MM-DD HH:mm:ss')
          }
        ],
        searchForm: [
          {
            $type: 'input',
            $id: 'goodsName',
            label: '商品名称',
            $el: {
              placeholder: '请输入内容'
            }
          },
          {
            $type: 'input',
            $id: 'type',
            label: '展示类目',
            $el: {
              placeholder: '请输入内容'
            }
          },
          {
            $type: 'date-picker',
            $id: 'updatedAt',
            label: '创建时间',
            $el: {
              placeholder: '请选择',
              valueFormat: 'yyyy-MM-dd',
              type: 'daterange',
              'range-separator': '至',
              'start-placeholder': '开始日期',
              'end-placeholder': '结束日期'
            },
            outputFormat: val => {
              if (!val || val.length < 2) {
                return {startTime: '', endTime: ''}
              }
              return judgeDateiSEqual(val)
            }
          }
        ]
      },
      channelList: [],
      popVisible: false,
      selectedSkuId: []
    }
  },
  created() {
    // this.saleStatus = this.$route.query.saleStatus //1 上架 0 下架
  },
  computed: {
    skuUrl() {
      return 'https://easy-mock.com/mock/5d6f65e63d1f3b4e858d5026/sku-list'
    }
  },
  watch: {
    saleStatus(val) {
      this.tableconfig.headerButtons[0].text =
        val === '1' ? '批量下架' : '批量上架'
    }
  },
  methods: {
    getChannelList() {
      axios.get('/poc/api/v1/zhoudafu/goods/channels/list').then(res => {
        res = res.data
        if (res.success) {
          this.channelList = res.payload.content
        } else {
          this.$message.success('上架失败')
        }
      })
    },
    openDialog() {
      this.visible = true
      this.getChannelList()
    },
    closeDialog() {
      this.visible = false
      this.requestBody = {
        channelIds: [],
        goodsIds: [],
        skuIds: []
      }
      this.$refs.onShelvesTable.getList()
    },
    jumpEditPage({id, ...row}) {
      this.$router.push({
        path: '/edit-commodity',
        query: {
          commodityId: id
        }
      })
    },
    jumpShowPage({id, ...row}) {
      this.$router.push({
        path: '/commodity-detail',
        query: {
          commodityId: id
        }
      })
    },
    handleClick(id) {},
    clearSelect() {
      this.selectedSkuId = []
      this.channelList.forEach(ele => (ele.checked = false))
      this.popVisible = false
    },
    submit() {
      let type = 'up'
      if (this.saleStatus == '1') {
        type = 'down'
      }
      this.submiting = true
      putZoudafuSkuP(type, this.requestBody).then(res => {
        this.submiting = false
        if (res.success == true) {
          // this.saleStatus == (type == 'down') ? '1' : '0'
          // this.$refs.onShelvesTable.getList()
          this.closeDialog()
        }
      })
    }
  }
}
</script>
<style lang="less">
.sku-list {
  .el-date-editor .el-range-separator {
    margin-right: 4px;
  }

  .text-danger-button {
    color: @--color-danger;
  }

  .el-popover {
    left: 39%;
    top: 30%;
  }
}
</style>
