<!--
 * @Description: In User Settings Edit
 * @Author: nemo
 * @Date: 2019-08-15 10:19:45
 * @LastEditTime: 2019-08-15 11:23:21
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="warehouse-info">
    <el-data-table
      ref="dataTable"
      v-bind="tableConfig"
      class="goods-table"
    ></el-data-table>
    <template>
      <el-dialog
        title="新增仓库信息"
        :visible.sync="visble"
        width="50%"
        :before-close="handleClose"
      >
        <el-form-renderer
          :content="content"
          label-width="80px"
          ref="formRender"
        />
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="handleSave" :loading="saveLoading"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </template>
  </div>
</template>
<script>
export default {
  name: 'warehouse-info-list',
  components: {},
  data() {
    return {
      visble: false,
      saveLoading: false,
      content: [
        {
          $id: 'warehouseCode',
          $type: 'input',
          label: '仓库代码',
          rules: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ]
        },
        {
          $id: 'warehouseName',
          $type: 'input',
          label: '仓库名称',
          rules: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ]
        },
        {
          $id: 'warehouseType',
          $type: 'select',
          label: '仓库类型',
          $options: [
            {
              label: '实物仓库',
              value: '1'
            },
            {
              label: '销售仓库',
              value: '2'
            }
          ],
          rules: [
            {
              required: true,
              message: '不能为空',
              trigger: 'change'
            }
          ]
        },
        {
          $id: 'linkName',
          $type: 'input',
          label: '联系人',
          rules: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ]
        },
        {
          $id: 'linkTel',
          $type: 'input',
          label: '联系电话',
          rules: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ]
        },
        // {
        //   $id: 'area',
        //   component: AreaSelect,
        //   rules: [
        //     {
        //       required: true,
        //       message: '不能为空',
        //       trigger: 'blur'
        //     }
        //   ]
        // }
        {
          $id: 'detailAdress',
          $type: 'input',
          $el: {
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
        url: '/poc/api/v1/common/list?collection=zhoudafu_wh_sales_order',
        dataPath: 'payload.data',
        totalPath: 'payload.total',
        hasNew: false,
        hasEdit: false,
        hasView: false,
        hasDelete: false,
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
            prop: '_id',
            label: '订单号'
          },
          {
            prop: 'name',
            label: '发货状态'
          },
          {
            prop: 'type',
            label: '订单状态'
          },
          {
            prop: 'orderNo',
            label: '订单编号'
          },
          {
            prop: 'user',
            label: '会员账号'
          },
          {
            prop: 'chanel_name',
            label: '渠道名称'
          },
          {
            prop: 'store_name',
            label: '店铺名称'
          },
          {
            prop: 'orderPrice',
            label: '订单金额'
          },
          {
            prop: 'payPrice',
            label: '支付金额'
          },
          {
            prop: 'area',
            label: '商品数量'
          },
          {
            prop: 'area',
            label: '发货策略'
          },
          {
            prop: 'area',
            label: '建议发货仓库'
          },
          {
            prop: 'recv_username',
            label: '收货人'
          },
          {
            prop: 'recv_phone',
            label: '联系电话'
          },
          {
            prop: 'recv_province',
            label: '所在区域'
          },
          {
            prop: 'recv_address',
            label: '详细地址'
          }
        ],
        searchForm: [
          {
            $type: 'input',
            $id: 'warehouseName',
            label: '仓库名称',
            $el: {
              placeholder: '请输入'
            }
          },
          {
            $type: 'select',
            $id: 'warehouseType',
            label: '仓库类型',
            $el: {
              placeholder: '请输入'
            },
            $options: [
              {
                label: '实物仓库',
                value: '1'
              },
              {
                label: '销售仓库',
                value: '2'
              }
            ]
          }
        ]
      }
    }
  },
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
    },
    handleSave() {
      const {validate, getValue} = this.$refs.formRender
      validate(valid => {
        if (!valid) return
        const form = getValue()
        this.saveDate(form)
      })
    },
    async saveDate(form) {
      try {
        this.saveLoading = true
        await this.$axios.$post('/save', form)
      } catch (err) {
        this.$message.error('新增失败')
      } finally {
        this.saveLoading = false
      }
    }
  }
}
</script>
