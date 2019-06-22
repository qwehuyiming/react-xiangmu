import React, { Component, Fragment } from 'react';
import { NavBar, Icon, Carousel } from 'antd-mobile';
import { getGoodsInfo } from "../api";

import { connect } from "react-redux";
import { cart_add } from "../store/actionCreator";

class GoodsDetail extends Component {
  state = {
    imgHeight: 176,
    // 轮播图数组
    imglist: [],
    // 商品信息对象
    goodsinfo: {}
  }
  componentDidMount() {
    // 1 在路由对象上
    const { id } = this.props.match.params;
    getGoodsInfo(id)
      .then(res => {
        if (res.status === 0) {
          this.setState({
            imglist: res.message.imglist,
            goodsinfo: res.message.goodsinfo
          });
        }
      })
  }


  render() {
    return (
      <Fragment>
      
        {/* 导航栏 开始 */}
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          // 点击图标 跳转会上一个页面
          onLeftClick={() => this.props.history.go(-1)}
        >商品详情</NavBar>
        {/* 导航栏 结束 */}
     
        {/* 轮播图 开始 */}
        <Carousel
          autoplay
          infinite
        >
          {this.state.imglist.map(val => (
            <a
              key={val.id}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={val.thumb_path}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
        {/* 轮播图 结束 */}
        {/* 商品信息 开始 */}
        <div className="goods_info">
          <div className="goods_title">{this.state.goodsinfo.title}</div>
          <div className="goods_price">
            <span className="sell_price">￥{this.state.goodsinfo.sell_price}</span>
            <span className="market_price">￥{this.state.goodsinfo.market_price}</span>
          </div>
          <div className="goods_detail">
            <div className="goods_detail_title">商品参数</div>
            <div className="goods_detail_content">
              <div className="goods_no"> 商品编号 :  {this.state.goodsinfo.goods_no} </div>
              <div className="stock_quantity"> 商品库存 :  {this.state.goodsinfo.stock_quantity} </div>
            </div>
            <div className="add_time">上架时间 {this.state.goodsinfo.add_time}</div>

          </div>
          {/* 图文详情 */}
          <div className="goods_product" dangerouslySetInnerHTML={{ __html: this.state.goodsinfo.content }} >
          </div>
          <style jsx>
            {`.goods_info {
  padding: 10px;
  background-color: #fff;
  .goods_title {
    padding: 5px 0;
    font-size: 15px;
    color: #666;
  }
  .goods_price {
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    .sell_price {
      font-size: 15px;
      color: red;
    }
    .market_price {
      color: #ccc;
      text-decoration: line-through;
    }
  }
  .goods_detail {
    .goods_detail_title {
      padding: 5px 0;
      font-size: 16px;
      font-weight: 600;
    }
    .goods_detail_content {
      .goods_no {
        padding: 5px 0;
      }
      .stock_quantity {
        padding: 5px 0;
      }
    }
    .add_time {
      padding: 5px 0;
    }
  }
  .goods_product {
    
    margin-bottom:45px;
  }
}
            `}
          </style>

        </div>
        {/* 商品信息 结束 */}

        {/* 底部工具栏 开始 */}
        <div className="btm_tool">
          <div className="btm_item btm_cantact">
            <span className="iconfont icon-kefu"></span>
            <p>客服</p>
          </div>
          <div className="btm_item btm_cart">
            <span className="iconfont icon-gouwuche"></span>
            <p>购物车</p>
            <span className="badge" style={{display:this.props.cartLength?"block":"none"}} >{this.props.cartLength}</span>
          </div>
          <div className="btm_item btm_cart_add" onClick={()=>this.props.handleCartAdd(this.state.goodsinfo)}>
            加入购物车
          </div>
          <div className="btm_item btm_buy">
            立即购买
          </div>
          <style jsx>

            {`
            .btm_tool{
              display: flex;
              height: 40px;
              width: 100%;
              background-color: #fff;
              position: fixed;
              bottom: 0;
              left: 0;
              .btm_item{
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
              }
              .btm_cantact{}
              .btm_cart{
                position: relative;
                .badge{
                  position: absolute;
                  top: 0;
                  left: 61%;
                  border-radius: 50%;
                  padding: 2px 6px;
                  background-color: orangered;
                  color: #fff;
                  font-size: 12px;
                }
              }
              .btm_cart_add{
                flex: 2;
                background-color: orange;
                color: #fff;
                font-size: 16px;
              }
              .btm_buy{
                flex: 2;
                color: #fff;
                font-size: 16px;
                background-color: orangered;
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


const mapStateToProps = (state) => {
  // 种类的数量也等于购物车的长度 
  return {
   cartLength:state.cartReducer.cartList.length
  }
}

// 将 行为映射到 props中
const mapDispatch=(dispatch)=>{
  return {
    handleCartAdd:(goodsObj)=>{
      console.log(goodsObj);
      // 会触发到  管理员上 
      dispatch(cart_add(goodsObj));
    }
  }
}
export default connect(mapStateToProps, mapDispatch)(GoodsDetail);