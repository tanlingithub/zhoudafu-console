require('dotenv').config()
// const proxyConfig = require('./config/config.proxy.js.js') // 引入接口代理配置文件

const env = process.env
const isProd = env.MODE == 'prod'
const metaJson = require('./meta.json')
const materialJson = require('../../material.json')
const outputDir = `dist${metaJson.hash}`
const ossPath = `http://serverless-platform.deepexi.top/materials/${materialJson.materialId}/${outputDir}`

// 不能以斜杠结尾
let apiServer = process.env.API_SERVER
let apiPocServer = isProd ? process.env.API_POC_SERVER : ''
// 必须以斜杠结尾
const publicPath = process.env.NODE_ENV === 'production' ? ossPath : ''

const aliIconFontHref = '//at.alicdn.com/t/font_1137386_fd8v1yc0rcn.css'

let axios = {
  proxy: true
}

// 如果生产指定apiServer, 则使用绝对路径请求api
if (isProd && apiServer) {
  axios = {
    proxy: false,
    baseURL: apiServer
  }
}

module.exports = {
  mode: 'spa',
  env: {
    NO_LOGIN: process.env.NO_LOGIN,
    OSS_KEY: process.env.OSS_KEY,
    OSS_SECRET: process.env.OSS_SECRET,
    OSS_BUCKET: process.env.OSS_BUCKET,
    OSS_REGION: process.env.OSS_REGION,
    COOKIE_PATH: process.env.COOKIE_PATH || '/',
    API_POC_SERVER: apiPocServer,
    MODE: process.env.MODE
  },
  // proxy: proxyConfig[env.MODE],
  router: {
    middleware: ['meta'],
    mode: 'hash'
  },
  /*
   ** Build configuration
   */
  generate: {
    dir: outputDir
  },
  build: {
    extractCSS: true,
    [isProd ? 'publicPath' : '']: '/',
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: '~node_modules/@femessage/theme-deepexi/lib'
          }
        ]
      ]
    },
    /*
     ** Run ESLint on save
     */
    extend(config, {isDev}) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      isProd && (config.output.publicPath = './')
    }
  },
  /*
   ** Headers of the page
   */
  head: {
    title: '周大福',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        'http-equiv': 'x-ua-compatible',
        content: 'IE=edge, chrome=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'sPaaS Console'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href:
          'https://deepexi.oss-cn-shenzhen.aliyuncs.com/deepexi-services/favicon32x32.png'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: aliIconFontHref
      }
    ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#1890ff'
  },
  css: [
    {
      src: '~styles/global.less',
      lang: 'less'
    }
  ],
  srcDir: 'src/',
  plugins: [
    '~/plugins/axiosPlugin',
    {
      src: '~/plugins/element'
    },
    {
      src: '@/plugins/router'
    }
  ],
  modules: [
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources',
    [
      '@nuxtjs/dotenv',
      {
        path: './'
      }
    ]
  ],
  styleResources: {
    less: '~styles/variables.less'
  },
  // modules: [['@nuxtjs/axios'], '@nuxtjs/proxy', ['@nuxtjs/dotenv', {path: './'}]],
  axios
}
