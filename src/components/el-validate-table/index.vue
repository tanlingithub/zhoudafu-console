<script>
import Form from 'element-ui/lib/form'
import Table from 'element-ui/lib/table'
export default {
  name: 'el-validate-table',
  components: {
    'validate-column': () => import('./validate-column')
  },
  props: {
    data: Array,
    columns: Array,
    isDrag: Boolean
  },
  data() {
    return {
      spanObject: {},
      customSpanMethod: () => {}
    }
  },
  watch: {
    data: {
      handler: 'rowspan',
      immediate: true
    },
    columns: {
      handler: 'rowspan',
      immediate: true
    }
  },
  render(h) {
    const slots = Object.keys(this.$slots)
      .reduce((arr, key) => {
        arr = arr.concat(this.$slots[key])
        return arr
      }, [])
      .map(vnode => {
        vnode.context = this._self
        return vnode
      })

    return h(
      'el-form',
      {
        props: {
          model: {
            data: this.data
          }
        },
        on: {
          validate: (prop, isValid, msg) => {
            if (!isValid) {
              this.$message.warning(msg)
            }
          }
        },
        ref: 'elForm'
      },
      [
        h(
          'el-table',
          {
            props: Object.assign({}, this.$attrs, {
              data: this.data,
              'span-method': this.customSpanMethod
            }),
            ref: 'elTable'
          },
          [
            h('validate-column', {
              props: Object.assign({}, this.$attrs, {
                columns: this.columns,
                data: this.data
              })
            })
          ].concat(slots)
        )
      ]
    )
  },
  async mounted() {
    this.customSpanMethod =
      this.$attrs['span-method'] ||
      this.$attrs.spanMethod ||
      this.arraySpanMethod

    await this.$nextTick(() => {})

    // 同步form,table中的mehods
    const methods = Object.assign({}, Form.methods, Table.methods)
    Object.keys(methods).forEach(key => {
      if (this.$refs.elForm.hasOwnProperty(key)) {
        this[key] = this.$refs.elForm[key]
      } else {
        this[key] = this.$refs.elTable[key]
      }
    })
  },
  methods: {
    rowspan() {
      const data = this.data

      const getSpanObject = (arr, con = {}) => {
        return arr.reduce((sum, col) => {
          if (col.children && col.children.length) {
            getSpanObject(col.children, sum)
            return sum
          }

          if (!col.isMerge) {
            return sum
          }

          sum[col.prop] = []

          let position
          let spanArr = sum[col.prop]

          Array.isArray(data) &&
            data.forEach((item, index) => {
              if (index === 0) {
                spanArr.push(1)
                position = 0
              } else {
                if (data[index][col.prop] === data[index - 1][col.prop]) {
                  spanArr[position] += 1
                  spanArr.push(0)
                } else {
                  spanArr.push(1)
                  position = index
                }
              }
            })
          return sum
        }, con)
      }

      this.spanObject = getSpanObject(this.columns)
    },
    arraySpanMethod({row, column, rowIndex, columnIndex}) {
      const spanArr = this.spanObject[column.property]
      if (spanArr) {
        const _row = spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    }
  }
}
</script>
