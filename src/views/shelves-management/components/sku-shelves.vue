<template>
  <div class="goods-detail-container">
    <el-form :inline="true"
      :model="searchForm"
      class="search-form-inline">
      <el-form-item label="商品名称">
        <el-input v-model="searchForm.user"
          placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="展示类目">
        <el-input v-model="searchForm.type"
          placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker v-model="searchForm.crateTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="reSetForm">重置</el-button>
        <el-button type="primary"
          @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-row class="next-step">
      <span class="next-button"
        @click="gotoNextStep">发布上架</span>
    </el-row>
    <!-- <el-data-table v-bind="skuData" :url="selectUrl"></el-data-table> -->
    <el-table ref="multipleTable"
      :data="skuData.tableData">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table ref="multiplechildrenTable"
            :data="props.row.children"
            @selection-change="handleSelectionChange"
            @row-click="handleRowClick">
            <el-table-column type="selection"
              width="55">
            </el-table-column>
            <el-table-column v-for="child in skuData.children"
              :key="child.prop"
              :label="child.label"
              :fixed="false"
              min-width="150px"
              :width="child.width">
              <template slot-scope="scope">
                <!-- 选择器 -->
                <el-select v-if="child.type == 'select'"
                  v-model.trim="scope.row[child.prop]">
                  <el-option v-for="option in 9"
                    :key="option"
                    :label="option"
                    :value="option"></el-option>
                </el-select>
                <!-- 文本 -->
                <span class="el-input__text"
                  v-if="child.type == 'status'">{{
                  scope.row[child.prop] | handleStatus
                }}</span>
                <span class="el-input__text"
                  v-else-if="child.type == 'time'">{{
                  scope.row[child.prop] | handleTime
                }}</span>
                <span class="el-input__text"
                  v-else>{{
                  scope.row[child.prop]
                }}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column v-for="column in skuData.tableColumn"
        :key="column.prop"
        :label="column.label"
        :fixed="false"
        min-width="150px"
        :width="column.width"
        :prop="column.prop">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from '@/http'
import dayjs from 'dayjs'

import {putZoudafuGoodShelves, putZoudafuSkuP} from '@/service/poc-api.js'
export default {
  name: 'sku-shelves',
  components: {},
  data() {
    return {
      searchForm: {
        user: '',
        type: '',
        crateTime: ''
      },
      selectSkuIds: [],
      submitLoading: false,
      requestBody: {
        goodsIds: [],
        skuIds: []
      },
      skuData: {
        tableData: [],
        tableColumn: [
          {
            prop: 'name',
            label: '商品',
            type: 'text'
          },
          {
            prop: 'subName',
            label: '展示类目',
            type: 'text'
          },
          {
            prop: 'updatedAt',
            label: '更新时间'
          }
        ],
        children: [
          {
            prop: 'name',
            label: '规格',
            type: 'text'
          },
          {
            prop: 'saleStatus',
            label: '销售状态',
            type: 'status'
          },
          {
            prop: 'updatedAt',
            label: '更新时间',
            type: 'time'
          }
        ]
      }
    }
  },
  filters: {
    handleStatus(val) {
      return val ? '上架中' : '已下架'
    },
    handleTime(val) {
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  props: {
    categoryId: {
      required: true
    }
  },
  computed: {
    selectUrl() {
      return `/poc/api/v1/zhoudafu/goods/list?type=general&tree=true`
      // return `/poc/api/v1/zhoudafu/goods/list?status=${this.categoryId.saleStatus}`
    }
  },
  mounted() {
    // this.skuData.headerButtons[0].text =this.categoryId.saleStatus === '5' ? '发布下架' : '发布上架'
    axios
      .get('/poc/api/v1/zhoudafu/goods/list?type=general&tree=1')
      .then(res => {
        console.log(res)
        this.skuData.tableData = res.data.payload.data
      })
  },
  methods: {
    reSetForm() {},
    onSubmit() {},
    gotoNextStep() {
      // this.$emit('handle-next', 1)
      this.requestBody.goodsIds = [
        ...new Set(
          this.selectSkuIds.map(item => {
            return item.goodsId
          })
        )
      ]
      this.requestBody.skuIds = this.selectSkuIds.map(item => {
        return item._id
      })
      this.requestBody.channelIds = this.categoryId.channelIds.map(
        item => item._id
      )
      // this.selectSkuIds.forEach(ele=>{
      //   goodsIds
      // })
      let type = 'up'
      if (this.saleStatus == '1') {
        type = 'down'
      }
      this.submitLoading = true
      putZoudafuSkuP(type, this.requestBody).then(res => {
        this.$emit('handle-next', 1)
        this.$emit('success', res.payload)
        this.submitLoading = false
      })
    },
    handleSelectionChange(items) {
      this.selectSkuIds = items
    },
    handleRowClick() {},
    load(tree, treeNode, resolve) {}
  }
}
</script>

<style lang="less">
.goods-detail-container {
  padding: 20px;

  .el-textarea {
    width: 35%;
  }

  .foot-container {
    padding: 20px 0;
    display: flex;
    justify-content: center;

    .save-btn {
      width: 200px;
    }
  }

  .next-step {
    margin: 16px;

    .next-button {
      display: inline-block;
      width: 131px;
      height: 38px;
      line-height: 38px;
      background: rgb(93, 129, 249);
      color: #f5f7fa;
      border-radius: 5px;
      text-align: center;
      font-size: 14px;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
