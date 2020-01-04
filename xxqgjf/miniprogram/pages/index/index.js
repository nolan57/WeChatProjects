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
    const db=wx.cloud.database({})
    //const cl=db.collection('xxqgjf')
    const ur=db.collection("members") 
    const cmd=db.command

    ur.where({_openid:cmd.eq(oid)}).get().then(
      res=>{
        if(typeof(res.data.code)=="undefined"){
          this.setData({btnlable:"Not a member"})
          return
          }
        }
      )

    console.log('form submit: ',this.data.inputValue)
    wx.cloud.callFunction({
      name: 'submit',
      data:{
        code: "080001",
        name: "wuqiang",
        points: this.data.inputValue,
        when: this.data.date.getFullYear().toString()+'/'+(this.data.date.getMonth()+1).toString()+'/'+this.data.date.getDate().toString()
      },
      success:function(res){
        console.log(res.result.event.when)
      },
      fail:console.error
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
  }
})
