<template>
  <div class="layout-Head">
    <div class="fixed-head">
      <h1 class="head-logo">
        <img src="https://bucket-cdn-dev.oss-cn-shenzhen.aliyuncs.com/poc/zhoudafu/zhoudafu_log.png"
          alt="zhoudafu"
          class="layout-logo" />
      </h1>
      <!-- 头部菜单 -->
      <div class="head-menu">
        <ul class="clearfix">
          <li v-for="(item, index) in headMenu"
            :class="{active: url === item.url}"
            @click="handleMenu(item)"
            :key="index">
            <span class="button-container">{{ item.name }}</span>
          </li>
        </ul>
      </div>
      <div class="head-right">
        <div class="head-active">
          <img :src="userImg"
            class="userName-Img"
            alt="userName-Img" />
        </div>
        <!-- 用户名称 -->
        <div class="userName-text">{{ userName }}</div>
        <el-dropdown placement="bottom-end"
          @command="exitBtn">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right set-Iconcolor"></i>
          </span>
          <el-dropdown-menu slot="dropdown"
            class="user-drop-menu">
            <el-dropdown-item v-for="(item, index) in dropdownList"
              :key="index"
              :command="item.command">{{ item.title }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import axios from '@/http'
import cookie from 'js-cookie'

export default {
  name: 'LayoutHead',
  data() {
    let currentHref = this.getCurrentPath()
    return {
      url: currentHref,
      activeIndex: 'console',
      dropdownList: [
        {
          title: '退出',
          command: 'exit'
        },
        {
          title: '清空商品数据',
          command: 'empty'
        }
      ],
      searchType: 'default',
      headMenu: [
        {
          name: '控制台',
          type: 'console',
          url: '/spaas-console/index.html'
        },
        {
          name: '帮助中心',
          type: 'resources',
          url: '/spaas-console/index.html#/document'
        }
      ]
    }
  },
  props: {
    searchUrl: {
      type: Object,
      default() {
        return {
          url: ''
        }
      }
    }
  },
  computed: {
    userName() {
      return cookie.get('username') || 'sPaaS'
    },
    userImg() {
      return (
        this.$store.state.user.avatar ||
        'https://deepexi.oss-cn-shenzhen.aliyuncs.com/xpaas-console/user-portrait.png'
      )
    },
    ...mapMutations(['logout'])
  },
  methods: {
    exitBtn(key, keyPath) {
      key == 'exit' ? this.$store.commit('logout') : ''
      // 清空商品数据
      if (key === 'empty') {
        axios
          .get(`/spaas-commodity-center/api/v1/commodity?page=-1&size=999`)
          .then(res => {
            res = res.data
            if (res.code === '0') {
              const list = res.payload.content || []
              const promiseList = list.map(item =>
                axios.delete(
                  `/spaas-commodity-center/api/v1/commodity/${item.id}`
                )
              )
              Promise.all(promiseList).then(() => {
                console.log('清空数据成功')
              })
            }
          })

        axios.delete(`/poc/api/v1/zhoudafu/goods/delete?isAll=1`).then(res => {
          console.log('清空poc数据成功')
        })
      }
    },
    handleMenu(item) {
      const url = item.url
      if (url != this.getCurrentPath()) {
        const currentOrigin = location.origin
        location.href = `${currentOrigin}${url}`
      }
    },
    getCurrentPath() {
      const currentPath = location.href.split('#/')[0],
        currentOrigin = location.origin
      const path = currentPath.split(currentOrigin)[1] || ''
      const pathStr = path.replace(/(^\/*)/g, '')
      return `/${pathStr}`
    }
  },
  mounted() {}
}
</script>

<style lang="less" scoped>
@headMenu: rgba(255, 255, 255, 0.85);
@hoverColor: #fff;

.layout-Head {
  height: 60px;

  .fixed-head {
    display: flex;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    background: #001529;
  }

  .head-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;

    .layout-logo {
      width: 53%;
      height: auto;
    }
  }

  .head-menu {
    flex: 1;

    ul {
      img {
        width: 100%;
        height: 100%;
      }

      background-color: rgb(0, 21, 41);
      color: @headMenu;
      font-size: 14px;

      li {
        float: left;
        cursor: pointer;
        list-style: none;

        &:hover {
          color: @hoverColor;
        }

        .button-container {
          display: block;
          height: 60px;
          line-height: 60px;
          margin: 0 20px;
        }
      }

      .active {
        color: rgba(255, 255, 255, 1);

        .button-container {
          position: relative;

          &::after {
            content: '';
            position: absolute;
            bottom: 12px;
            display: block;
            width: 100%;
            height: 2px;
            background: rgba(255, 255, 255, 1);
          }
        }
      }
    }
  }

  .head-right {
    margin-right: 20px;
    display: flex;
    align-items: center;

    div {
      display: inline-block;
    }

    .set-Iconcolor {
      color: @headMenu;
    }

    .head-active {
      .userName-Img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }

    .userName-text {
      text-align: center;
      overflow: hidden;
      color: #fff;
      margin-right: 10px;
    }

    .head-search {
      .set-search {
        margin-right: 5px;
      }

      .head-autocomplete {
        .el-icon-search {
          cursor: pointer;
          font-size: 18px;
        }
      }

      .el-dropdown-link {
        font-size: 18px;
        color: #a2a2b1 !important;
      }
    }

    .head-message {
      margin: 0 30px 0 20px;

      .item {
        .set-IconSize {
          height: 100%;
          max-width: 100%;
        }
      }
    }
  }
}

.el-badge .el-badge__content {
  border: 0;
}

.el-dropdown-menu .popper__arrow {
  display: none;
}
</style>
