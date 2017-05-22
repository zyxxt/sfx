
## 使用方式

    cd your-project
    sfx build [options]

命令会通过读取当前目录的`sfx.config.js`文件，打包部署

!> 如果项目配置了第三方代码打包，则会优先执行打完第三方代码再打项目代码，开启第三方代码打包后，`sfx dev`命令需要先打完第三方代码包后方可使用

## 参数配置

### all

默认值就是`all`，即会先打第三方代码后再打项目代码

### 3part

只打第三方代码

### project

只打项目代码

上面这几个参数意义不大，一般都是默认不写，即打包所有代码