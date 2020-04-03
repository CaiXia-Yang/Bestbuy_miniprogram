// pages/cart/cart.js
/* 
1 获取用户的收货地址
  1 绑定点击事件
  //2 调用小程序内置api 获取用户的收货地址

  2 获取用户对小程序所授予获取地址的权限状态 scope
    1 假设用户点击获取收货地址的提示框 确定
    scope 值 true 直接调用获取收货地址
    2 假设用户从来没有调用过收货地址的api
    scope undefined 直接调用获取收货地址
    3 假设用户点击获取收货地址的提示框 取消
     scope 值 false
     1 诱导用户 自己打开授权设置页面(wx.openSetting) 当用户重新给与获取地址权限时
     2 获取收货地址
    4 把获取到的收货地址存入到本地存储中
2 页面加载完毕
  0 onLoad onShow
  1 获取本地存储中的地址数据
  2 把数据设置给data中的一个变量
*/

import { getSetting, chooseAddress, openSetting } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{}
  },
  //点击收货地址
  async handleChooseAddress() {
   try {
      //1 获取权限状态
    // wx.getSetting({
    //   success: (result) => {
    //     //  2 获取权限状态 主要发现一些属性名称很怪异时 使用[]形式来获取属性值

    //     const scopeAddress = result.authSetting["scope.address"];
    //     if (scopeAddress === true || scopeAddress === undefined) {
    //       wx.chooseAddress({
    //         success: (result1) => {
    //           console.log(result1)
    //         }
    //       });
    //     } else {
    //       //3 用户以前拒绝过授予权限 先诱导用户打开授权页面
    //       wx.openSetting({
    //         success: (result2) => {
    //           //4 可以调用收货地址代码
    //           wx.chooseAddress({
    //             success: (result3) => {
    //               console.log(result3)
    //             }
    //           });

    //         }
    //       });

    //     }
    //   },
    //   fail: () => { },
    //   complete: () => { }
    // });

    //获取权限状态
    const res1 = await getSetting();
    const scopeAddress = res1.authSetting["scope.address"];
    //2 判断权限状态
    if (scopeAddress === false) {
      //3 诱导用户 自己打开授权设置页面(wx.openSetting)
      await openSetting();
    }
    //4 调用收货地址的api
    let address = await chooseAddress();
    address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo;
    //5 存入缓存中
    wx.setStorageSync("address", address);
      
   } catch (error) {
     console.log(error)
   }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //1 获取缓存中的收货地址信息
    const address=wx.getStorageSync("address");
    //2 给data赋值
    this.setData({
      address
    })
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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