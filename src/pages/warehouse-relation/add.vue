<!--
 * @Description: In User Settings Edit
 * @Author: nemo
 * @Date: 2019-08-15 17:31:33
 * @LastEditTime: 2019-08-19 11:11:21
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="warehoust-relation-list">
    <sub-container title="基本信息">
      <el-form-maker
        ref="formMaker1"
        :options="basicOptions"
        :rowMap="rowMap"
        label-width="100px"
        style="margintop:10px;"
      ></el-form-maker>
    </sub-container>
    <sub-container title="对应关系" class="add-margin">
      <el-form-maker
        ref="formMaker2"
        :options="relationOptions"
        :rowMap="rowMap"
        label-width="100px"
        style="margintop:10px;"
      ></el-form-maker>
      <drag-table
        ref="dragTable"
        sortKey="priority"
        :columns="columns"
        :data="selectList"
        style="width:65%; padding:10px 20px;"
        border
      ></drag-table>
    </sub-container>
    <sub-container class="add-margin">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-button size="small" type="primary" @click="handleSave" :loading="saveLoading">确定</el-button>
    </sub-container>
    <warehouse-dialog :visible.sync="visible" v-model="selectList" type="实物仓库" />
  </div>
</template>
<script>
import {stockList, commonCreate, commonUpdate} from '@/const/api'
export default {
  name: 'warehoust-relation-list',
  head:{title:'仓库对应关系-设置'},
  components: {
    'drag-table': () => import('@/container/drap-table'),
    'warehouse-dialog': () =>
      import('@/container/warehouse-relation/warehouse-dialog')
  },
  data() {
    return {
      saveLoading: false,
      visible: false,
      rowMap: {},
      selectList: [],
      basicOptions: [
        // {
        //   rowId: 1,
        //   label: '关系类型',
        //   type: 'radio-group',
        //   prop: 'relationType',
        //   options: [
        //     {
        //       label: '中央仓库与实物仓库',
        //       value: '1'
        //     },
        //     {
        //       label: '中央仓库与销售仓库',
        //       value: '2'
        //     }
        //   ]
        // },
        {
          rowId: 2,
          label: '标题',
          prop: 'title',
          col: {
            span: 10
          },
          type: 'input',
          rules: [
            {
              required: true,
              message: '标题不能为空',
              trigger: 'blur'
            }
          ]
        },
        {
          rowId: 3,
          prop: 'description',
          label: '描述',
          col: {
            span: 10
          },
          type: 'input',
          props: {
            type: 'textarea'
          },
          rules: [
            {
              required: true,
              message: '描述不能为空',
              trigger: 'blur'
            }
          ]
        }
      ],
      relationOptions: [
        {
          prop: 'centerSelect',
          rowId: 1,
          label: '中央仓库',
          col: {
            span: 10
          },
          type: 'select',
          options: [],
          rules: [
            {
              required: true,
              message: '中央仓库不能为空',
              trigger: 'change'
            }
          ]
        },
        {
          rowId: 2,
          label: '实物仓库',
          render: (h, params) => {
            return (
              <div class="bt-box">
                <el-button
                  type="primary"
                  size="small"
                  onClick={() => this.handleSet()}
                >
                  设置
                </el-button>
                <span style="marginLeft:10px;color:#ccc;">
                  设置完成后,支持拖拽对优先级进行排序
                </span>
              </div>
            )
          }
        }
      ],
      columns: [
        {
          prop: 'type',
          label: '仓库类型'
        },
        {
          prop: 'name',
          label: '仓库名称'
        },
        {
          prop: 'code',
          label: '仓库代码'
        }
      ]
    }
  },
  created() {
    this.fetchCenterSelect()
  },
  methods: {
    handleSave() {
      // 有待递归实现多个表单域校验触发
      this.$refs.formMaker1.validate(valid1 => {
        if (!valid1) return
        this.$refs.formMaker2.validate(valid2 => {
          if (!valid2) return
          const form1 = this.$refs.formMaker1.getValue()
          const form2 = this.$refs.formMaker2.getValue()
          const tableList = this.$refs.dragTable.getValue()
          if (this.selectList.length == 0) {
            this.$message.warning('请选择实物仓库')
            return
          }
          const realForm = Object.assign({}, form1, form2, {
            list: tableList.map(item => Object.assign({}, item, {id: item._id}))
          })
          this.sendReuqest(realForm)
        })
      })
    },
    handleCancel() {
      this.$router.push('/warehouse-relation/list')
    },
    handleSet() {
      this.visible = true
    },
    async sendReuqest(form) {
      try {
        this.saveLoading = true
        const url = `${commonUpdate}?collection=zhoudafu_warehourse`
        await this.$axios.$put(url, {
          filter: {
            _id: form.centerSelect
          },
          body: {
            source_strategy: form
          }
        })
        this.$router.push('/warehouse-relation/list')
      } catch (err) {
        this.$message.error('保存失败')
      } finally {
        this.saveLoading = false
      }
    },
    async fetchCenterSelect() {
      try {
        const url = `${stockList}?collection=zhoudafu_warehourse&type=中央仓库`
        const {
          payload: {data}
        } = await this.$axios.$get(url)
        this.relationOptions[0].options = data.map(item => ({
          label: item.name,
          value: item._id
        }))
      } catch (err) {
        this.$message.error('仓库信息查询失败')
      }
    }
  }
}
</script>
<style lang="less">
.warehoust-relation-list {
  .add-margin {
    margin-top: 10px;
  }
}
</style>
