<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 17:52:42
 * @LastEditTime: 2019-08-19 11:38:45
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
    <select-type ref="selectType"
      v-show="activeIndex == 0"
      @handle-next="handleSelectType" />
    <single-shelves v-if="operaMode == 1"
      :categoryId="selectData"
      @success="successHandler"
      @handle-before="handleBackType"
      @handle-next="changeCurrentActiveIndex(3)" />
    <spu-shelves v-if="operaMode == 2"
      :categoryId="selectData"
      @success="successHandler"
      @handle-before="handleBackType"
      @handle-next="changeCurrentActiveIndex(3)" />
    <sku-shelves v-if="operaMode == 3"
      :categoryId="selectData"
      @success="successHandler"
      @handle-before="handleBackType"
      @handle-next="changeCurrentActiveIndex(3)" />
    <compose-shelves v-if="operaMode == 4"
      :categoryId="selectData"
      @success="successHandler"
      @handle-before="handleBackType"
      @handle-next="changeCurrentActiveIndex(3)" />
    <add-commodity-success v-else-if="activeIndex == 3"
      :selectData="selectData"
      :data="result"
      @handle-continue="handleContinueAdd" />
    <!-- <log-viewer :log="log"></log-viewer> -->
  </div>
</template>

<script>
import {Steps, Step} from 'element-ui'
import SelectType from './components/select-type.vue'
import SingleShelves from './components/single-shelves'
import SkuShelves from './components/sku-shelves'
import SpuShelves from './components/spu-shelves'
import ComposeShelves from './components/compose-shelves'
import AddCommoditySuccess from './components/add-commodity-success'

export default {
  head: {title: '上下架管理'},
  components: {
    ElSteps: Steps,
    ElStep: Step,
    SelectType,
    SingleShelves,
    SkuShelves,
    SpuShelves,
    ComposeShelves,
    AddCommoditySuccess
    // LogViewer
  },
  data() {
    const {activeIndex, categoryId} = this.redirectActiveIndex()
    return {
      result: [],
      steps: [
        {
          id: 0,
          title: '选择渠道'
        },
        {
          id: 1,
          title: '选择商品'
        },
        {
          id: 2,
          title: '提交上下架'
        }
      ],
      activeIndex,
      categoryId, // 选中的状态值,
      selectData: '',
      operaMode: '0'
    }
  },
  methods: {
    // 更改当前的选中状态
    changeCurrentActiveIndex(index, params) {
      this.activeIndex = index
      if (index == 3) {
        this.operaMode = 0
      }
      // this.$router.push({
      //   query: {
      //     ...this.$route.query,
      //     activeIndex: index,
      //     ...params
      //   }
      // })
    },

    handleSelectType(typeObj) {
      this.operaMode = typeObj.goodsMode
      this.selectData = {...typeObj}
      // console.log( this.categoryId);
      this.changeCurrentActiveIndex(1, {})
    },
    // 商品详情中点击跳转到上一步
    handleBackType() {
      this.changeCurrentActiveIndex(0)
    },
    // 点击继续添加商品
    handleContinueAdd() {
      // // 重新请求类目数据
      // this.$refs.selectType.getCategoryList()
      // this.categoryId = ''
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
    successHandler(data) {
      console.log('成功咯', data)
      this.result = data
    },
    // 跳到指定步骤
    jumpTargetStep(item) {
      const {id} = item
      if (id === 0 && this.activeIndex === 1) {
        this.operaMode = '0'
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
