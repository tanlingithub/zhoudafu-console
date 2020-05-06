<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 17:52:42
 * @LastEditTime: 2019-08-19 11:28:58
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="channel-info"
    v-loading="brandloading">
    <div class="channel-info-base">
      <div class="baseMessge">
        <el-form :model="channelForm"
          :rules="chanelRules"
          ref="channelInfo"
          label-width="100px">
          <el-form-item label="渠道名称"
            prop="name">
            <el-input v-model="channelForm.name"></el-input>
          </el-form-item>
          <el-form-item label="LOGO"
            prop="logo">
            <upload-to-ali v-model="url"
              @loaded="upLoaded" />
          </el-form-item>
          <el-form-item label="编码"
            prop="code">
            <el-input v-model="channelForm.code"
              disabled></el-input>
          </el-form-item>
          <el-form-item label="渠道介绍"
            prop="desc">
            <el-input type="textarea"
              placeholder="请输入内容"
              v-model="channelForm.desc"
              maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="是否启用"
            prop="enable">
            <el-switch v-model="channelForm.enable"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item label="自动下架"
            prop="autoDown">
            <el-switch v-model="channelForm.autoDown"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </el-form>
        <div class="channel-info-baseGroup">
          <div class="channel-info-btns">
            <el-button @click="$router.back()">取消</el-button>
            <el-button type="primary"
              @click="saveFrom">保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UploadToAli from '@femessage/upload-to-ali'
import axios from '@/http'
import {
  BRAND_LIST,
  putBrandManagement,
  postBrandManagement,
  getBrandManagement
} from '@/service/xpaas-commodity-center.js'
import {setTimeout} from 'timers'
export default {
  head:{title:'渠道管理-新增/编辑'},
  data() {
    return {
      title: '新增',
      brandloading: false,
      url: '',
      staffInfo: [
        {
          id: 'name',
          type: 'input',
          label: '渠道名称',
          el: {
            placeholder: '请输入内容',
            style: 'width: 35%',
            maxlength: 32
          },
          rules: [
            {
              message: '请输入中文名称',
              required: false,
              trigger: 'change',
              whitespace: true
            }
          ]
        },
        {
          id: 'logo',
          component: UploadToAli,
          label: 'LOGO',
          el: {
            style: 'width: 35%'
          }
        },
        {
          id: 'code',
          type: 'input',
          label: '编码',
          el: {
            placeholder: '请输入内容',
            style: 'width: 35%',
            maxlength: 32
          }
        },
        {
          id: 'desc',
          type: 'input',
          label: '渠道介绍',
          el: {
            type: 'textarea',
            placeholder: '请输入内容',
            style: 'width:35%',
            maxlength: 100
          }
        },
        {
          id: 'enable',
          type: 'switch',
          label: '是否启用'
        },
        {
          id: 'autoDown',
          type: 'switch',
          label: '自动下架'
        }
      ],
      channelForm: {
        name: '',
        code: '',
        desc: '',
        logo: '',
        enable: false,
        autoDown: false
      },
      chanelRules: {
        propertyName: [
          {required: true, message: '请输入属性名称', trigger: 'blur'}
        ]
      } // 输入框的值校验
    }
  },
  components: {
    'upload-to-ali': UploadToAli
  },
  computed: {
    getId() {
      return this.$route.query._id
    }
  },
  methods: {
    upLoaded(url) {
      this.channelForm.logo = url
    },
    //发送
    saveFrom(params) {
      this.$refs.channelInfo.validate(valid => {
        console.log(valid)
        if (!valid) return
        this.brandloading = true
        // let getFormvalue = this.$refs.channelInfo.getFormValue()
        let getFormvalue = this.channelForm
        if (this.getId) {
          axios
            .put('/poc/api/v1/zhoudafu/goods/channels/update', {
              _id: this.getId,
              ...getFormvalue
            })
            .then(res => {
              let {data} = res
              if (data.success && data.payload) {
                this.$message.success('修改成功')
                this.$router.back()
              }
            })
            .catch(err => {})
            .finally(() => {
              this.brandloading = false
            })
        } else {
          axios
            .post('/poc/api/v1/zhoudafu/goods/channels/create', {
              ...getFormvalue
            })
            .then(res => {
              if (res.status == '200') {
                this.$router.push({
                  path: '/goods/channels'
                })
              }
            })
            .catch(() => {})
            .finally(() => {
              this.brandloading = false
            })
        }
      })
    },
    alertMessage(mess, type, htmlType = false) {
      return new Promise((resolve, reject) => {
        this.$message({
          message: mess,
          dangerouslyUseHTMLString: htmlType,
          type: type
        })
        resolve()
      })
    },
    updateEditForm() {
      this.title = '编辑'
      this.brandloading = true
      let _this = this
      axios
        .get(`/poc/api/v1/zhoudafu/goods/channels/detail?_id=${this.getId}`)
        .then(res => {
          let {...data} = res.data.payload
          if (res.data.success == true) {
            this.channelForm = {...res.data.payload}
            this.url = res.data.payload.logo
          }
        })
        .catch(() => {})
        .finally(() => {
          this.brandloading = false
        })
    }
  },
  mounted() {
    if (this.getId) {
      this.updateEditForm()
    }
  }
}
</script>
<style lang="less">
.channel-info {
  .channel-info-text {
    padding: 10px 0 20px 30px;
    background: #fff;
    margin: 0 -30px; //因main里边设置padding故-出去
    font-size: 15px;
  }

  .channel-info-btns {
    width: 35%;
    margin-left: 100px;
    padding: 10px 0;
    text-align: center;
  }

  .el-input,
  .el-textarea {
    width: 55%;
  }

  .baseMessge {
    padding: 30px 0 40px 40px;
    background: #fff;
  }

  .el-switch.is-checked .el-switch__core {
    border-color: rgb(19, 206, 102);
    background: rgb(19, 206, 102);
  }
}
</style>
