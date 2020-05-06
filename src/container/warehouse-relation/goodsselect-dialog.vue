<!--
 * @Description: In User Settings Edit
 * @Author: nemo
 * @Date: 2019-08-16 10:41:13
 * @LastEditTime: 2019-08-16 11:47:17
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="goodsselect-dialog">
    <el-dialog
      title="选择商品"
      :visible.sync="show"
      width="600px"
      :before-close="handleCancel"
    >
      <el-data-table
        v-bind="tableConfig"
        ref="dataTable"
        @selection-change="handleSelect"
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
import {totalStock} from '@/const/api.js'

export default {
  name: 'warehouse-dialog',
  props: {
    visible: Boolean,
    ids: Array
  },
  watch: {
    visible: {
      handler: function(val) {
        this.show = val
        if(val) {
          this.getList()
        }
      }
    }
  },
  data() {
    return {
      show: false,
      selectData: [],
      tableConfig: {
        // url: this.url + this.type,
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
            prop: 'goods.code',
            label: '商品代码'
          },
          {
            prop: 'goods.name',
            label: '商品名称'
          },
          {
            prop: 'goods.brand',
            label: '商品品牌'
          }
        ]
      }
    }
  },
  methods: {
    getList() {
      this.$axios.$post(totalStock, {
        wh_ids: this.ids || []
      }).then(res => {
        this.$refs.dataTable.data = res.payload
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
