Page({
  onTap: function () {
    // navigateTo,redirectTo都是内容都是对象模式,url,navigateTo跳转后带有返回键,redirectTo跳转后,页面成为主页面(没返回键)
    // navigateTo带有返回的页面,小程序只能最多跳转5级页面(保持小程序简洁性)
    // wx.navigateTo({
    //   url: '../post/post'
    // });

    // 假如设置了tabbar,只能用switchTab,不能用navigateTo或者redirectTo
    wx.switchTab({
      url: '../post/post'
    })
  },
  // redirectTo跳转的时候触发,当页面被关闭的时候执行
  onUnload: function () {
    console.log('unload')
  },
  // navigateTo跳转的时候触发,当页面被隐藏的时候执行
  onHide: function () {
    console.log('hide')
  }
})

// 注意:.json文件不能写注释
// 只有设置了当前页面,当前页面才能出现tabbar
    // {
    //   "pagePath": "pages/welcome/welcome",
    //   "text": "电影",
    //   "iconPath": "/images/icon/icon01.png",
    //   "selectedIconPath": "/images/icon/icon02.png"
    // }
    // 这样就能在welcome页面出现tabbar栏