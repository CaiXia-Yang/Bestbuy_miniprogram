//Page Object
//0 引入用来发送请求的方法  一定要把路径补全
import { request } from "../../request/index.js";
Page({
  data: {
    //轮播图数组
    swiperList: [],
    //导航数组
    catesList:[],
    //楼层数据
    floorList:[]

  },
  //options(Object) 页面开始加载的时候就会触发
  onLoad: function (options) {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
//获取轮播图数据
  getSwiperList(){
   //1 发送异步请求获取轮播图数据 优化的手段可以通过es6的 promise 来解决这个问题
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',

    //   success: (result) => {
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   },
    //   fail: () => {},
    //   complete: () => {}
    // });

    request({ url: "/home/swiperdata" })
      .then(result => {
        this.setData({
          swiperList: result
        })
      })
  },
//获取分类导航数据
  getCateList(){
    request({url:"/home/catitems"})
    .then(result=>{
      this.setData({
        catesList:result
      })
    })
  },
  //获取楼层数据
    getFloorList(){
      request({url:"/home/floordata"})
      .then(result=>{
        var floorList=result.forEach(v => {
          v.product_list.forEach(v1=>{
            v1.navigator_url=v1.navigator_url.replace("?","/goods_list?")
          })
        });
        this.setData({
          floorList:result
        })
      })
    },
});