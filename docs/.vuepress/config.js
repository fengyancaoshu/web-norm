module.exports = {
  title: '前端开发规范',
  description: '前端开发规范的详细说明文件',
  port: 8080,
  head: [
    ['link', { rel: 'icon', href: '/images/favicon.ico' }]
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' }
    ],
    // 默认情况下，侧边栏只会显示由当前活动页面的标题（headers）组成的链接，
    // 你可以将 themeConfig.displayAllHeaders 设置为 true 来显示所有页面的标题链接：
    // displayAllHeaders: true,
    // 侧边栏配置
    sidebar: [
      {
        title: '命名规范',   // 必要的
        path: '/norms/name',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        // collapsable: true, // 可折叠, 默认值是 true,
        sidebarDepth: 3,    // 可选的, 默认值是 1
      },
      {
        title: 'HTML规范',
        path: '/norms/html',
        sidebarDepth: 3,
      },
      {
        title: 'CSS规范',
        path: '/norms/css',
        sidebarDepth: 3,
      },
      {
        title: 'JavaScript规范',
        path: '/norms/javascript',
        sidebarDepth: 3,
      },
      {
        title: 'API接口规范',
        path: '/norms/api',
        sidebarDepth: 3,
      },
      {
        title: '规范化管理工具',
        path: '/norms/tools',
        sidebarDepth: 3,
      },

    ]
  }
}