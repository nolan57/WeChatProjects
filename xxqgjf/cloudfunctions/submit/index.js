// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db=wx.cloud.database({
    env:'ssjs57'
  })
  const cl=db.collection('xxqgjf')
  cl.add({
    data:{
      _id: wxContext.OPENID,
      code: event.code,
      name: event.name,
      points: event.points,
      when: event.when
    },
    success:function(res){
      console.log(res)
    }
  })
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}