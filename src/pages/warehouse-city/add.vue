<!--
 * @Description: In User Settings Edit
 * @Author: nemo
 * @Date: 2019-08-15 11:38:11
 * @LastEditTime: 2019-08-19 11:12:31
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="warehouse-city-add">
    <sub-container title="新增" class="add-main-box">
      <el-form-maker
        :options="options"
        label-width="100px"
        :rowMap="rowMap"
        ref="formMaker"
      ></el-form-maker>
    </sub-container>
    <sub-container class="add-margin">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-button size="small" type="primary" @click="handleSave"
        >保存</el-button
      >
    </sub-container>
  </div>
</template>
<script>
import {provinceList} from '@/const/area-list.js'
import {Object2Array, COLLECTION, STOCK_TYPE} from '@/const/common.js'
import {stockList, commonUpdate} from '@/const/api.js'

export default {
  name: 'warehouse-city-add',
  head:{title:'仓库覆盖城市-新增'},
  components: {},
  data() {
    return {
      realStockList: [],
      rowMap: {},
      tagsList: [],
      options: [
        {
          label: '实物仓库',
          rowId: 1,
          prop: '_id',
          type: 'select',
          col: {
            span: 10
          },
          options: [],
          rules: [
            {
              required: true,
              message: '实物仓库名称不能为空',
              trigger: 'blur'
            }
          ]
        },
        {
          rowId: 2,
          label: '覆盖城市',
          prop: 'citys',
          type: 'select',
          defaultValue: [],
          props: {
            multiple: true,
            'collapse-tags': true
          },
          options: Object2Array(provinceList)
        },
        {
          rowId: 3,
          prop: 'tagShow',
          label: '',
          col: {
            span: 10
          },
          render: (h, parmas) => {
            if (!this.$refs.formMaker) return
            const {getValue} = this.$refs.formMaker
            const {citys} = getValue()

            return (
              <div class="tags-box">
                {(citys || []).map(city => {
                  const data = {
                    type: 'success',
                    label: city
                  }
                  return (
                    <el-tag {...{props: data}} style="marginRight:10px;">
                      {provinceList[city]}
                    </el-tag>
                  )
                })}
              </div>
            )
          }
        },
        {}
      ]
    }
  },
  mounted() {
    this.getRealStock()
  },
  methods: {
    getRealStock() {
      this.$axios.$get(stockList, {
        params: {
          collection: COLLECTION.warehourse,
          type: STOCK_TYPE.real
        }
      }).then(res => {
        this.realStockList = res.payload.data

        this.options[0].options = res.payload.data.map(i => {
          return {
            ...i,
            label: i.name,
            value: i._id
          }
        })
      })
    },
    handleCancel() {
      this.$router.go(-1)
    },
    handleSave() {
      const {getValue, validate} = this.$refs.formMaker
      validate(valid => {
        if (!valid) return
        const form = getValue()

        // let stock = this.realStockList.find(i => i._id === form._id)
        // stock.province_ids = form.citys
        // debugger
        // return
        this.sendRequest({province_ids: form.citys, _id: form._id})
      })
    },
    async sendRequest(form) {
      try {
        this.saveLoading = true
        let res = await this.$axios.$put(`${commonUpdate}?collection=${COLLECTION.warehourse}`, {
          filter: {_id: form._id},
          body: {province_ids: form.province_ids, updateTime: +new Date(), status: true}
        })

        if(res.success){
          this.$message.success('操作成功')
          this.$router.back()
        }else {
          this.saveLoading = false
        }
      } catch (err) {
        this.$message.error('保存失败')
      } finally {
        this.saveLoading = false
      }
    }
  }
}
</script>
<style lang="less">
.warehouse-city-add {
  .add-main-box {
    min-height: 280px;
  }
  .add-margin{
    margin-top: 10px;
  }
}
</style>
