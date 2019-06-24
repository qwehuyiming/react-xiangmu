import { CART_ADD, CART_CHECKED, CART_ALL_CHECK, CART_NUM_UPDATE, CART_NUM_DELETE } from "../actionTypes";

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


/**
 * 修改购物车的商品的购买数量
 * @param {Number} id 被操作的商品的id
 * @param {Number} unit 修改为多少
 */
export const cart_num_update = (id, unit) => {
  return {
    type: CART_NUM_UPDATE,
    value: { id, unit }
  }
}

/**
 * 执行删除购物车
 * @param {Number} id 要删除的id
 */
export const cart_num_delete = (id) => {
  return {
    type: CART_NUM_DELETE,
    value: { id }
  }
}