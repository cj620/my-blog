/*
 * @Author: C.
 * @Date: 2022-03-02 11:29:33
 * @LastEditTime: 2022-03-03 11:38:17
 * @Description: file content
 */
module.exports = {
  "title": "一只Chang",
  "description": "Do not go gentle into that good night",
  "dest": "dist",
  "base":"/my-blog/",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/cj620",
            "icon": "reco-github"
          }
        ]
      }
    ],
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    
    "valineConfig":{
      "appId": "55dFQD4GaGPWzWlcSjNp8JlT-gzGzoHsz",
      "appKey": "qxbtzbYHKNExltQlMYaXYdUy"
    },

    "friendLink": [
      {
        "title": "午后南杂",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "1156743527@qq.com",
        "link": "https://www.recoluan.com"
      },
      {
        "title": "vuepress-theme-reco",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "sidebar": "auto",
    // "lastUpdated": "Last Updated",
    "author": "一只Chang",
    "authorAvatar": "/avatar.png",
    "record": "github pages",
    "startYear": "2019"
  },
  "markdown": {
    "lineNumbers": true
  }
}