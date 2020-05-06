<!--
 * @Description: In User Settings Edit
 * @Author: nemo
 * @Date: 2019-08-15 15:41:26
 * @LastEditTime: 2019-08-19 11:09:05
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="separate-warehouse">
    <!-- <sub-container>
      <el-button type="primary" size="small" @click="handleAdd"
        >新增分仓策略</el-button
      >
    </sub-container>-->
    <sub-container class="card-form add-margin" v-for="(card, index) in cardList" :key="index">
      <el-row type="flex" justify="space-between" class="card-head">
        <b>策略{{ index + 1 }}</b>
        <i class="el-icon-delete-solid"></i>
      </el-row>
      <div class="form-box">
        <el-form-maker
          :options="card.options"
          :rowMap="card.rowMap"
          label-width="100px"
          ref="formMaker"
        ></el-form-maker>
        <el-validate-table
          v-if="centerStore[0]"
          ref="validateTable1"
          :data="centerStore[0].sales_limit_strategy.list"
          :columns="card.warehouseColumns"
          style="width:60%;"
          class="add-padding"
          border
        />
        <el-checkbox v-model="card.stockCheck" class="add-padding">启用指定商品库存数量设置</el-checkbox>
        <div class="add-padding" v-show="card.stockCheck">
          <el-button @click="goodsVisible = true" size="small" type="primary">选择商品</el-button>
        </div>
        <el-validate-table
          v-show="card.stockCheck"
          ref="validateTable2"
          :data="goodsList"
          :columns="card.goodsColumns"
          class="add-padding"
          style="width:80%;"
          border
        ></el-validate-table>
      </div>
    </sub-container>
    <sub-container class="add-margin">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-button type="primary" size="small" @click="hanldeSave" :loading="saveLoading">保存</el-button>
    </sub-container>

    <WareHouseDialog
      :type="STOCK_TYPE.sale"
      :visible.sync="materialWarehouseVisible"
      v-model="centerStore[0] && centerStore[0].sales_limit_strategy.list"
    ></WareHouseDialog>

    <GoodsselectDialog
      :visible.sync="goodsVisible"
      v-model="selectGoodsList"
      :ids="[centerStore[0] && centerStore[0]._id]"
    ></GoodsselectDialog>
  </div>
</template>
<script>
import {stockList, commonUpdate, totalStock} from '@/const/api.js'
import {COLLECTION, STOCK_TYPE, formatDate, price} from '@/const/common.js'
import WareHouseDialog from '@/container/warehouse-relation/warehouse-dialog.vue'
import GoodsselectDialog from '@/container/warehouse-relation/goodsselect-dialog.vue'

const BASIC_OPTIONS = {
  rowMap: {},
  options: [
    {
      type: 'input',
      label: '中央仓库',
      col: {
        span: 10
      },
      prop: 'centerWarehhouse',
      rowId: 1
    },
    {
      prop: 'materialWarehouse',
      label: '销售仓库',
      render: (h, params) => {
        return (
          <el-button type="primary" size="small">
            设置
          </el-button>
        )
      }
    }
  ],
  warehouseData: [],
  warehouseColumns: [
    {
      prop: 'rate',
      label: '分配比例（%）',
      config: params => ({
        type: 'el-input',
        rules: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ]
      })
    },
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
  stockCheck: true,
  goodsData: [],
  goodsColumns: [
    {
      prop: 'stockNum',
      label: '分配库存数量',
      config: params => ({
        type: 'el-input',
        rules: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ]
      })
    },
    {
      prop: 'goodsCode',
      label: '商品代码'
    },
    {
      prop: 'goodsName',
      label: '商品名称'
    },
    {
      prop: 'goodsWeight',
      label: '商品克重'
    },
    {
      prop: 'warehouseName',
      label: '仓库名称'
    },
    {
      prop: 'warehouseCode',
      label: '仓库代码'
    },
    {
      prop: 'warehouseType',
      label: '仓库类型'
    }
  ]
}

export default {
  name: 'separate-warehouse',
  head: {title: '分仓策略'},
  components: {
    WareHouseDialog,
    GoodsselectDialog
  },
  watch: {
    selectGoodsList: {
      handler(val) {
        let data = []
        let storeLimit = {}

        val.forEach(g => {
          let item = {
            commodity_id: g.goods._id,
            commodity_name: g.goods.name,
            commodity_code: g.goods.code,
            commodity_weight: g.goods.weight
          }

          storeLimit[g.goods._id] = {
            name: g.goods.name,
            stock: g.stock
          }

          let list = this.saleStock.map(i => {
            return {
              ...item,
              name: i.name,
              code: i.code,
              type: i.type,
              id: i._id,
              count: ''
            }
          })

          Array.prototype.push.apply(data, list)
        })

        this.storeLimit = storeLimit
        this.goodsList = data
      },
      deep: true
    }
  },
  data() {
    return {
      STOCK_TYPE,
      storeLimit: {},
      centerStore: [],
      saleStock: [],
      form: {},
      goodsList: [],
      selectGoodsList: [],
      goodsVisible: false,
      materialWarehouseVisible: false,
      saveLoading: false,
      cardList: [
        {
          rowMap: {},
          options: [
            {
              type: 'select',
              options: [],
              defaultValue: '',
              label: '中央仓库',
              col: {
                span: 10
              },
              prop: '_id',
              rowId: 1
            },
            {
              prop: 'materialWarehouse',
              label: '销售仓库',
              render: (h, params) => {
                return (
                  <el-button
                    type="primary"
                    size="small"
                    v-on:click={this.materialWarehouseHandle}
                  >
                    设置
                  </el-button>
                )
              }
            }
          ],
          warehouseData: [
            {
              percent: 11,
              warehouseName: '天猫仓',
              warehouseCode: 'SW001',
              warehouseType: '销售仓库',
              warehouseName: '天猫仓',
              warehouseCode: 'SW001',
              warehouseType: '销售仓库'
            }
          ],
          warehouseColumns: [
            {
              prop: 'rate',
              label: '分配比例（%）',
              config: params => ({
                type: 'el-input',
                rules: [
                  {
                    required: true,
                    message: '不能为空',
                    trigger: 'blur'
                  }
                ]
              })
            },
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
          stockCheck: true,
          goodsData: [
            {
              stockNum: 12,
              goodsCode: 'F187684',
              goodsName: '黄金耳环',
              goodsWeight: '5.0',
              warehouseName: '天猫仓',
              warehouseCode: 'SW001',
              warehouseType: '销售仓库'
            }
          ],
          goodsColumns: [
            {
              prop: 'count',
              label: '分配库存数量',
              config: params => ({
                type: 'el-input',
                rules: [
                  {
                    required: true,
                    message: '不能为空',
                    trigger: 'blur'
                  }
                ]
              })
            },
            {
              prop: 'commodity_code',
              label: '商品代码'
            },
            {
              prop: 'commodity_name',
              label: '商品名称'
            },
            {
              prop: 'commodity_weight',
              label: '商品克重'
            },
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
          ]
        }
      ]
    }
  },
  mounted() {
    this.getSaleStock()

    this.$axios
      .$get(stockList, {
        params: {
          collection: COLLECTION.warehourse,
          type: STOCK_TYPE.center
        }
      })
      .then(res => {
        if (res.success) {
          if (res.payload.data.length > 0) {
            res.payload.data[0] &&
              res.payload.data[0].sales_limit_strategy.list.forEach(i => {
                i.rate *= 100
              })

            let goodsList = []

            this.cardList[0].stockCheck =
              res.payload.data[0].goods_limit_strategy &&
              res.payload.data[0].goods_limit_strategy.length > 0

            res.payload.data[0] &&
              res.payload.data[0].goods_limit_strategy.forEach(g => {
                let item = {
                  commodity_id: g.commodity_id,
                  commodity_name: g.commodity_name,
                  commodity_code: g.commodity_code,
                  commodity_weight: g.commodity_weight
                }

                let list = g.list.map(i => {
                  return {
                    ...item,
                    ...i
                  }
                })

                Array.prototype.push.apply(goodsList, list)
              })

            this.goodsList = goodsList

            this.centerStore = res.payload.data

            this.cardList[0].options[0].defaultValue = res.payload.data[0]._id

            this.cardList[0].options[0].options = res.payload.data.map(i => ({
              label: i.name,
              value: i._id
            }))

            this.getTotalStock([res.payload.data[0]._id])
          } else {
            this.$message.error('请先创建中央仓库')
            this.$router.back()
          }
        }
      })
  },
  methods: {
    getSaleStock() {
      this.saleStock = [
        {
          _id: '5d56a23d97c32c01387cf14a',
          code: 'ZY001',
          name: '中央仓库A',
          type: '中央仓库',
          user: 'kun',
          phone: 15521250922,
          area: null,
          address: null,
          enable: true,
          province_ids: [],
          source_strategy: {
            title: 'demo演示',
            description: 'demo演示',
            centerSelect: '5d56a23d97c32c01387cf14a',
            list: [
              {
                _id: '5d57d43c97c32c71ba6dd5d3',
                code: 'SW001',
                name: '武汉仓',
                type: '实物仓库',
                user: 'kun',
                phone: 15521250922,
                area: null,
                address: null,
                province_ids: [],
                status: true,
                updateTime: 1566024649900,
                updatedAt: 1566024650018,
                _show: true,
                priority: 1,
                id: '5d57d43c97c32c71ba6dd5d3'
              },
              {
                _id: '5d57d3d897c32c71ba6dd5d2',
                code: 'SW002',
                name: '深圳仓',
                type: '实物仓库',
                user: 'kun',
                phone: 15521250922,
                area: null,
                address: null,
                province_ids: [],
                status: true,
                updateTime: 1566024649900,
                updatedAt: 1566024650018,
                _show: true,
                priority: 2,
                id: '5d57d3d897c32c71ba6dd5d2'
              }
            ]
          },
          sales_limit_strategy: {
            list: [
              {
                _id: '5d5424fe97c32c01387cf140',
                code: 'XS001',
                name: '天猫仓',
                type: '销售仓库',
                user: 'kun',
                phone: 15521250922,
                area: null,
                address: null,
                _show: true,
                rate: 0.5
              }
            ]
          },
          goods_limit_strategy: [],
          createdAt: 1565859830171,
          updatedAt: 1566286223186
        }
      ]

      // this.$axios
      //   .$get(stockList, {
      //     params: {
      //       collection: COLLECTION.warehourse,
      //       type: STOCK_TYPE.sale
      //     }
      //   })
      //   .then(res => {
      //     this.saleStock = res.payload.data
      //   })
    },
    getTotalStock(ids) {
      this.$axios
        .$post(totalStock, {
          wh_ids: ids || []
        })
        .then(res => {
          let storeLimit = {}

          res.payload.forEach(g => {
            storeLimit[g.goods._id] = {
              name: g.goods.name,
              stock: g.stock
            }
          })

          this.storeLimit = storeLimit
        })
    },
    materialWarehouseHandle() {
      this.materialWarehouseVisible = true
    },
    handleAdd() {
      this.cardList.push(BASIC_OPTIONS)
    },
    handleCancel() {
      this.$router.go(-1)
    },
    hanldeSave() {
      // const form = this.formateForm(this.cardList)
      let data = this.$refs.formMaker[0].getValue()
      let sales_limit_strategy = this.centerStore[0].sales_limit_strategy.list

      let rateTotal = sales_limit_strategy.reduce((total, item) => {
        return (total += parseInt(item.rate) || 0)
      }, 0)

      if (rateTotal > 100) {
        this.$message.error('分配比例总和不能超过100%')
        return
      }

      let stockSum = this.goodsList.reduce((total, item) => {
        if (total[item.commodity_id]) {
          total[item.commodity_id] += parseInt(item.count || 0)
        } else {
          total[item.commodity_id] = parseInt(item.count || 0)
        }
        return total
      }, {})

      let next = true
      let stockCheck = this.cardList[0].stockCheck
      if (stockCheck) {
        Object.keys(stockSum).forEach(i => {
          let item = this.storeLimit[i]
          if (stockSum[i] == 0) {
            next = false
            this.$message.error(`请设置${item.name}的库存`)
            return
          }

          if (item.stock < stockSum[i]) {
            next = false
            this.$message.error(`${item.name} 设置库存不能超过 ${item.stock}`)
            return
          }
        })
      }

      if (!next) return

      let goodsParam = {}

      if (stockCheck) {
        goodsParam = this.goodsList.reduce((res, item) => {
          let goods = res[item.commodity_id]
          let storeItem = {
            name: item.name,
            code: item.code,
            type: item.type,
            count: item.count,
            id: item.id
          }

          if (goods) {
            goods.list.push(storeItem)
          } else {
            res[item.commodity_id] = {
              commodity_id: item.commodity_id,
              commodity_name: item.commodity_name,
              commodity_code: item.commodity_code,
              commodity_weight: item.commodity_weight,
              list: [storeItem]
            }
          }

          return res
        }, {})
      }

      let params = {
        filter: {
          _id: data._id
        },
        body: {
          sales_limit_strategy: {
            list: sales_limit_strategy.map(i => {
              return {
                ...i,
                rate: i.rate ? i.rate / 100 : 0
              }
            })
          },
          goods_limit_strategy: stockCheck
            ? Object.keys(goodsParam).map(i => {
                return goodsParam[i]
              })
            : []
        }
      }

      this.saveLoading = true
      this.$axios
        .$put(`${commonUpdate}?collection=${COLLECTION.warehourse}`, params)
        .then(res => {
          this.saveLoading = false
          if (res.success) {
            this.$message.success('操作成功')
          } else {
            this.$message.error('操作失败')
          }
        })
        .catch(e => {
          this.$message.error('操作失败')
          this.saveLoading = false
        })
      // 有待递归实现多个表达域校验触发
    },
    formateForm(data) {
      return []
    },
    async sendReuqest(form) {
      try {
        this.saveLoading = true
        await this.$axios.$post('/add', form)
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
.separate-warehouse {
  .add-padding {
    display: block;
    padding: 10px 20px;
  }
  .add-margin {
    margin-top: 10px;
  }

  .card-form {
    .card-head {
      padding: 0 10px;
      height: 42px;
      line-height: 42px;
      border-bottom: 1px solid #ccc;
    }

    .form-box {
      padding: 20px 10px;

      .validate-table {
        width: 60%;
        padding-left: 20px;
      }
    }
  }
}
</style>
