//index.js
const app = getApp();
const db = wx.cloud.database();
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    allcomment: []
  },
  onLoad: function() {
    // 获取用户信息
    wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                this.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  userInfo: res.userInfo,
                  logged:true,
                })
              }
            })
          }
        }
      }),
      this.getallComment();
  },
  getallComment: function(options) {
    wx.showLoading({
      title: '稍等一下啦',
    })
    db.collection('comment').get().then(res => {
      console.log(res);
      this.setData({
        allcomment: res.data
      })
      wx.hideLoading();
    }).catch(err => {
      console.log(err);
    })
    
  },
  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
})