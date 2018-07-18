# weex
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

报错找不到common.jar,原因jcenter不在支持对该jar包下载，需要将maven路径提前

style 一定要添加scoped限定局部

试图使用vue-router，但是好像weex不支持

万恶的index.vue默认style，折腾一天

修改路由配置没有用，原因修改路由配置必须重启服务