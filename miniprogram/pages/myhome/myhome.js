// pages/myhome/myhome.js
const db = wx.cloud.database();
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    nickName:"路人",
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    comment:[],
  },
  onLoad: function () {
    // 获取用户信息
    if (!this.logged){
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                this.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  nickName: res.userInfo.nickName,
                  userInfo: res.userInfo,
                  logged: true,
                })
                this.getComment();
              }
            })
          }
        }
      })
    }
    
  },
  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName,
        userInfo: e.detail.userInfo
      })
    }
  },
  getComment: function () {
    wx.showLoading({
      title: '稍等一下啦',
    })
    db.collection('comment').where({
      author: this.data.nickName
    }).get().then(res => {
      console.log(res);
      this.setData({
        comment: res.data
      })
      wx.hideLoading();
    }).catch(err => {
      console.log(err);
    })
  },
})