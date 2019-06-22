import { CART_ADD } from "../actionTypes";

// 1 负责新增购物车  
export const cart_add = (goodsObj) => {
  return {
    type: CART_ADD,
    // 传入整个商品信息对象就可以
    value: goodsObj
  };

}