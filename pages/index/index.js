//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    swiperImg:[],
    listData:[],
    count:15,
    day: 0,   //1为昨天，2为前天
    hasMore: true,
    listBoxHeight: 0
  },
  onLoad: function () {
    var that = this;
    //轮播图数据
    app.getGankData('福利',3,1,function(res){
      that.setData({
        swiperImg: res.data.results
      });
    });
    //
    var now = new Date();
    app.getDateData(now,function(res){
      that.setData({
        listData: res
      });
      wx.getSystemInfo({
          success: function(res) {
            that.setData({
              listBoxHeight : res.windowHeight
            });
          }
      });
    });
  },
  getPrevDate:function(){
    var now = new Date();
    this.data.day++;
    now.setDate(now.getDate()-this.data.day);
    return now;
  },
  details:function(event){    //微信不支持外部链接
     var url = event.currentTarget.dataset.src;
     console.log(url);
     wx.navigateTo({
       url:url
     })
  },
  loadMore:function(){
    var that = this;
    //获取上一天的数据
    var now = that.getPrevDate();
    app.getDateData(now,function(res){
      that.setData({
        listData: that.data.listData.concat(res)
      });
      wx.getSystemInfo({
          success: function(res) {
            that.setData({
              listBoxHeight : res.windowHeight
            });
          }
      });
    });
    //
  }
})
