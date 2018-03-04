var util = require('../../../utils/util.js');
var app = getApp();

Page({

  data: {
    movies: {}
  },
  onLoad: function (options) {
    var movieId = options.id;
    var movieDetailURL = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
    util.http(movieDetailURL, this.processDoubanData)
  },
  processDoubanData: function (data) {
    var movies = {
      directors: {
        name: data.directors[0] ? data.directors[0].name : '',
        avatars: data.directors[0] ? data.directors[0].avatars.large : '',
        id: data.directors[0] ? data.directors[0].id : ''
      },
      rating: {
        average: data.rating.average,
        stars: util.toStarsArray(data.rating.stars)
      },
      image:data.images.large,
      aka: data.aka,
      casts: util.convertToCastString(data.casts),
      castsInfos: util.convertToCastInfo(data.casts),
      countries: data.countries,
      genres: data.genres,
      wish_count: data.wish_count,
      title: data.title,
      wish_count: data.wish_count,
      summary: data.summary,
      year: data.year

    };
    this.setData({
      movies: movies
    })
    util.convertToCastString(data.casts)
    console.log(movies)
  }
})