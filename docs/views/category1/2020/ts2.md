---
title: TypeScript笔记（二）
sider: auto
date: 2020-06-02
tags:
 - 学习笔记
categories:
 -  TypeScript
---

## 4.TypeScript中的类

### 1.构造类

```typescript
class Person{
    name:string  //属性
    constructor(name:string){   //构造函数实例化类时触发的方法
        this.name = name
    }
    getName():string{
        return this.name
    }
    setName(name:string):void{
        this.name = name
    }
}

let p = new Person('cj')
console.log(p.getName())  //cj
p.setName('gg')
console.log(p.getName())  //gg
```

### 2.类的继承

```typescript
class Person{
    name:string  //属性
    constructor(name:string){   //构造函数实例化类时触发的方法
        this.name = name
    }
    run():string{
        return `我是${this.name}`
    }
}

class GG extends Person{
    constructor(name:strng){
        super(name)   //初始化父类的构造函数
    }
}
let cj = new GG('changjian')
console.log(cj.run())    //我是changjian
```

###  3.类里面的修饰符

> 与java中定义相似

+ **public**  公有类型    在类里面、子类、类外面都可以访问
+ **protected ** 保护类型     在类里面、子类都可以访问
+ **private**    私有              只能在类里面访问

```typescript
public name:string
protected name:string
private name:string
```

### 4.static静态属性

> 与实例中的属性不同，静态属性可以理解为函数自己的私有的属性
>
> 静态方法和静态属性
>
> 静态方法不能直接调用类里面的属性，只能调用静态的属性

```typescript
class Person{
    static name="humen"
    static print(){
        console.log("我是"+Person.name)
    }
}
console.log(Person.name)    //human
console.log(Person.print()) //我是human
```

### 5.abstract抽象类

> 它是提供其他类继承的基类，不能直接被实例化 (不能直接new)
>
> 内部为抽象方法
>
> 抽象方法只能出现在抽象类中,抽象类也可以写非普通属性
>
> 如果继承了抽象类，那就必须实现其中的抽象方法

多态：父类定义一个方法不去实现，让继承它的子类去实现，每个子类有不同的表现

```typescript
abstract class Animal{
    public name:string
    constructor(name:string){
        this.name = name
    }
    abstract say():string
}

//子类dog
class Dog extends Animal{
    constructor(name:string){
        super(name)
    }
    say(){
        return 'wangwang'
    }
}

let d = new Dog('xiaogou')
d.say()   //wangwang
```

## 5.TypeScript中的接口interface

> TypeScript中的接口类似java中的定义，起到一种限制和规范的作用。
>
> 在这个基础上新增了更加灵活的接口类型，包括属性、函数、可索引和类等

### 1.对批量方法传参进行约束

```typescript
interface Fullname{   //对对象的约束 属性接口
    firstName:string
    secondName:string
}
function print(name:FullName){           //直接使用FullName进行约束
    console.log(name.firstName,name.secondName)
}
let obj = {
    age:20
    firstName:'c',
    secondName:'j',
}
print(obj) //c j
```

### 2.接口的可选属性

```typescript
interface Fullname{   
    firstName:string
    secondName?:string   //使用？ 来声明这个属性可传可不传
}
```

### 3.函数类型接口

> 对函数进行约束

```typescript
interface encrypt{
    (key:string,value:string):string
}
let md5:encrypt = function(key:string,value:string):string{
    return key+value
}
md5("c","j")  //cj
```

### 4.可索引接口

> 对对象和数组的约束

+ 数组的约束

```typescript
interface UserArr{
    [index:number]:string            //下标为number类，为数组
}
let arr:UserArr = ['c','j']
console.log(arr[0])   //c
```

+ 对象的约束

```typescript
interface UserObj{
    [index:string]:string             //下标为字符类，为对象
}
let obj:UserObj = {name:'cj',age:'23'}
console.log(obj.name,obj.age) //cj 23
```

### 5.类类型接口

> 对类的约束，与抽象类有点相似

```typescript
interface Animal{
    name:string
    eat(str:string):void
}
class Dog implements Animal{
    name:string
    constructor(name:string){
        this.name = name
    }
    eat(){
        console.log(this.name+'吃狗粮')
    }
}
let dog = new Dog('dahuang')
dog.eat()  //dahuang 吃狗粮
```

### 6.接口的扩展

> 接口可以继承接口

```typescript
interface Human{
    eat():void
}
interface Man extends Human{
    work():void
}
class Boy implements Man{
    eat(){}
    work(){}
}
```

