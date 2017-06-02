静态资源文件专用目录，用于存放项目中的资源文件，比如：字体文件、静态大图、或者某些单独加载的js文件等

    module.exports = {
        staticDirectory: 'static'
    };

!> 该配置必须要配置，默认值为`static`，即在你项目的根目录下面必须要有该目录`static/`，打包生成的`js`、`css`、`img`都会自动放在该目录下面

可参考`BBC`作为例子：

    - static
        + bootstrap
        + iconfont
        - flags
            china.png
            usa.png
            ...
        - map
            - data
                1000000.json
                1010000.json
                ...