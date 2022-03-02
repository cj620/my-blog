---
title: 手写函数
date: 2021-07-21
tags:
  - 手写函数
categories:
  - 面试
---

# 手写方法

## 原生

### 数组

#### 1.flat

```js
function _flatten(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] instanceof Array) {
      result = result.concat(_flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

Array.prototype.myFlat = function () {
  return _flatten(this);
};
var arr1 = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]];
console.log(arr1.flat(Infinity)); //原生
console.log(arr1.myFlat());
```

#### 2.map

```js
Array.prototype.myMap = function (fn) {
  this.forEach((element, index) => {
    result.push(fn(element, index));
  });
  return result;
};
let arr = [1, 2, 3];
let r = arr.myMap((item, index) => {
  return item + 1;
});
console.log(r); //[2,3,4]
```

#### 3.reduce

```js
Array.prototype.myReduce = function (cb, initValue) {
  let result = initValue === undefined ? this[0] : initValue;
  for (let i = 0; i < this.length; i++) {
    result = cb(result, this[i], i);
  }
  return result;
};
function fn(result, currentValue, index) {
  return result + currentValue;
}
var arr = [2, 3, 4, 5];
let a = arr.myReduce(fn, 10);
console.log(a); //24
```

#### 4.filter

```js
Array.prototype.myFilter = function (callback) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this) && res.push(this[i]);
  }
  return res;
};
```

#### 5.forEach

```js
Array.prototype.myForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};
```

#### 6.every

```js
Array.prototype.myEvery = function (callback) {
  let flag = true;
  for (let i = 0; i < this.length; i++) {
    flag = callback(this[i], i, this);
    if (!flag) break;
  }

  return flag;
};
```

#### 7.some

```js
Array.prototype.mySome = function (callback) {
  let flag = false;
  for (let i = 0; i < this.length; i++) {
    flag = callback(this[i], i, this);
    if (flag) break;
  }

  return flag;
};
```

#### 8.findIndex

```js
Array.prototype.myFindIndex = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return i;
    }
  }
  return -1;
};
```

#### 9. find

```js
Array.prototype.myFind = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};
```

#### 10.fill

```js
Array.prototype.myFill = function (value, start = 0, end) {
  end = end || this.length;
  for (let i = start; i < end; i++) {
    this[i] = value;
  }
  return this;
};
```

#### 11.includes

```js
Array.prototype.myIncludes = function (value, start = 0) {
  if (start < 0) start = this.length + start;
  const isNaN = Number.isNaN(value);
  for (let i = start; i < this.length; i++) {
    if (this[i] === value || Number.isNaN(this[i]) === isNaN) {
      return true;
    }
  }
  return false;
};
```

#### 12.join

```js
Array.prototype.myJoin = function (s = ",") {
  let str = "";
  for (let i = 0; i < this.length; i++) {
    str = i === 0 ? `${str}${this[i]}` : `${str}${s}${this[i]}`;
  }
  return str;
};
```

#### 13.splice

```js
Array.prototype.mySplice = function (start, length, ...values) {
  if (length === 0) return [];
  length = start + length > this.length - 1 ? this.length - start : length;
  console.log(length);
  const res = [],
    tempArr = [...this];
  for (let i = start; i < start + values.length; i++) {
    this[i] = values[i - start];
  }
  this.length = start + values.length;
  if (values.length < length) {
    const cha = length - values.length;
    console.log(cha);
    for (let i = start + values.length; i < tempArr.length; i++) {
      this[i] = tempArr[i + cha];
    }
    this.length = this.length - cha;
  }
  if (values.length > length) {
    for (let i = start + length; i < tempArr.length; i++) {
      this.push(tempArr[i]);
    }
  }
  for (let i = start; i < start + length; i++) {
    res.push(tempArr[i]);
  }
  return res;
};
```

### 对象

#### 1.instanceof

```js
// instanceof
function myInstanceof(target, origin) {
  while (target) {
    if (target.__proto__ === origin.prototype) {
      return true;
    } else {
      target = target.__proto__;
    }
  }
  return false;
}
let arrt = [1, 2, 9];
console.log(myInstanceof(arrt, Array)); //true
console.log(myInstanceof(arrt, Boolean)); //false
```

#### 5.call

```js
//思路
Function.prototype.myCall = function (thisArg, ...args) {
  thisArg.fn = this; // this指向调用call的对象,即我们要改变this指向的函数
  return thisArg.fn(...args); // 执行函数并return其执行结果
};
//完备
Function.prototype.myCall = function (thisArg, ...args) {
  const fn = Symbol("fn"); // 声明一个独有的Symbol属性, 防止fn覆盖已有属性
  thisArg = thisArg || window; // 若没有传入this, 默认绑定window对象
  thisArg[fn] = this; // this指向调用call的对象,即我们要改变this指向的函数
  const result = thisArg[fn](...args); // 执行当前函数
  delete thisArg[fn]; // 删除我们声明的fn属性
  return result; // 返回函数执行结果
};
```

#### 6.apply

```js
//将参数列表改为参数数组
Function.prototype.myApply = function (thisArg, args) {
  const fn = Symbol("fn"); // 声明一个独有的Symbol属性, 防止fn覆盖已有属性
  thisArg = thisArg || window; // 若没有传入this, 默认绑定window对象
  thisArg[fn] = this; // this指向调用call的对象,即我们要改变this指向的函数
  const result = thisArg[fn](...args); // 执行当前函数（此处说明一下：虽然apply()接收的是一个数组，但在调用原函数时，依然要展开参数数组。可以对照原生apply()，原函数接收到展开的参数数组）
  delete thisArg[fn]; // 删除我们声明的fn属性
  return result; // 返回函数执行结果
};
```

#### 7.bind

```js
//思路
Function.prototype.myBind = function (thisArg, ...args) {
  return () => {
    this.apply(thisArg, args);
  };
};
//完成
Function.prototype.myBind = function (thisArg, ...args) {
  var self = this;
  // new优先级
  var fbound = function () {
    self.apply(
      this instanceof self ? this : thisArg,
      args.concat(Array.prototype.slice.call(arguments))
    );
  };
  // 继承原型上的属性和方法
  fbound.prototype = Object.create(self.prototype);

  return fbound;
};
```

### 10.Promise(简化版)

```js
function Promise(fn) {
  this.cbs = [];
  const resolve = (value) => {
    setTimeout(() => {
      this.data = value;
      this.cbs.forEach((cb) => cb(value));
    });
  };

  fn(resolve);
}

Promise.prototype.then = function (onResolved) {
  return new Promise((resolve) => {
    this.cbs.push(() => {
      const res = onResolved(this.data);
      if (res instanceof Promise) {
        res.then(resolve);
      } else {
        resolve(res);
      }
    });
  });
};
```

### 11.new

```js
// new是关键字,这里我们用函数来模拟,new Foo(args) <=> myNew(Foo, args)
function myNew(foo, ...args) {
  let obj = {};
  // 把obj挂在原型链上
  obj.__proto__ = foo.prototype;
  // 执行构造函数 获取相应属性
  let result = foo.apply(obj, args);

  // 如果构造方法已经return了一个对象，那么就返回该对象，否则返回myNew创建的新对象（一般情况下，构造方法不会返回新实例，但使用者可以选择返回新实例来覆盖new创建的对象）
  return Object.prototype.toString.call(result) === "[object Object]"
    ? result
    : obj;
}
```

### 12.ajax

```js
//promise 版本
function ajax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange(() => {
      if (xhr.readyState === 4) {
        if (xhr.status == 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject("error");
        }
      }
    });
    xhr.send();
  });
}
```

### 13.JSON.parse

```js
function parse(json) {
  return eval("(" + json + ")");
}
```

## 经典排序

### 1.bubbleSort

```js
// 冒泡 相邻比较再换位
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let flag = true;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        flag = false;
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
    if (flag) break;
  }
  return arr;
}
```

### 2.selectionSort

```js
// 选择 逐个对比 找极值 再换位
function selectionSort(arr) {
  let min_index;
  for (let i = 0; i < arr.length - 1; i++) {
    min_index = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[min_index] > arr[j]) {
        min_index = j;
      }
    }
    let temp = arr[min_index];
    arr[min_index] = arr[i];
    arr[i] = temp;
  }
  return arr;
}
```

### 3.quickSort

```js
//快排 定基准点 左右分区 向下递归
function quickSort(arr) {
  if (arr.length <= 1) return arr; //递归终止条件
  const pivot = (arr.length / 2) | 0; //基准点
  const pivotValue = arr.splice(pivot, 1)[0];
  const leftArr = [];
  const rightArr = [];
  arr.forEach((val) => {
    val > pivotValue ? rightArr.push(val) : leftArr.push(val);
  });
  return [...quickSort(leftArr), pivotValue, ...quickSort(rightArr)];
}
// 原地快排 以最右侧为基准点 通过pos分区 向下递归
function quickSort2(arr, left, right) {
  if (right > left) {
    let pos = left - 1;
    let p = arr[right];
    for (let i = left; i <= right; i++) {
      if (p >= arr[i]) {
        pos++;
        let temp = arr[pos];
        arr[pos] = arr[i];
        arr[i] = temp;
      }
    }
    quickSort2(arr, left, pos - 1);
    quickSort2(arr, pos + 1, right);
  }
  return arr;
}
```

### 4.mergeSort

```js
//归并 左右分区 以排序的方式合并 向下递归
function mergeSort(arr) {
  if (arr.length <= 1) return arr; //数组元素被划分到剩1个时，递归终止
  const midIndex = (arr.length / 2) | 0;
  const leftArr = arr.slice(0, midIndex);
  const rightArr = arr.slice(midIndex, arr.length);
  return merge(mergeSort(leftArr), mergeSort(rightArr)); //先划分，后合并
}

//合并
function merge(leftArr, rightArr) {
  const result = [];
  while (leftArr.length && rightArr.length) {
    leftArr[0] <= rightArr[0]
      ? result.push(leftArr.shift())
      : result.push(rightArr.shift());
  }
  while (leftArr.length) result.push(leftArr.shift());
  while (rightArr.length) result.push(rightArr.shift());
  return result;
}
```

## 实用经典

### 1.debounce（防抖）

```js
function debounce(func, wait) {
  let timeout = null;
  return function () {
    let context = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
```

### 2.throttle（节流）

```js
function throttle(func, wait) {
  let timeout = null;
  return function () {
    let context = this;
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}
```

### 3.curry（柯里化）

```js
function curry(fn, len = fn.length) {
  return _curry.call(this, fn, len);
}
/**
 * 中转函数
 * @param fn    待柯里化的原函数
 * @param len   所需的参数个数
 * @param args  已接收的参数列表
 */
function _curry(fn, len, ...args) {
  return function (...params) {
    let _args = [...args, ...params];
    if (_args.length >= len) {
      //判断当前的参数列表长度是否达到预期
      return fn.call(this, ..._args); //执行函数 并返回结果
    } else {
      return _curry.call(this, fn, len, ..._args); //如果未达到指定长度 则返回函数，可被继续调用
    }
  };
}
```

### 4.deepClone（深克隆）

```js
function deepClone(target) {
  // 深度clone主要在于处理引用数据类型 所以非引用数据类型直接返回其原始值
  if (!["object", "function"].includes(typeof target)) return target;
  // 这个时候不是数组就是对象形式 声明其类型 相当于挂载正确的原型链
  let result = Array.isArray(target) ? [] : {};
  // 遍历其所有属性
  for (let key in target) {
    // 区分遍历到的属性的类型 是引用类型继续递归 基础类型返回原值
    if (target.hasOwnProperty(key)) {
      result[key] =
        typeof target[key] === "object" ? deepClone(target[key]) : target[key];
    }
  }
  return result;
}
```

### 5.unique（去重）

```js
// 第一种：Map记录
function quchong1(arr) {
  const newArr = [];
  arr.reduce((pre, next) => {
    if (!pre[next]) {
      pre[next] = 1;
      newArr.push(next);
    }
    return pre;
  }, {});
  return newArr;
}

// 第二种：Set去重
function quchong2(arr) {
  return [...new Set(arr)];
}
```

### 6.compose（组合）

```js
//比较常用的高阶函数
function compose(...fn) {
  if (fn.length === 0) return (num) => num;
  if (fn.length === 1) return fn[0];
  return fn.reduce((pre, next) => {
    return (num) => {
      return next(pre(num));
    };
  });
}
function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x + 4;
}
const a = compose(fn1, fn2, fn3, fn4);
console.log(a);
console.log(a(1));
```

### 7.LRU（LRU 缓存策略）

```js
//最近最少使用
//设置容量 超出容量=》 新键顶替旧键
// 每次操作重新删除再新增当前key 以更新索引 超出尺寸则删除旧索引
class LRUCache {
  constructor(size) {
    this.size = size;
    this.cache = new Map();
  }

  get(key) {
    const hasKey = this.cache.has(key);
    if (hasKey) {
      const val = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, val);
      return val;
    } else {
      return -1;
    }
  }

  put(key, val) {
    const hasKey = this.cache.has(key);
    if (hasKey) {
      this.cache.delete(key);
    }
    this.cache.set(key, val);
    if (this.cache.size > this.size) {
      this.cache.delete(this.cache.keys().next().value);
    }
  }
}
```

### 8.EventEmitter （发布订阅）

```js
//发布订阅 拥有on emit once off方法
class EventEmitter {
  constructor() {
    this.cache = {};
  }

  on(name, fn) {
    const tasks = this.cache[name];
    if (tasks) {
      this.cache[name].push(fn);
    } else {
      this.cache[name] = [fn];
    }
  }

  off(name, fn) {
    const tasks = this.cache[name];
    if (task) {
      const index = tasks.findIndex((item) => item === fn);
      if (index >= 0) {
        this.cache[name].splice(index, 1);
      }
    }
  }

  emit(name, once = false, ...args) {
    // 复制一份。防止回调里继续on，导致死循环
    const tasks = this.cache[name].slice();
    if (tasks) {
      for (let fn of tasks) {
        fn(...args);
      }
    }
    if (once) {
      delete this.cache[name];
    }
  }

  once(name, ...args) {
    this.emit(name, true, ...args);
  }
}
```

### 9.dom2tree（抽象 dom）

```html
<div>
  <span></span>
  <ul>
    <li></li>
    <li></li>
  </ul>
</div>
```

```js
//将上方的DOM转化为下面的树结构对象

{
    tag: 'DIV',
    children: [
        { tag: 'SPAN', children: [] },
        {
            tag: 'UL',
            children: [
                { tag: 'LI', children: [] },
                { tag: 'LI', children: [] }
            ]
        }
    ]
}
//将dom转化成虚拟dom树
function dom2tree(dom) {
    const obj = {}
    obj.tag = dom.tagName
    obj.children = []
    dom.childNodes.forEach(child => obj.children.push(dom2tree(child)))
    return obj
}
```

### 10.render（渲染）

```js
//将虚拟dom树渲染成真的dom
function render(vnode) {
  // 如果是数字类型转化为字符串
  if (typeof vnode === "number") {
    vnode = String(vnode);
  }
  // 字符串类型直接就是文本节点
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }
  // 普通DOM
  const dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    // 遍历属性
    Object.keys(vnode.attrs).forEach((key) => {
      const value = vnode.attrs[key];
      dom.setAttribute(key, value);
    });
  }
  // 子数组进行递归操作
  vnode.children.forEach((child) => dom.appendChild(render(child)));
  return dom;
}
```

### 11.cycleDetector（环引用检测）

```js
//实现思路：用一个数组存储每一个遍历过的对象，下次找到数组中存在，则说明环引用
function cycleDetector(obj) {
  const arr = [obj];
  let flag = false;

  function cycle(o) {
    const keys = Object.keys(o);
    for (const key of keys) {
      const temp = o[key];
      if (typeof temp === "object" && temp !== null) {
        if (arr.indexOf(temp) >= 0) {
          flag = true;
          return;
        }
        arr.push(temp);
        cycle(temp);
      }
    }
  }

  cycle(obj);

  return flag;
}
var obj = {
  a: {
    c: [1, 2],
  },
  b: 1,
};
// obj.a.c.d = obj
console.log(cycleDetector(obj)); // true
```

### 12.loopGetLevel（检测对象层数）

```js
function loopGetLevel(obj) {
  var res = 1;

  function computedLevel(obj, level) {
    var level = level ? level : 0;
    if (typeof obj === "object") {
      for (var key in obj) {
        if (typeof obj[key] === "object") {
          computedLevel(obj[key], level + 1);
        } else {
          res = level + 1 > res ? level + 1 : res;
        }
      }
    } else {
      res = level > res ? level : res;
    }
  }
  computedLevel(obj);

  return res;
}
const obj = {
  a: { b: [1] },
  c: { d: { e: { f: 1 } } },
};

console.log(loopGetLevel(obj)); // 4
```

### 13.flatten（对象扁平化）

```js
const isObject = (val) => typeof val === "object" && val !== null;

function flatten(obj) {
  if (!isObject(obj)) return;
  const res = {};
  const dfs = (cur, prefix) => {
    if (isObject(cur)) {
      if (Array.isArray(cur)) {
        cur.forEach((item, index) => {
          dfs(item, `${prefix}[${index}]`);
        });
      } else {
        for (let key in cur) {
          dfs(cur[key], `${prefix}${prefix ? "." : ""}${key}`);
        }
      }
    } else {
      res[prefix] = cur;
    }
  };
  dfs(obj, "");
  return res;
}
const obj = {
  a: {
    b: 1,
    c: 2,
    d: { e: 5 },
  },
  b: [1, 3, { a: 2, b: 3 }],
  c: 3,
};

// 测试
console.log(flatten(obj));
```

### 14.(a == 1 && a == 2 && a == 3)为 true

```js
// 第一种方法
var a = {
  i: 1,
  toString: function () {
    return a.i++;
  },
};
console.log(a == 1 && a == 2 && a == 3); // true

// 第二种方法
var a = [1, 2, 3];
a.join = a.shift;
console.log(a == 1 && a == 2 && a == 3); // true

// 第三种方法
var val = 0;
Object.defineProperty(window, "a", {
  get: function () {
    return ++val;
  },
});
console.log(a == 1 && a == 2 && a == 3); // true
```

### 15.Scheduler（Promise 并发调度）

```js
//带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个
//思路:任务队列 最大容量 当前任务量 三个状态
// 对任务队列的CURD 最核心的执行器request
class Scheduler {
  constructor(limit) {
    this.queue = [];
    this.limit = limit;
    this.count = 0;
  }

  add(time, order) {
    const promiseCreator = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(order);
          resolve();
        }, time);
      });
    };
    this.queue.push(promiseCreator);
  }

  taskStart() {
    for (let i = 0; i < this.limit; i++) {
      this.request();
    }
  }

  request() {
    if (!this.queue.length || this.count >= this.limit) return;
    this.count++;
    this.queue
      .shift()()
      .then(() => {
        this.count--;
        this.request();
      });
  }
}

// 测试
const scheduler = new Scheduler(2);
const addTask = (time, order) => {
  scheduler.add(time, order);
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
scheduler.taskStart();
```

### 16.lazyMan

```js
class _LazyMan {
  constructor(name) {
    this.tasks = [];
    const task = () => {
      console.log(`Hi! This is ${name}`);
      this.next();
    };
    this.tasks.push(task);
    setTimeout(() => {
      this.next();
    }, 0);
  }
  next() {
    const task = this.tasks.shift();
    task && task();
  }
  sleep(time) {
    this.sleepWrapper(time, false);
    return this;
  }
  sleepFirst(time) {
    this.sleepWrapper(time, true);
    return this;
  }
  sleepWrapper(time, first) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`);
        this.next();
      }, time * 1000);
    };
    if (first) {
      this.tasks.unshift(task);
    } else {
      this.tasks.push(task);
    }
  }
  eat(food) {
    const task = () => {
      console.log(`Eat ${food}`);
      this.next();
    };
    this.tasks.push(task);
    return this;
  }
}

// 测试
const lazyMan = (name) => new _LazyMan(name);

lazyMan("Hank").sleep(1).eat("dinner");

lazyMan("Hank").eat("dinner").eat("supper");

lazyMan("Hank").eat("supper").sleepFirst(5);
```

### 17.Add（链式加法）

```js
function add(...args1) {
  let allArgs = [...args1];

  function fn(...args2) {
    if (!args2.length) return fn.toString();
    allArgs = [...allArgs, ...args2];
    return fn;
  }

  fn.toString = function () {
    return allArgs.reduce((pre, next) => pre + next);
  };

  return fn;
}

// 测试
console.log(add(1)(2)(3)());
console.log(add(1, 2)(3)());
```

## Promise

### 1.all

```js
//如果所有Promise都成功，则返回成功结果数组
//如果有一个Promise失败，则返回这个失败结果
function all(promises) {
  const result = [];
  let count = 0;
  return new MyPromise((resolve, reject) => {
    const addData = (index, value) => {
      result[index] = value;
      count++;
      if (count === promises.length) resolve(result);
    };
    promises.forEach((promise, index) => {
      if (promise instanceof MyPromise) {
        promise.then(
          (res) => {
            addData(index, res);
          },
          (err) => reject(err)
        );
      } else {
        addData(index, promise);
      }
    });
  });
}
```

### 2.race

```js
//哪个Promise最快得到结果，就返回那个结果，无论成功失败
function race(promises) {
  return new MyPromise((resolve, reject) => {
    promises.forEach((promise) => {
      if (promise instanceof MyPromise) {
        promise.then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      } else {
        resolve(promise);
      }
    });
  });
}
```

### 3.allSettled

```js
//把每一个Promise的结果，集合成数组，返回
function allSettled(promises) {
  return new Promise((resolve, reject) => {
    const res = [];
    let count = 0;
    const addData = (status, value, i) => {
      res[i] = {
        status,
        value,
      };
      count++;
      if (count === promises.length) {
        resolve(res);
      }
    };
    promises.forEach((promise, i) => {
      if (promise instanceof MyPromise) {
        promise.then(
          (res) => {
            addData("fulfilled", res, i);
          },
          (err) => {
            addData("rejected", err, i);
          }
        );
      } else {
        addData("fulfilled", promise, i);
      }
    });
  });
}
```

### 4.any

```js
//如果有一个Promise成功，则返回这个成功结果
//如果所有Promise都失败，则报错
function any(promises) {
        return new Promise((resolve, reject) => {
            let count = 0
            promises.forEach((promise) => {
                promise.then(val => {
                    resolve(val)
                }, err => {
                    count++
                    if (count === promises.length) {
                        reject(new AggregateError('All promises were rejected'))
                    }
                })
            })
        })
    }
}
```

### 5.finally

```js
//收一个回调函数，但无参数接收
//无论成功失败状态，都会执行finally
Promise.prototype.finally = function (callback) {
  return this.then(
    (res) => {
      callback();
      return res;
    },
    (err) => {
      callback();
      throw err;
    }
  );
};
```
