//app.js

var util = require("utils/util.js");
//
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
  getGankData:function(type,count,page,callback){
    /*
    type:   all | Android | iOS | 休息视频 | 福利 | 拓展资源 | 前端 | 瞎推荐 | App
    count ：每次请求条目
    page ： 当前页
    */ 
    //调用微信请求接口
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    wx.request({
      url:'https://gank.io/api/data/'+type+'/'+count+'/'+page+'',
      method:"GET",
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        callback(res);
        wx.hideToast();
      }
    });
  },
  //获取某一天的数据
  getDateData:function(date,callback){
    
    var searchDate = util.formatTime(date);
    var resultsArr =  [];

    var url = "https://gank.io/api/day/"+searchDate+"";
    wx.showToast({
      title: '加载中',
      icon : "loading"
    });

    wx.request({
      url: url,
      method: 'GET', 
      header: {
        'Content-Type': 'application/json'
      }, 
      success: function(res){
       if(typeof callback == 'function'){
         var data = res.data.results;
         for(var i in data){
           for(var j=0;j<data[i].length;j++){
             resultsArr.push(data[i][j]);
           }
         }

         callback(resultsArr);
         wx.hideToast();
       }
      }
    })

  },
  //提交数据到gank
  PostData: function(options,callback){
    var url = options.url || 'https://gank.io/api/add2gank';
    var data = options.data || {};
    var that = this;
    wx.request({
        url : url,
        data :that.json2Form(data),
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },    
        method : 'POST',
        success : function(res){
            callback(res)
        }
    })
  },
  json2Form:function(json) {
      var str = [];
      for(var p in json){
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
      }
      return str.join("&");
  }
})