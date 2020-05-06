<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 17:52:42
 * @LastEditTime: 2019-08-19 11:20:16
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="new-container">
    <el-steps :active="activeIndex"
      finish-status="success"
      simple>
      <el-step class="step-item"
        v-for="(item, index) in steps"
        :title="item.title"
        :key="index"
        @click.native="jumpTargetStep(item)"></el-step>
    </el-steps>
    <select-goods ref="selectType"
      v-show="activeIndex == 0"
      @handle-next="handleSelectType" />
    <commodity-detail v-if="activeIndex == 1"
      :skuDataList="skuDataList"
      @handle-before="handleBackType"
      @handle-next="changeCurrentActiveIndex(3)" />
    <add-commodity-success v-else-if="activeIndex == 3"
      @handle-continue="handleContinueAdd" />
  </div>
</template>

<script>
import {Steps, Step} from 'element-ui'
import SelectGoods from './components/select-goods.vue'
import CommodityDetail from './components/commodity-detail'
import AddCommoditySuccess from './components/add-commodity-success'

export default {
  head:{title:'组合商品发布'},
  components: {
    ElSteps: Steps,
    ElStep: Step,
    SelectGoods,
    CommodityDetail,
    AddCommoditySuccess
  },
  data() {
    const {activeIndex, categoryId} = this.redirectActiveIndex()
    return {
      steps: [
        {
          id: 0,
          title: '选择商品'
        },
        {
          id: 1,
          title: '填写组合商品信息'
        },
        {
          id: 2,
          title: '提交发布'
        }
      ],

      skuDataList: [],
      activeIndex,
      categoryId // 选中的状态值
    }
  },
  methods: {
    // 更改当前的选中状态
    changeCurrentActiveIndex(index, params) {
      this.activeIndex = index
      if (index === 1) {
        this.skuDataList = params
      }
      this.$router.push({
        query: {
          ...this.$route.query,
          activeIndex: index,
          ...params
        }
      })
    },
    // 点击选择商品所属类目，改变当前的选中状态
    handleSelectType(skuDataList) {
      // this.categoryId = categoryId
      this.changeCurrentActiveIndex(1, skuDataList)
    },
    // 商品详情中点击跳转到上一步
    handleBackType() {
      this.changeCurrentActiveIndex(0)
    },
    // 点击继续添加商品
    handleContinueAdd() {
      // 重新请求类目数据
      this.$refs.selectType.getCategoryList()
      this.categoryId = ''
      this.changeCurrentActiveIndex(0)
    },
    redirectActiveIndex() {
      const {activeIndex, categoryId} = this.$route.query
      let targetIndex = 0
      if (activeIndex === '1' && categoryId !== undefined) {
        targetIndex = 1
      } else {
        targetIndex = ['0', '3'].some(info => info === activeIndex)
          ? Number(activeIndex)
          : 0
      }
      return {
        activeIndex: targetIndex,
        categoryId: categoryId || ''
      }
    },
    // 跳到指定步骤
    jumpTargetStep(item) {
      const {id} = item
      if (id === 0 && this.activeIndex === 1) {
        this.handleBackType()
      }
    }
  }
}
</script>

<style lang="less">
.new-container {
  .step-item {
    cursor: pointer;
  }
}
</style>
