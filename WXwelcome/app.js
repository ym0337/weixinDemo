// 跟pages里面的js文件的Page({})作用一样,但是,pages文件里只能用Page({}),app.js只能用App({})
App({
  // 设置全局变量
  globalData: {
    g_musicIsPlaying: false,
    // 记录正在播放的是哪一首歌
    g_musicCurrentId: null,
    doubanBase: 'https://api.douban.com/'
  }
})
