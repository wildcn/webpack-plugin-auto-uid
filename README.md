# webpack-plugin-auto-uid

自动为 DOM 添加自定义属性 ID，便于 E2E 测试或其他用用途。

PS. 可配合webpack-plugin-auto-uid 使用，也可单独引入
# How to Use

```bash
npm install webpack-plugin-auto-uid --save-dev
// or
yarn add webpack-plugin-auto-uid -D
```

in webpack config

```javascript
const isPro = process.env.NODE_ENV === 'production';
{
  plugins: [
    new webpackPluginAutoUid({
      enable: isPro, // recommand this, plugin won't change origin source
      debug: true, // show info,log level debug;
      update: true, // force update uuid every time replace with auto-uid.config.json
      dom: true, // use dom constructure to gen uuid ,just like auto-uid="div_h1_span@1"
      lintShell:"npm run lint" // fix lint error，input your lint command
    }),
  ];
}
```

# API

## enable
允许添加 autoUid，建议只在生产环境开启，避免污染源码

## update
忽略存在的 uid 配置文件，重新生成，并覆盖配置文件

## debug
开启 info 和 log 级别的日志 error 级别日志默认开启

## keepChange
保留对dom的修改，便于检查是否是auto-uid出现了错误

## lintShell
因修改dom导致的lint错误，和输入lint的命令行，将在生成uid后执行，用于autofix
# 流程

- webpack.compiler.beforeRun => create uid by doms
- gen dist.json
- webpack.compiler
- checkout changefile

