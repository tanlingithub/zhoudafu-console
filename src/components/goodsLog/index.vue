<template>
  <log-viewer style="text-align: left"
    :log="log"></log-viewer>
</template>

<script>
import dayjs from 'dayjs'
import logViewer from '@femessage/log-viewer'
export default {
  components: {
    logViewer
  },
  computed: {
    log() {
      return this.data
        .map(item => {
          if (this.mode === 'publish') {
            return this.generatePublish(item)
          }
          if (this.mode === 'up') {
            return this.generateUp(item)
          }
          if (this.mode === 'down') {
            return this.generateDown(item)
          }
        })
        .join('\n')
    }
  },
  props: {
    // 模式： 发布，上架，下架
    mode: {
      type: String,
      default: 'publish'
    },
    // 数据
    data: {
      type: Array
    },
    // 渠道名称
    channels: {
      type: Array
    }
  },
  data() {
    return {}
  },
  methods: {
    generatePublish(item) {
      const publishMap = {
        天猫: `
          POST /taobao/item/add
          request:
          {
            "title": "${item.name}",
            "num": 1,
            "type": "fixed",
            "stuff_status": "new",
            "desc": "${item.subName}",
            "cid": "${item.categoryId}"
          }
          response:
          {
              "item_add_response":{
                  "item":{
                      "iid":"${item._id}",
                      "num_iid": "${item._id}",
                      "created":"${dayjs(item.createdAt).format(
                        'YYYY-MM-DD HH:mm:ss'
                      )}"
                  }
              }
          }
          ${item.skuList
            .map(sku => {
              return `
              POST /taobao/item/sku/add
              request:
              {
                "num_iid":'${item._id}',
                "properties":"${item.categoryId}",
                "quantity":"1",
                "price":"${sku.salePrice}",
                "outer_id": "${sku._id}",
                "item_price":"${sku.salePrice}",
                "lang":"zh_CN",
                "ignorewarning":",ifd_warning,FakeCredit_Warning,"
              }
              response:
              {
                "item_sku_add_response":{
                  "sku":{
                    "num_iid":'${item._id}',
                    "sku_id":"${sku._id}",
                    "created":"${dayjs(item.createdAt).format(
                      'YYYY-MM-DD HH:mm:ss'
                    )}"
                  }
                }
              }
            `
            })
            .join('\n')}
          `,
        京东: `
          POST /jingdong/ware/write/add
          request: 
          {
            "ware": {
              "title": "${item.name}",
              "categoryId": "${item.categoryId}",
              "transportId": "14786589",
              "introduction": "${item.goodsDetail[0].detailContent}",
              "mobileDesc":"${item.goodsDetail[1].detailContent}",
            },
            "skus": ${JSON.stringify(
              item.skuList.map(sku => {
                return {
                  saleAttrs: sku.skuSalePropertyValues.map(item => {
                    return {
                      attrId: item.goodsPropertyId,
                      attrValues: [item.values]
                    }
                  }),
                  stockNum: 100,
                  jdPrice: sku.salePrice
                }
              }),
              null,
              2
            )}
          }
          response: 
          {
            "jingdong_ware_write_add_response": {
              "ware": "${item._id}",
              "skus": ${JSON.stringify(
                item.skuList.map(sku => {
                  return {
                    skuId: sku._id,
                    saleAttrs: sku.skuSalePropertyValues.map(item => {
                      return {
                        attrId: item.goodsPropertyId,
                        attrValues: [item.values]
                      }
                    }),
                    stockNum: 100,
                    jdPrice: sku.salePrice
                  }
                }),
                null,
                2
              )}
            }
          }
        `
      }
      return this.channels.reduce((result, item) => {
        return result + '\n' + publishMap[item]
      }, ``)
    },
    generateUp(item) {
      const upMap = {
        天猫: `
        PUT /taobao/item/update/listing
        request:
        {
          "num_iid": "${item._id}",
          "num": 2
        }
        response:
        {
          "item_update_listing_response":{
            "item":{
              "num_iid": "${item._id}",
              "modified": "${dayjs(item.updatedAt).format(
                'YYYY-MM-DD HH:mm:ss'
              )}"
            }
          }
        }
         `,
        京东: `
        PUT /jingdong/ware/write/upOrDown
        request:
        {
          "wareId": "${item._id}",
          "opType": 1
        }
        response:
        {
          {
            "jingdong_ware_write_upOrDown_response": {
              "success": "true"
            }
          }
        }
        `
      }
      return this.channels.reduce((result, item) => {
        return result + '\n' + upMap[item]
      }, ``)
    },
    generateDown(item) {
      const downMap = {
        天猫: `
        PUT /taobao/item/update/delisting
        request:
        {
          "num_iid": "${item._id}",
        }
        response:
        {
          "item_update_listing_response":{
            "item":{
              "num_iid": "${item._id}",
              "modified": "${dayjs(item.updatedAt).format(
                'YYYY-MM-DD HH:mm:ss'
              )}"
            }
          }
        }
         `,
        京东: `
        PUT /jingdong/ware/write/upOrDown
        request:
        {
          "wareId": "${item._id}",
          "opType": 2
        }
        response:
        {
          {
            "jingdong_ware_write_upOrDown_response": {
              "success": "true"
            }
          }
        }
        `
      }
      return this.channels.reduce((result, item) => {
        return result + '\n' + downMap[item]
      }, ``)
    }
  }
}
</script>

<style>
</style>