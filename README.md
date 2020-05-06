# nuxt2 + element dashboard



***
*****

`说明`
 
1.代码注释

        ①因UI原型无左侧菜单,故注释代码 -->> default.vue -->> menuItem组件
        ②因UI原型无底部栏目,故注释-->> default.vue -->> footer组件            

2.CSS

        ①assets文件下新建reset.less -->> 去除html默认样式
        ②global新增全局样式 -->> 背景,头部默认字体颜色等

***
*****

## Docs

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Script

```bash
# install dependencies
$ yarn

# serve with hot reload at localhost:3000
# using mock api to develop
$ yarn mock

# using mock api to develop which doesn't need login
$ yarn mock:nologin

# using backend api to develop
$ yarn dev

# build for production
$ yarn build
```


## src 下目录结构总体概况

```js
src
├─ api // api 放置
├─ assets // 全局通用资源
├─ components // 全局通用组件
├─ const // 存放静态信息，api 等
├─ http // 存放着 axios 配置
├─ layouts // 公共页面
├─ middleware // nuxt 中间件
├─ mixins // vue 的高阶组件实现形式
├─ pages // 主要是让 nuxt 自动生成前端的路由，里面不能乱写，所以把 page 写到 /views 文件夹，再由这边引入生成路由
├─ plugins // nuxt 插件
├─ store   // vuex 数据
├─ styles // 公共样式等
├─ utils  // 存放工具函数
└─ views  // 存放页面
```

## 环境变量
使用.env设置环境变量, 即在项目根目录新建一个.env文件, 填写环境变量即可。

.env文件示例:

```sh
# 左边是变量名(一般大写，下划线分割单词)，右边是变量值
# 注意=号两边不能有空格
TESTING_VAR=just-fot-testing
ANOTHER_VAR=another
```

可以在项目的vue文件或js文件中读取

```js
mounted() {
  console.log(process.env.TESTING_VAR) // 输出 just-fot-testing
}
```

**自带的环境变量说明**

| 环境变量名  | 说明                                                         | 默认值                  | 示例                      |
| ----------- | ------------------------------------------------------------ | ----------------------- | ------------------------- |
| API_SERVER  | axios的baseURL，可不传。不传时，则使用相对路径发送请求       |                         | https://www.easy-mock.com |
| PUBLIC_PATH | 对应webpack的publicPath，用于指定静态文件访问路径，一定要/结尾 |                       | http://cdn.deepexi.com/   |
| NO_LOGIN    | 是否登陆拦截，传1则不会有登录拦截                            |                         | 1                         |
| COOKIE_PATH | 用于设置cookie的path，如果多个项目需要共享cookie，则应该保证项目在共同的目录下，且设置COOKIE_PATH为它们的共同目录地址 | /                       | /xpaas                    |


## 构建

构建默认生成的是hash路由模式的spa, 会读取根目录下的.env文件获取环境变量

命令如下:

```sh
yarn build
```

## 部署

登录到服务器：47.92.95.20

命令如下:

```sh

ssh root@47.92.95.20

cd /root/gitlab/zhoudafu/zhoudafu-console;
./deploy.sh
```

