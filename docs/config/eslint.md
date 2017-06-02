!> 该配置只在`sfx eslint`时有效，支持的配置可参考：[http://eslint.org/docs/developer-guide/nodejs-api#cliengine](http://eslint.org/docs/developer-guide/nodejs-api#cliengine)，

除了上面这块配置外，还支持`src`配置，该配置指明要对哪些文件做检验，支持`glob`表达式

    module.exports = {
        eslint: {

            // 哪些文件需要eslint校验
            files: [
                'src'
            ]
        }
    };

?> `.eslintignore`的优先级会比`files`的要高

其它`eslint`配置如下：
![](http://200.200.151.26/blog/wp-content/uploads/2017/06/RTX截图未命名.png)