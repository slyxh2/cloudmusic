module.exports = {
  lintOnSave: false,
    css: {
      loaderOptions: {
        less: {
          // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
          lessOptions: {
            modifyVars: {
              // 直接覆盖变量
              'nav-bar-text-color': '#fff',
              'nav-bar-icon-color': '#fff',
              'swipe-indicator-margin': 0,
              'tabbar-item-active-color' : '#fff',
              'tabbar-item-active-background-color' : '#717ff9'
            },
          },
        },
      },
    }
}