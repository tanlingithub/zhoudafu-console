// 面包屑路由信息

export const ROUTE_INFO = [
  {
    id: 1,
    parentId: 1,
    redirectName: '',
    redirectPath: '/frontdesk-category',
    title: '商品管理',
    disabled: true,
    children: [
      {
        id: 101,
        parentId: 1,
        name: '',
        path: '/frontdesk-category',
        title: '展示类目管理'
      },
      {
        id: 102,
        parentId: 1,
        name: '',
        path: '/new-commodity',
        title: '发布新商品'
      },
      {
        id: 103,
        parentId: 1,
        name: '',
        path: '/commodity-list/associated/commodity-list-onshelves',
        title: '商品列表',
        children: [
          {
            id: 1031,
            parentId: 103,
            name: '',
            path: '/commodity-detail',
            title: '商品详情'
          },
          {
            id: 1032,
            parentId: 103,
            name: '',
            path: '/edit-commodity',
            title: '编辑商品'
          }
        ]
      },
      {
        id: 104,
        parentId: 1,
        name: '',
        path: '/commodity-list/associated/commodity-list-shelves',
        title: '商品列表',
        children: [
          {
            id: 1041,
            parentId: 104,
            name: '',
            path: '/commodity-detail',
            title: '商品详情'
          },
          {
            id: 1042,
            parentId: 104,
            name: '',
            path: '/edit-commodity',
            title: '编辑商品'
          }
        ]
      },
      {
        id: 105,
        parentId: 1,
        name: '',
        path: '/sku-list',
        title: 'sku列表'
      },
      {
        id: 106,
        parentId: 1,
        name: '',
        path: '/shelves-management',
        title: '上下架管理'
      },
      {
        id: 107,
        parentId: 1,
        name: '',
        path: '/goods-compose',
        title: '组合商品发布'
      }
    ]
  },
  {
    id: 2,
    parentId: 1,
    redirectName: '',
    redirectPath: '/afterdesk-category',
    title: '基础信息设置',
    disabled: true,
    children: [
      {
        id: 201,
        parentId: 2,
        name: '',
        path: '/afterdesk-category',
        title: '基础类目管理'
      },
      {
        id: 202,
        parentId: 2,
        name: '',
        path: '/property-manage',
        title: '属性管理',
        children: [
          {
            id: 2021,
            parentId: 202,
            name: '',
            path: '/property-manage/add-property',
            title: '新增属性'
          },
          {
            id: 2022,
            parentId: 202,
            name: '',
            path: '/property-manage/edit-property',
            title: '属性修改'
          }
        ]
      },
      {
        id: 203,
        parentId: 2,
        name: '',
        path: '/brand-management',
        title: '品牌管理',
        children: [
          {
            id: 2031,
            parentId: 203,
            name: '',
            path: '/brand-management/brandInfo',
            title: '新增/编辑'
          }
        ]
      },
      {
        id: 204,
        parentId: 2,
        name: '',
        path: '/goods/channels',
        title: '渠道管理',
        children: [
          {
            id: 2041,
            parentId: 204,
            name: '',
            path: '/goods/channels/channelInfo',
            title: '新增/编辑'
          }
        ]
      }
    ]
  }
]
