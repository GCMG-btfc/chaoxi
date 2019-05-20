/**  头像   */
var util = require('../../utils/util.js');

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    h1:1,  //别动
    
    timer: '',//定时器名字
    countDownNum: '5',//倒计时初始值
    countDownMiao: '20',
    //选择器
    array: ['1','5', '10', '20', '30','60','120'],
    index: '',
    picker:'1',
    // 音频
    yinye:false,
    //按钮选择
    btn_x:'1',
    //样式变换控制
    clatxt:'1',
    clapik:'1',
    
  },
  
  // 音乐播放
  yinyeplay:function(){
    let that = this;
    if(that.data.yinye === true){
      wx.playBackgroundAudio({
        dataUrl: 'https://wx-aliyun.oss-cn-beijing.aliyuncs.com/video/RainyMood.mp3',
      })
      //that.data.yinye = false;
    }
    else{
      wx.stopBackgroundAudio()
    }
  },
  
  //取值，赋值
  setNum:function(){
    let that = this;
    var id = parseInt(that.data.index);
    that.setData({
      countDownNum: that.data.array[id]
    })
  },

  //选择器
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
    })
    this.setNum()
  },

  //定时器
  countDown: function () {
    let that = this;
    let countDownNum = that.data.countDownNum;//获取倒计时初始值
    let countDownMiao1 = that.data.countDownMiao;
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，
    //所以要把定时器存进data里面
    that.setData({
      timer: setInterval(function () {//这里把setInterval赋值给变量名
        //为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        countDownMiao1--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        if (countDownMiao1 >= 0) {
          that.setData({
            countDownMiao: countDownMiao1
          })
          if (countDownMiao1 === 0) {
            if (countDownNum != 0) {
              countDownMiao1 = 59;
            }
            countDownNum--;
            that.setData({
              countDownNum: countDownNum
            })
          }

        }
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        //播放音频
        if (that.data.yinye === false) {
          that.data.yinye = true;
          that.yinyeplay();
        }

        if (countDownNum <= 0) {
          console.log("000");
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，
          //那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          if (countDownMiao1 <= 0) {
            
            that.button4();
            //关闭定时器之后，可作其他处理codes go here
          }
        }
      }, 1000)

    })
  },
  
  //按钮事件
  button1:function(e){
    //开始播放
    let that = this;
    that.countDown();
    that.setData({
      btn_x:'2',
      clatxt: '0',
      clapik: '0',
    })
    
  },
  button2:function(e){
    //暂停播放
    let that = this;
    that.setData({
      btn_x: '3'
    })
    clearInterval(that.data.timer);
    wx.pauseBackgroundAudio();
  },
  button3:function(e){
    //继续播放
    let that = this;
    that.setData({
      btn_x: '2'
    })
    that.countDown();
    wx.playBackgroundAudio();
  },
  button4:function(e){
    //停止播放
    let that = this;
    that.setData({
      btn_x: '1',
      countDownNum: '5',
      countDownMiao: '20',
      clatxt: '1',
      clapik: '1',
    })
    clearInterval(that.data.timer);
    wx.stopBackgroundAudio();
    that.data.yinye = false;
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //console.log("当前时间戳为：" + timestamp);
    var n = timestamp * 1000;
    var date = new Date(n);
    var h = date.getHours();
    that.setData({
      h1:h
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


    
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})