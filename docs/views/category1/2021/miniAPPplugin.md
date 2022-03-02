---
title: 小程序插件
date: 2021-03-07
tags:
  - 小程序
categories:
  - uniapp
---

# 小程序插件

## 1.用户登入验证

```js
function checkLogin(code) {
  LoginService.wxLogin(code)
    .then((res) => {
      // 后端验证微信成功 将携带的身份信息传给前端如token，session
      // 将token放入缓存 并且在下一次的请求中携带token 让后端识别身份
    })
    .catch((err) => {
      // 登入异常
    });
}

export function wxLogin() {
  // 调取微信API 生成零时的code
  uni.login({
    success: (res) => {
      if (res.errMsg == "login:ok") {
        //第一次请求是无状态的 没有携带身份验证信息
        //将code传给后端进行验证
        that.checkLogin({ code: res.code });
      } else {
        // 微信code生成失败
      }
    },
  });
}
```

## 2.用户信息鉴权

用户信息的授权只能通过手势拉起，通过生命周期调取会失效

```js
export function hasUserInfo() {
  uni.getSetting({
    // 获取用户设置成功
    success(res) {
      if (res.authSetting["scope.userInfo"]) {
        // 如果已授权,直接获取对应参数
        uni.getUserInfo({
          success(res) {
            //用户信息 res
          },
        });
      } else if (!res.authSetting["scope.userInfo"]) {
        // 说明此时要获取的用户信息已授权尚未授权,
        // 则设置进入页面时主动弹出，直接授权
        uni.authorize({
          scope: "scope.userInfo",
          success(res) {
            // 成功后获取对应的用户信息
            uni.getUserInfo({
              success(res) {
                //res用户信息
              },
            });
          },
          fail() {
            // 授权失败
          },
        });
      }
    },
    fail() {
      // 获取用户设置失败
    },
  });
}
```

## 3.地理权限授权

```js
export function getLocationAuth() {
  uni.getSetting({
    success(res) {
      if (res.authSetting["scope.userLocation"]) {
        console.log("userLocation位置功能已授权");
        // 如果已授权,直接获取对应参数
        uni.getLocation({
          success(res) {
            //  获取当前的位置信息
          },
        });
      } else if (!res.authSetting["scope.userLocation"]) {
        // 说明此时要获取的位置功能尚未授权,
        // 则设置进入页面时主动弹出，直接授权
        uni.authorize({
          scope: "scope.userLocation",
          success(res) {
            // 授权成功后
            console.log(res);
            uni.getLocation({
              success(res) {
                // 成功后获取对应的位置参数
                //'https://apis.map.qq.com/ws/geocoder/v1/?key=MONBZ-FFWR2-Q45U5-CJPXJ-TIK22-FKFCT&location='+location
                //uniapp API 只能获取经纬信息 并没有地址名称
                //可以通过腾讯地图api 获取更加详细的地理信息
              },
            });
          },
          fail() {
            console.log("位置授权失败");
          },
        });
      }
    },
    fail() {
      console.log("获取授权信息授权失败");
    },
  });
}
```
