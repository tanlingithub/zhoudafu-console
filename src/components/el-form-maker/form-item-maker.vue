<!--
 * @Description: In User Settings Edit
 * @Author: nemo
 * @Date: 2019-08-09 10:58:13
 * @LastEditTime: 2019-08-16 19:48:19
 * @LastEditors: Please set LastEditors
 -->
<script>
import mixinsOptions from './shared/mixinsOptions'
import {toCamelCase} from './shared/uitils.js'
export default {
  name: 'form-item-maker',
  mixins: [mixinsOptions],
  props: {
    formData: Object,
    data: Object,
    itemValue: [String, Number, Object, Array]
  },
  render(h) {
    const {prop, rules, label} = this.data
    return (
      <el-form-item
        {...{props: Object.assign({}, this.data, {prop, rules, label})}}
      >
        {this.renderEle(h, this.data, this.itemValue)}
      </el-form-item>
    )
  },
  created() {},
  methods: {
    renderEle(h, data, value) {
      const ele =
        (typeof data.component == 'object' && data.component) ||
        (data.type && 'el-'.concat(data.type)) ||
        null
    
      const options =
        typeof data.options == 'function' ? data.options() : data.options
      return !!ele
        ? h(
            ele,
            {
              props: Object.assign({}, data.props, {value}),
              on: {
                input: val => this.updateModel({prop: data.prop, value: val}),
                change: val => this.updateModel({prop: data.prop, value: val})
              }
            },
            [this.renderOps(data.type,options)]
          )
        : typeof data.render == 'function' && data.render(h, data)
    },
    updateModel({prop, value}) {
      this.$emit('updateModel', {prop, value})
    },
    renderOps(type, options) {
      const optRenderer = type && this[`${toCamelCase(type)}_opt`]
      if (typeof optRenderer === 'function' && Array.isArray(options)) {
        return options.map(optRenderer)
      }
    }
  }
}
</script>
