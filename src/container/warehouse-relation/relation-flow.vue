<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 22:19:37
 * @LastEditTime: 2019-08-17 18:49:15
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="relation-flow">
    <div class="header">
      <span>中央仓库A与实物仓寻源关系</span>
      <span>{{flowInfo.time}}</span>
    </div>
    <div class="container-flow">
      <div class="container-flow-left">
        <span id="main-left">{{flowInfo.mainName}}</span>
      </div>
      <div class="container-flow-right">
        <span
          v-for="(sub,index) in flowInfo.subList"
          :key="sub.sort"
          :id="`sub-right${index+1}`"
        >{{sub.name}}</span>
      </div>
    </div>
    <!-- <div class="footer">
      <span class="first">详情</span>
      <span>设置</span>
    </div>-->
  </div>
</template>
<script>
import {jsPlumb} from 'jsplumb'
// console.log(jsPlumb, 'jsPlumb')
// 全局实例

export default {
  name: 'relation-flow',
  props: {
    flowInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      instance: jsPlumb.getInstance({
        PaintStyle: {
          strokeWidth: 2,
          stroke: '#666'
          // outlineStroke: '#666',
          // outlineWidth: 1
        },
        Connector: ['Flowchart', {curviness: 50}],
        Endpoint: ['Dot', {radius: 5, cssClass: 'displaynone'}] /// 通过样式来隐藏锚点
      })
    }
  },
  watch: {},
  created() {},
  async mounted() {
    await this.$nextTick()
    const flows = this.flowInfo
    const that = this
    jsPlumb.ready(function() {
      flows.subList.forEach((element, index) => {
        that.instance.connect({
          target: 'main-left',
          source: `sub-right${index + 1}`,
          overlays: [['Arrow', {width: 12, length: 12, location: 1}]],
          anchor: ['Right', 'Left']
        })
      })
    })
  },
  destroyed() {
    // 在组件销毁后移除流程图svg
    this.instance.clear()
  }
}
</script>
<style lang="less">
.relation-flow {
  .header {
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    justify-items: center;
  }

  .footer {
    display: flex;

    > span {
      display: block;
      width: 50%;
      text-align: center;
      cursor: pointer;
      padding-top: 10px;
    }

    .first {
      border-right: 1px solid #ccc;
    }
  }

  .container-flow {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    height: 180px;
    padding-right: 50px;
    .displaynone {
      display: none;
    }
    &-left {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      > span {
        padding: 5px;
        background-color: rgba(242, 242, 242, 1);
        border-radius: 5px;
      }
    }

    &-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      > span {
        padding: 5px;
        background-color: rgba(242, 242, 242, 1);
        border-radius: 5px;
      }
    }
  }
}
</style>
