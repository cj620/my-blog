---
title: 关于中大型后台管理开发的一些思考
date: 2021-11-12
tags:
  - 开发技巧
categories:
  - 开发
---

# 关于中大型后台管理开发的一些思考

中后台系统开发，对于前端来说算是比较常见的工作内容了。市面上开源的后台集成框架也是层出不穷。比如 vue-element-admin、ant-design-pro，还有我比较喜欢的搭载最新技术栈的 vben-admin。

> 当然这篇博客主要是讨论如何快速且高效的完成业务代码，并且具有良好的可维护性，以及面对五花八门的需求时的灵活性。

## 1.开端

​ 记得刚入职那会儿，第一个开发任务就是在后台管理系统中添加一个单据模块。需要管理页面、新增编辑页面和详情页面总共三个页面。
​ 项目中使用的是 element-ui，照着组件库的教程，很快管理页面的静态样式就写完了。就这样代码来到了 100+行。然后就是配合分页逻辑做接口查询。以及一些增删改的接口调用和页面逻辑，代码到了 300+行。再然后还需要加上查询表单，导入、导出、样式优化、交互细节优化。到这里页面竟然就有 500+行代码了。新增编辑页面 1500+行，详情页面 800+行。虽然代码多且乱，总算是按要求完成了任务。

​ 刚开心没多久，又被安排了另外一个单据模块。当然这次不会再傻乎乎从来一遍了。于是复制粘贴前一个单据，修修改改的很快就完成了开发。接下来就是千篇一律的完成各种单据，复制粘贴...

​ 突然有一天，被通知说表单输入功能和样式效果不太好，给了一个方案，让我们修正过来。然后没办法，打开代码，一个页面一个页面的修改。

​ 不幸的是，这样的修改后面还有很多。每次都要拿到所有的页面，逐个修改到怀疑人生。

> 后台开发往往千篇一律，相对于其他类型的开发重复度要高很多。虽然有开源框架帮我们处理了如权限、菜单、接口、路由等等问题。但是关于业务逻辑方面，却没有给出比较好的方案，导致新手写出来的代码堆成屎山，开发麻烦、维护和修改的工作量更大。那么怎么解决这些问题呢？

​

## 2.只组件化还远远不够

> 要降低开发和维护的难度，组件化当然必不可少。但是我发现尽管将一些通用的东西封装成了组件使用，但是工作量还是很大。

就拿管理页面来说，无非就是一个表格和表单输入。

还有一些分页逻辑，导入、导出、增删改查逻辑。这些基本每个管理页面都有，但好像用组件化又解决不了这些问题。

- 能不能自动调用接口
- 能不能自动管理分页参数和控件
- 能不能自动处理导入导出
- 能不能自动过滤一下表格数据，例如空值、时间、或者枚举转换
- 表单参数逻辑我也不想写，能不能自动混入到查询接口的参数里面。
- 远程下拉框逻辑我也不想处理
- 如果我想让用户自己决定表格的展示形式怎么办？
- 如果表格里面展示的图片、链接我也不想处理怎么办？

上面的这些东西我觉得每个页面好像都是重复的，能不能自动处理。我就根据接口数据，对一下表格字段和查询字段就行了。

**解决方案篇幅过长，有时间会以博客方式输出**

演示案例：[demo](https://juejin.cn/post/6844903848008482824)

使用文档：[文档](http://cj6209577.gitee.io/cwind/)

## 3.页面构建脚本

> 我发现要建一个页面，先要创建一个 vue 文件当作页面文件，然后去路由里写入这个文件的路径等信息。听重复的，我连这个都不想做怎么办？

- 能不能输入一个命令行帮我自动创建页面，并且帮我写好页面的基本结构？
- 在创建页面的时候，帮我在 router 文件里注册好？
- 既然页面有了，接口文件能不能帮我创建出来？
- 既然接口目录和页面都有了，能不能帮我把接口引入的代码在页面里面写好
- 既然接口引入好了，那顺便自己调用一下吧

上面的这些要求能不能只通过脚本构建出来，这样的话，我连代码都不用写了，只需要写一些特殊的业务逻辑就好了。

这样从项目来说，目录结构更加规范，代码结构风格更加统一。

**解决方案篇幅过长，有时间会以博客方式输出**

## 4.接口自动生成

> 我发现一些单据的接口，基本上都是增删改查以及审核流的一些功能(其他特殊接口暂且不谈)。如果后端接口足够规范的话，大概就是下面这个情形

```js
import request from "@/utils/request";
// 销售退货列表
export function getSalesReturnList(data) {
  return request({
    url: "/sales_return/list",
    method: "post",
    data,
  });
}

// 保存销售退货
export function saveSalesReturn(data) {
  return request({
    url: "/sales_return/save",
    method: "post",
    data,
  });
}
// 根据Id获取销售退货
export function getSalesReturn(query) {
  return request({
    url: "/sales_return/get",
    method: "get",
    params: query,
  });
}
// 根据Id删除销售退货
export function deleteSalesReturn(data) {
  return request({
    url: "/sales_return/delete",
    method: "post",
    data,
  });
}
// 提交销售退货审核
export function submitSalesReturn(data) {
  return request({
    url: "/sales_return/submit",
    method: "post",
    data,
  });
}
// 审核销售退货
export function auditSalesReturn(data) {
  return request({
    url: "/sales_return/audit",
    method: "post",
    data,
  });
}
// 撤审销售退货
export function revokeAuditSalesReturn(data) {
  return request({
    url: "/sales_return/withdraw",
    method: "post",
    data,
  });
}
// 审核拒绝销售退货
export function rejectSalesReturn(data) {
  return request({
    url: "/sales_return/reject",
    method: "post",
    data,
  });
}
// 作废销售退货
export function discardSalesReturn(data) {
  return request({
    url: "/sales_return/discard",
    method: "post",
    data,
  });
}
```

我觉得这个也太重复了，而且接口函数命名太麻烦了。能不能自动生成了，命名也帮忙处理后，这样这种接口文件岂不是更加规范。

接下来想想办法

假设如上，一个单据模块的通常来说有九个接口方法，增删改查，提交、作废、审核、撤审、拒绝。他们的 url，前面的 sales_return 拼接是固定的，不同的就是后面标识功能的路径标识。另外就是，method 分为 post 和 get 方法。

​ 我们把这九个接口，看成是一个 9 位二进制上的 9 个位，1 代表存在，0 代表不存在。

我们可以创建一个 map 文件来做构建准备（如下）

```js
export const apiEnum = {
  // 查列表  2^0
  1: {
    name: "list",
    type: "post",
  },
  // 查详情  2^1
  2: {
    name: "get",
    type: "get",
    loading: true,
  },
  // 删列表 2^2
  4: {
    name: "delete",
    type: "post",
  },
  // 保存 或者 保存且提交  2^3
  8: {
    name: "save",
    type: "post",
    loading: true,
  },
  // 提交  2^4
  16: {
    name: "submit",
    type: "post",
    loading: true,
  },
  // 审核  2^5
  32: {
    name: "audit",
    type: "post",
  },
  // 撤审  2^6
  64: {
    name: "withdraw",
    type: "post",
  },
  // 拒绝  2^7
  128: {
    name: "reject",
    type: "post",
  },
  // 作废  2^7
  256: {
    name: "discard",
    type: "post",
  },
};
export const apiFuncModule = {
  // 全部
  COMMON: 511,
  // 增删改查
  CURD: 15,
};
```

​ 当我传 1 的时候，九位为`000000001`,代表只有一个查接口。当我传 15 的时候，九位为`000001111`,代表拥有增删改查四个接口。以此类推。

​ 接下就是完成处理函数，完成上面的功能（如下）

```js
import request from "@/utils/request";
import { apiEnum, apiFuncModule } from "@/enum/baseModule/apiEnum";
function apiGenPlugin(moduleName, code = 511) {
  let apiMap = {};
  for (let key in apiEnum) {
    if ((key & code) == key) {
      let obj = apiEnum[key];
      let apiName = "api_" + obj.name;
      apiMap[apiName] = (data) => {
        return request({
          url: `/${moduleName}/${obj.name}`,
          method: obj.type,
          [obj.type == "get" ? "params" : "data"]: data,
          loading: obj.loading,
        });
      };
    }
  }
  return apiMap;
}
export { apiGenPlugin, apiFuncModule as apiType };
```

完成以上步骤，我们的接口文件就可以这样写了,这样九个接口就写完了。而且一目了然，如需修改，只需要调整传参就行了。

```js
import { apiGenPlugin, apiType } from "@/utils/system/apiGenPlugin";
const API = apiGenPlugin("sales_return", (code = 511));
export { API };
```

使用方式

```js
import { API as SalesReturn } from "@/api/workApi/sale/return";
```

- 增 SalesReturn.api_save
- 删 SalesReturn.api_delete
- 改 SalesReturn.api_get
- 查 SalesReturn.api_list
- 审核 SalesReturn.api_audit
- 撤审 SalesReturn.api_withdraw
- 作废 SalesReturn.api_discard
- 提交 SalesReturn.api_submit
- 拒绝 SalesReturn.api_reject
