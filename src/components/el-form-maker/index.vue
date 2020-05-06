<!--
 * @Description: In User Settings Edit
 * @Author: nemo
 * @Date: 2019-08-09 10:54:19
 * @LastEditTime: 2019-08-16 19:31:01
 * @LastEditors: Please set LastEditors
 -->

<script>
import {groupBy, cloneDeep} from 'loadsh'
import Form from 'element-ui/lib/form'
export default {
  name: 'el-form-maker',
  components: {
    'form-item-maker': () => import('./form-item-maker')
  },
  props: Object.assign({}, Form.props, {
    options: {
      type: Array,
      required: true
    },
    rowMap: {
      type: Object,
      default: () => {}
    }
  }),
  watch: {
    options: {
      handler: function(data){
        this.modelData = this.initModel(data)
      },
      deep: true
    }
  },

  data() {
    return {
      modelData: {},
      rowGroup: [],
      content:[]
    }
  },
  render(h) {
    return (
      <el-form
        {...{props: Object.assign({}, this._props, {model: this.modelData})}}
        ref="elForm"
      >
        {this.renderGroup(h, this.rowGroup).concat(this.$slots.default)}
      </el-form>
    )
  },
  created() {
    this.rowGroup = this.formateGroup(this.options)
    this.modelData = this.initModel(this.options)
  },
  async mounted() {
    await this.$nextTick()

    Object.keys(Form.methods).forEach(key => {
      this[key] = this.$refs['elForm'][key]
    })
  },
  methods: {
    initModel(data) {
      const real = cloneDeep(data)
      return data.reduce((cur, next) => {
        const {prop, type,defaultValue} = next
        cur[prop] = type && type.indexOf('group') > -1 ? [] :defaultValue|| ''
        return cur
      }, {})
    },
    renderGroup(h, data) {
      const slotPropKey = Object.keys(this.$slots).reduce((cur, next) => {
        const [key, value] = next.split(':')
        key !== 'default' && (cur[key] = value)
        return cur
      }, {})

      const vnodeArr =
        data &&
        data.map(row => {
          const {rowId} = row[0] || ''
          const curItem = this.options.find(item => rowId == item.rowId)
          return (
            <el-row
              {...{
                props: this.rowMap[rowId] || '',
                curProp: curItem.prop || ''
              }}
            >
              {row.map(col => (
                <el-col {...{props: col.col}}>
                  <form-item-maker
                    {...{
                      props: {
                        itemValue: this.modelData[col.prop],
                        data: col,
                        formData: this.modelData
                      },
                      on: {
                        updateModel: params => this.updateModel(params)
                      }
                    }}
                  />
                </el-col>
              ))}
            </el-row>
          )
        })

      const slotIndex = vnodeArr.findIndex(vnode => {
        const {
          data: {curProp}
        } = vnode
        const slotName = `${curProp}:${slotPropKey[curProp]}`
        return !!slotPropKey[curProp]
      })

      const rowFirstProp =
        (slotIndex > -1 && vnodeArr[slotIndex].data.curProp) || ''

      const slotName = `${rowFirstProp}:${slotPropKey[rowFirstProp]}`

      if (rowFirstProp) {
        vnodeArr.splice(slotIndex, 0, this.$slots[slotName])
      }

      return vnodeArr
    },
    formateGroup(data) {
      const groups = groupBy(data, 'rowId')
      return Object.values(groups).reduce((cur, next, index) => {
        cur.push(next)
        return cur
      }, [])
    },
    renderContent(h, col) {
      const vnode_content = h('el-col', {props: col.col}, [
        this.renderSlots(h, col)
      ])
      return []
    },
    updateModel({prop, value}) {
      this.$set(this.modelData, prop, value)
    },
    getValue() {
      return Object.keys(this.modelData).reduce((cur, key) => {
        if (key !== 'undefined') {
          cur[key] = this.modelData[key]
        }
        return cur
      }, {})
    }
  }
}
</script>
