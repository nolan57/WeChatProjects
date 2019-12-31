//index.js
const app = getApp()

Page({
  data: {
    inputValue: '',
    btnlable: "submit"
  },
  formSubmit:function(e){
    this.setData({
      inputValue: e.detail.value.input
    })
    if((this.data.inputValue==''||this.data.inputValue==0)&&(this.data.btnlable =="submit"||this.data.btnlable !="submited")){
      this.setData({
        btnlable:"can't submit nothing"
      })
      return
    }
    console.log('form submit: ',this.data.inputValue)

    if(this.data.btnlable !="submited"){
      this.setData({
        inputValue:'',
        btnlable:"submited"
      })
    }
  },
  setsubmit:function(e){
    this.setData({
      btnlable: "submit"
    })
  }
})
