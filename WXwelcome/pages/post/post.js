// require('路径')路径只能用相对路径,绝对路径会报错
var postData = require('../../data/post-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 小程序总是会读取data对象进行数据绑定,这个动作我们成为动作A
    // 一般情况下动作A执行是在ouLoad之后,但是,当含有异步操作的时候,就不一样了.所以,下面我们都用setData来更新数据就没问题了.
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //this.data.post_content = postData.postList

    /*var post_content = [
      {
        date: 'Nov 11 2016',
        img: {
          author_img: '/images/kingfa.png',
          post_img: '/images/01.jpg'
        },
        content: 'Word on the street is that Containers are the hottest new Firefox feature They give users the ability to log in from multiple places at once, place barriers on the flow of data, and other awesome stuff.'
      },
      {
        date: 'Nov 11 2016',
        img: {
          author_img: '/images/kingfa.png',
          post_img: '/images/02.jpg'
        },
        content: 'Word on the street is that Containers are the hottest new Firefox feature They give users the ability to log in from multiple places at once'
      },
      {
        date: 'Nov 11 2016',
        img: {
          author_img: '/images/kingfa.png',
          post_img: '/images/03.jpg'
        },
        content: 'Word on the street is that Containers are the hottest new Firefox feature They give users the ability to log in from multiple places at once, place barriers on the flow of data, and other awesome stuff.'
      },
    ]*/
    // this.setData需要用对象的格式, wx:for="{{post_content:post_content}}"
    // postList是postData里暴露出来的属性
    this.setData({ post_content: postData.postList })
  },
  onpostTap: function (event) {
    // 获取自定义属性dataset.属性
    // currentTarget是当前的那条数据
    // 这里的dataset.postid是i是小写,小程序只会把-符号改为大写,详细再调试的里查看属性
    // 直接写在标签上面的data-xx属性,是会存到dataset属性中,其属性名字除了-之外,全部自动改成小写(postid).
    var postId = event.currentTarget.dataset.postid;
    // console.log('postId: ' + postId);
    wx.navigateTo({
      // 传递数据格式: 跳转页面路径+'?id'+ postId . postId是目标的一个属性,id是自定义的,本次在post-detail.js中onLoad中option.id定义.
      url: 'post-detail/post-detail?id=' + postId
    })
  },
  onSwiperTap:function(event){
    // 当在最外层绑定的事件的时候,利用冒泡属性,可以把事件只写一次在外层标签就行了, onSwiperTap就需要用到target属性,而不是currentTarget属性
    // onSwiperTap事件写在当前标签上,需要用currentTarget属性,但是这样必须每个需要点击的标签都有加上事件,相对上面麻烦
    // var postId = event.currentTarget.dataset.postid;
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  }
})