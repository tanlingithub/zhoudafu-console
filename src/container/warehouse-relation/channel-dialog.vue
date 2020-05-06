<!--
 * @Description: In User Settings Edit
 * @Author: nemo
 * @Date: 2019-08-16 10:41:13
 * @LastEditTime: 2019-08-16 11:47:17
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="warehouse-dialog">
    <el-dialog
      title="选择仓库"
      :visible.sync="show"
      width="40%"
      :before-close="handleCancel"
    >
      <el-data-table
        v-bind="tableConfig"
        ref="dataTable"
        @selection-change="handleSelect"
        @update='onUpdate'
      ></el-data-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="handeok"
          :disabled="selectData.length == 0"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {STOCK_TYPE} from '@/const/common.js'

export default {
  name: 'warehouse-dialog',
  props: {
    visible: Boolean,
    type: {
      type: String,
      default: () => '实物仓库'
    },
    url: {
      type: String,
      default: () => '/poc/api/v1/common/list?collection=zhoudafu_warehourse'
    }
  },
  watch: {
    visible: {
      handler: function(val) {
        this.show = val
      }
    }
  },
  data() {
    return {
      show: false,
      selectData: [],
      tableConfig: {
        url: this.url,
        dataPath: 'payload.data',
        totalPath: 'payload.total',
        hasNew: false,
        hasEdit: false,
        hasView: false,
        hasDelete: false,
        hasOperation: false,
        columns: [
          {
            type: 'selection'
          },
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
          }
        ]
      }
    }
  },
  methods: {
    onUpdate(data) {
      this.$refs.dataTable.data = data.filter(i => {
        return (i.type == STOCK_TYPE.sale || i.type == STOCK_TYPE.center)
      })
    },
    handeok() {
      this.$emit('update:visible', false)
      this.$emit('input', this.selectData)
    },
    handleCancel() {
      this.$emit('update:visible', false)
    },
    handleSelect(data) {
      this.selectData = data
    }
  }
}
</script>
