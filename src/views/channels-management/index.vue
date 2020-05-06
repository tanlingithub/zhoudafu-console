<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 09:57:44
 * @LastEditTime: 2019-08-19 11:28:09
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="brand-management">
    <el-data-table ref="table" v-bind="tableconfig"></el-data-table>
  </div>
</template>

<script>
// import {BRAND_LIST} from '@/service/xpaas-commodity-center.js'
import {ENABLE_TYPE} from '@/const/dictionary.js'
export default {
  head: {title: '渠道管理-列表'},
  data() {
    return {
      tableconfig: {
        url: 'https://easy-mock.com/mock/5d6f65e63d1f3b4e858d5026/channels',
        // dataPath: 'payload',
        totalPath: 'payload.totalElements',
        hasDialog: false,
        hasNew: false,
        hasEdit: false,
        hasDelete: false,
        extraButtons: [
          // {
          //   type: 'primary',
          //   text: '编辑',
          //   atClick: row => {
          //     this.routerLink(row._id)
          //     return Promise.resolve()
          //   }
          // }
        ],
        headerButtons: [
          // {
          //   type: 'primary',
          //   text: '新增渠道',
          //   atClick: row => {
          //     this.routerLink()
          //     return Promise.resolve(false)
          //   }
          // }
        ],
        columns: [
          {
            prop: 'code',
            label: '编码'
          },
          {
            prop: 'name',
            label: '渠道名称'
          },
          {
            prop: 'desc',
            label: '渠道说明'
          },
          {
            prop: 'logo',
            label: 'LOGO',
            formatter: row => {
              let srcUrl = row.logo
              return !!srcUrl ? <img class="srcUrl" src={srcUrl} /> : ''
            }
          },
          {
            prop: 'enable',
            label: '状态',
            formatter: row => (row.enable ? '启用' : '禁用')
          }
        ],
        searchForm: [
          {
            $type: 'input',
            $id: 'name',
            label: '渠道名称',
            $el: {
              placeholder: '请输入内容'
            }
          },
          {
            $type: 'select',
            $id: 'enable',
            label: '渠道状态',
            $options: ENABLE_TYPE,
            inputFormat: row => {
              return row
            },
            outputFormat: row => {
              return row
            },
            $el: {
              placeholder: '请选择'
            }
          }
        ]
      }
    }
  },
  methods: {
    routerLink(ele) {
      this.$router.push({
        path: '/goods/channels/channelInfo',
        query: {
          _id: ele
        }
      })
    }
  }
}
</script>
<style scoped>
.srcUrl {
  width: 60px;
  height: 60px;
}

.brand-management {
  background: #fff;
  padding: 10px;
}
</style>
