// require('路径')路径只能用相对路径,绝对路径会报错
var util = require('../../../utils/util.js')
var app = getApp();
Page({

  data: {
    movies: {},
    requestUrl: '',
    totalCount: '',
    totalCount: 18
  },

  onLoad: function (options) {
    var category = options.category; // 这个.category属性是标签data-xx的属性
    this.data.navTitle = category; // 把值保存在data属性中,用于onReady调用
    wx.setNavigationBarTitle({
      title: category
    })
    // console.log(options)
    switch (category) {
      case '正在上映的电影-北京':
        var dataUrl = app.globalData.doubanBase + '/v2/movie/in_theaters';
        break;
      case '即将上映的电影':
        var dataUrl = app.globalData.doubanBase + '/v2/movie/coming_soon';
        break;
      case '豆瓣电影Top250':
        var dataUrl = app.globalData.doubanBase + '/v2/movie/top250';
        break;
    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl + '?start=0&count=18', this.getDoubanData)
  },
  //  ！！上划加载更多
  onScrollLower: function (event) {
    // .requestUrl=上面dataUrl;
    // .totalCount应该设置在getDoubanData的方法中计算,应该数据最终都会通过该方法 
    var nextdataUrl = this.data.requestUrl + '?start=0&count=' + this.data.totalCount;
    util.http(nextdataUrl, this.getDoubanData);
    // 导航条加载loading状态
    wx.showNavigationBarLoading()
  },
  // 下拉刷新,先要在页面开启 "enablePullDownRefresh": "true"
  onPullDownRefresh: function (event) {
    var refreshUrl = this.data.requestUrl + '?start=0&count=20';
    util.http(refreshUrl, this.getDoubanData);
    // 导航条加载loading状态
    wx.showNavigationBarLoading();
  },

  getDoubanData: function (data) {
    var movies = [];
    for (var idx in data.subjects) {
      var subject = data.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        stars: util.toStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    this.setData({
      movies: movies
    });
    this.data.totalCount += 18;
    this.setData(this.data);
    // 导航条加载完毕,loading消失
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  onReady: function (event) {
    // 由于旧版声明周期渲染的原因,所以旧版的 wx导航条内容是设置 是在onReady函数里调用,this.data.navTitle上面保存的值
    wx.setNavigationBarTitle({
      title: this.data.navTitle
    })
  },
  // 详细信息
  onMovieTap: function (option) {
    util.onMovieDetail(option);
  }
})