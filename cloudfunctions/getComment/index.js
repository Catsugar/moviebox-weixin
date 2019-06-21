// 云函数入口文件

const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async(event, context) => {
  try {
    return await db.collection('comment').add({
      data: {
        author: event.author,
        avatar: event.avatar,
        content: event.content,
        score: event.score,
        movieid: event.movieid,
        moviename: event.moviename,
        moviecover: event.moviecover,
        fileIds: event.fileIds,
        time: event.time,
      }
    })
  } catch (e) {
    console.error(e)
  }
}