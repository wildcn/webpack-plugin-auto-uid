# webpack-plugin-auto-uid
自动为DOM添加自定义属性ID，便于E2E测试或其他用用途。

# API

## enable
允许添加autoUid，建议只在生产环境开启，避免污染源码

## update
忽略存在的uid配置文件，重新生成，并覆盖配置文件

## debug
开启info和log级别的日志 error级别日志默认开启


其他API可参考https://github.com/wildcn/auto-uid