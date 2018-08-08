# QEnegy
weex构建移动端大学生规划软件

基本功能：
- 番茄时钟
- 心情日记
- 账单统计
- 讨论交流

# 开发环境版本校准

```node -v```

v8.11.2

```npm -v```

6.2.0

```vue```

2.5.2

项目初始化

```vue init webpack QEnergy```

加载依赖

```npm i```


# 开发日志

## 2018.7.21

了解到HBuilder可以将vue的项目打包成app

果断转换思路，重新开新的分支构建项目

vue-router构建导航，导航置底未实现

安装iview

iview-loader中Circle问题,通过重命名components解决

## 2018.7.22

重新梳理接口文档--产出接口文档2.0

完成数据库sql文件

后台基本框架搭建完成

完成logo制作

构建番茄时钟上半部分计时问题，基本完成

## 2018.7.23

打包导出之后app图标不显示问题[打包到生产环境时， woff 字体引用问题 ](https://github.com/iview/iview/issues/515)

底部导航样式调整成功

番茄时钟基本完成

## 2018.7.24 

完成番茄时钟剩余布局调整

登录鉴权，vuex，还有问题！！！

像通过$Message这种调用的组件，不能用component注册，需要把属性绑到Vue实例上，即在main.js里面import以后，Vue.prototype.$Message = Message 这样注册

注册登录界面完成

## 2018.7.25

番茄时钟设置优化

心情日记基本完成

添加删除日记功能,解决只有icon能点击的问题，将icon转块

## 2018.7.26

账单统计主页面基本完成

计算器部分受阻

date数据接口注意处理

mockjs高级用法

## 2018.7.27

页面切换编程式router解决

计算器组件完成

账单统计基本完成，滚动处理未做！！！

下角add有问题，宽高不支持自定义！！！

完成讨论交流布局

## 2018.7.28

我的番茄统计完成，使用v-charts插件

统计账单icon跨域问题，放到了本地资源里

番茄时钟完成联调

## 2018.7.29

中断时钟需要弹出模态框，完成时最好也弹出，解决同步环境下异步数据问题，已解决

前后端分离跨域ajax+session问题[解决跨域问题[前后端分离，前端使用axios]](http://hanzhdy.iteye.com/blog/2414859)

千万不要在开发过程中更新任何版本，除非你对新版本的性能和向下兼容性十分了解。。。。。。

完成myTomato优化布局

## 2018.7.30

完成番茄时钟布局优化

登录注册完成联调

发现诸多bug

## 2018.7.31

完成时钟刷新，通过组件通信

鉴权修改未完成！！！

## 2018.8.1

心情日记完成编辑功能

心情日记完成联调

## 2018.8.2

账单部分完成联调

## 2018.8.3

账单统计界面优化

底部导航大小调整

讨论交流部分联调

日记回收站接口

完成所有基本接口的联调
---

## 2018.8.4

导航icon修改路径

账单统计布局优化

## 2018.8.5

心情日记布局优化

## 2018.8.6

注册登录界面优化

番茄时钟界面优化

## 2018.8.7

移动端适配问题

全部界面优化基本完成

空值判断

## 2018.8.8

选择日期执行查询

无数据内容显示

下拉loading

一测bug修改

## 2018.8.9

返回键问题

退出应用后localStroge问题

点赞效果处理

获取用户信息，是否需要头像

验证码

路由过渡

调整导航点击效果