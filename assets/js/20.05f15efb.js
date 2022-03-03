(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{535:function(e,v,_){"use strict";_.r(v);var t=_(8),a=Object(t.a)({},(function(){var e=this,v=e.$createElement,_=e._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[_("h2",{attrs:{id:"_1-diff算法"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-diff算法"}},[e._v("#")]),e._v(" 1.Diff算法")]),e._v(" "),_("blockquote",[_("p",[e._v("由于在浏览器中操作DOM的代价是非常“昂贵”的，所以才在Vue引入了Virtual DOM，Virtual DOM是对真实DOM的一种抽象描述")]),e._v(" "),_("p",[e._v("即使使用了Virtual DOM来进行真实DOM的渲染，在页面更新的时候，也不能全量地将整颗Virtual DOM进行渲染，而是去渲染改变的部分，这时候就需要一个计算Virtual DOM树改变部分的算法了，这个算法就是Diff算法。")])]),e._v(" "),_("h2",{attrs:{id:"_2-v-for为什么要使用key？"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-v-for为什么要使用key？"}},[e._v("#")]),e._v(" 2.v-for为什么要使用key？")]),e._v(" "),_("blockquote",[_("p",[e._v('vue中列表循环需加:key="唯一标识" 唯一标识可以是item里面id index等，因为vue组件高度复用增加Key可以标识组件的唯一性，为了更好地区别各个组件 key的作用主要是为了高效的更新虚拟DOM')])]),e._v(" "),_("ul",[_("li",[e._v("首先讲一下diff算法的处理方法，对操作前后的dom树同一层的节点进行对比，一层一层对比")])]),e._v(" "),_("p",[_("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/3973616-cbe6ef9bad920f51.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/576/format/webp",alt:""}})]),e._v(" "),_("ul",[_("li",[e._v("当某一层有很多相同的节点时，也就是列表节点时，Diff算法的更新过程默认情况下也是遵循以上原则。比如一下这个情况：")])]),e._v(" "),_("p",[_("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/3973616-6d930e85939f0a3e.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/477/format/webp",alt:""}})]),e._v(" "),_("ul",[_("li",[e._v("我们希望可以在B和C之间加一个F，Diff算法默认执行起来是这样的：")])]),e._v(" "),_("p",[_("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/3973616-c93a83cb2203fa54.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/572/format/webp",alt:""}})]),e._v(" "),_("ul",[_("li",[_("p",[e._v("即把C更新成F，D更新成C，E更新成D，最后再插入E，是不是很没有效率？")]),e._v(" "),_("p",[e._v("所以我们需要使用key来给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点，找到正确的位置区插入新的节点。")]),e._v(" "),_("p",[_("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/3973616-25f6c171772b50b6.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/452/format/webp",alt:""}})])])]),e._v(" "),_("h2",{attrs:{id:"_3-vue-js-中常见性能优化"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-vue-js-中常见性能优化"}},[e._v("#")]),e._v(" 3.Vue.js 中常见性能优化")]),e._v(" "),_("blockquote",[_("ol",[_("li",[_("p",[e._v("编码优化:")])]),e._v(" "),_("li",[_("p",[_("code",[e._v("Vue")]),e._v("加载性能优化")])]),e._v(" "),_("li",[_("p",[e._v("用户体验")])]),e._v(" "),_("li",[_("p",[_("code",[e._v("SEO")]),e._v("优化")])]),e._v(" "),_("li",[_("p",[e._v("打包优化")])]),e._v(" "),_("li",[_("p",[e._v("缓存，压缩")])])])]),e._v(" "),_("p",[e._v("1.编码优化")]),e._v(" "),_("ul",[_("li",[e._v("1.不要将所有的数据都放在data中，data中的数据都会增加getter和setter，会收集对应的watcher")]),e._v(" "),_("li",[e._v("2."),_("code",[e._v("vue")]),e._v(" 在 v-for 时给每项元素绑定事件需要用事件代理")]),e._v(" "),_("li",[e._v("3."),_("code",[e._v("SPA")]),e._v("页面采用keep-alive缓存组件")]),e._v(" "),_("li",[e._v("4.拆分组件( 提高复用性、增加代码的可维护性,减少不必要的渲染 )")]),e._v(" "),_("li",[e._v("5."),_("code",[e._v("v-if")]),e._v(" 当值为false时内部指令不会执行,具有阻断功能，很多情况下使用v-if替代v-show")]),e._v(" "),_("li",[e._v("6."),_("code",[e._v("key")]),e._v("保证唯一性 ( 默认"),_("code",[e._v("vue")]),e._v("会采用就地复用策略 )")]),e._v(" "),_("li",[e._v("7."),_("code",[e._v("Object.freeze")]),e._v(" 冻结数据")]),e._v(" "),_("li",[e._v("8.合理使用路由懒加载、异步组件")]),e._v(" "),_("li",[e._v("9.尽量采用runtime运行时版本")]),e._v(" "),_("li",[e._v("10.数据持久化的问题 （防抖、节流）")])]),e._v(" "),_("p",[e._v("2.vue性能加载优化")]),e._v(" "),_("ul",[_("li",[e._v("第三方模块按需导入 ("),_("code",[e._v("babel-plugin-component")]),e._v(")")]),e._v(" "),_("li",[e._v("滚动到可视区域动态加载 ( https://tangbc.github.io/vue-virtual-scroll-list )")]),e._v(" "),_("li",[e._v("图片懒加载 (https://github.com/hilongjw/vue-lazyload.git)")])]),e._v(" "),_("p",[e._v("3.用户体验")]),e._v(" "),_("ul",[_("li",[_("code",[e._v("app-skeleton")]),e._v("骨架屏")]),e._v(" "),_("li",[_("code",[e._v("app-shell")]),e._v("app壳")]),e._v(" "),_("li",[_("code",[e._v("pwa")])])]),e._v(" "),_("h2",{attrs:{id:"_4-vue3-0的改进？"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_4-vue3-0的改进？"}},[e._v("#")]),e._v(" 4.Vue3.0的改进？")]),e._v(" "),_("ul",[_("li",[_("code",[e._v("Vue3")]),e._v("采用了TS来编写")]),e._v(" "),_("li",[e._v("支持 "),_("code",[e._v("Composition API")])]),e._v(" "),_("li",[_("code",[e._v("Vue3")]),e._v("中响应式数据原理改成"),_("code",[e._v("proxy")])]),e._v(" "),_("li",[_("code",[e._v("vdom")]),e._v("的对比算法更新，只更新"),_("code",[e._v("vdom")]),e._v("的绑定了动态数据的部分")])]),e._v(" "),_("h2",{attrs:{id:"_5-谈谈你对-vue-js-中-keep-alive-的了解"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_5-谈谈你对-vue-js-中-keep-alive-的了解"}},[e._v("#")]),e._v(" 5.谈谈你对 Vue.js 中 keep-alive 的了解")]),e._v(" "),_("p",[e._v("keep-alive可以实现组件的缓存，当组件切换时不会对当前组件进行卸载,常用的2个属性"),_("code",[e._v("include")]),e._v("/"),_("code",[e._v("exclude")]),e._v(",2个生命周期actievated,deactivated")]),e._v(" "),_("h2",{attrs:{id:"_6-vue的生命周期内部可以做什么事情？"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_6-vue的生命周期内部可以做什么事情？"}},[e._v("#")]),e._v(" 6.Vue的生命周期内部可以做什么事情？")]),e._v(" "),_("ul",[_("li",[_("code",[e._v("created")]),e._v(" 实例已经创建完成，因为它是最早触发的原因可以进行一些数据，资源的请求。")]),e._v(" "),_("li",[_("code",[e._v("mounted")]),e._v(" 实例已经挂载完成，可以进行一些DOM操作")]),e._v(" "),_("li",[_("code",[e._v("beforeUpdate")]),e._v(" 可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。")]),e._v(" "),_("li",[_("code",[e._v("updated")]),e._v(" 可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。 该钩子在服务器端渲染期间不被调用。")]),e._v(" "),_("li",[_("code",[e._v("destroyed")]),e._v(" 可以执行一些优化操作,清空定时器，解除绑定事件")])]),e._v(" "),_("h2",{attrs:{id:"_7-描述组件渲染和更新过程"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_7-描述组件渲染和更新过程"}},[e._v("#")]),e._v(" 7.描述组件渲染和更新过程")]),e._v(" "),_("p",[e._v("渲染组件时，会通过"),_("code",[e._v("Vue.extend")]),e._v("方法构建子组件的构造函数，并进行实例化。最终手动调用"),_("code",[e._v("$mount()")]),e._v("进行挂载。更新组件时会进行"),_("code",[e._v("patchVnode")]),e._v("流程.核心就是diff算法")]),e._v(" "),_("h2",{attrs:{id:"_8-vue父子组件生命周期调用顺序"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_8-vue父子组件生命周期调用顺序"}},[e._v("#")]),e._v(" 8."),_("code",[e._v("Vue")]),e._v("父子组件生命周期调用顺序")]),e._v(" "),_("ul",[_("li",[e._v("加载渲染过程")])]),e._v(" "),_("blockquote",[_("p",[e._v("父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted")])]),e._v(" "),_("ul",[_("li",[e._v("子组件更新过程")])]),e._v(" "),_("blockquote",[_("p",[e._v("父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated")])]),e._v(" "),_("h2",{attrs:{id:"_9-vue-js-组件如何通信以及有哪些方式"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_9-vue-js-组件如何通信以及有哪些方式"}},[e._v("#")]),e._v(" 9.Vue.js 组件如何通信以及有哪些方式?")]),e._v(" "),_("ul",[_("li",[e._v("父子间通信 父->子通过"),_("code",[e._v("props")]),e._v("、子-> 父"),_("code",[e._v("$on、$emit")])]),e._v(" "),_("li",[e._v("获取父子组件实例的方式"),_("code",[e._v("$parent、$children")])]),e._v(" "),_("li",[e._v("在父组件中提供数据子组件进行消费 "),_("code",[e._v("Provide、inject")])]),e._v(" "),_("li",[_("code",[e._v("Ref")]),e._v("获取实例的方式调用组件的属性或者方法")]),e._v(" "),_("li",[_("code",[e._v("Event Bus")]),e._v(" 实现跨组件通信")]),e._v(" "),_("li",[_("code",[e._v("Vuex")]),e._v("状态管理实现通信")])]),e._v(" "),_("h2",{attrs:{id:"_1-vue-router中导航守卫有哪些？"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-vue-router中导航守卫有哪些？"}},[e._v("#")]),e._v(" 1."),_("code",[e._v("Vue-Router")]),e._v("中导航守卫有哪些？")]),e._v(" "),_("p",[e._v("完整的导航解析流程")]),e._v(" "),_("ol",[_("li",[e._v("导航被触发。")]),e._v(" "),_("li",[e._v("在失活的组件里调用离开守卫。")]),e._v(" "),_("li",[e._v("调用全局的 "),_("code",[e._v("beforeEach")]),e._v(" 守卫。")]),e._v(" "),_("li",[e._v("在重用的组件里调用 "),_("code",[e._v("beforeRouteUpdate")]),e._v(" 守卫 (2.2+)。")]),e._v(" "),_("li",[e._v("在路由配置里调用 "),_("code",[e._v("beforeEnter")]),e._v("。")]),e._v(" "),_("li",[e._v("解析异步路由组件。")]),e._v(" "),_("li",[e._v("在被激活的组件里调用 "),_("code",[e._v("beforeRouteEnter")]),e._v("。")]),e._v(" "),_("li",[e._v("调用全局的 "),_("code",[e._v("beforeResolve")]),e._v(" 守卫 (2.5+)。")]),e._v(" "),_("li",[e._v("导航被确认。")]),e._v(" "),_("li",[e._v("调用全局的 "),_("code",[e._v("afterEach")]),e._v(" 钩子。")]),e._v(" "),_("li",[e._v("触发 DOM 更新。")]),e._v(" "),_("li",[e._v("用创建好的实例调用 "),_("code",[e._v("beforeRouteEnter")]),e._v(" 守卫中传给 "),_("code",[e._v("next")]),e._v(" 的回调函数。")])])])}),[],!1,null,null,null);v.default=a.exports}}]);