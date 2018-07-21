# QEnegy
weex构建移动端大学生规划软件

基本功能：
- 番茄时钟
- 心情日记
- 账单统计
- 讨论交流

# 开发环境版本校准

```node -v```

v8.11.2/v8.11.3

```npm -v```

6.2.0

npm5不能很好的支持weex

```weex -v```

v1.3.8
- weexpack: v1.2.3
- weex-builder: v0.4.0
- weex-previewer: v1.5.1

项目初始化

```weex create QEnergy```

加载依赖

```npm i```

启动编译,webpack watch模式

```npm run dev```

启动HotReload服务器，web端开发预览

```npm run serve```

打包生成JS Bundle

```npm run build```

添加android应用支持

```weex platform add android```

# 开发日志

## 2018.7.18

报错找不到common.jar,原因jcenter不在支持对该jar包下载，需要将maven路径提前

style 一定要添加scoped限定局部

试图使用vue-router，但是weex不支持，

万恶的index.vue默认style，折腾一天

修改路由配置没有用，原因修改路由配置必须重启服务

## 2018.7.19

今天试图找找做好的weex demo能套就套用一下，事实证明，你真的不要以为他们会做出什么幺蛾子来，跟你的需求完全不沾边，此路不通

删除了昨天的假导航，感谢weex ui提供的wxc-tab-bar实现了真正意义上的导航

web端图片能够正确加载

## 2018.7.20

调整思路，不再将资源放在本地，以现在的技术尚无法整合双端的路径问题

以l.regright.top作为图片服务器进行资源访问

第四版ui完成构建

尝试整合weex ui 发现会报一些意外的错误，值得思考！！

明天任务：针对番茄时钟部分进行构建

