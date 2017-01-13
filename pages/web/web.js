var app = getApp();

Page({
    data:{
        listData : [],
        count:15,
        page:1,
        listBoxHeight: 0
    },
    onLoad:function(){
        var that = this;
        app.getGankData('前端',15,1,function(res){
            that.setData({
                listData: res.data.results
            });
        });
        wx.getSystemInfo({
          success: function(res) {
             that.setData({
              listBoxHeight : res.windowHeight
            });
          }
        })
    },
    loadMore:function(){
        var that = this;
        this.setData({
            page : that.data.page++
        });
        app.getGankData('前端',that.data.count,that.data.page,function(res){
            that.setData({
                listData: that.data.listData.concat(res.data.results)
            });
        });
    }
})