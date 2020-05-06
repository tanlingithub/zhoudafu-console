<template>
  <div class="select-goods-container">
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
      <span class="select-text">已选商品</span>
      <span class="next-button"
        @click="gotoNextStep">下一步</span>
    </el-row>
    <el-table ref="multipleTable"
      :data="selectData.tableData"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick">
      <el-table-column v-for="column in selectData.tableColumn"
        :key="column.prop"
        :label="column.label"
        :fixed="false"
        min-width="150px"
        :width="column.width">
        <template slot-scope="scope">
          <!-- 选择器 -->
          <el-select v-if="column.type == 'select'"
            v-model.trim="scope.row[column.prop]">
            <el-option v-for="option in 9"
              :key="option"
              :label="option"
              :value="option"></el-option>
          </el-select>
          <!-- 文本 -->
          <span class="el-input__text"
            v-else>{{
            scope.row[column.prop]
          }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index)"
            type="text"
            size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="can-select">
      <span>可选商品</span>
    </el-row>
    <el-table :data="list">
      <el-table-column v-for="(item, index) in columns"
        :prop="item.prop"
        :label="item.label"
        :formatter="item.formatter"
        :key="index">

      </el-table-column>
      <el-table-column>
        <template slot-scope="{row}">
          <el-button @click="addGoodsSku(row)"
            type="text">添加</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-data-table v-bind="skuData"></el-data-table> -->
  </div>
</template>

<script>
import {Form, FormItem} from 'element-ui'
import axios from '@/http'
import dayjs from 'dayjs'
export default {
  components: {
    ElForm: Form,
    ElFormItem: FormItem
  },
  data() {
    return {
      searchForm: {
        user: '',
        type: '',
        crateTime: ''
      },
      goodsSkuList: [],
      columns: [
        {
          prop: 'goodsName',
          label: '商品'
        },
        {
          prop: 'name',
          label: '展示类目'
        },
        {
          prop: 'saleStatus',
          label: '状态',
          formatter: row => {
            let saleStatus = row.saleStatus ? '上架中' : '已下架'
            return <span>{saleStatus}</span>
          }
        },
        {
          prop: 'updateAt',
          label: '更新时间',
          formatter: (v, k, val) => dayjs(val).format('YYYY-MM-DD HH:mm:ss')
        }
      ],
      selectData: {
        tableData: [],
        tableColumn: [
          {
            prop: 'goodsName',
            label: '商品',
            type: 'text'
          },
          {
            prop: 'name',
            label: '展示类目',
            type: 'text'
          },
          {
            prop: 'quantity',
            label: '数量',
            type: 'select',
            width: '80px'
          },
          {
            prop: 'updateAt',
            label: '更新时间'
          }
        ]
      }
    }
  },
  computed: {
    list() {
      return this.goodsSkuList.filter(item => {
        return !this.selectData.tableData.some(i => {
          return i._id === item._id
        })
      })
    }
  },
  mounted() {
    this.getGoodsSkuList()
  },
  methods: {
    getGoodsSkuList() {
      axios.get('/poc/api/v1/zhoudafu/goods/sku/list').then(res => {
        res = res.data
        if (res.success) {
          this.goodsSkuList = res.payload.data
        }
      })
    },
    addGoodsSku(row) {
      this.selectData.tableData.push(row)
    },
    reSetForm() {},
    onSubmit() {},
    handleSelectionChange() {},
    handleRowClick() {},
    deleteRow(index) {
      this.selectData.tableData.splice(index, 1)
    },
    gotoNextStep() {
      this.$emit('handle-next', this.selectData.tableData)
    }
  }
}
</script>

<style lang="less">
.select-goods-container {
  .el-form {
    margin: 3px;
    padding: 14px;
    border-top: 1px solid rgb(228, 231, 237);
    border-bottom: 1px solid rgb(228, 231, 237);
  }

  .next-step {
    margin: 16px;

    .next-button {
      display: inline-block;
      width: 96px;
      height: 27px;
      line-height: 27px;
      background: rgb(93, 129, 249);
      color: #f5f7fa;
      border-radius: 5px;
      text-align: center;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .can-select {
    border-bottom: 1px solid rgb(228, 231, 237);
    padding: 18px;
  }

  .select-text {
    margin-right: 50px;
  }
}
</style>
