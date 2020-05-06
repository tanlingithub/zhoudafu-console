/**
 * 本地服务器，接口请求代理。处理跨域
 * @type {{NODE_ENV: string, ENV_CONFIG: string, BASE_API: string}}
 */

const apiServer = process.env.API_SERVER
const pocServer = process.env.API_POC_SERVER

module.exports = {
  mock: {
    '/xpaas-enterprise-contact': apiServer,
    '/xpaas-console-api': apiServer, //
    '/spaas-staff-center': apiServer,
    '/deepexi-dashboard': apiServer, // 'http://39.98.50.163:3000/mock/995'
    '/meta-program': apiServer,
    '/spaas-resource-center': apiServer,
    '/spaas-commodity-center': apiServer
  },
  dev: {
    '/spaas-enterprise-contact': apiServer,
    '/spaas-console-api': apiServer,
    '/spaas-staff-center': apiServer,
    '/deepexi-dashboard': apiServer,
    '/meta-program': apiServer,
    '/spaas-resource-center': apiServer,
    '/spaas-commodity-center': apiServer,
    // '/poc': 'http://localhost:7001' //loacal debug
    '/poc': pocServer //pocServer
  }
}
