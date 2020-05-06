/**
 * Created by levy on 2018/2/12.
 */
import Vue from 'vue'
import {
  Button,
  Table,
  Pagination,
  TableColumn,
  Notification,
  Loading,
  Dialog,
  MessageBox,
  Message,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  DatePicker,
  Tooltip,
  Container,
  Main,
  Footer,
  Header,
  Menu,
  Submenu,
  MenuItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Tree,
  Tag,
  Scrollbar,
  // Cascader,
  Switch,
  Transfer,
  Tabs,
  TabPane
} from 'element-ui'
import ElFormRenderer from '@femessage/el-form-renderer'
import ElDataTable from 'el-data-table'
import ElValidateTable from '@/components/el-validate-table/index'
import ElFormMaker from '@/components/el-form-maker/index'
import SubContainer from '@/components/sub-container'

Vue.prototype.$ELEMENT = {
  size: 'medium'
}
Vue.use(Transfer)
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Header)
// Vue.use(Aside)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Radio)
Vue.use(Tree)
Vue.use(RadioGroup)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Loading.directive)
Vue.use(Dialog)
Vue.use(Tooltip)
Vue.use(Tag)
// Vue.use(Cascader)
// Vue.use(Autocomplete)
Vue.use(Scrollbar)
// steps
// Vue.use(Steps)
// Vue.use(Step)

Vue.use(Tabs)
Vue.use(TabPane)

Vue.component('el-form-renderer', ElFormRenderer)
Vue.component('el-data-table', ElDataTable)
Vue.component(ElValidateTable.name, ElValidateTable)
Vue.component(ElFormMaker.name, ElFormMaker)
Vue.component(SubContainer.name, SubContainer)

Vue.prototype.$notify = Notification
Vue.prototype.$bus = new Vue()
Vue.$notify = Notification

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
