---
title: 前端工具函数积累
date: 2021-03-14
tags:
  - 工具函数
categories:
  - 开发
---

# 前端工具函数积累

## 1.校验工具包

```js
/**
 * 验证电子邮箱格式
 */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(
    value
  );
}

/**
 * 验证手机格式
 */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
 * 验证URL格式
 */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
 * 验证日期格式
 */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
 * 验证ISO类型的日期格式
 */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(
    value
  );
}

/**
 * 验证十进制数字
 */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
 * 验证整数
 */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
 * 验证身份证号码
 */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
    value
  );
}

/**
 * 是否车牌号
 */
function carNo(value) {
  // 新能源车牌
  const xreg =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  const creg =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
 * 金额,只允许2位小数
 */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
 * 中文
 */
function chinese(value) {
  let reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
 * 只能输入字母
 */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
 * 只能是字母或者数字
 */
function enOrNum(value) {
  //英文或者数字
  let reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
 * 验证是否包含某个值
 */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
 * 验证一个值范围[min, max]
 */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
 * 验证一个长度范围[min, max]
 */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
 * 是否固定电话
 */
function landline(value) {
  let reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
 * 判断是否为空
 */
function empty(value) {
  switch (typeof value) {
    case "undefined":
      return true;
    case "string":
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
        return true;
      break;
    case "boolean":
      if (!value) return true;
      break;
    case "number":
      if (0 === value || isNaN(value)) return true;
      break;
    case "object":
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;
  }
  return false;
}

/**
 * 是否json字符串
 */
function jsonString(value) {
  if (typeof value == "string") {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == "object" && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}

/**
 * 是否数组
 */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
 * 是否对象
 */
function object(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

/**
 * 是否短信验证码
 */
function code(value, len = 6) {
  return new RegExp(`^\\d{${len}}$`).test(value);
}

export default {
  email,
  mobile,
  url,
  date,
  dateISO,
  number,
  digits,
  idCard,
  carNo,
  amount,
  chinese,
  letter,
  enOrNum,
  contains,
  range,
  rangeLength,
  empty,
  isEmpty: empty,
  jsonString,
  landline,
  object,
  array,
  code,
};
```

## 2.常用过滤器

```js
/**
 * @description:  时间过滤 可通过fmt的参数自由组合时间的显示格式
 * @param {*} dateTime 需要过滤的时间
 * @param {*} fmt 日期组合格式
 * @return {*}
 */
const timeFormat = (dateTime = null, fmt = "yyyy-mm-dd") => {
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  let date = new Date(dateTime);
  let ret;
  let opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
};
/**
 * @description:  非空判断 只对字段做处理
 * @param {*} value 需要过滤的数据
 * @param {*} tips 若发现空值 显示为tips
 * @return {*}
 */
const IsEmpty = (value, tips = "--") => {
  //排除0为有效数据时的判断
  if ((value !== 0 && !value) || value === "") {
    return tips;
  } else {
    return value;
  }
};
/**
 * @description: 保留n位小数
 * @param {*} value 需要过滤的数据
 * @param {*} count 保留到count位小数
 * @return {*}
 */
const numFilter = (value, count = 1) => {
  // 截取当前数据到小数点后两位
  let realVal = parseFloat(value).toFixed(count);
  return realVal;
};
/**
 * @description:
 * @param {*} value 需要过滤的数据
 * @param {*} count count为保留的小数后的位数
 * @param {*} tips 错误数据 抛出的提示
 * @return {*}
 */
const Percentage = (value, count = 1, tips = "--") => {
  // !0 返回为true
  if ((value !== 0 && !value) || value === "") {
    return tips;
  } else {
    const num = Number(value) * 100;
    return num.toFixed(count) + "%";
  }
};
```

## 3.节流和防抖

- 节流

```js
let timer, flag;
/**
 * 节流原理：在一定时间内，只能触发一次
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
function throttle(func, wait = 500, immediate = true) {
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === "function" && func();
      timer = setTimeout(() => {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(() => {
        flag = false;
        typeof func === "function" && func();
      }, wait);
    }
  }
}
export default throttle;
```

- 防抖

```JS
let timeout = null;

/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
function debounce(func, wait = 500, immediate = false) {
	// 清除定时器
	if (timeout !== null) clearTimeout(timeout);
	// 立即执行，此类情况一般用不到
	if (immediate) {
		var callNow = !timeout;
		timeout = setTimeout(function() {
			timeout = null;
		}, wait);
		if (callNow) typeof func === 'function' && func();
	} else {
		// 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
		timeout = setTimeout(function() {
			typeof func === 'function' && func();
		}, wait);
	}
}

export default debounce
```

## 4.深度拷贝和深度合并

- 深度拷贝

```JS
// 判断arr是否为一个数组，返回一个bool值
function isArray (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone (obj) {
	// 对常见的“非”值，直接返回原来值
	if([null, undefined, NaN, false].includes(obj)) return obj;
    if(typeof obj !== "object" && typeof obj !== 'function') {
		//原始类型直接返回
        return obj;
    }
    var o = isArray(obj) ? [] : {};
    for(let i in obj) {
        if(obj.hasOwnProperty(i)){
            o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
        }
    }
    return o;
}

export default deepClone;
```

- 深度合并

```JS
import deepClone from "./deepClone";

// JS对象深度合并
function deepMerge(target = {}, source = {}) {
	target = deepClone(target);
	if (typeof target !== 'object' || typeof source !== 'object') return false;
	for (var prop in source) {
		if (!source.hasOwnProperty(prop)) continue;
		if (prop in target) {
			if (typeof target[prop] !== 'object') {
				target[prop] = source[prop];
			} else {
				if (typeof source[prop] !== 'object') {
					target[prop] = source[prop];
				} else {
					if (target[prop].concat && source[prop].concat) {
						target[prop] = target[prop].concat(source[prop]);
					} else {
						target[prop] = deepMerge(target[prop], source[prop]);
					}
				}
			}
		} else {
			target[prop] = source[prop];
		}
	}
	return target;
}

export default deepMerge;
```

## 5.唯一标识符

```JS
/**
 * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
 * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier)
 * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
 * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
 * v-for的时候,推荐使用后端返回的id而不是循环的index
 * 上传图片时，使用时间戳命名导致的不唯一性，可以使用唯一标识符
 * @param {Number} len uuid的长度
 * @param {Boolean} firstU 将返回的首字母置为"u"
 * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
 */
function guid(len = 32, firstU = true, radix = null) {
	let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	let uuid = [];
	radix = radix || chars.length;

	if (len) {
		// 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
		for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
	} else {
		let r;
		// rfc4122标准要求返回的uuid中,某些位为固定的字符
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';

		for (let i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random() * 16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}
	// 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
	if (firstU) {
		uuid.shift();
		return 'u' + uuid.join('');
	} else {
		return uuid.join('');
	}
}

export default guid;
```

## 6.接口请求(uniapp 框架)

```js
// 引入服务器地址
import { config } from "@/common/js/config";
class HTTP {
  /**
   * @description:
   * @param {*} url 请求地址
   * @param {*} data 请求参数
   * @param {*} method 请求方式
   * @return {*} 返回一个promise对象
   */
  request({ url, data = {}, method = "GET" }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method);
    });
  }
  /**
   * @description:
   * @param {*} url 请求地址
   * @param {*} resolve 成功回调
   * @param {*} reject 失败回调
   * @param {*} data 请求参数
   * @param {*} method 请求方式 默认get /post
   * @return {*}
   */
  _request(url, resolve, reject, data = {}, method = "GET") {
    // 启动加载动画
    uni.showLoading({
      title: "加载中",
    });
    uni.request({
      url: config.api_url + url,
      method: method,
      data: data,
      timeout: 30000,
      header: {
        "Content-Type": "application/json",
        // 添加token验证
        Authorization: uni.getStorageSync("UserInfo").token,
      },
      // 成功回调
      success: (res) => {
        // 关闭加载动画
        uni.hideLoading();
        // 关闭页面下拉事件
        uni.stopPullDownRefresh();
        //对请求的状态进行过滤 按照业务逻辑做相应的操作
        if (res.state == 200) {
          resolve(res.data);
        } else {
          //  ···
        }
      },
      // 失败回调
      fail: () => {
        _show_error("请求失败！");
        setTimeout(() => {
          uni.hideLoading();
        }, 1000);
      },
    });
  }
}
let _show_error = function (err_msg) {
  uni.showToast({
    title: err_msg,
    icon: "none",
    duration: 2500,
  });
};

export { HTTP };
```

## 7.scss 混入（mixin）

```scss
/**
 * @description: 开启flex定位 默认水平垂直居中
 * @param {*} $jc justify-content 主轴排列方式
 * @param {*} $ai align-items 副轴排列方式
 * @param {*} $ff flex-flow 主轴方向
 */
@mixin flexBox($jc: center, $ai: center, $ff: row) {
  display: flex;
  justify-content: $jc;
  align-items: $ai;
  flex-flow: $ff;
}

/**
 * @description: 文本超出 显示省略号 
 *在flex作用于下 会失效 所以使用时 请确保不被flex布局影响 或者 在元素外套一层dom结构
 */
@mixin ellipsis() {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```
