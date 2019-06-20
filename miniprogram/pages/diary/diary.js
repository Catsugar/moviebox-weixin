// pages/diary/diary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[]
  },
  /**进入详情页 */
  gotoComment:function(event){
    wx.navigateTo({
      url: `../comment/comment?movieid=${event.target.dataset.movieid}`,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  getData: function (options) {
    wx.showLoading({
      title: '稍等一下啦',
    })
    wx.cloud.callFunction({
      name: "getData",
      data:{
        start:this.data.dataList.length,
        count:10
      }
    }).then(res => {
      console.log(res.result);
      this.setData({
        dataList:this.data.dataList.concat(JSON.parse(res.result).subjects)
      });
      wx.hideLoading();
    }).catch(err => {
      console.log(err);
    });
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
    this.getData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})