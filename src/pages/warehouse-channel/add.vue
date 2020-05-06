<!--
 * @Description: In User Settings Edit
 * @Author: nemo
 * @Date: 2019-08-15 19:50:03
 * @LastEditTime: 2019-08-19 11:13:43
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="warehouse-channel-add">
    <sub-container title="新增">
      <el-form-maker :options="options" :rowMap="rowMap" label-width="100px" ref="formMaker"></el-form-maker>
      <!-- <el-table :data="tableData" border class="table-box">
        <el-table-column v-for="col in columns" :key="col.prop" v-bind="col" />
      </el-table>-->
      <DrapTable :columns="columns" :data="form.deliver_strategy" ref="drapTable"></DrapTable>
    </sub-container>
    <sub-container style="margin-top:10px;">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-button size="small" type="primary" @click="handleSave" :loading="saveLoading">确定</el-button>
    </sub-container>

    <WareHouseDialog :visible.sync="dialogVisible" v-model="form.deliver_strategy"></WareHouseDialog>
  </div>
</template>
<script>
import WareHouseDialog from '@/container/warehouse-relation/channel-dialog.vue'
import DrapTable from '@/container/drap-table.vue'
import {stockList, commonUpdate} from '@/const/api.js'
import {COLLECTION} from '@/const/common.js'

export default {
  name: 'warehouse-channel-add',
  head:{title:'仓库覆盖渠道-设置'},
  components: {
    WareHouseDialog,
    DrapTable
  },
  data() {
    return {
      channelsList: [],
      form: {
        deliver_strategy: [],
        match_location: false
      },
      dialogVisible: false,
      tableData: [],
      saveLoading: false,
      columns: [
        {
          prop: 'name',
          label: '仓库名称'
        },
        {
          prop: 'code',
          label: '仓库代码'
        },
        {
          prop: 'type',
          label: '仓库类型'
        }
      ],
      rowMap: {},
      options: [
        {
          rowId: 1,
          label: '渠道',
          prop: '_id',
          type: 'select',
          col: {
            span: 10
          },
          options: [],
          rules: [
            {
              required: true,
              message: '渠道名称不能为空',
              trigger: 'blur'
            }
          ]
        },
        {
          rowId: 2,
          label: '店铺',
          prop: 'store_name',
          type: 'input',
          col: {
            span: 10
          },
          rules: [
            {
              required: true,
              message: '店铺名称不能为空',
              trigger: 'blur'
            }
          ]
        },
        {
          rowId: 3,
          label: '仓库优先级',
          render: (h, params) => {
            return (
              <div>
                <el-button
                  size="small"
                  type="primary"
                  onClick={() => this.handleDialog()}
                >
                  选择仓库
                </el-button>
                <span style="marginLeft:10px;color:#ccc;">
                  选择仓库后，拖拽可调整优先级
                </span>
              </div>
            )
          }
        },
        {
          rowId: 4,
          render: (h, params) => {
            return (
              <div>
                <el-checkbox value={this.form.match_location}>
                  匹配覆盖城市内的仓库
                </el-checkbox>
              </div>
            )
          }
        }
      ]
    }
  },
  mounted() {
    this.getChannel()
  },
  methods: {
    getChannel() {
      this.$axios
        .$get(stockList, {
          params: {
            collection: COLLECTION.channels
          }
        })
        .then(res => {
          this.channelsList = res.payload.data

          this.options[0].options = res.payload.data.map(i => {
            return {
              ...i,
              label: i.name,
              value: i._id
            }
          })
        })
    },
    handleDialog() {
      this.dialogVisible = true
    },
    handleCancel() {
      this.$router.go(-1)
    },
    handleSave() {
      const {getValue, validate} = this.$refs['formMaker']

      validate(valid => {
        if (!valid) return
        const form = getValue()

        let data = {
          _id: form._id,
          name: form.name,
          store_name: form.store_name,
          createdAt: +new Date(),
          updatedAt: +new Date(),
          enable: true,
          deliver_strategy: {
            list: this.$refs.drapTable.getValue().map(i => {
              return {
                name: i.name,
                wh_id: i._id,
                index: i.sort,
                code: i.code
              }
            }),
            match_location: this.form.match_location
          }
        }

        this.sendRequest(data)
      })
    },
    async sendRequest(form) {
      try {
        this.saveLoading = true

        let res = await this.$axios.$put(
          `${commonUpdate}?collection=${COLLECTION.channels}`,
          {
            filter: {_id: form._id},
            body: {
              store_name: form.store_name,
              deliver_strategy: form.deliver_strategy,
              enable: form.enable,
              updatedAt: form.updatedAt
            }
          }
        )

        if (res.success) {
          this.$message.success('操作成功')
          this.$router.back()
        } else {
          this.saveLoading = false
        }
      } catch (err) {
        this.$message.error(err)
      } finally {
        this.saveLoading = false
      }
    }
  }
}
</script>
<style lang="less">
.warehouse-channel-add {
  .table-box {
    width: 60%;
    margin-left: 100px;
  }
}
</style>
