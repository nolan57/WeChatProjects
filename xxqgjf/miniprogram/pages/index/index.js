//index.js
const app = getApp()

Page({
  data: {
    date: '',
    ph: '',
    inputValue: '',
    btnlable: "submit",
    ress:""
  },
  formSubmit:function(e){
    
    this.setData({
      inputValue: e.detail.value.input,
      date: new Date()
    })

    if((this.data.inputValue==''||this.data.inputValue==0)&&(this.data.btnlable =="submit"||this.data.btnlable !="submited")){
      this.setData({
        btnlable:"can't submit nothing"
      })
      return
    }

    wx.cloud.init({
      env:'ssjs57'
    })
    const oid = wx.cloud.OPENID
    const db=wx.cloud.database()
    const cl=db.collection('xxqgjf')
    const ur=db.collection("members") 
    const cmd=db.command
    let today=this.data.date.getFullYear().toString()+'/'+(this.data.date.getMonth()+1).toString()+'/'+this.data.date.getDate().toString()

    ur.get({
      success:(res)=>{
        let member=res.data
        let flag=false
        console.log(oid)
        for(let i=0;i<member.length;i++){
          console.log(member[i]._openid)
          if(member[i]._openid===oid){
            flag=true
            break
          }
        }
        if(flag==false){
          wx.showToast({
            title: '尚未注册',
            icon:'fail',
            duration:5000
          })
          wx.redirectTo({
            url: '/pages/register/register',
          })
        }
      },
      fail:
        //console.log('引用数据库错误')
        wx.showToast({
          title: '引用数据库错误',
          //icon:'fail',
          duration:5000
        })
        //return
    })

    if(this.data.btnlable !="submited"){
      this.setData({
        inputValue: '',
        btnlable: "submited"
      })
    }
  },
  
  setsubmit:function(e){
    this.setData({
      btnlable: "submit"
    })
  },

  submitRecord:function(member,record,when){
    wx.cloud.callFunction({
      name: 'submit',
      data:{
        code: member.code,
        name: member.name,
        points: record,
        when: when
      },
      success:function(res){
        wx.showToast({
          title: '积分已提交',
          icon:'success',
          duration:2500
        })
      },
      fail:console.error
    })
  }

})
