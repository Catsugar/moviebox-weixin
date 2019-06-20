// pages/myhome/myhome.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: "溪苏",
    isLogin: true,
    love: 0,
    list:[{
      author:"小朋友",
      time:"2016.6.2",
      diary:"人生不是被打败的。",
      love: 0
    },
    {
      author: "萝莉",
      time: "2016.9.20",
      diary: "人生就是一盘未开封的巧克力糖。",
      love: 0
    },
    {
      author: "小朋友",
      time: "2020.4.30",
      diary: "我走过了山河，也走过了你。余生不敢再落笔。" ,
      love: 0
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /*收藏*/
  addLove:function(){
    this.setData({
      love:this.data.love+1
    })
    console.log("收藏增加")
  },
  /*改变颜色*/
  changeColor:function(event){
    console.log("改变颜色");
    console.log(event)
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