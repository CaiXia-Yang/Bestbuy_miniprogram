// pages/search/search.js
/**
 * 1 输入框绑定值改变事件 input事件
 *  1 获取到输入框的值
 *  2 合法性判断
 *  3 检测通过 把输入框的值发送到后台
 *  4 返回的数据打印到页面上
 * 2 防抖（防止抖动）定时器  节流
 *  0 防抖 一般用于输入框中 防止重复输入 重复发送请求
 *  1 节流 一般用于页面的下拉和上拉
 *  1 定义一个全局的定时器id  
 */
import { request } from "../../request/index.js";
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';

Page({
  data: {
    goods:[],
    //取消 按钮是否显示
    isFocus:false,
    inpValue:""
  },
  TimeId:-1,
  // 输入框的值改变触发的事件
  handleInput(e){
    //1 获取输入框的值
    const {value}=e.detail;
    //2 检测合法性
    if(!value.trim()){
      this.setData({
        goods:[],
        isFocus:false
      })
      //值不合法
      return;
    }
     //3 准备发送请求获取数据
     this.setData({
      isFocus:true
     })
     clearTimeout(this.TimeId);
     this.TimeId=setTimeout(()=>{
      this.qsearch(value);
     },1000);
  },
 //发送请求获取搜索建议 数据
  async qsearch(query){
       const res=await request({url:"/goods/search",data:{query}});
       console.log(res)
       this.setData({
         goods:res.goods
       })
  },
  //点击取消按钮
  handleCancel(){
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
    })
  }
})