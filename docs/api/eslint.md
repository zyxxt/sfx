## 使用方式

    cd your-project
    sfx eslint [files]

### 参数配置 files

`files` 默认值是 `src/` 目录，同时也支持传入多个文件或者目录

!> 只针对以下后缀名的文件生效：`js`, `jsx`, `vue`

命令会尝试去读取当前目录下面的`.eslintrc.js`, `.eslintignore` 文件，这里的配置同样会对该命令生效

