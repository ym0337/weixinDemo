// require('路径')路径只能用相对路径,绝对路径会报错
var util = require('../../utils/util.js')
var app = getApp();

// pages/movies/movies.js
Page({
  // RESTFUL API JSON
  // SOAP XML
  // 粒度
  /**
   * 页面的初始数据
   */
  data: {
    // 给个 初始属性:{}, 防止异步调用是数据找不到
    inTheaters: {},
    comingSoon: {},
    top250: {},
    containerShow: true,
    searchPanelShow: false,
    searchResult: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // Resources Propertie 属性
    var inTheatersUrl = app.globalData.doubanBase + '/v2/movie/in_theaters' + '?start=0&count=3';
    var comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon' + '?start=0&count=3';
    var top250Url = app.globalData.doubanBase + '/v2/movie/top250' + '?start=0&count=3';
    this.getMoviesListData(inTheatersUrl, 'inTheaters');
    this.getMoviesListData(comingSoonUrl, 'comingSoon');
    this.getMoviesListData(top250Url, 'top250');
  },
  // 提取到util.js作为公共方法调用,http
  getMoviesListData: function (url, titleKey) {
    var that = this;
    wx.request({
      // 网页前面部分 + Resources URI
      url: url,
      // 需要提交数据的时候才需要填写data:{}
      // data:{},
      method: 'GET',// OPTIONS, GET, HEAD, POST,PUT, DELETE, TRACE, CONNECT 几个方法,看情况使用
      header: {
        // "Content-Type": "application/json"
        // 除了/json以外,其他任何单词都可以,例如/xml,/aaa等等
        "Content-Type": "application/xml"
      },
      success: function (res) {
        // console.log(res)
        that.getDoubanData(res.data, titleKey)
      },
      fail: function () {
        console.log('调用失败')
      }
    })
  },
  getDoubanData: function (data, titleKey) {
    var titleBar = data.title;
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
    // 动态添加属性
    this.data[titleKey] = {
      titleBar: titleBar,
      movies: movies
    };
    this.setData(this.data);
  },

  // 更多
  onMoreTap: function (event) {
    var currentCategory = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movies/more-movies?category=' + currentCategory
    })
  },

  // 搜索部分
  // 获取焦点触发
  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },
  // 失去焦点/键入回车触发
  onBindBlur: function (event) {
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase + '/v2/movie/search?q=' + text;
    this.getMoviesListData(searchUrl, "searchResult")
  },
  onClearSearch: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      // 关闭时,清空搜索页面的电影
      searchResult: {}
    })
  },
  // 详细信息
  onMovieTap: function (option) {
    util.onMovieDetail(option);
  }
});