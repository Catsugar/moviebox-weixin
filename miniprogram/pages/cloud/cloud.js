// pages/cloud/cloud.js
const db=wx.cloud.database();
//初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /*插入数据*/
  insert: function(){
   /* db.collection('user').add({
      data:{
        id:"u000000",
        name:"胡歌",
        diary:[
          "生活十条床",
          "举世情歌在替我说爱你"
        ]
      },
      success: res => {  //箭头函数
        console.log(res);
      },
      fail:err=>{
        console.log(err);
      }
    })*/
    db.collection('user').add({
      data: {
        id: "u000000",
        name: "肖战",
        diary: [
          "生活十条床",
          "举世情歌在替我说爱你"
        ]
      }
    }).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },
   /*更新数据*/
  update:function(){
    db.collection('user').doc("2d9d2d8c5cfe72b5034622bb5efd83a4").update({
      data:{
        name:"朱一龙"
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },
  /*查找数据*/
  search: function () {
    db.collection('user').where({
        name: "朱一龙"
    }).get().then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },
  /*删除数据*/
  delete: function () {
    db.collection('user').doc("2d9d2d8c5cfe72b5034622bb5efd83a4")
    .remove().then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },
  /*调用云函数sum*/
  sum: function () {
    wx.cloud.callFunction({
      name:"sum",
      data:{
        a:10,
        b:22
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },
  /*调用云函数login*/
  getOpenid: function () {
    wx.cloud.callFunction({
      name: "login",
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },
  /*调用云函数batchDelete*/
  batchDelete: function () {
    wx.cloud.callFunction({
      name: "batchDelete",
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },
  /*上传图片*/
  upload: function () {
    wx.chooseImage({
       count:1,
       sizeType:['original','compressed'],
       sourceType:['alum','camera'],
       success: function(res) {
         const tempFilePaths=res.tempFilePaths  //可以作为图片的SRC属性
         console.log(tempFilePaths);
         wx.cloud.uploadFile({
           // 指定上传到的云路径
           cloudPath: new Date().getTime()+'.png',
           // 指定要上传的文件的小程序临时文件路径
           filePath: tempFilePaths[0],
           // 成功回调
           success: res => {
             console.log('上传成功', res.errMsg)
             db.collection('image').add({
               data:{
                fileID: res.fileID
               }
             }).then(res=>{
                console.log(res);
             }).catch(err => {
                console.log(err);
             })
           },
           fail:console.error
         })
       }
    })
  },
  /*展示图片*/
  getImage: function () {
    wx.cloud.callFunction({
      name: "login",
    }).then(res => {
      db.collection('image').where({
        _openid: res.result.openid
      }).get().then(res2=>{
        console.log(res2);
        this.setData({
          images:res2.data
        })
      })
    }).catch(err => {
      console.log(err);
    })
  },
  /*下载图片*/
  download: function (event) {
    wx.cloud.downloadFile({
      fileID: event.target.dataset.fileid, // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath)
        //保存图片到手机相册
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title:"保存成功"
            })
          }
        })
      },
      fail: console.error
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'login',
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