<template>
  <div class="select-chanel-container">
    <el-row :gutter="30"
      type="flex"
      justify="center"
      v-loading="channelLoading">
      <el-col :span="7">
        <div class="title-info">
          <span>请选择渠道</span>
        </div>
        <el-checkbox-group v-model="channelIds"
          @change="handleCheckedChange">
          <div v-for="item in channelList"
            :key="item._id"
            class="chanel-items">
            <el-checkbox :label="item">{{item.name}}</el-checkbox>
          </div>
        </el-checkbox-group>
      </el-col>
      <el-col :span="7">
        <div class="title-info">
          <span>请选择操作模式</span>
        </div>
        <div class="chanel-items">
          <el-radio v-model="saleStatus"
            label="4">上架</el-radio>
        </div>
        <div class="chanel-items">
          <el-radio v-model="saleStatus"
            label="5">下架</el-radio>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="title-info">
          <span>请选择操作模式</span>
        </div>
        <div class="chanel-items">
          <el-radio v-model="goodsMode"
            label=1>单品{{ operaMode }}</el-radio>
        </div>
        <div class="chanel-items">
          <el-radio v-model="goodsMode"
            label=2>SPU级{{ operaMode }}</el-radio>
        </div>
        <div class="chanel-items">
          <el-radio v-model="goodsMode"
            label=3>SKU级{{ operaMode }}</el-radio>
        </div>
        <div class="chanel-items">
          <el-radio v-model="goodsMode"
            label=4>组合商品{{ operaMode }}</el-radio>
        </div>
      </el-col>
    </el-row>
    <!--  :disabled="targetValue === null" -->
    <div class="bottom-button">
      <el-button type="primary"
        @click="nextStep"
        class="next-button"
        :disabled="targetValue">下一步</el-button>
    </div>
  </div>
</template>

<script>
import axios from '@/http'

export default {
  data() {
    return {
      saleStatus: '4',
      // {
      //   up:"1",
      //   down:0,
      // },
      channelIds: [],
      channelList: '',
      goodsMode: '1',
      // {
      //   single:"1",
      //   spu:2,
      //   sku:3,
      //   compose:4
      // },
      channelLoading: true
    }
  },
  mounted() {
    axios.get('/poc/api/v1/zhoudafu/goods/channels/list').then(res => {
      this.channelLoading = false
      res = res.data
      if (res.success) {
        this.channelList = res.payload.content
      } else {
        this.$message.success('获取渠道失败')
      }
    })
  },
  computed: {
    targetValue() {
      if (this.channelIds.length) {
        return false
      } else {
        return true
      }
    },
    operaMode() {
      return this.saleStatus == '4' ? '上架' : '下架'
    }
  },
  components: {
    // ListSelect
  },
  created() {},
  methods: {
    handleCheckedChange() {},
    selectThirdItem(item) {},
    // 点击下一步
    nextStep() {
      this.$emit('handle-next', {
        channelIds: this.channelIds,
        saleStatus: this.saleStatus,
        goodsMode: this.goodsMode
      })
    }
  }
}
</script>

<style lang="less" scoped>
.select-chanel-container {
  padding: 30px 0;

  .bottom-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px 0;
  }

  .next-button {
    width: 150px;
    height: 40px;
  }

  .title-info {
    // color: #f5a623;
    padding: 0 10px;
    height: 30px;
    margin-top: 12px;
  }
  .chanel-items {
    margin: 20px;
  }
  .el-col {
    width: 308px;
    height: 250px;
    background: rgb(242, 242, 242);
    margin: 10px;
  }
}
</style>
