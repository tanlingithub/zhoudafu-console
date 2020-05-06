<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 11:03:19
 * @LastEditTime: 2019-08-19 11:24:58
 * @LastEditors: Please set LastEditors
 -->
<!-- 编辑属性 -->
<template>
  <div>
    <add-property v-if="id" :propertyId="id" />
  </div>
</template>
<script>
import AddProperty from '@/views/add-edit-property/index.vue'
export default {
  head:{title:'属性管理-编辑'},
  components: {
    AddProperty
  },
  data() {
    return {
      id: ''
    }
  },
  created() {
    const {id} = this.$route.query || {}
    this.id = id
  }
}
</script>
