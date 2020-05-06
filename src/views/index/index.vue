<template>
  <div class="index">
    <img class="home-img" :src="$store.state.meta.homePageImg" alt="homeImg" />

    <!-- <drap-table v-model='tableData' :columns='columns'></drap-table>

    <pre style="text-align: left;">
      {{ tableData }}
    </pre> -->
  </div>
</template>
<script>
  import DrapTable from '@/container/drap-table.vue'

  export default {
    components: {DrapTable},
    data() {
      return {
        tableData: [
          {
            id: '1',
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 100 弄'
          },
          {
            id: '2',
            date: '2016-05-04',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 200 弄'
          },
          {
            id: '3',
            date: '2016-05-01',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 300 弄'
          },
          {
            id: '4',
            date: '2016-05-03',
            name: '王小虎4',
            address: '上海市普陀区金沙江路 400 弄'
          }
        ],
        columns: [{
          label: '日期',
          prop: 'date'
        },
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '地址',
          prop: 'address'
        }]
      }
    }
  }
</script>
<style lang="less" scoped>
.index {
  .home-img {
    width: 100%;
  }
}
</style>
