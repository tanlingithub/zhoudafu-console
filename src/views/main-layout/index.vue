<!--
 * @Description: In User Settings Edit
 * @Author:nemo
 * @Date: 2019-08-15 11:03:20
 * @LastEditTime: 2019-08-15 11:52:33
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <layout-head />
    <div>
      <sidebar />
      <div :class="{spreadContainer: setting.collapse}" class="main-container">
        <scrollbar wrap-class="main-scrollbar" :noresize="false">
          <el-container direction="vertical">
            <el-header
              class="nuxt-header"
              height="50px"
              v-if="$route.path !== '/'"
            >
              <v-breadcrumb class="main-breadcurmb"></v-breadcrumb>
            </el-header>
            <el-main class="nuxt-main" :style="nuxtStyle">
              <nuxt class="nuxt-container"></nuxt>
            </el-main>
            <el-footer height="50px">
              <copyright></copyright>
            </el-footer>
          </el-container>
        </scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import Copyright from '@/components/copyright/index.vue'
import LayoutHead from './components/layout-head/layout-head.vue'
import {mapState, mapGetters} from 'vuex'
import auth from '@/mixins/auth'
import {SPA_NAME} from '@/const/const'
import Sidebar from './components/sidebar/index.vue'
import Scrollbar from '@/components/scrollbar/index.js'
import vBreadcrumb from './components/breadcrumb'
import layout from '@/const/layout'

export default {
  mixins: [auth],
  components: {
    Copyright,
    LayoutHead,
    Sidebar,
    Scrollbar,
    vBreadcrumb
  },
  data() {
    return {
      appName: SPA_NAME,
      nuxtStyle: {}
    }
  },
  watch: {
    '$route.path': {
      handler: function(val) {
        const ele = layout.find(item => item.path == val)
        this.nuxtStyle = !!ele
          ? {backgroundColor: ele.bgcolor || '#F7F8FB'}
          : {}
      },
      immediate: true
    }
  },
  computed: {
    ...mapState(['setting'])
  }
}
</script>
<style lang="less">
#__nuxt {
  @title-bg: rgba(242, 244, 249, 1);
  @menu-height: 50px;
  @primary-color: #1890ff;
  @main-bg: #f7f8fb;

  // 主体区域 Main container

  .main-container {
    transition: margin-left 0.28s;
    margin-left: @sideBarMaxWidth;
    height: 100%;
    position: relative;
    background-color: @main-bg;

    &.spreadContainer {
      margin-left: @sideBarMinWidth;
    }

    .main-scrollbar {
      min-height: calc(100vh - 60px);
      overflow-x: hidden !important;
      margin-bottom: 0 !important;
    }

    .el-scrollbar__view {
      height: 100%;
    }

    .el-scrollbar__bar.is-vertical {
      right: 0;
    }

    .is-horizontal {
      display: none;
    }
  }

  .nuxt-header {
    background: #fff;
    line-height: 50px;
  }

  .nuxt-main {
    position: relative;
    min-height: calc(100vh - 60px - 50px - 24px);
    margin: 24px 24px 0;
    overflow-x: hidden;
    padding: 24px;
    background-color: #fff;
  }
}
</style>
