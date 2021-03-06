---
title: 排序算法
sider: auto
date: 2020-02-15
tags:
 - 手写函数
categories:
 -  js
---
#  排序算法

## 1.冒泡排序

> **思路** 使数组的第一项和第二项作比较，如果第一项更大则交换位置，否则不变。这样一直比较向后移，保证数组最后一项是最大值。

```js
function bubble(arr){
      for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr.length-i-1;j++){ //arr.length-i-1; length-i省略掉前面已经冒泡的组合
          if(arr[j]>arr[j+1]){             //length-1； 因为数组下标j+1会造成溢出，所以需要-1
            let temp=arr[j]                //数值大的往后冒泡
            arr[j]=arr[j+1]               
            arr[j+1]=temp
          }
        }
      }
      return arr
    }
    bubble(arr)
```

## 2.冒泡排序（优化）

> **逻辑**：使用一个flag当状态量，一旦第二个for没有执行，说明排序已经完成，这个时候flag的值为true，跳出循环，排序完成

**上一个冒泡排序对数组是无差别的，就算是有序数组也会进行排序操作，性能较差**

```js
function bubble(arr){                 //由于未优化前，冒泡操作是无差别的
      for (let i=0;i<arr.length;i++){     //如果有序数组进行冒泡，会浪费性能   
        let flag=true                     //所以增加一个flag，来判断数组在冒泡途中是否已经排序完成，直接停止排序
        for(let j=0;j<arr.length-i-1;j++){
          if(arr[j]>arr[j+1]){
            flag=false
            let temp=arr[j]
            arr[j]=arr[j+1]
            arr[j+1]=temp
          }
        }
        if(true){break}
      }
      return arr
    }
```



## 3.快速排序（重点）

**这个快排性能较差，但是思路更加明确**

> **逻辑**： 在数组中拆分出一个中间值，分成左右两个数组。然后遍历数组，大于中间值的放入右数组，小于中间值的放入左数组。返回一个递归上述方法的新数组。也就是左右数组继续去拆分，遍历，按大小重组，最后得到一个有序数组

```js
function quickSort(arr){
      if(arr.length <= 1){ return arr }
      const pivotindex = Math.floor(arr.length / 2)
      const pivot = arr.splice(pivotindex,1)[0]
      const left=[]
      const right=[]
      arr.forEach(res =>{
        res < pivot ? left.push(res):right.push(res)

      });
      return [...quickSort(left),pivot,...quickSort(right)]
    }
    console.log(quickSort(arr))
```

## 4.快速排序（优化）

**由于前一个快排 声明了两个数组，并且使用splice对数组进行了拷贝，性能很差。可以优化成一个数组操作**

> **思路**：我们定义一个`pos`指针, 标识等待置换的元素的位置, 然后逐一遍历数组元素, 遇到比基准数小的就和`arr[pos]`交换位置, 然后`pos++`

```js
 function quickSort(arr, left, right) {          //这个left和right代表分区后“新数组”的区间下标，因为这里没有新开数组，所以需要left/right来确认新数组的位置
    if (left < right) {
        let pos = left - 1                      //pos即“被置换的位置”，第一趟为-1
        for(let i = left; i <= right; i++) {    //循环遍历数组，置换元素
            let pivot = arr[right]              //选取数组最后一位作为基准数，
            if(arr[i] <= pivot) {               //若小于等于基准数，pos++，并置换元素, 这里使用小于等于而不是小于, 其实是为了避免因为重复数据而进入死循环
                pos++
                let temp = arr[pos]
                arr[pos] = arr[i]
                arr[i] = temp
            }
        }
        //一趟排序完成后，pos位置即基准数的位置，以pos的位置分割数组
        quickSort(arr, left, pos - 1)       //递归操作左边数组 
        quickSort(arr, pos + 1, right)      //递归操作右边数组
    }
    return arr      //当left和right两个指针重合，即最后需要继续递归的数组，只剩下1或者0位，则排序结束
}

```

**图解思路**

![alt](https://user-gold-cdn.xitu.io/2020/4/5/17148debd6e97be5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 5.归并排序

> **逻辑**：递归合并   在数组中间拆出一个值，数组分为左数组和右数组。每个数组由递归这样分下去。最后只剩下长度为1和2的数组。再进行合并 ，大于中间值的在右 ，小于中间值的在左，最终组成有序数组

```js
    function mergeSort(arr) {
    if(arr.length <= 1) return arr		//数组元素被划分到剩1个时，递归终止  
    const midIndex = arr.length/2 | 0
    const leftArr = arr.slice(0, midIndex)                  //利用slice将数组从中间拆分
    const rightArr = arr.slice(midIndex, arr.length)
    return merge(mergeSort(leftArr), mergeSort(rightArr))	//先划分，后合并  mergeSort使数组一直分解到最小单位，merge将数组进行整合 利用递归的方法进行
}
    function merge(leftArr, rightArr) {          //合并方法
      const result = []
      while(leftArr.length && rightArr.length) {               //通过递归已经成为最小可分的数组单位 也就是两个数组的长度为1或者2
      leftArr[0] <= rightArr[0] ? result.push(leftArr.shift()) : result.push(rightArr.shift()) //将两数组的第一位比较，最小的放入容器result
                                                                                //执行完则会一步之后，两个数组的剩余长度为1或0，剩下的数肯定使最大的一个
    }                                                                           //所以直接push到result里
    while(leftArr.length) result.push(leftArr.shift())          
    
    while(rightArr.length) result.push(rightArr.shift())
    return result
}
```

**图解思路**

![alt](https://user-gold-cdn.xitu.io/2020/2/2/1700388b88d9102c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 6.数组的sort()排序与去重

> **逻辑**：去重使用`indexOf`方法来匹配，将匹配的值放入新数组。
>
> sort()排序要传入一个函数，返回值a-b为正序，b-a为倒序

```js
 let arr = [7,2,2,3,3,4,4,58,9,9,-1,-3]
    let result = []
    for(let i = 0;i < arr.length;i++){
      if(result.indexOf(arr[i]) == '-1'){   //创建一个新的数组，遍历旧数组
        result.push(arr[i])                 //每次用indexOf判断新数组有无旧数组的值
      }                                      //有就掠过，无则放入新数组
    }
    console.log(result);
                                        //indexOf的测试 
    console.log("name".indexOf("m"));   //结果2  indexof 检索到后面的值时，会返回这个值所在的index
    console.log("name".indexOf("n"));   //结果0
    console.log("name".indexOf("p"));   //结果-1  没有检索到 则返回-1
    

    result.sort((a,b) => {     //sort()方法 直接调用sort的方法排序，是按字符编码进行排序，结果不准确
        return a-b             //所以通过回调一个函数 并且通过返回a，b参数进行判断
    })                         // a-b为正序，b-a为倒序
    console.log(result);
    
```

