<!--
 * @Description: In User Settings Edit
 * @Author: nemo
 * @Date: 2019-08-15 11:30:19
 * @LastEditTime: 2019-08-16 16:58:48
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="sub-container" v-bind="$attrs">
    <div class="sub-container-head" v-if="title">
      <h3>
        {{ title }}
        <span>
          <slot name="ps-info"></slot>
        </span>
      </h3>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'sub-container',
  props: {
    title: String
  }
}
</script>
<style lang="less">
.sub-container {
  background: #fff;
  padding: 12px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 6px;

  .sub-container-head {
    position: relative;
    padding: 10px 20px 10px 20px;

    &::before {
      content: '';
      position: absolute;
      width: 4px;
      height: 60%;
      left: 8px;
      background: #5d81f9;
      transform: translateY(-50%);
      top: 50%;
    }
  }
}
</style>
