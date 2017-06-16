
window.$docsify = {

    repo: 'http://200.200.151.26:800/sfx/sfx',

    name: 'sfx 脚手架帮助文档',

    executeScript: false,

    maxLevel: 6,

    subMaxLevel: 6,

    auto2top: true,

    basePath: '/docs/',

    homepage: 'home_page.md',

    // 加载 左树目录
    loadSidebar: 'toc.md',

    // 加载右上角导航条
    loadNavbar: 'nav.md',

    autoHeader: true,

    search: {
        maxAge: 86400000,
        paths: 'auto',
        placeholder: '搜索关键字'
    }
};
