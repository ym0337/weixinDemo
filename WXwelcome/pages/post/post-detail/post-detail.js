// require('路径')路径只能用相对路径,绝对路径会报错
var postData = require('../../../data/post-data.js')
// 引入app.js的全局变量
var app = getApp();

Page({
  data: {
    // 可以不设置,下面onMusicTap声明的时候自动会添加上
    musicIsPlaying: false
  },

  onLoad: function (option) {
    // 获取app.js所设置的全局变量
    // var globaldata = app.globalData; 

    // id属性是上一级(post.js)navigateTo url中(?id=) ,自己设置的变量
    var postId = option.id;
    // 给当前的data添加currentPostId属性 = postId,给下面方法调用.
    this.data.currentPostId = postId;
    // console.log(postId);
    var postdata = postData.postList[postId];
    // console.log(postdata);
    // 绑定更新数据
    this.setData({ postdata: postdata });
    // 设置缓存setStorage
    // 本地数据存储的大小限制为 10MB
    // wx.setStorageSync('key', {
    //   name: '哥布林',
    //   level: 'lv1'
    // })

    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      // 更新数据
      this.setData({
        collected: postCollected
      })
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    };
    // 条件
    if (app.globalData.g_musicIsPlaying && app.globalData.g_musicCurrentId === postId) {
      this.setData({
        musicIsPlaying: true
      })
    }
    this.setMusicMonitor();
  },

  setMusicMonitor() {
    var that = this;
    // 监听音频播放/暂停事件
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        musicIsPlaying: true
      });
      app.globalData.g_musicIsPlaying = true;
      // 重要
      app.globalData.g_musicCurrentId = that.data.currentPostId;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        musicIsPlaying: false
      });
      app.globalData.g_musicIsPlaying = false;
      app.globalData.g_musicCurrentId = null;
    });
    wx.onBackgroundAudioStop(function () {
      that.setData({
        musicIsPlaying: false
      });
      app.globalData.g_musicIsPlaying = false;
      app.globalData.g_musicCurrentId = null;
    })
  },

  onCollectionTap: function (event) {
    // 获取缓存getStorage
    // var name = wx.getStorageSync('key').name;
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    // 取反
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    // 更新缓存
    wx.setStorageSync('posts_collected', postsCollected);
    this.setData({
      collected: postCollected
    }),
      wx.showToast({
        title: postCollected ? '收藏成功' : '取消成功',
        icon: 'success',
        duration: 2000
      })
    // showModal({...})
    // 跟showToast类似,不过需要用户手动去确认是否收藏,见 开发文档--api--界面
  },

  onShareTap: function (event) {
    // 清除缓存removeStorage/clearStorage(清理所以缓存)
    // wx.removeStorageSync('key');
    // wx.clearStorageSync();
    var itemLists = ['分享到微信', '分享到朋友圈', '分享到QQ', '分享到联系人'];
    wx.showActionSheet({
      itemList: itemLists,
      success: function (res) {
        wx.showModal({
          title: '提示',
          content: '是否' + itemLists[res.tapIndex],
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  onMusicTap: function (event) {
    var _musicIsPlaying = this.data.musicIsPlaying;
    if (_musicIsPlaying) {
      wx.pauseBackgroundAudio();
      // this.data.musicIsPlaying = false;
      this.setData({
        musicIsPlaying: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.postList[this.data.currentPostId].music.dataUrl,
        title: postData.postList[this.data.currentPostId].music.title,
        coverImgUrl: postData.postList[this.data.currentPostId].music.coverImgUrl
      })
      this.setData({
        musicIsPlaying: true
      })
    }
    // console.log(postData.postList)
  }
})