// 公共函数
// 截取前面6个字节
function toStarsArray(stars) {
  // 取第一位数字
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1)
    } else {
      array.push(0)
    }
  }
  return array;
};
// 异步请求
function http(url, callback) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "application/xml"
    },
    success: function (res) {
      callback(res.data)
    },
    fail: function () {
      console.log('调用失败')
    }
  })
};

// 点击进入电影详细信息页面
function onMovieDetail(option) {
  // 跟onMovieTap方法的标签data-movieid="{{movieId}}"中的变量相同才能设置成功
  var movieId = option.currentTarget.dataset.movieid;
  wx.navigateTo({
    // ?id是跟movie-detail.js中的onload函数里面的options.id属性对应;
    url: "/pages/movies/movies-detail/movies-detial?id=" + movieId
  });
};

function convertToCastString(casts) {
  var arr = [];
  for (var idx in casts) {
    arr.push(casts[idx].name)
  }
  return arr;
};

function convertToCastInfo(casts) {
  var arr = [];
  for (var idx in casts) {
    var _arr = {
      cName: casts[idx].name,
      cAvatars: casts[idx].avatars.large
    };
    arr.push(_arr);
  }
  return arr;
}

module.exports = {
  toStarsArray: toStarsArray,
  http: http,
  onMovieDetail: onMovieDetail,
  convertToCastString: convertToCastString,
  convertToCastInfo: convertToCastInfo
}