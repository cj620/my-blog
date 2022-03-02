---
title: VSCode的常用配置
date: 2021-02-05
tags:
  - 开发工具
categories:
  - 开发
---

# VSCode 的常用配置

## 1.常用快捷键

ctrl+shift+l /ctrl+f2 选中匹配到的所有代码块

ctrl+d 选中匹配到的下一个代码块 可以多次匹配

ctrl+enter 无视本行代码 自动换行到下一行

ctrl+z----ctrl+shift+z 向前撤销/向后撤销

ctrl+i 触发建议

ctrl+/ 快速注释

## 2.ESlint

代码格式化配置（必备）

```json
{
  "window.zoomLevel": 1,
  "workbench.activityBar.visible": true,
  "workbench.sideBar.location": "left",
  "search.followSymlinks": false,
  "[json]": {
    "editor.quickSuggestions": {
      "strings": true
    },
    "editor.suggest.insertMode": "replace"
  },
  // vscode默认启用了根据文件类型自动设置tabsize的选项
  "editor.detectIndentation": false,
  // 重新设定tabsize
  "editor.tabSize": 2,
  // #每次保存的时候自动格式化
  "editor.formatOnSave": true,
  // #每次保存的时候将代码按eslint格式进行修复
  "eslint.autoFixOnSave": true,
  // 添加 vue 支持
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  // #让prettier使用eslint的代码格式进行校验
  "prettier.eslintIntegration": true,
  // #去掉代码结尾的分号
  "prettier.semi": false,
  // #使用带引号替代双引号
  "prettier.singleQuote": true,
  // #让函数(名)和后面的括号之间加个空格
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  // #这个按用户自身习惯选择
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  // #让vue中的js按编辑器自带的ts格式进行格式化
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": "force-aligned"
      // #vue组件中html代码格式化样式
    }
  },
  // 格式化stylus, 需安装Manta's Stylus Supremacy插件
  "stylusSupremacy.insertColons": false, // 是否插入冒号
  "stylusSupremacy.insertSemicolons": false, // 是否插入分好
  "stylusSupremacy.insertBraces": false, // 是否插入大括号
  "stylusSupremacy.insertNewLineAroundImports": false, // import之后是否换行
  "stylusSupremacy.insertNewLineAroundBlocks": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "terminal.external.windowsExec": "C:\\Program Files\\Git\\bin\\bash.exe",
  "workbench.colorTheme": "One Dark Pro",
  "git.confirmSync": false,
  "gitlens.gitCommands.closeOnFocusOut": true,
  "editor.fontSize": 12,
  "settingsSync.ignoredSettings": [] // 两个选择器中是否换行
}
```

## 3.korofileheader

代码注释器配置

ctrl+alt+t 生成方法头注释

ctrl+alt+t 文件头注释

```json
 "fileheader.customMade": {
    "Author": "C.",
    "Date": "Do not edit",
    "LastEditTime": "Do not edit",
    "Description": "file content"
  },
  "fileheader.cursorMode": {},
  "fileheader.configObj": {
    "createFileTime": true,
    "language": {
      "languagetest": {
        "head": "/$$",
        "middle": " $ @",
        "end": " $/"
      }
    },
    "autoAdd": true,
    "autoAddLine": 100,
    "autoAlready": true,
    "annotationStr": {
      "head": "/*",
      "middle": " * @",
      "end": " */",
      "use": false
    },
    "headInsertLine": {
      "php": 2,
      "sh": 2
    },
    "beforeAnnotation": {
      "文件后缀": "该文件后缀的头部注释之前添加某些内容"
    },
    "afterAnnotation": {
      "文件后缀": "该文件后缀的头部注释之后添加某些内容"
    },
    "specialOptions": {
      "特殊字段": "自定义比如LastEditTime/LastEditors"
    },
    "switch": {
      "newlineAddAnnotation": true
    },
    "supportAutoLanguage": [],
    "prohibitAutoAdd": [
      "json"
    ],
    "prohibitItemAutoAdd": [
      "项目的全称, 整个项目禁止自动添加头部注释, 可以使用快捷键添加"
    ],
    "moveCursor": true,
    "dateFormat": "YYYY-MM-DD HH:mm:ss",
    "atSymbol": [
      "@",
      "@"
    ],
    "atSymbolObj": {
      "文件后缀": [
        "头部注释@符号",
        "函数注释@符号"
      ]
    },
    "colon": [
      ": ",
      ": "
    ],
    "colonObj": {
      "文件后缀": [
        "头部注释冒号",
        "函数注释冒号"
      ]
    },
    "filePathColon": "路径分隔符替换",
    "showErrorMessage": false,
    "writeLog": false,
    "wideSame": false,
    "wideNum": 13,
    "functionWideNum": 0,
    "CheckFileChange": false,
    "createHeader": true,
    "useWorker": false,
    "designAddHead": false,
    "headDesignName": "random",
    "headDesign": false,
    "cursorModeInternal": false
  } // 两个选择器中是否换行
}
```

## 4.GitLens

git 管理工具

` 因为开发过程使用git工具比较频繁，个人习惯一般将这个插件单独列在左边的侧边栏，简化对git操作的流程，提高开发体验`

## 5.Bracket Pair Colorizer

让括号拥有独立的颜色，易于区分。可以配合任意主题使用。

## 6.One Dark Pro

vscode 主题 配色比较养眼

## 7.vscode-icon

为目录结构配置特色的 icon 文件标识
