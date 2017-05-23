
!> 整个项目还未发布到内部源，仅支持手动安装

    git clone --origin sf --branch sf git@200.200.151.26:sfx/sfx.git
    cd sfx
    yarn install
    npm link

!> 尽量都用`yarn`作为包加载器，这个速度相比`npm`会快很多，可参考：[快速、可靠、安全的依赖管理工具](https://yarn.bootcss.com/docs/install.html)

!> 当然，用`npm install`同样可以支持
