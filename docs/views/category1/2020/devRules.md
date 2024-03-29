---
title: 写好 JS 条件语句的 5 条守则
date: 2020-02-08
tags:
  - 开发技巧
categories:
  - 开发
---

## 写好 JS 条件语句的 5 条守则

在用 JavaScript 工作时，我们经常和条件语句打交道，这里有 5 条让你写出更好/干净的条件语句的建议。

目录：

1.多重判断时使用 Array.includes

2.更少的嵌套，尽早 return

3.使用默认参数和解构

4.倾向于遍历对象而不是 Switch 语句

5.对 所有/部分 判断使用 Array.every & Array.some

6.总结

### 1.多重判断时使用 Array.includes

让我们看一下下面这个例子:

```js
// condition
function test(fruit) {
  if (fruit == "apple" || fruit == "strawberry") {
    console.log("red");
  }
}
```

第一眼，上面这个例子看起来没问题。如果我们有更多名字叫 cherry 和 cranberries 的红色水果呢？我们准备用更多的 || 来拓展条件语句吗？

我们可以用 Array.includes (Array.includes)重写条件语句。

```js
function test(fruit) {
  const redFruits = ["apple", "strawberry", "cherry", "cranberries"];

  if (redFruits.includes(fruit)) {
    console.log("red");
  }
}
```

我们把红色的水果(red fruits)这一判断条件提取到一个数组。这样一来，代码看起来更整洁。

### 2.更少的嵌套，尽早 Return

让我们拓展上一个例子让它包含两个条件。

- 如果没有传入参数 fruit，抛出错误
- 接受 quantity 参数，并且在 quantity 大于 10 时打印出来

```js
function test(fruit, quantity) {
  const redFruits = ["apple", "strawberry", "cherry", "cranberries"];

  // 条件 1: fruit 必须有值
  if (fruit) {
    // 条件 2: 必须是red的
    if (redFruits.includes(fruit)) {
      console.log("red");

      // 条件 3: quantity大于10
      if (quantity > 10) {
        console.log("big quantity");
      }
    }
  } else {
    throw new Error("No fruit!");
  }
}

// 测试结果
test(null); // error: No fruits
test("apple"); // print: red
test("apple", 20); // print: red, big quantity
```

在上面的代码, 我们有:

- 1 个 if/else 语句筛选出无效的语句
- 3 层 if 嵌套语句 (条件 1, 2 & 3)

我个人遵循的规则一般是在发现无效条件时，尽早 Return。

```js
/_ 当发现无效语句时，尽早Return _/;

function test(fruit, quantity) {
  const redFruits = ["apple", "strawberry", "cherry", "cranberries"];

  // 条件 1: 尽早抛出错误
  if (!fruit) throw new Error("No fruit!");

  // 条件 2: 必须是红色的
  if (redFruits.includes(fruit)) {
    console.log("red");

    // 条件 3: 必须是大质量的
    if (quantity > 10) {
      console.log("big quantity");
    }
  }
}
```

这样一来，我们少了一层嵌套语句。这种编码风格非常好，尤其是当你有很长的 if 语句的时候(想象你需要滚动到最底层才知道还有 else 语句，这并不酷)

我们可以通过 倒置判断条件 & 尽早 return 进一步减少 if 嵌套。看下面我们是怎么处理判断 条件 2 的:

```js
/_ 当发现无效语句时，尽早Return _/;

function test(fruit, quantity) {
  const redFruits = ["apple", "strawberry", "cherry", "cranberries"];

  // 条件 1: 尽早抛出错误
  if (!fruit) throw new Error("No fruit!");
  // 条件 2: 当水果不是红色时停止继续执行
  if (!redFruits.includes(fruit)) return;

  console.log("red");

  // 条件 3: 必须是大质量的
  if (quantity > 10) {
    console.log("big quantity");
  }
}
```

通过倒置判断条件 2，我们的代码避免了嵌套语句。这个技巧在我们需要进行很长的逻辑判断时是非常有用的，特别是我们希望能够在条件不满足时能够停止下来进行处理。

而且这么做并不困难。问问自己，这个版本(没有嵌套)是不是比之前的(两层条件嵌套)更好，可读性更高？

但对于我，我会保留先前的版本(包含两层嵌套)。这是因为:

- 代码比较短且直接，包含 if 嵌套的更清晰
- 倒置判断条件可能加重思考的负担(增加认知载荷)

因此，应当尽力减少嵌套和尽早 return，但不要过度。如果你感兴趣的话，可以看一下关于这个话题的一篇文章和 StackOverflow 上的讨论。

- Avoid Else, Return Early by Tim Oxley
- StackOverflow discussion on if/else coding style

### 3.使用默认参数和解构

我猜下面的代码你可能会熟悉，在 JavaScript 中我们总是需要检查 null / undefined 的值和指定默认值:

```js
function test(fruit, quantity) {
  if (!fruit) return;
  // 如果 quantity 参数没有传入，设置默认值为 1
  const q = quantity || 1;

  console.log(`We have ${q} ${fruit}!`);
}

//test results
test("banana"); // We have 1 banana!
test("apple", 2); // We have 2 apple!
```

实际上，我们可以通过声明 默认函数参数 来消除变量 q。

```js
function test(fruit, quantity = 1) {
  // 如果 quantity 参数没有传入，设置默认值为 1
  if (!fruit) return;
  console.log(`We have ${quantity} ${fruit}!`);
}

//test results
test("banana"); // We have 1 banana!
test("apple", 2); // We have 2 apple!
```

这更加直观，不是吗？注意，每个声明都有自己的默认参数.

例如，我们也能给 fruit 分配默认值:function test(fruit = 'unknown', quantity = 1)。

如果 fruit 是一个 object 会怎么样？我们能分配一个默认参数吗？

```js
function test(fruit) {
  // 当值存在时打印 fruit 的值
  if (fruit && fruit.name) {
    console.log(fruit.name);
  } else {
    console.log("unknown");
  }
}

//test results
test(undefined); // unknown
test({}); // unknown
test({ name: "apple", color: "red" }); // apple
```

看上面这个例子，我们想打印 fruit 对象中可能存在的 name 属性。否则我们将打印 unknown。我们可以通过默认参数以及解构从而避免判断条件 fruit && fruit.name

```js
// 解构 - 仅仅获取 name 属性
// 为其赋默认值为空对象
function test({ name } = {}) {
  console.log(name || "unknown");
}

// test results
test(undefined); // unknown
test({}); // unknown
test({ name: "apple", color: "red" }); // apple
```

由于我们只需要 name 属性，我们可以用 {name} 解构出参数，然后我们就能使用变量 name 代替 fruit.name。

我们也需要声明空对象 {} 作为默认值。如果我们不这么做，当执行 test(undefined) 时，你将得到一个无法对 undefined 或 null 解构的的错误。因为在 undefined 中没有 name 属性。

如果你不介意使用第三方库，这有一些方式减少 null 的检查:

- 使用 Lodash get 函数
- 使用 Facebook 开源的 idx 库(with Babeljs)

这是一个使用 Lodash 的例子:

```js
function test(fruit) {
  // 获取属性名，如果属性名不可用，赋默认值为 unknown
  console.log(__.get(fruit, 'name', 'unknown');
}

// test results
test(undefined); // unknown
test({ }); // unknown
test({ name: 'apple', color: 'red' }); // apple
```

你可以在 jsbin 运行 demo 代码。除此之外，如果你是函数式编程的粉丝，你可能选择使用 Lodash fp，Lodash 的函数式版本(方法变更为 get 或者 getOr)。

### 4.倾向于对象遍历而不是 Switch 语句

让我们看下面这个例子，我们想根据 color 打印出水果:

```js
function test(color) {
  // 使用条件语句来寻找对应颜色的水果
  switch (color) {
    case "red":
      return ["apple", "strawberry"];
    case "yellow":
      return ["banana", "pineapple"];
    case "purple":
      return ["grape", "plum"];
    default:
      return [];
  }
}

// test results
test(null); // []
test("yellow"); // ['banana', 'pineapple']
```

上面的代码看起来没有错误，但是我找到了一些累赘。用对象遍历实现相同的结果，语法看起来更简洁:

```js
const fruitColor = {
  red: ["apple", "strawberry"],
  yellow: ["banana", "pineapple"],
  purple: ["grape", "plum"],
};

function test(color) {
  return fruitColor[color] || [];
}
```

或者你也可以使用 Map 实现相同的结果:

```js
const fruitColor = new Map()
  .set("red", ["apple", "strawberry"])
  .set("yellow", ["banana", "pineapple"])
  .set("purple", ["grape", "plum"]);

function test(color) {
  return fruitColor.get(color) || [];
}
```

Map 是一种在 ES2015 规范之后实现的对象类型，允许你存储 key 和 value 的值。

但我们是否应当禁止 switch 语句的使用呢？答案是不要限制你自己。从个人来说，我会尽可能的使用对象遍历，但我并不严格遵守它，而是使用对当前的场景更有意义的方式。

Todd Motto 有一篇关于 switch 语句对比对象遍历的更深入的文章，你可以在这个地方阅读

### TL;DR; 重构语法

在上面的例子，我们能够用 Array.filter 重构我们的代码，实现相同的效果。

```js
const fruits = [
  { name: "apple", color: "red" },
  { name: "strawberry", color: "red" },
  { name: "banana", color: "yellow" },
  { name: "pineapple", color: "yellow" },
  { name: "grape", color: "purple" },
  { name: "plum", color: "purple" },
];

function test(color) {
  return fruits.filter((f) => f.color == color);
}
```

有着不止一种方法能够实现相同的结果，我们以上展示了 4 种。

### 5.对 所有/部分 判断使用 Array.every & Array.some

这最后一个建议更多是关于利用 JavaScript Array 的内置方法来减少代码行数。看下面的代码，我们想要检查是否所有水果都是红色:

```js
const fruits = [
  { name: "apple", color: "red" },
  { name: "banana", color: "yellow" },
  { name: "grape", color: "purple" },
];

function test() {
  let isAllRed = true;

  // 条件：所有水果都是红色
  for (let f of fruits) {
    if (!isAllRed) break;
    isAllRed = f.color == "red";
  }

  console.log(isAllRed); // false
}
```

代码那么长！我们可以通过 Array.every 减少代码行数:

```js
const fruits = [
  { name: "apple", color: "red" },
  { name: "banana", color: "yellow" },
  { name: "grape", color: "purple" },
];

function test() {
  const isAllRed = fruits.every((f) => f.color == "red");

  console.log(isAllRed); // false
}
```

现在更简洁了，不是吗？相同的方式，如果我们想测试是否存在红色的水果，我们可以使用 Array.some 一行代码实现。

```js
const fruits = [
  { name: "apple", color: "red" },
  { name: "banana", color: "yellow" },
  { name: "grape", color: "purple" },
];

function test() {
  // 条件：任何一个水果是红色
  const isAnyRed = fruits.some((f) => f.color == "red");

  console.log(isAnyRed); // true
}
```

### 6.总结

让我们一起生产更多可读性高的代码。我希望你能从这篇文章学到东西。

这就是所有的内容。编码快乐！
