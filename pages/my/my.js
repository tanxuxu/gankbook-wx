var app = getApp();

Page({
    data: {
        userInfo:{}
    },
    onLoad:function(){
        var that = this;
        app.getUserInfo(function(res){
           that.setData({
               userInfo: res
           });
           console.log(res);
        })
    }
})