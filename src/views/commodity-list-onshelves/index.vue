<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 17:52:42
 * @LastEditTime: 2019-08-19 11:20:56
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="brand-management">
    <el-data-table ref="onShelvesTable" v-bind="tableconfig" :url="setCommodityUrl"></el-data-table>
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
import axios from '@/http'
import {
  getCommodityList,
  putCommodityList,
  deleteCommodityList,
  CommodityList
} from '@/service/xpaas-commodity-center.js'

const setTitle = function(params) {
  return !/commodity-list-onshelves/.test(location.href) ? '上架' : '下架'
}

export default {
  head: {title: '商品列表'},
  data() {
    return {
      visible: false,
      submiting: false,
      // 请求数据
      requestBody: {
        goodsData: [],
        channelIds: []
      },
      status: 0,
      checkoutUrl: /commodity-list-onshelves/.test(this.$route.path),
      tableconfig: {
        firstPage: 1,
        dataPath: 'payload.data',
        totalPath: 'payload.total',
        hasDialog: false,
        hasNew: false,
        hasEdit: false,
        hasDelete: false,
        hasOperation: true,
        hasPagination: true,
        extraButtons: [
          {
            text: `${setTitle()}`,
            atClick: row => {
              this.requestBody.goodsData = [
                {
                  goodsId: row._id,
                  isCompose: row.type === 'compose'
                }
              ]
              this.openDialog()
              return Promise.resolve()
            }
          },
          // {
          //   text: '查看',
          //   atClick: row => {
          //     row.id = row.spaasGoodsId
          //     this.jumpShowPage(row)
          //     return Promise.resolve()
          //   }
          // },
          // {
          //   text: '编辑',
          //   atClick: row => {
          //     row.id = row.spaasGoodsId
          //     this.jumpEditPage(row)
          //     return Promise.resolve()
          //   }
          // },
          {
            text: '删除',
            class: 'text-danger-button',
            atClick: row => {
              // console.log(row)
              // 删除spaas商品
              axios
                .delete(`/poc/api/v1/zhoudafu/goods/delete?ids=${row._id}`)
                .then(res => {
                  res = res.data
                  if (res.success) {
                    this.$message.success('删除成功')
                    this.$refs.onShelvesTable.getList()
                  } else {
                    this.$message.success('删除失败')
                  }
                })
              // 删除poc商品
              return Promise.resolve()
            }
          }
        ],
        headerButtons: [
          {
            type: 'primary',
            text: '发布商品',
            show: selected => {
              return this.status == 4
            },
            atClick: row => {
              this.$router.push('/new-commodity')
              return Promise.resolve(false)
            }
          },
          {
            type: 'warning',
            text: `批量${setTitle()}`,
            disabled: selected => selected.length < 1,
            atClick: row => {
              this.requestBody.goodsData = row.map(item => {
                return {
                  goodsId: item._id,
                  isCompose: item.type === 'compose'
                }
              })
              console.log(this.requestBody)
              this.openDialog()
              return Promise.resolve()
            }
          },
          {
            type: 'danger',
            text: '批量删除',
            disabled: selected => selected.length < 1,
            atClick: row => {
              axios
                .delete(
                  `/poc/api/v1/zhoudafu/goods/delete?ids=${row.map(
                    item => item._id
                  )}`
                )
                .then(res => {
                  res = res.data
                  if (res.success) {
                    this.$message.success('删除成功')
                    // this.closeDialog()
                  } else {
                    this.$message.success('删除失败')
                  }
                })
              console.log(row)
              return Promise.resolve()
            }
          }
        ],
        columns: [
          {
            type: 'selection'
          },
          {
            prop: 'name',
            label: '商品'
          },
          {
            formatter: row => {
              return row.type === 'compose' ? '组合商品' : '普通商品'
            },
            label: '商品类型'
          },
          {
            prop: 'category.name',
            label: '基础类目'
          },
          {
            prop: 'status',
            label: '销售状态',
            formatter: row => {
              let saleStatus = this.status == 4 ? '上架中' : '下架中'
              return <span>{saleStatus}</span>
            }
          },
          {
            prop: 'updatedTime',
            label: '更新时间',
            formatter: (v, k, val) => dayjs(val).format('YYYY-MM-DD HH:mm:ss')
          }
        ],
        searchForm: [
          {
            $type: 'input',
            $id: 'name',
            label: '商品名称',
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
      channelList: []
    }
  },
  created() {
    this.status = this.checkoutUrl ? 4 : 5 //4 上架 5 下架
  },
  computed: {
    setCommodityUrl() {
      return `https://easy-mock.com/mock/5d6f65e63d1f3b4e858d5026/commodity-list-onshelves`
    }
  },
  // mounted() {
  //   this.openDialog()
  // },
  methods: {
    getChannelList() {
      axios
        .get(
          'https://easy-mock.com/mock/5d6f65e63d1f3b4e858d5026/commodity-list-onshelves'
        )
        .then(res => {
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
        goodsData: []
      }
      this.$refs.onShelvesTable.getList()
    },
    // 批量上架
    upMany() {
      axios.put('/poc/api/v1/zhoudafu/goods/up', this.requestBody).then(res => {
        res = res.data
        this.submiting = false
        if (res.success) {
          this.$message.success('上架成功')

          this.closeDialog()
        } else {
          this.$message.success('上架失败')
        }
      })
    },
    // 批量下架
    downMany() {
      axios
        .put('/poc/api/v1/zhoudafu/goods/down', this.requestBody)
        .then(res => {
          res = res.data
          this.submiting = false
          if (res.success) {
            this.$message.success('下架成功')
            this.closeDialog()
          } else {
            this.$message.success('下架失败')
          }
        })
    },
    // 弹窗确定
    submit() {
      this.submiting = true
      if (setTitle() === '上架') {
        this.upMany()
      } else {
        this.downMany()
      }
    },
    jumpEditPage({id, ...row}) {
      this.$router.push({
        path: '/edit-commodity',
        query: {
          commodityId: id,
          pocId: row._id
        }
      })
    },
    jumpShowPage({id, ...row}) {
      this.$router.push({
        path: '/commodity-detail',
        query: {
          commodityId: id,
          pocId: row._id
        }
      })
    }
  }
}
</script>
<style lang="less">
.brand-management {
  .el-date-editor .el-range-separator {
    margin-right: 4px;
  }

  .text-danger-button {
    color: @--color-danger;
  }
}
</style>
