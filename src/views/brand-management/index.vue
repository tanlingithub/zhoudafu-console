<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 11:03:19
 * @LastEditTime: 2019-08-19 11:29:43
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="brand-management">
    <el-data-table ref="table" v-bind="tableconfig"></el-data-table>
  </div>
</template>

<script>
import {BRAND_LIST} from '@/service/xpaas-commodity-center.js'
export default {
  head: {title: '品牌管理-列表'},
  data() {
    return {
      tableconfig: {
        url:
          'https://easy-mock.com/mock/5d6f65e63d1f3b4e858d5026/brand-management',
        dataPath: 'payload.content',
        totalPath: 'payload.totalElements',
        hasDialog: false,
        hasNew: false,
        hasEdit: false,
        hasDelete: true,
        extraButtons: [
          {
            type: 'primary',
            text: '编辑',
            atClick: row => {
              this.routerLink(row.id)
              return Promise.resolve()
            }
          }
        ],
        headerButtons: [
          {
            type: 'primary',
            text: '新增品牌',
            atClick: row => {
              this.routerLink()
              return Promise.resolve(false)
            }
          }
        ],
        columns: [
          {
            prop: 'id',
            label: 'ID'
          },
          {
            prop: 'code',
            label: '编码'
          },
          {
            prop: 'chineseName',
            label: '品牌中文名称'
          },
          {
            prop: 'englishName',
            label: '品牌英文名称'
          },
          {
            prop: 'attachmentPath',
            label: 'LOGO',
            formatter: row => {
              let srcUrl = row.attachmentPath
              return !!srcUrl ? <img class="srcUrl" src={srcUrl} /> : ''
            }
          }
        ],
        searchForm: [
          {
            $type: 'input',
            $id: 'name',
            label: '品牌名称',
            $el: {
              placeholder: '请输入'
            }
          }
        ]
      }
    }
  },
  methods: {
    routerLink(ele) {
      this.$router.push({
        path: '/brand-management/brandInfo',
        query: {
          id: ele
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
