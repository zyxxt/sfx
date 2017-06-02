启用压缩，配置成`true`后，会自动添加`webpack.optimize.UglifyJsPlugin`插件，默认值是：`false`

    module.exports = {
        uglify: true
    };

!> 现在压缩只支持`js`文件，`css`没有配置这个选项，目前意义不大，以后有需要再加