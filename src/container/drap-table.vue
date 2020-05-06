<template>
  <div style="width:800px;">
    <el-table :data="showTableData" border row-key="id" align="left">
      <el-table-column
        v-for="(item, index) in showColumns"
        :key="index"
        v-bind='item'
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Sortable from 'sortablejs'
export default {
  props: {
    data: {
      type: Array,
      default: _ => []
    },
    columns: {
      type: Array,
      default: _ => []
    },
    sortKey: {
      type: String,
      default: 'sort'
    }
  },
  watch: {
    columns: {
      handler(val) {
        this.showColumns = val.concat([{
          label: '优先级',
          type: 'index',
          width: '100px'
        }])
      },
      immediate: true
    },
    data: {
      handler(val) {
        this.showTableData = JSON.parse(JSON.stringify(val))
      },
      immediate: true
    }
  },
  data() {
    return {
      showTableData: [],
      showColumns: []
    }
  },
  mounted() {
    this.rowDrop()
  },
  methods: {
    formatData() {
      return this.showTableData.map((i, index) => ({
        ...i,
        [this.sortKey]: index + 1
      }))
    },
    //行拖拽
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        animation: 180,
        delay: 0,
        onEnd: (async({newIndex, oldIndex})=>{
          let data = [].concat(this.showTableData)
          const currRow = data.splice(oldIndex, 1)[0]

          this.showTableData = []

          await this.$nextTick(function() {
            data.splice(newIndex, 0, currRow)

            this.showTableData = data
          })
        })
      })
    },
    getValue() {
      return this.formatData()
    }
  }
}
</script>
<style scoped></style>
