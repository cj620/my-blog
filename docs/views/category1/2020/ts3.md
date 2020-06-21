---
title: TypeScript笔记（三）
sider: auto
date: 2020-06-10
tags:
 - 学习笔记
categories:
 -  TypeScript
---

## 6.泛型

### 1.函数泛型

> 解决类、接口、方法、的复用性，以及对待不特定数据类型的支持
>
> 要求：传入的参数和返回的参数一致
>
> T表示泛型，具体说明类型是调用这个方法的时候决定的

```typescript
function getData<T>(value:T):T{
    return value
}
getData<number>(123)
getData<string>('123')         
```

### 2. 类的泛型

> 在定义类的时候设置泛型，根据传入不同的类型，来决定不同的类型校验

```typescript
class Fclass<T>{
    fn(value:T):T{          //传入泛型 
        return value
    }
}  								   //拥有可选的类型校验
let m1 = new Fclass<number>()      //number泛型
let m2 = new Fclass<string>()      //string泛型
```

### 3.泛型接口

> 在接口中定义泛型

```typescript
//第一种写法
interface Fn{
    <T>(value:T):T
}
let Get:Fn = function<T>(value:T):T{
    return value
}
Get<string>('cj')   //cj

//第二种写法
interface Fn<T>{
    (value:T):T
}
let myGet:Get<string> = function Get<T>(value:T):T{
    return value
}
myGet('cj')       //cj
```

 ## 7.命名空间

> 在代码量比较大的情况下，为了避免各种变量名冲突，可将相似功能的函数、类 、接口放置到命名空间内。属于一种内部模块。
>
> 与模块的差别：
>
> 命名空间：内部模块，主要用于组织代码，避免命名冲突
>
> 模块：侧重代码的复用，一个模块里可以有多个命名空间

```typescript
namespace A{
    export class Dog{}         //命名空间相当于一个内部模块 需要使用export暴露出去
    export class Cat{}
}
namespace B{
    export class Dog{}
    export class Cat{}
}
let dog1 = new A.Dog()
let dog2 = new B.Dog()
```

## 8.装饰器

> 是一种特殊类型的声明，它能够附加到类声明、方法、属性或参数上，可以修改类的行为
>
> 有类修饰器、方法修饰器、属性装饰器、参数修饰器等等
>
> 装饰器的写法：普通装饰器（无法传参）、装饰器工厂（可传参）

### 1.类装饰器

> 装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数
>
> 如果装饰器返回一个函数，它会使用提供的构造函数来替换类的声明

+ params 代表装饰对象
+ 装饰器会混入装饰对象，并自执行

```typescript
//类装饰器 
function logClass(params:any){
    console.log(params)              //params就是装饰对象
    params.prototype.apiUrl = '动态属性'
}
//使用
@logClass    //装饰器自执行
class HttpClient{
    constructor(){
    }
}
```

+ 装饰器工厂，能够传入参数。
+ 在写装饰器的时候，会返回一个函数。
+ 这个函数的参数是装饰对象

```typescript
function logClass(params:any){
  return function(value:any){
  console.log(params);   //传入的参数
  console.log(value);    //装饰对象

}

}
//使用
@logClass('cj')    //装饰器自执行
class HttpClient{
  constructor(){
 }
}                
//输出cj
```

### 2.属性装饰器

> 属性装饰器表达式会在运行时当作表达式被调用，传入下列两个参数
>
> 1. 对于静态成员来说是类的构造器，对于实例成员是类的原型
> 2. 成员的名字

```typescript
function logProperty(params:any){
    return function(target:any,attr:any){
        console.log(target)    //被装饰类的原型   通过这个简介操作类
        console.log(attr)      //属性
        target[attr] = params  //将参数传给原型上的attr属性
    }
}
class HttpClient{
    @logProperty('cj')
    public url:any | undefine
    constructor(){}
    getData(){
        console.log(this.url)
    }
}
```

### 3.方法装饰器

> 它会被应用到方法的属性描述符上，可以用来监视、修改或替换方法的定义
>
> 方法装饰会在运行时传入三个参数
>
> 1. 对于静态成员来说，是类的构造函数，对实例对象来说是类的原型对象
> 2. 成员的名字
> 3. 成员的属性描述符

```typescript
function get(params:any){
  return function(target:any,methodName:any,desc:any){
      console.log(target);      //类的原型
      console.log(methodName);  //方法名
      console.log(desc);        //属性描述
      console.log(desc.value); //方法体
      //修改方法体
      let method = desc.value
      desc.value = function(){
          console.log('xixixxi');
      }                           //这里导致了原方法被覆盖
      method.apply(this)          //让原方法也能执行
  }
}
class HttpClient{
  constructor(){
  }
  @get('cj')
  getData(){
    console.log('ahah');
    
  }
}
let http = new HttpClient()
http.getData()   //xixixi
```

### 4.方法参数装饰器

> 可以使用参数装饰器为类的原型增加一些元素数据，有三个参数
>
> 1. 对于静态成员来说，是类的构造函数，对实例对象来说是类的原型对象
> 2. 方法的名字
> 3. 参数在参数列表中的索引

### 5.装饰器的执行顺序

> 属性——》方法——》方法参数——》类