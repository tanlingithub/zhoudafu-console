<!--
 * @Description: In User Settings Edit
 * @Author: nemo
 * @Date: 2019-08-15 19:49:56
 * @LastEditTime: 2019-08-19 11:13:11
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="warehouse-channel-list">
    <el-row class="head-bt-box">
      <el-button type="primary" size="mini" @click="handleAdd">设置</el-button>
      <span class="subfix">根据收货城市确定最终发货的实物仓库</span>
    </el-row>
    <el-data-table ref="dataTable" v-bind="tableConfig"></el-data-table>
    <el-dialog title="同步日志" :visible.sync="visible" width="30%" :before-close="handleClose">
      <log-viewer :log="log" :height="300" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {stockList} from '@/const/api.js'
import {COLLECTION, STOCK_TYPE, formatDate} from '@/const/common.js'
import LogViewer from '@femessage/log-viewer'
import {groupBy} from 'loadsh'

const LOG = (
  sumInfo,
  type = 1,
  id = 'dsasd2121'
) => `PUT /taobao/skus/quantity/update

  {
    num_iid:${id},
    type:${type},
    skuid_quantities:${sumInfo}
  }
  `

export default {
  name: 'warehouse-channel-list',
  head: {title: '仓库覆盖渠道-列表'},
  components: {
    'log-viewer': LogViewer
  },
  data() {
    return {
      visible: false,
      log: '',
      tableConfig: {
        url: 'http://39.100.141.76:3000/mock/307/warehouse-channel-list',
        customQuery: {
          collection: COLLECTION.channels
        },
        dataPath: 'payload.data',
        hasNew: false,
        hasEdit: false,
        hasView: false,
        hasDelete: false,
        hasOperation: false,
        operationAttrs: {
          width: '160px',
          fixed: 'right'
        },
        tableAttrs: {border: true},
        // extraButtons: [
        //   {
        //     type: 'primary',
        //     text: '同步',
        //     atClick: row => {
        //       return Promise.resolve(false)
        //     }
        //   }
        // ],
        columns: [
          {
            prop: 'name',
            label: '渠道名称'
          },
          {
            prop: 'store_name',
            label: '店铺名称'
          },
          {
            prop: 'deliver_strategy',
            label: '发货策略（按发货优先级排序）',
            width: 200,
            formatter: row => {
              return (
                row.deliver_strategy &&
                row.deliver_strategy.list.map(i => i.name).join('、')
              )
            }
          },
          {
            prop: 'deliver_strategy.match_location',
            label: '启用仓库覆盖省份',
            formatter: row => {
              return row.deliver_strategy && row.deliver_strategy.match_location
                ? '是'
                : '否'
            }
          },
          {
            prop: 'status',
            label: '状态',
            formatter: row => {
              return row.enable ? '启用' : '禁用'
            }
          },
          {
            prop: 'updatedAt',
            label: '更新时间',
            formatter: row => {
              return formatDate(row.updatedAt, 'YYYY-MM-DD')
            }
          },
          {
            prop: 'operate',
            label: '操作',
            formatter: row => {
              return (
                <el-button
                  type="primary"
                  size="mini"
                  onClick={() => this.autoSync(row)}
                >
                  同步
                </el-button>
              )
            }
          }
        ]
      }
    }
  },
  methods: {
    handleAdd() {
      this.$router.push('/warehouse-channel/add')
    },
    autoSync(row) {
      const {data} = this.$refs.dataTable
      const {
        deliver_strategy: {list}
      } = row
      const idSet = list.map(item => item.wh_id)
      // center id
      this.$axios
        .$post('/poc/api/v1/zhoudafu/whStock', {
          wh_ids: idSet
        })
        .then(res => {
          const groups = groupBy(res.payload, 'goods._id')
          const sumMap = Object.keys(groups).reduce((cur, key) => {
            cur[key] = groups[key].reduce((sum, ele) => (sum += ele.stock), 0)
            return cur
          }, {})

          const sumText = Object.keys(sumMap).reduce((str, key) => {
            str += key.toString() + ':' + sumMap[key].toString() + ';'
            return str
          }, '')
          this.log = LOG(sumText, 1, res.payload[0].goods.goodsId)
          this.visible = true
        })
    },
    handleClose() {
      this.visible = false
    }
  }
}
</script>
<style lang="less">
.warehouse-channel-list {
  .head-bt-box {
    padding: 10px 0;

    .subfix {
      margin-left: 10px;
    }
  }
}
</style>
