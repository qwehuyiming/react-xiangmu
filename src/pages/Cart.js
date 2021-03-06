import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { NavBar, Icon, SwipeAction, List, Checkbox, Modal } from 'antd-mobile';

import { withRouter } from "react-router-dom";
import { cart_check, cart_all_check, cart_num_update, cart_num_delete } from "../store/actionCreator";
const CheckboxItem = Checkbox.CheckboxItem;
const alert = Modal.alert;
class Cart extends Component {
  render() {

    return (
      <Fragment>
        {/* 导航栏 开始 */}
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          // 点击图标 跳转会上一个页面
          onLeftClick={() => this.props.history.go(-1)}
        >购物车</NavBar>
        {/* 导航栏 结束 */}
        {/* 购物车列表 开始 */}
        <div className="cart_content">
          {
            this.props.carts.map(v =>
              <div className="cart_item" key={v.id}>
                <List>
                  <SwipeAction
                    style={{ backgroundColor: 'gray' }}
                    autoClose
                    right={[
                      {
                        text: '取消',
                        onPress: () => console.log('cancel'),
                        style: { backgroundColor: '#ddd', color: 'white' },
                      },
                      {
                        text: '删除',
                        onPress: () => { this.props.handleDisDelete(v.id) },
                        style: { backgroundColor: '#F4333C', color: 'white' },
                      },
                    ]}
                    onOpen={() => console.log('global open')}
                    onClose={() => console.log('global close')}
                  >
                    <div className="cart_inner">
                      {/* 1 复选框 开始 */}
                      <div className="goods_chk_wrap">
                        {/* 受控表单  */}
                        <CheckboxItem checked={v.isChecked} onChange={() => { this.props.handleCartCheck(v.id) }}>

                        </CheckboxItem>
                      </div>
                      {/* 1 复选框 结束 */}
                      {/* 2 商品图片 开始 */}
                      <div className="goods_img_wrap">

                        <img src={v.img_url} alt="" />
                      </div>
                      {/* 2 商品图片 结束 */}
                      {/* 3 商品名称 开始 */}
                      <div className="goods_name_wrap">
                        <div className="goods_title">{v.goods_name}</div>
                        <div className="goods_price">￥{v.price}</div>
                      </div>
                      {/* 3 商品名称 结束 */}
                      {/* 4 商品数量 开始 */}
                      <div className="goods_num_wrap">
                        <span onClick={() => this.props.handleCartNumUpdate(v.id, -1, v.num)} className="iconfont icon-minus btn_substr "></span>
                        <span className="goods_num">{v.num}</span>
                        <span onClick={() => this.props.handleCartNumUpdate(v.id, 1)} className="iconfont icon-plus btn_add "></span>

                      </div>
                      {/* 4 商品数量 结束 */}
                    </div>
                  </SwipeAction>
                </List>
              </div>
            )
          }
          <style jsx>{`
  .cart_content{
    .cart_item{
      .cart_inner{
        display: flex;
        padding: 5px;
        .goods_chk_wrap{
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .goods_img_wrap{
          flex: 3;
          padding: 5px;
        }
        .goods_name_wrap{
          flex: 3;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .goods_title{
            font-size: 16px;
          }
          .goods_price{
            font-size: 17px;
            color: orangered;
            font-weight: 600;
          }
        }
        .goods_num_wrap{
          flex: 3;
          font-size: 20px;
          display: flex;
          align-items: center;
          .btn_substr{
            color: #666;
            font-size: 20px;
          }
          .btn_add{
            font-size: 20px;
            color: #666;
          }
          .goods_num{
            padding: 0 3px;
          }
        }
      }
    }
  }
  `}</style>

        </div>
        {/* 购物车列表 结束 */}
        {/* 底部工具栏 开始 */}
        <div className="btm_tool">
          {/* 全选 开始 */}
          <div className="all_chk_wrap">
            <CheckboxItem checked={this.props.allChecked} onChange={this.props.handleCartAllCheck} > 全选 </CheckboxItem>
          </div>
          {/* 全选 结束 */}
          {/* 总价 开始 */}
          <div className="all_price_wrap">
            合计 <span className="total_price">￥ {this.props.allPrice}</span>
          </div>
          {/* 总价 结束 */}
          {/* 结算 开始 */}
          <div className="pay_wrap">
            结算({this.props.selectdNums})
          </div>
          {/* 结算 结束 */}

          <style jsx>
            {`
            .btm_tool{
              position: fixed;
              width: 100%;
              height: 50px;
              bottom: 50px;
              left: 0;
              background-color: #fff;
              display: flex;
              .all_chk_wrap{
                flex: 2;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .all_price_wrap{
                flex: 4;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 17px;
                .total_price{
                  font-weight: 600;
                  color: orangered;
                  font-size: 19px;
                }
              }
              .pay_wrap{
                flex: 3;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                background-color: orangered;
                font-weight: 600;
                font-size: 18px;
              }
            }
            `}

          </style>
        </div>
        {/* 底部工具栏 结束 */}
      </Fragment>
    );
  }
}

// 获取中价格
const getTotalPrice = (arr) => {
  let sum = 0;
  arr.forEach(v => {
    // 要的选中的了的商品
    v.isChecked && (sum += v.price * v.num);
    // if(v.isChecked){
    //   sum+=v.price*v.num
    // }
  })
  return sum;
}

const mapStateToProps = (state) => {
  // 种类的数量也等于购物车的长度 
  return {
    carts: state.cartReducer.cartList,
    // 只要购物车中的每一个商品都是选中状态，那么全选的按钮 就是 选中状态 
    allChecked: state.cartReducer.cartList.length && state.cartReducer.cartList.every(v => v.isChecked),
    // 结算中的 数字 => 购物车中 选中了的数组的长度  
    selectdNums: state.cartReducer.cartList.filter(v => v.isChecked).length,
    // 总的价格( 被选中的单价 * 数量 的叠加总和)
    allPrice: getTotalPrice(state.cartReducer.cartList)
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleCartCheck: (id) => {
      dispatch(cart_check(id));
    },
    // 全选
    handleCartAllCheck: (e) => {
      // 获取到全选按钮的选中状态
      let { checked } = e.target;
      dispatch(cart_all_check(checked));
    },
    // 购物车数量的修改

    handleCartNumUpdate: (id, unit, num) => {


      // 判断是否为删除操作
      if (unit === -1 && num === 1) {
        alert('警告', '您确定删除吗?', [
          { text: '取消', onPress: () => console.log('cancel') },
          {
            text: '删除', onPress: () => {
              // 1 只需要传递id就可以了  删除数据
              dispatch(cart_num_delete(id));
            }
          },
        ])
      } else {
        // 编辑数量
        dispatch(cart_num_update(id, unit));
      }
    },
    // 滑动删除的逻辑  
    handleDisDelete: (id) => {
      alert('警告', '您确定删除吗?', [
        { text: '取消', onPress: () => console.log('cancel') },
        {
          text: '删除', onPress: () => {
            // 1 只需要传递id就可以了  删除数据
            dispatch(cart_num_delete(id));
          }
        },
      ])
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(withRouter(Cart));