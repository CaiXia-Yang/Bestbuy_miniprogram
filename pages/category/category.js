// pages/category/category.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧的菜单数据
    leftMenuList: [],
    //右侧的商品数据
    rightContent: [],
    //被点击的左侧的菜单
    currentIndex: 0,
    //右侧内容的滚动条距离顶部的距离
    scrollTop:0

  },

  //接口的返回数据
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 
    0.web中的本地存储和小程序中的本地存储的区别
      1 写代码的方式不一样
        web：localStorage.setItem("key","value") localStorage.getItem("key")
       小程序中： wx.setStorageSync("key","value"); wx.getStorageSync("key");
      2 存的时候有没有做类型转换
        web：不管存入什么类型数据，都会先调用一下toString(),把数据变成字符串 在存入进去
        小程序：不存在类型转换这个操作 存入什么类型的数据进去 获取的时候就是什么类型的数据
    1.先判断一下本地存储中有没有旧的数据
    {time:Date.now(),data:[...]}
    2.没有旧数据 直接发送新请求
    3.有旧数据 同时 旧的数据也没有过期 就使用 本地存储中的旧数据即可
    */
    //1 获取本地存储中的数据（小程序中也是存在本地存储技术）
    const Cates=wx.getStorageSync("cates");
    //2 判断
    if(!Cates){
      //不存在 发送请求获取数据
      this.getCates();
    
    }else{
      //有旧的数据 定义过期时间10s 改成5分钟
      if(Date.now()-Cates.time>1000*10){
        //重新发送请求
        this.getCates();
      }else{
        //可以使用旧的数据
       this.Cates=Cates.data;
       //构造左侧的分类数据
       let leftMenuList = this.Cates.map(v => v.cat_name)
       //构造右侧的商品数据
       let rightContent = this.Cates[0].children;
 
       this.setData({
         leftMenuList,
         rightContent
       })
      }
    
    }
      
  },
  //获取分类数据
  async getCates() {
    // request({
    //   url: "/categories"
    // }).then(res => {
    //   this.Cates = res.data.message;

    //   //把接口的数据存入到本地存储中
    //   wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
        

    //   //构造左侧的大菜单数据
    //   //map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
    //   let leftMenuList = this.Cates.map(v => v.cat_name)
    //   //构造右侧的商品数据
    //   let rightContent = this.Cates[0].children;

    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })

    const res=await request({url:"/categories"});
      // this.Cates = res.data.message;
      this.Cates = res;

      //把接口的数据存入到本地存储中
      wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
        

      //构造左侧的大菜单数据
      //map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
      let leftMenuList = this.Cates.map(v => v.cat_name)
      //构造右侧的商品数据
      let rightContent = this.Cates[0].children;

      this.setData({
        leftMenuList,
        rightContent
      })
  },
  //左侧菜单栏的点击事件
  handleItemTap(e) {
    /* 
    1 获取被点击的标题身上的索引
    2 给data中的currentIndex赋值就可以了
    3 根据不同的索引来渲染右侧的商品内容
    */
    const { index } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    //构造右侧的商品数据
    
    this.setData({
      currentIndex: index,
      rightContent,
       //重新设置右侧内容的 scroll-view标签的距离顶部的距离
      scrollTop:0
    })
   

  }


})