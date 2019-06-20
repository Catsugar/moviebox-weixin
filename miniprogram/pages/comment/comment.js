// pages/comment/comment.js
const db = wx.cloud.database();
const app = getApp()
//初始化数据库
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    detail: [],
    colors: ["#4EEE94", "#FFD700", "#FF4040", "#8DB6CD", "#009ACD"],
    show: false,
    content: "",
    score: 3,
    images: [],//上传图片
    fileIds: [],
    movieid: -1
  },
  /**进入编辑页 */
  onOpen: function () {
    this.setData({ show: true });
  },
  /**关闭编辑页 */
  onClose: function () {
    this.setData({ show: false });
  },
  /**上传图片 */
  onUpload: function () {
    wx.chooseImage({
      count: 4,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const tempFilePaths = res.tempFilePaths  //可以作为图片的SRC属性
        console.log(tempFilePaths);
        this.setData({
          images: this.data.images.concat(tempFilePaths)
        });
      }
    })
  },
  /**内容改变 */
  onContent: function (event) {
    this.setData({ content: event.detail });
  },
  /**打分 */
  onRate: function (event) {
    this.setData({ score: event.detail });
  },
  /**提交内容 */
  onSubmit: function () {
    wx.showLoading({
      title: '评论中',
    })
    //上传图片云存储
    let promiseArr = [];
    for (let i = 0; i < this.data.images.length; i++) {
      promiseArr.push(new Promise((reslove, reject) => {
        let item = this.data.images[i];
        let suffix = /\.\w+$/.exec(item)[0];
        //取到文件扩展名
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: new Date().getTime + suffix,
          // 指定要上传的文件的小程序临时文件路径
          filePath: item,
          // 成功回调
          success: res => {
            console.log('上传成功', res.errMsg)
            this.setData({
              fileIds: this.data.fileIds.concat(res.fileID)
            })
            reslove();
          },
          fail: console.error
        })
      }))
    }
    Promise.all(promiseArr).then(res => {
      db.collection('comment').add({
        data: {
          author: this.data.userInfo.nickName,
          avatar:this.data.userInfo.avatarUrl,
          content: this.data.content,
          score: this.data.score,
          movieid: this.data.movieid,
          moviename: this.data.detail.title,
          moviecover: this.data.detail.images.large,
          fileIds: this.data.fileIds,
        }
      }).then(res => {
        wx.hideLoading();
        wx.showToast({
          title: "评价成功啦！"
        })
      }).catch(err => {
        wx.hideLoading();
        wx.showToast({
          title: "评价失败了"
        })
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      movieid: options.movieid
    });
    wx.showLoading({
      title: '稍等一下啦',
    })
    wx.cloud.callFunction({
      name: "getDetail",
      data: {
        movieid: options.movieid,
      }
    }).then(res => {
      console.log(res.result);
      this.setData({
        detail: JSON.parse(res.result)
      });
      wx.hideLoading();
    }).catch(err => {
      console.log(err);
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  /*获取用户信息*/
  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
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