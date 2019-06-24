import { CART_ADD, CART_CHECKED, CART_ALL_CHECK } from "../actionTypes";

// 1 负责新增购物车  
export const cart_add = (goodsObj) => {
  return {
    type: CART_ADD,
    // 传入整个商品信息对象就可以
    value: goodsObj
  };

}

/**
 * 切换商品的选中状态
 * @param {Number} id 要修改的商品的id
 */
export const cart_check = (id) => {
  return { type: CART_CHECKED, value: { id } };
}



/**
 * 实现全选功能
 * @param {Book} checked 全选按钮的状态
 */
export const cart_all_check = (checked) => {
  return {
    type: CART_ALL_CHECK,
    value: { checked }
  }
}