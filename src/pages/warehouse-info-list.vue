<!--
 * @Description: In User Settings Edit
 * @Author: nemo
 * @Date: 2019-08-15 10:19:45
 * @LastEditTime: 2019-08-19 11:09:45
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="warehouse-info">
    <el-data-table ref="dataTable" v-bind="tableConfig" class="goods-table"></el-data-table>
    <template>
      <el-dialog title="新增仓库信息" :visible.sync="visble" width="55%" :before-close="handleClose">
        <!-- <el-form-renderer :content="content" label-width="80px" ref="formRender" /> -->
        <el-form-maker ref="formMaker" label-width="80px" :rowMap="rowMap" :options="options"></el-form-maker>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="handleSave" :loading="saveLoading">确 定</el-button>
        </span>
      </el-dialog>
    </template>
  </div>
</template>
<script>
import ELSelectArea from '@femessage/el-select-area'
import {stockList, commonCreate} from '@/const/api'
import {objToArr} from '@/const/utils.js'
import {STOCK_TYPE} from '@/const/common.js'
const ROW_CONFIG = {
  gutter: 24,
  type: 'flex',
  justify: 'space-between'
}
export default {
  name: 'warehouse-info-list',
  components: {
    'el-select-area': ELSelectArea
  },
  head: {title: '仓库信息'},
  data() {
    return {
      visble: false,
      saveLoading: false,
      areaList: '',
      rowMap: {
        1: ROW_CONFIG,
        2: ROW_CONFIG,
        3: ROW_CONFIG,
        4: ROW_CONFIG
      },
      options: [
        {
          rowId: 1,
          prop: 'code',
          type: 'input',
          label: '仓库代码',
          col: {
            span: 12
          },
          rules: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ]
        },
        {
          rowId: 1,
          prop: 'name',
          type: 'input',
          label: '仓库名称',
          col: {
            span: 12
          },
          rules: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ]
        },
        {
          rowId: 2,
          prop: 'type',
          type: 'select',
          label: '仓库类型',
          col: {
            span: 12
          },
          options: objToArr(STOCK_TYPE).filter(
            ele => ele.value !== '实物仓库' && ele.value !== '全部'
          ),
          rules: [
            {
              required: true,
              message: '不能为空',
              trigger: 'change'
            }
          ]
        },
        {
          rowId: 3,
          prop: 'user',
          type: 'input',
          label: '联系人',
          col: {
            span: 12
          },
          rules: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ]
        },
        {
          rowId: 3,
          prop: 'phone',
          type: 'input',
          label: '联系电话',
          col: {
            span: 12
          },
          rules: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ]
        },
        {
          rowId: 4,
          label: '所在区域',
          prop: 'area',
          col: {
            span: 24
          },
          component: ELSelectArea,
          props: {
            value: this.areaList,
            type: 'all'
          },
          rules: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ]
        },
        {
          rowId: 5,
          prop: 'address',
          type: 'input',
          props: {
            type: 'textarea'
          },
          label: '详细地址',
          rules: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ]
        }
      ],
      tableConfig: {
        url: `http://39.100.141.76:3000/mock/307/warehouse-info-list`,
        dataPath: 'payload.data',
        totalPath: 'payload.total',
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
        headerButtons: [
          {
            text: '新增',
            type: 'primary',
            atClick: () => {
              this.handleOpen()
              return Promise.resolve(false)
            }
          }
        ],
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
            prop: 'user',
            label: '联系人'
          },
          {
            prop: 'phone',
            label: '联系电话'
          },
          {
            prop: 'area',
            label: '所在区域',
            width: 200,
            formatter: row => {
              if (!row.area) {
                return ''
              } else {
                const arr = row.area.map(item => {
                  const value = Object.values(item)[0]
                  return value
                })
                return arr.join('-')
              }
            }
          },
          {
            prop: 'address',
            label: '详细地址'
          }
        ],
        searchForm: [
          {
            $type: 'input',
            $id: 'name',
            label: '仓库名称',
            $el: {
              placeholder: '请输入'
            }
          },
          {
            $type: 'select',
            $id: 'type',
            label: '仓库类型',
            $el: {
              placeholder: '请输入'
            },
            $options: objToArr(STOCK_TYPE)
          }
        ]
      }
    }
  },
  computed: {},
  methods: {
    handleClose() {
      this.visble = false
    },
    handleOpen() {
      this.visble = true
    },
    handleCancel() {
      this.visble = false
      // 有待重置表单值
      const {clearValidate, initModel} = this.$refs.formMaker
      clearValidate()
      initModel(this.options)
    },
    handleSave() {
      const {validate, getValue} = this.$refs.formMaker
      validate(valid => {
        if (!valid) return
        const form = getValue()
        this.saveDate(form)
      })
    },
    async saveDate(form) {
      try {
        const {getList} = this.$refs.dataTable
        this.saveLoading = true
        const url = `${commonCreate}?collection=zhoudafu_warehourse`
        await this.$axios.$post(url, form)
        getList(true)
      } catch (err) {
        this.$message.error('新增失败')
      } finally {
        this.saveLoading = false
        this.handleClose()
      }
    }
  }
}
</script>
