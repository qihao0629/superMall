import {request} from "@/network/request";
export function getDetail(iid) {
  return request({
    url:'/detail',
    params: {
      iid: iid
    }
  })
}
export function getRecommend(){
  return request({
    method: 'GET',
    url: '/recommend'
  })
}


/**
 * 商品基础信息
 */
export class Goods {

  constructor(itemInfo,columns,services){
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.lowNowPrice = itemInfo.lowNowPrice
    this.lowPrice = itemInfo.lowPrice
    this.oldPrice = itemInfo.oldPrice
    this.highPrice = itemInfo.highPrice
    this.highNowPrice = itemInfo.highNowPrice
    this.price = itemInfo.price
    this.discountDesc = itemInfo.discountDesc
    this.discountBgColor = itemInfo.discountBgColor
    // 收藏信息
    this.columns = columns
    // 特色服务
    this.services = services
  }

}
/**
 * 店铺信息
 */
export class Shop {

  constructor(shopInfo){
    // 商店名称
    this.name = shopInfo.name
    // 评分
    this.score = shopInfo.score

    this.logo = shopInfo.shopLogo

    this.shopUrl = shopInfo.shopUrl

    this.cFans = shopInfo.cFans
    this.cGoods = shopInfo.cGoods
    this.cSells = shopInfo.cSells

  }

}
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
