// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db=cloud.database({
    env:'ssjs57'
  })
  const cl=db.collection('xxqgjf')
  const ur=db.collection("members") 
  const cmd=db.command

  wx.showToast({
    title: ur.where({_openid:cmd.eq(wxContext.OPENID)}).get(),
    icon:'none',
    duration:10000
  })

  cl.add({
    data:{
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