---
title: 5 个 好用的 VueUse 库函数
date: 2021-10-13
tags:
  - 开发技巧
categories:
  - 开发
---

# 5 个 好用的 VueUse 库函数

Vueuse 是 Anthony Fu 的一个开源项目，它为 Vue 开发人员提供了大量适用于 Vue 2 和 Vue 3 的基本 Composition API 实用程序函数。

它为常见的开发人员用例提供了数十种解决方案，例如，跟踪引用更改、检测元素可见性、简化常见的 Vue 模式、键盘/鼠标输入等。这是真正节省开发时间的好方法，因为你不必自己添加所有这些标准功能。

我喜欢 VueUse 库，因为在决定提供哪些实用程序时，它确实将开发人员放在首位，而且它是一个维护良好的库，因为它与当前版本的 Vue 保持同步。

## **VueUse 有哪些实用程序？**

如果你想查看每个实用程序的完整列表，我绝对建议你查看官方文档。但总结一下，VueUse 中有 9 种函数。

1. 动画（Animation）—包含易于使用的过渡、超时和计时函数
2. 浏览器（Browser）—可用于不同的屏幕控制、剪贴板、首选项等
3. 组件（Component）— 为不同的组件方法提供简写
4. Formatters – 提供反应时间格式化功能
5. 传感器（Sensors ）—用于监听不同的 DOM 事件、输入事件和网络事件
6. 状态（State ）—管理用户状态（全局、本地存储、会话存储）
7. 实用程序（Utility）—不同的实用程序函数，如 getter、条件、引用同步等
8. Watch —更高级的观察者类型，如可暂停观察者、去抖动观察者和条件观察者
9. 杂项（Misc）— 事件、WebSockets 和 Web Worker 的不同类型的功能

这些类别中的大多数都包含几个不同的功能，因此 VueUse 可以灵活地用于你的用例，并且可以作为快速开始构建 Vue 应用程序的绝佳场所。

在本文中，我们将研究 5 个不同的 VueUse 函数，以便你了解在这个库中工作是多么容易。

但首先，让我们将它添加到我们的 Vue 项目中！

## **将 VueUse 安装到你的 Vue 项目中**

VueUse 的最佳特性之一是它仅通过一个包即可与 Vue 2 和 Vue 3 兼容！

安装 VueUse 有两种选择：npm 或 CDN

```bash
npm i @vueuse/core # yarn add @vueuse/core
```

我建议使用 NPM，因为它使用法更容易理解，但如果我们使用 CDN，则可以通过以下方式在应用程序中访问 VueUse window.VueUse

对于 NPM 安装，所有函数都可以通过@vueuse/core 使用标准对象解构导入它们来访问，如下所示：

```js
// 从 VueUse 导入的示例
import { useRefHistory } from "@vueuse/core";
```

好的。现在我们已经安装了 VueUse，让我们在我们的应用程序中使用它。

## **1、useRefHistory 跟踪响应式数据的更改**

useRefHistory 跟踪对 ref 所做的每个更改并将其存储在数组中。这使我们可以轻松地为我们的应用程序提供撤消和重做功能。

让我们看一个示例，其中我们正在构建一个我们希望能够撤消的文本区域。

第一步是在不使用 VueUse 的情况下创建我们的基本组件——使用 ref、textarea 和用于撤消和重做的按钮。

```vue
<template>
  <p>
    <button>Undo</button>
    <button>Redo</button>
  </p>
  <textarea v-model="text" />
</template>

<script setup>
import { ref } from "vue";
const text = ref("");
</script>

<style scoped>
button {
  border: none;
  outline: none;
  margin-right: 10px;
  background-color: #2ecc71;
  color: white;
  padding: 5px 10px;
}
</style>
```

然后，让我们通过导入 useRefHistory 函数然后从我们的文本引用中提取历史、撤消和重做属性来添加 VueUse 。这就像调用 useRefHistory 和传递我们的 ref 一样简单。

```js
import { ref } from 'vue'import { useRefHistory } from '@vueuse/core'
const text = ref('')const { history, undo, redo } = useRefHistory(text)
```

每次我们的 ref 更改时，这都会触发一个观察者——更新 history 我们刚刚创建的属性。

然后，为了让我们真正了解发生了什么，让我们在模板中打印历史记录，undo 并 redo 在单击相应按钮时调用我们的函数。

```vue
<template>
  <p>
    <button @click="undo">Undo</button>
    <button @click="redo">Redo</button>
  </p>
  <textarea v-model="text" />
  <ul>
    <li v-for="entry in history" :key="entry.timestamp">
      {{ entry }}
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import { useRefHistory } from "@vueuse/core";
const text = ref("");
const { history, undo, redo } = useRefHistory(text);
</script>

<style scoped>
button {
  border: none;
  outline: none;
  margin-right: 10px;
  background-color: #2ecc71;
  color: white;
  padding: 5px 10px;
}
</style>
```

好的，现在让我们运行它。当我们输入时，每个字符都会触发历史数组中的一个新条目，如果我们单击撤消/重做，我们将转到相应的条目。

还有不同的选项可以为此功能添加更多功能。例如，我们可以深入跟踪反应对象并限制这样的历史条目的数量。

```js
//高级选项
const { history, undo, redo } = useRefHistory(text, {
  deep: true,
  capacity: 10,
});
```

如需完整的选项列表，请务必查看文档。

## **2、onClickOutside 关闭模态**

onClickOutside 检测在元素之外进行的任何点击。根据我的经验，此功能最常见的用例是关闭任何模式或弹出窗口。

通常，我们希望模态屏蔽网页的其余部分以吸引用户的注意力并限制错误。但是，如果他们确实在模态之外单击，我们希望它关闭。

只需两个步骤即可完成此操作：

1. 为我们要检测的元素创建一个模板引用
2. onClickOutside 使用此模板引用 运行

这是一个带有弹出窗口的简单组件，使用 onClickOutside.

```vue
<template>
  <button @click="open = true">Open Popup</button>
  <div class="popup" v-if="open">
    <div class="popup-content" ref="popup">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis aliquid
      autem reiciendis eius accusamus sequi, ipsam corrupti vel laboriosam
      necessitatibus sit natus vero sint ullam! Omnis commodi eos accusantium
      illum?
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
const open = ref(false); // state of our popup
const popup = ref(); // template ref
// whenever our popup exists, and we click anything BUT it
onClickOutside(popup, () => {
  open.value = false;
});
</script>

<style scoped>
button {
  border: none;
  outline: none;
  margin-right: 10px;
  background-color: #2ecc71;
  color: white;
  padding: 5px 10px;
}
.popup {
  position: fixed;
  top: ;
  left: ;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(, , , 0.1);
}
.popup-content {
  min-width: 300px;
  padding: 20px;
  width: 30%;
  background: #fff;
}
</style>
```

结果是这样的，我们可以用我们的按钮打开弹出窗口，然后通过在弹出内容窗口外单击来关闭它。

## **3、useVModel 简化了 v-model 绑定**

Vue 开发人员的一个常见用例是为组件创建自定义 v-model 绑定。这意味着我们的组件接受一个值作为 prop，并且每当该值被修改时，我们的组件都会向父级发出更新事件。

有关构建自定义 v-model 的完整教程，请查看我们关于该主题的完整指南。

useVModel 函数将其简化为仅使用标准 ref 语法。假设我们有一个自定义文本输入，它试图为其文本输入的值创建一个 v-model。通常，我们必须接受该值的 prop，然后发出更改事件以更新父组件中的数据值。

我们可以像普通的 ref 一样使用和对待它，而不是使用 ref 和调用 props.value and ！这有助于减少我们需要记住的不同语法的数量！update:valueuseVModel

```vue
<template>
  <div>
    <input type="text" :value="data" @input="update" />
  </div>
</template>

<script>
import { useVModel } from "@vueuse/core";
export default {
  props: ["data"],
  setup(props, { emit }) {
    const data = useVModel(props, "data", emit);
    console.log(data.value); // equal to props.data
    data.value = "name"; // equal to emit('update:data', 'name')
    const update = (event) => {
      data.value = event.target.value;
    };
    return {
      data,
      update,
    };
  },
};
</script>
```

每当我们需要访问我们的值时，我们只需调用.valueuseVModel 就会从我们的组件 props 中获取值。每当我们更改对象的值时，useVModel 都会向父组件发出更新事件。

这是父组件可能是什么样子的一个快速示例......

```vue
<template>
  <div>
    <p> {{ data }} </p>
    <custom-input
      :data="data"
      @update:data="data = $event"
    />
  </div>
</template>

<script>
import CustomInput from './components/CustomInput.vue'
import { ref } from 'vue'
export default {
  components: {
    CustomInput,
  },
  setup () {
    const data = ref('hello')
    return {
      data
    }
  }
}
```

结果看起来像这样，我们在父级中的值始终与子级中的输入保持同步。

## **4、使用 IntersectionObserver 跟踪元素可见性**

在确定两个元素是否重叠时，Intersection Observers 非常强大。一个很好的用例是检查元素当前是否在视口中可见。

本质上，它检查目标元素与根元素/文档相交的百分比。如果该百分比超过某个阈值，它会调用一个回调来确定目标元素是否可见。

useIntersectionObserver 提供使用 IntersectionObserver API 的简单语法。我们需要做的就是为我们要检查的元素提供一个模板引用。

默认情况下，IntersectionObserver 将使用文档的视口作为根，阈值为 0.1——因此当在任一方向超过该阈值时，我们的交叉观察者将触发。

该示例的代码可能看起来像这样，其中我们有一个虚拟段落，它只占用视口、目标元素中的空间。

```vue
<template>
  <p>Is target visible? {{ targetIsVisible }}</p>
  <div class="container">
    <div class="target" ref="target">
      <h1>Hello world</h1>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
export default {
  setup() {
    const target = ref(null);
    const targetIsVisible = ref(false);
    const { stop } = useIntersectionObserver(
      target,
      ([{ isIntersecting }], observerElement) => {
        targetIsVisible.value = isIntersecting;
      }
    );
    return {
      target,
      targetIsVisible,
    };
  },
};
</script>

<style scoped>
.container {
  width: 80%;
  margin: auto;
  background-color: #fafafa;
  max-height: 300px;
  overflow: scroll;
}
.target {
  margin-top: 500px;
  background-color: #1abc9c;
  color: white;
  padding: 20px;
}
</style>
```

当我们运行它并滚动时，我们会看到它正确更新。

我们还可以为 Intersection Observer 指定更多选项，例如，更改其根元素、边距（用于计算交点的根边界框的偏移量）和阈值级别。

```js
//useIntersectionObserver 的选项
const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    targetIsVisible.value = isIntersecting;
  },
  {
    // root, rootMargin, threshold, window
    // full options in the source: https://github.com/vueuse/vueuse/blob/main/packages/core/useIntersectionObserver/index.ts
    threshold: 0.5,
  }
);
```

同样重要的是看到这个方法返回一个 stop 函数，我们可以调用它来停止观察交叉点。如果我们只想跟踪元素第一次在屏幕上可见时，这尤其有用。

在此代码片段中，一旦 targetIsVisible 设置为 true，观察者将停止，即使我们滚动离开目标元素，我们的值仍将保持为 true。

```js
//停止 IntersectionObserver
const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    targetIsVisible.value = isIntersecting;
    if (isIntersecting) {
      stop();
    }
  }
);
```

## **5、useTransition 在值之间缓和**

useTransition 是整个 VueUse 库中我最喜欢的函数之一。它允许我们在一行中平滑地在数值之间缓和。

我们有一个存储为 ref 的数字源和一个输出，它将是不同值之间的缓和。例如，假设我们要为 Vue 3 备忘单构建一个类似于注册页面上的计数器。

我们可以通过三个步骤来做到这一点：

- 创建我们的 countref 并将其初始化为零
- 创建我们的 output 参考 useTransition（设置我们的持续时间和转换类型）
- 改变 count 的价值

```vue
// 使用转换代码
<script setup>
import { ref } from "vue";
import { useTransition, TransitionPresets } from "@vueuse/core";

const source = ref(0);

const output = useTransition(source, {
  duration: 3000,
  transition: TransitionPresets.easeOutExpo,
});

source.value = 5000;
</script>
```

然后，在我们的模板中，我们希望显示的值，output 因为它可以在不同值之间平滑过渡。

```vue
<template>
  <h2>
    <p>Join over</p>
    <p>{{ Math.round(output) }}+</p>
    <p>Developers</p>
  </h2>
</template>

<script setup>
import { ref } from "vue";
import { useTransition, TransitionPresets } from "@vueuse/core";
const source = ref();
const output = useTransition(source, {
  duration: 3000,
  transition: TransitionPresets.easeOutExpo,
});
source.value = 5000;
</script>
```

我们还可以 useTransition 用来转换整个数字数组。这在处理位置或颜色时很有用。处理颜色的一个重要技巧是使用计算属性将 RGB 值格式化为正确的颜色语法。

```vue
<template>
  <h2 :style="{ color: color }">COLOR CHANGING</h2>
</template>
<script setup>
import { ref, computed } from "vue";
import { useTransition, TransitionPresets } from "@vueuse/core";
const source = ref([, ,]);
const output = useTransition(source, {
  duration: 3000,
  transition: TransitionPresets.easeOutExpo,
});
const color = computed(() => {
  const [r, g, b] = output.value;
  return `rgb(${r}, ${g}, ${b})`;
});
source.value = [255, , 255];
</script>
```

我们还可以采用一些很酷的方法来进一步定制它，可以使用任何内置的过渡预设或使用 CSS 缓动功能定义，这个可以自行决定。

## **最后的想法**

这绝不是 VueUse 的完整指南。这些只是我发现 VueUse 许多函数中最有趣的一些函数而已。

我喜欢所有这些实用函数，它可以帮助我们加速开发项目，提升开发效率，因为它们中的每一个都是为了解决特定但常见的用例而设计的。
