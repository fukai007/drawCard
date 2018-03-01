// pages/goodsMain/goodsMain.js
//index.js
import { makePar, extend } from '../../utils/util.js';
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let gmid = options.gmid;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      wx.updateShareMenu({withShareTicket: true})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.fetchData({
      func: 'goods.get_goods_detail',
      g_id: this.options.gmid
    }).then(data => {
      this.setData({ gd: data, isfh: this.options.isfh});
    })
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
    let imageUrl = this.data.gd.g_img;
    let title = '不要钱！答对就拿走，对的多拿的多';
    let path = this.route + '?gmid=' + this.options.gmid;

    if(res.shareTickets) app.fetchData({func:'resurrection_card.share_group'})

    return {
      title: title,
      path: path,
      imageUrl: imageUrl,
      success: function (res) { },
      fail: function (res) { }
    }
  },
  toga:function(){
    app.toPage('askForGoods', {
      g_id: this.data.gd.g_id
    },'to');
  },
  /**
   * 跳转到小程序 -2018-02-25 16:37:10
   */
  toOtherMPById:function(){
    let {appid,path} = this.data.gd;
    console.log(appid,path);
    app.fetchData({
      func: 'resurrection_card.click_mini_program'
    }).then(()=>{
      wx.navigateToMiniProgram({ appId: appid, path })
    }).catch(()=>{
      wx.showToast({ title: '领取复活卡失败', image: "../../images/error-a.png" });
      wx.navigateToMiniProgram({ appId: appid, path })
   })

  },
})
