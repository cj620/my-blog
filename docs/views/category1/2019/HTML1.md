---
title: HTML知识点
slider: auto
date: 2019-12-03
tags:
 - HTML
categories:
 - 面试
---


# HTML知识点

> 标签：新增语义化标签（`aside / figure / section / header / footer / nav`等），增加多媒体标签`video`和`audio`，使得样式和结构更加分离
>
> 属性：增强表单，主要是增强了`input`的type属性；`meta`增加charset以设置字符集；`script`增加async以异步加载脚本
>
> 存储：增加`localStorage`、`sessionStorage`和`indexedDB`，引入了`application cache`对web和应用进行缓存
>
> API：增加`拖放API`、`地理定位`、`SVG绘图`、`canvas绘图`、`Web Worker`、`WebSocket`

## 1.H5的新特性

> 1. 声明方式
> 2. 语义化更好的标签
> 3. 音频、视频
> 4. 表单控件
> 5. 本地存储
> 6. 画布
> 7. 地理
> 8. 推拽施放
> 9. Web Workers

## 2.更好的语义化标签

> 为了规范HTML页面，有利于搜索引擎

- header
- footer
- article
- aside
- section
- detail
- summary
- dialog

## 3.表单控件

- color
- date
- datetime
- datetime-local
- email
- month
- number
- range
- search
- tel
- time
- url
- week

## 4.本地存储

长期存储数据的 `localStorage`，浏览器关闭后数据不丢失**比较常用**

临时存储的 `sessionStorage`，浏览器关闭后自动删除，**实际工作中使用的场景不多**

## 5.Web Workers

> Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。
>
> 在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。
>
> 这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

## 6.Cookie

> cookie 数据始终在同源的 http 请求中携带（即使不需要），即 cookie 在浏览器和服务器间来回传递。
>
> 数据量大概8kb
>
> cookie 是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）。
>
> 另外 cookie 还需要指定作用域，不可以跨域调用。

## 7.网页中 mate viewport 具体参数使用

- width    设置 viewport 宽度，为一个正整数，或字符串‘device-width’
- device-width  设备宽度
- height   设置 viewport 高度，一般设置了宽度，会自动解析出高度，可以不用设置
- initial-scale    默认缩放比例（初始缩放比例），为一个数字，可以带小数
- minimum-scale    允许用户最小缩放比例，为一个数字，可以带小数
- maximum-scale    允许用户最大缩放比例，为一个数字，可以带小数
- user-scalable    是否允许手动缩放

##  8.meta标签

- name

名称 / 值对中的名称。author、description、keywords、generator、revised、others。 把 content 属性关联到一个名称。

- http-equiv

没有 name 时，会采用这个属性的值。content-type、expires、refresh、set-cookie。把 content 属性关联到 http 头部

- content

名称 / 值对中的值， 可以是任何有效的字符串。 始终要和 name 属性或 http-equiv 属性一起使用

- scheme

用于指定要用来翻译属性值的方案

## 9.SVG

> SVG 表示（scalable vector graphics）可缩放矢量图形。这是一个基于文本的图形语言，它可以绘制使用文本、线、点等的图形，因此可以轻巧又快速地渲染。
>
> SVG 可以成为任何复杂的组合图形。SVG 支持渐变、旋转、滤镜效果、JavaScript 接口等等功能，但是所有这些额外的语言特性，都需要在一个定义好的图形区域内实现。

## 10.Canvas和SVG的区别

> Canvas 和 SVG 都可以在浏览器上绘制图形。
>
> SVG Canvas 绘制后记忆，换句话说任何使用 SVG 绘制的形状都能被记忆和操作，浏览器可以再次显示 Canvas 则是绘制后忘记，一旦绘制完成你就不能访问像素和操作它 SVG 对于创建图形例如 CAD 软件是良好的，一旦东西绘制，用户就想去操作它 Canvas 则用于绘制和遗忘类似动漫和游戏的场画。
>
> 为了之后的操作，SVG 需要记录坐标，所以比较缓慢。
>
> 因为没有记住以后事情的任务，所以 Canvas 更快。
>
> 我们可以用绘制对象的相关事件处理我们不能使用绘制对象的相关事件处理，因为我们没有他们的参考分辨率独立分辨率依赖

| Canvas                                                       |                             SVG                              |
| :----------------------------------------------------------- | :----------------------------------------------------------: |
| 通过 JavaScript 来绘制 2D 图形                               |              是一种使用 XML 描述 2D 图形的语言               |
| 是HTML5提供的新元素``                                        |               历史久远，并不是HTML5转悠的标签                |
| 位图（标量图），放大或改变尺寸会失真；逐像素进行渲染，依赖分辨率 |         矢量图，放大或改变尺寸不会失真；不依赖分辨率         |
| 弱的文本渲染能力（因为放大会失真）                           | 最适合带有大型渲染区域的应用程序，比如谷歌地图（因为放大不会失真） |
| 能够以 .png 或 .jpg 格式保存结果图像；能够引入 .png 或 .jpg格式的图片 | 不能以 .png 或 .jpg 格式保存结果图像；不能引入 .png 或 .jpg格式的图片 |
| 不支持事件处理器（一旦图形被绘制完成，它就不会继续得到浏览器的关注。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。） | 支持事件处理器（SVG DOM 中的每个元素都是可用的。您可以为某个元素附加 JavaScript 事件处理器。每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。） |
| 不能被引擎抓取                                               |                        可以被引擎抓取                        |
| ---                                                          |   复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）    |
| 最适合图像密集型的游戏，其中的许多对象会被频繁重绘           |                        不适合游戏应用                        |