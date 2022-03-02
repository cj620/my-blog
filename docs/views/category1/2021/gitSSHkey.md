---
title: github SSH key 配置
slider: auto
date: 2021-06-08
tags:
  - git
categories:
  - git
---

# SSH key 配置

SSH Key 是一种方法来确定受信任的计算机，从而实现免密码登录。
Git 是分布式的代码管理工具，远程的代码管理是基于 SSH 的，所以要使用远程的 Git 则需要 SSH 的配置。
下面的步骤将完成 **生成 SSH 密钥** 并 **添加公共密钥到 GitHub 上的帐户**

## 1.先设置 GitHub 的 user name 和 email

---

```
git config --global user.name "Git账号" git config --global user.email "Git邮箱"
```

## 2.生成一个新的 SSH 密钥

---

打开 Git Bash，输入如下命令，然后连续按三个回车即可：
`ssh-keygen -t rsa -C "your_email@example.com"`

![img](https:////upload-images.jianshu.io/upload_images/797826-2767b38dbf685bb6.png?imageMogr2/auto-orient/strip|imageView2/2/w/478/format/webp)

生成一个新的密码

注：生成的 SSH 私钥路径 /c/Users/chenjs/.ssh/id_rsa 后面要用到。

## 3.将 SSH 私钥添加到 ssh-agent

---

配置 ssh-agent 程序使用 SSH key

1. 在后台启动 ssh-agent
   `eval $(ssh-agent -s)`
2. 将 SSH 私钥添加到 ssh-agent
   `ssh-add /c/Users/chenjs/.ssh/id_rsa`

![img](https:////upload-images.jianshu.io/upload_images/797826-fb4dca757e32ad47.png?imageMogr2/auto-orient/strip|imageView2/2/w/520/format/webp)

## 4.将 SSH 公钥添加到 GitHub 账户

---

配置 GitHub 账户使用 SSH key

1. 先复制 SSH 公钥的完整内容（/c/Users/chenjs/.ssh/id_rsa.pub）
   `clip < /c/Users/chenjs/.ssh/id_rsa.pub`
2. 进入 GitHub 的设置页面（登录 GitHub，在右上角）

![img](https:////upload-images.jianshu.io/upload_images/797826-c0ad862c2daae8ef.png?imageMogr2/auto-orient/strip|imageView2/2/w/393/format/webp)

1. 点击左部侧边栏的 SSH keys 选项

![img](https:////upload-images.jianshu.io/upload_images/797826-0bc31ef6258b9911.png?imageMogr2/auto-orient/strip|imageView2/2/w/609/format/webp)

1. 点击 Add SSH key 按钮

![img](https:////upload-images.jianshu.io/upload_images/797826-0f0f7f10d6a3ea1d.png?imageMogr2/auto-orient/strip|imageView2/2/w/605/format/webp)

1. 在 Title 输入框内，为你的新 key 取个名字，在 Key 输入框内，粘贴前面复制好的公钥内容，然后点击 Add key 按钮即可。

![img](https:////upload-images.jianshu.io/upload_images/797826-6460e1a1f1abb0b2.png?imageMogr2/auto-orient/strip|imageView2/2/w/608/format/webp)

## 5.测试连接

---

打开 Git Bash 输入：
`ssh -T git@github.com`

将会看到如下提示：

![img](https:////upload-images.jianshu.io/upload_images/797826-7c761e191774d155.png?imageMogr2/auto-orient/strip|imageView2/2/w/541/format/webp)

输入 yes 后回车

![img](https:////upload-images.jianshu.io/upload_images/797826-ff4e11cc90fb30c6.png?imageMogr2/auto-orient/strip|imageView2/2/w/566/format/webp)

如果提示中的用户名是你的，说明 SSH key 已经配置成功。
如果提示的是“ access denied”， you can [read these instructions for diagnosing the issue](https://link.jianshu.com?t=https://help.github.com/articles/error-permission-denied-publickey).
