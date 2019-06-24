import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { NavBar, Icon, SwipeAction, List, Checkbox } from 'antd-mobile';

import { withRouter } from "react-router-dom";
const CheckboxItem = Checkbox.CheckboxItem;
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
              <div className="cart_item">
                <List>
                  <SwipeAction
                    style={{ backgroundColor: 'gray' }}
                    autoClose
                    right={[
                      {
                        text: 'Cancel',
                        onPress: () => console.log('cancel'),
                        style: { backgroundColor: '#ddd', color: 'white' },
                      },
                      {
                        text: 'Delete',
                        onPress: () => console.log('delete'),
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
                        <CheckboxItem >
                        
                        </CheckboxItem>
                      </div>
                      {/* 1 复选框 结束 */}
                      {/* 2 商品图片 开始 */}
                      <div className="goods_img_wrap">

                        <img src={v.img_url} alt=""/>
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
                        <span className="iconfont icon-minus "></span>
                        <span className="goods_num">{v.num}</span>
                        <span className="iconfont icon-plus "></span>
                      </div>
                      {/* 4 商品数量 结束 */}
                    </div>
                  </SwipeAction>
                </List>
              </div>
            )
          }
        </div>
        {/* 购物车列表 结束 */}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  // 种类的数量也等于购物车的长度 
  return {
    carts: state.cartReducer.cartList
  }
}


export default connect(mapStateToProps, null)(withRouter(Cart));