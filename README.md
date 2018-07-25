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

了解到HBuilder可以将vue的项目打包成app！！！

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

登录鉴权，vuex，还有问题！！

像通过$Message这种调用的组件，不能用component注册，需要把属性绑到Vue实例上，即在main.js里面import以后，Vue.prototype.$Message = Message 这样注册

注册登录界面完成

## 2018.7.25

番茄时钟设置优化