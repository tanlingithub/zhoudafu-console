<template>
  <div class="goods-detail-container">
    <el-form :inline="true" :model="searchForm" class="search-form-inline">
      <el-form-item label="商品名称">
        <el-input v-model="searchForm.user" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="展示类目">
        <el-input v-model="searchForm.type" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="searchForm.crateTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="reSetForm">重置</el-button>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-row class="next-step">
      <span class="next-button" @click="gotoNextStep">发布上架</span>
    </el-row> -->
    <el-data-table v-bind="skuData" :url="selectUrl"></el-data-table>
  </div>
</template>

<script>
import axios from '@/http'
import dayjs from 'dayjs'
import { putZoudafuGoodShelves } from '@/service/poc-api.js'
export default {
  name:'compose-shelves',
  components: {},
  data() {
    return {
       searchForm: {
        user: '',
        type: '',
        crateTime: ''
      },
      submitLoading:false,
      requestBody:{
          goodsData:[],
          channelIds:[]
        },
      skuData: {
        dataPath: 'payload.data',
        hasDialog: false,
        hasNew: false,
        hasEdit: false,
        hasDelete: false,
         headerButtons: [
          {
            type: 'primary',
            text: '发布上架',
            disabled: selected => {
              return selected.length < 1
            },
            atClick: row => {
               row.forEach(ele=>{
                  this.requestBody.goodsData.push({
                    goodsId:ele._id,
                    isCompose:ele.type == "compose"
                  })
                })
              this.requestBody.channelIds = this.categoryId.channelIds
              this. submitLoading = true
              let type = 'up'
              if (this.categoryId.saleStatus == '5') {
                type = 'down'
              }
              putZoudafuGoodShelves(type,this.requestBody).then(res=>{
                this. submitLoading = false
                this.gotoNextStep()
              })
              return Promise.resolve(false)
            }
          }
        ],
        extraButtons: [
          {
            type: 'primary',
            text: '查看',
            atClick: row => {
              this.selectData.tableData.push({
                ...row,
                number:1,
                updateAt:dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss')
                })
            }
          }
        ],
        columns: [
          {
            type: 'selection'
          },
          {
            prop: 'name',
            label: '商品',
          },
          {
            prop: 'subName',
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
        ]
      }
    }
  },
  props: {
    categoryId: {
      required: true
    }
  },
 computed:{
    selectUrl(){
      return `/poc/api/v1/zhoudafu/goods/list?type=compose`
      // return `/poc/api/v1/zhoudafu/goods/list?status=${this.categoryId.saleStatus}&type=compose`
    }
  },
  mounted(){
    this.skuData.headerButtons[0].text =this.categoryId.saleStatus === '5' ? '发布下架' : '发布上架'
  },
  methods: {
    reSetForm() {},
    onSubmit() {},
    gotoNextStep() {
      this.$emit('handle-next', 1)
    }
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
