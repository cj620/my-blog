---
title: mes系统开发笔记
date: 2021-01-05
tags:
  - 开发
categories:
  - 开发笔记
---

# 1.单元格聚焦输入

html 结构

```html
<el-table @cell-click="celledit"></el-table> //监听单元格事件

<template slot-scope="scope">
  <el-input
    v-model="scope.row.Quantity.value"
    ref="Quantity"
    size="mini"
    id="Quantity"
    v-if="scope.row.Quantity.edit"
    @blur="inputblur(scope.$index,$event)"
    onfocus="this.select()"
    @keydown.native="KeySwitchTd($event,scope.$index)"
    @input.native="NumKeyUp($event,scope.$index)"
  ></el-input>
  <span v-else>{{ scope.row.Quantity.value}}</span>
</template>
```

函数

```js
/* 失去焦点计算数值 */
    inputblur (index, event) {
      var FieldName = event.path[0].id
      this.comfirmCostItem.QuotationSubjectDetails[index][FieldName].value = document.getElementById(FieldName).value
      this.comfirmCostItem.QuotationSubjectDetails[index][FieldName].edit = false
    },
// 明细编辑键盘事件监听
    KeySwitchTd (event, index) {
      this.GeneralityJs.KeySwitchTd(event, index, this.comfirmCostItem.QuotationSubjectDetails)
    },
 // 键盘键入事件（判断仅能输入数字）
    NumKeyUp (event) {
      console.log(event, 5555)
      this.GeneralityJs.NumKeyUp(event)
    },
// 表格列样式编辑
    TableCellClassName ({ row, column, rowIndex, columnIndex }) {
      return this.GeneralityJs.TableCellClassName(column)
    },
// 点击出现input框，优化性能
    celledit (row, column) {
      this.GeneralityJs.celledit(row, column)
    },

//还原数据格式
    this.GeneralityJs.FormatBlist(e)
    FormatBlist (ChoiceResList) {
      ChoiceResList.forEach(item => {
        Object.keys(item).forEach(key => {
          if (typeof item[key] !== 'object' || item[key] === null) {
            item[key] = {
              value: item[key],
              edit: false
            }
          }
        })
      })
      return ChoiceResList
    }
//转换数据格式
this.GeneralityJs.BreakAway(e)
 BreakAway (ChoiceResList) {
    ChoiceResList.forEach(item => {
      Object.keys(item).forEach(Key => {
        item[Key] = item[Key].value
      })
    })
  },
```

## 2.分页

```html
<div class="block">
  <el-pagination
    @size-change="SizeChange"
    @current-change="CurrentChange"
    @prev-click="PrevNextClick"
    @next-click="PrevNextClick"
    :page-sizes="[5, 10, 15, 20]"
    :page-size="QueryForm.PageSize"
    :current-page.sync="QueryForm.PageNo"
    layout="total, sizes, prev, pager, next, jumper"
    :total="BillSum"
  ></el-pagination>
</div>

:row-key="rowKey"
```

```js
  // 页码变更
    async SizeChange (num) {
      this.QueryForm.PageSize = num
      if (this.isQuickSearch === true) {
        this.Select()
      } else {
        await this.getdata()
      }
    },
    // 页数变更
    CurrentChange (Now) {
      console.log(Now)
      this.QueryForm.PageNo = Now
      if (this.isQuickSearch === true) {
        this.Select()
      } else {
        this.getdata()
      }
      console.log(2)
    },
    // 上下页切换
    PrevNextClick (Now) {
      console.log(Now, '分页')
      this.QueryForm.PageNo = Now
      if (this.isQuickSearch === true) {
        this.Select()
      } else {
        this.getdata()
      }
    },
    // 排序列变更
    SortChange (data) {
      this.QueryForm.SortColumn = data.prop
      if (data.order === 'ascending') {
        this.QueryForm.SortOrder = 2
      } else if (data.order === 'descending') {
        this.QueryForm.SortOrder = 4
      } else if (data.order === null) {
        this.QueryForm.SortOrder = 1
      }
      if (this.isQuickSearch === true) {
        this.Select()
      } else {
        this.getdata()
      }
    },
    // 分页保存数据
    rowKey (row) {
      return row.Id
    },
```

## 匹配求和

```js
const arr = [{ price: 100 }, { price: 40 }, { price: 30 }];
// < 1 > +<2>+<3>
var str = "(<1>+<2>)*<3>";

function Sum(str, arr) {
  // 获取<>数组
  const matchArr = str.trim().match(/\<(.+?)\>/g);
  // 匹配规则录入
  const matchMap = new Map();
  matchArr.forEach((item) => {
    arr.forEach((val, index) => {
      if (index + 1 == item.replace(/\<|>/g, "")) {
        matchMap.set(item, val.price);
      }
    });
  });
  matchArr.forEach((item) => {
    const fkey = matchMap.get(item);
    str = str.replace(item, fkey);
  });
  return eval(str);
}
```

## 保存 rowkey 分页保存

```html
//加入rowkey方法
<el-table :row-key="rowKey" @selection-change="chooseitem"> </el-table>
//开启勾选框 reserve-selection 开启key值缓存
<el-table-column type="selection" :reserve-selection="true"> </el-table-column>
```

```js
//获取勾选的项
chooseitem (val) {
      this.choosedSubjects = val
    },
//将勾选项绑定key值
rowKey (row) {
      return row.Id
    }
```

## 变更表格序列

```js
if (e) {
  //向上移动
  this.tableData.splice(this.indexPos, 1);
  this.tableData.splice(this.indexPos - 1, 0, this.currentRow);
} else {
  //向下移动
  this.tableData.splice(this.indexPos, 1);
  this.tableData.splice(this.indexPos + 1, 0, this.currentRow);
}
```

## 确认信息

```js
//使用element js代码弹出确认框 通过用户选择，来确定是否执行代码
this.$confirm(
  this.$t("sales.confirmDeletion"),
  this.$t("sales.ConfirmInformation"),
  {
    distinguishCancelAndClose: true,
    confirmButtonText: this.$t("sales.delete"),
    cancelButtonText: this.$t("sales.cancel"),
  }
).then(() => {
  Quotation.DeleteQuotationSheet(arr)
    .then(() => {
      this.getdata();
      this.$message.success("单据删除成功");
      this.$refs.BillTable.clearSelection();
    })
    .catch((err) => {
      this.$message.error(err.Msg);
    });
});
```

## 千分符号

```js
 // 数字转换成千分符
  numFormat (num) {
    var res = num.toString().replace(/\d+/, function (n) { // 先提取整数部分
      return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
        return $1 + ','
      })
    })
    return res
  },
```

## 在 D2-admin 中添加路由和页面缓存

```js
//添加路由 demo为前缀符
[{ path: 'addQuotation', name: `${pre}addQuotationSheet`, component: () => import('@/pages/jv/sales/add/Quotation'), meta: { cache: true, title: '编辑报价单' } },]('demo-')

//路由跳转 通过路由添加的path跳转
this.$router.push({
        path: '/sales/addQuotation'
      })

//给页面添加缓存功能
//给页面添加name属性 前缀加上name 这样就能将将编辑的数据暂时缓存住了
name: 'demo-addQuotationSheet',
```

## 文件的上传和下载

### 1.上传

- :file-list 图片列表
- :before-upload 上传之前的钩子
- :http-request 上传调用的钩子

```html
<el-upload
  action="#"
  list-type="picture-card"
  :file-list="fileList"
  :before-upload="beforeUpload"
  :http-request="uploadFile"
>
  <i slot="default" class="el-icon-plus"></i>
  <div slot="file" slot-scope="{file}">
    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
    <span class="el-upload-list__item-actions">
      <span
        class="el-upload-list__item-preview"
        @click="handlePictureCardPreview(file)"
      >
        <i class="el-icon-zoom-in"></i>
      </span>
      <span
        v-if="!disabled"
        class="el-upload-list__item-delete"
        @click="handleDownload(file)"
      >
        <i class="el-icon-download"></i>
      </span>
      <span
        v-if="!disabled"
        class="el-upload-list__item-delete"
        @click="handleRemove(file)"
      >
        <i class="el-icon-delete"></i>
      </span>
    </span>
  </div>
</el-upload>
```

beforeUpload 上传前对上传文件进行一些预处理

```js
 // 上传前
    beforeUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!isLt2M) {
        this.$message.error(this.$t('Basics.B_PleaseUploadXlsx'))
        return false
      }
      var item = JSON.parse(JSON.stringify(this.FileItem))
      item.FilesName = file.name
      item.Operator = this.info.info.User.UsName
      item.lastModifiedDate = this.GeneralityJs.timeFormat(
        file.lastModifiedDate
      )
      item.UpLoadState = this.$t('Basics.B_Uploading')
      this.interval = setInterval(function () {
        item.UpLoadState += '.'
      }, 1000)
      this.fileData.push(item)
    },
```

uploadFile 将文件上传

```js
 // 上传自定义方法
    uploadFile (params) {
      const _file = params.file
      const isLt2M = _file.size / 1024 / 1024 < 5
      // 通过 FormData 对象上传文件
      var formData = new FormData()
      formData.append('file', _file)
      formData.append('BillId', this.BillListId)
      if (!isLt2M) {
        this.$message.error(this.$t('Basics.B_PleaseUploadXlsx'))
        return false
      }
      UpLoadFilesService.UpLoad(formData).then(data => {
        clearInterval(this.interval)
        this.GetUpLoadData()
      }).catch(err => {
        clearInterval(this.interval)
        this.fileData.splice(this.fileData.length - 1, 1)
        this.$message.error(this.$t('Basics.B_UploadFailedReason') + err.Msg)
      })
    },
```

### 2.下载

```js
    handleDownload (file) {
      this.$axios({
        baseURL: window.global_config.Base_Url + '/Mould/DownFile',
        method: 'post',
        responseType: 'blob', // 服务器返回的数据类型
        params: { // 其他参数
          fileName: file.name,
          BillId: this.BillListId
        },
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Ba ' + util.cookies.get('token') }
      })
        .then(res => {
          // 此处有个坑。这里用content保存文件流，最初是content=res，但下载的test.xls里的内容如下图1，
          // 检查了下才发现，后端对文件流做了一层封装，所以将content指向res.data即可
          // 另外，流的转储属于浅拷贝，所以此处的content转储仅仅是便于理解，并没有实际作用=_=
          const content = res.data
          const blob = new Blob([content]) // 构造一个blob对象来处理数据
          const fileName = file.name // 导出文件名
          // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
          // IE10以上支持blob但是依然不支持download
          if ('download' in document.createElement('a')) { // 支持a标签download的浏览器
            const link = document.createElement('a') // 创建a标签
            link.download = fileName // a标签添加属性
            link.style.display = 'none'
            link.href = URL.createObjectURL(blob)
            document.body.appendChild(link)
            link.click() // 执行下载
            URL.revokeObjectURL(link.href) // 释放url
            document.body.removeChild(link) // 释放标签
          } else { // 其他浏览器
            navigator.msSaveBlob(blob, fileName)
          }
        }).catch(err => {
          this.$message.error(err.Msg)
        })
    },
```

## 踩坑（关于接口请求赋值和组件生命周期）

### 1.场景重现

- 在 created 里做接口请求，并将请求的数据赋值给某个变量，然后将这个变量传递给子组件，发现子组件只显示了简单数据类型，复杂数据类型就没有显示。然后在子组件的 created 中打印传递过来的数据，发现全部为空。

- 在子组件的 created 中抛出某个数据，让父组件接受并传递给父组件的变量 a。但是父组件在 created 的时候，请求了某个接口，并将请求的数据赋值给了变量 a，这个时候子组件抛出的数据被覆盖了。

### 2. 总结

- 生命周期的执行是先父组件的 created，然后是子组件的 created。再然后是子组件的 created 先结束，再是父组件的 created 的结束
- 父组件的 created 中做接口请求，只是让接口请求开始，请求的时长不会影响组件的生命周期。一般请求成功之后的赋值，都是在组件 mounted 的之后。

## D2 的指定路由

### 1.引入方法

```js
//引入VUEx
import { mapState, mapActions } from 'vuex'
//关闭页面
 ...mapActions('d2admin/page', [
      'close'
    ]),
 //当前页面
   ...mapState('d2admin/page', [
      'opened',
      'current' // 用户获取当前页面的地址，用于关闭
    ])
```

### 2.指向跳转

```js
let tagName = this.current;
let TagName = {
  //路径
  path: "/sales/function/order",
  //页面名称
  name: "",
};
//关闭并跳转到指定页面
this.close({ tagName, TagName });
```

## 关于插槽(slot)

[借鉴文章](https://segmentfault.com/a/1190000012996217)

## 关于过滤器（filter）

```html
'2021'作为过滤器的参数
<div>{{'2021'|filterA|filterB}}</div>

分别为过滤器的两个参数
<div>{{'2020'，'2021'|filterA}}</div>
2020为第一个参数，a为第二个参数
<div>{{'2020'|filterA(a)}}</div>
```

通过过滤器对数据进行一些处理再显示，最终显示结果为返回到结果

```js
filters:{
    filterA:(value)=>{
        return value+'年'
    }，
    filterB:(value)=>{
        return value+'Hello'
    }，
}
```

## 关于监听器（watch）

[借鉴文章](https://www.cnblogs.com/shiningly/p/9471067.html)

## 关于自定义指令(directive)

[借鉴文章](https://blog.csdn.net/ZHXT__/article/details/110309070)

除了核心功能默认内置的指令 (v-model 和 v-show)，Vue 也允许注册自定义指令。有的情况下，对普通 DOM 元素进行底层操作，这时候就会用到自定义指令

```html
<template>
  <div class="hello">
    <div v-test="name"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
       name:'我是名字',
      }
    },
    directives:{
    	test:{
  	    inserted: function (el,binding) {// 指令的定义
  	       / /el为绑定元素，可以对其进行dom操作
  	       console.log(binding) //一个对象，包含很多属性属性
  	    },
  	    bind: function (el, binding, vnode) {
  		    el.innerHTML =binding.value
  		  }
    	}
    },
  }
</script>
```

## 关于混入（minxins）

mixins 是对 vue 组件的一种扩展，将一些公用的常用数据或者方法，构建一个可被混入的数据结构，被不同的 vue 组件进行合并，就可以在不同的 vue 组件中使用相同的方法或者基础数据。

methods, components 和 directives，将被混合为同一个对象。两个对象键名冲突时，取组件对象的键值对。

也就是页面先执行混入的生命周期，再执行 vue 文件的生命周期。如果 vue 文件和混入有同名方法，vue 文件的会将混入覆盖，这样就可以在 vue 文件中对混入进行重写。

### 1.局部混入

在相应文件夹建立 mixins.js 文件，里面写公共复用代码，然后在组件中直接引入设置 mixins

### 2.全局混入

app.mixins 使用要格外小心，一旦使用全局混入，将影响每一个之后创建的组件

```js
var mixin = {
  created: function () {
    console.log("混入对象的钩子被调用");
  },
};

new Vue({
  mixins: [mixin],
  created: function () {
    console.log("组件钩子被调用");
  },
});

// => "混入对象的钩子被调用"
// => "组件钩子被调用"
```

## 关于大型项目的样式管理（scss）

[借鉴文章](https://www.jianshu.com/p/e3c2ebded111)

## 关于 every 和 some 数组方法

只要达到要求，就不再继续遍历

### 1.every()

every() 方法用于检测非空数组中`所有元素`是否都符合指定条件（通过函数提供），如果数组中检测到有一个元素不满足，则整个表达式返回 _false_ ，且剩余的元素不会再进行检测。如果所有元素都满足条件，则返回 true。

### 2.some()

some()方法用于检测数组中的元素(只要有一个元素满足)是否满足指定条件（函数提供）。如果有一个元素满足条件，则表达式返回*true* , 剩余的元素不会再执行检测。如果没有满足条件的元素，则返回 false。

## 关于短路运算（&&和||）

短路运算符就是从左到右的运算中前者满足要求，就不再执行后者了； 可以理解为：

&&为取假运算，从左到右依次判断，如果遇到一个假值，就返回假值，以后不再执行，否则返回最后一个真值；

|| 为取真运算，从左到右依次判断，如果遇到一个真值，就返回真值，以后不再执行，否则返回最后一个假值。
