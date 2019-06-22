import React, { Component, Fragment } from 'react';
//  可以让我们的Home组件获取到路由信息对象 history 和match
import { withRouter } from "react-router-dom";
import { getGoods, getGoodsGrouup } from "../api";
import { Carousel } from 'antd-mobile';

class Home extends Component {
  state = {
    // 轮播图
    sliderlist: [],
    // 推荐商品
    toplist: [],
    // 商品列表
    goodsGroupList: [],
    imgHeight: 176,
  }
  componentDidMount() {
    getGoods()
      .then(res => {
        if (res.status === 0) {
          // 成功
          this.setState({
            sliderlist: res.message.sliderlist,
            toplist: res.message.toplist
          });
        }
      })

    // 首页商品列表
    getGoodsGrouup()
      .then(res => {
        if (res.status === 0) {
          // 成功
          this.setState({ goodsGroupList: res.message });
        }
      })
  }


  render() {
    console.log(this.props);
    return (
      <Fragment>
        {/* 轮播图 开始 */}
        <Carousel
          autoplay
          infinite
        >
          {this.state.sliderlist.map(val => (
            <a
              key={val.id}
              href="javascript:;"
              onClick={()=>this.props.history.push("/GoodsDetail/"+val.id)}
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={val.img_url}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // 留下来
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
        {/* 轮播图 结束 */}
        {/* 推荐商品 开始 */}
        <div className="recommend_goods">
          <div className="recommend_goods_title">推荐商品</div>
          <div className="recommend_goods_content">
            {this.state.toplist.map(v =>
              <a key={v.id} href="javascript:;" onClick={()=>this.props.history.push("/GoodsDetail/"+v.id)}  className="recommend_goods_item" >
                <div className="recommend_img_wrap"> <img src={v.img_url} alt="" /> </div>
                <div className="recommend_goods_name">
                  <p>{v.title}</p>
                </div>
              </a>
            )}
          </div>

          <style jsx>
            {`
          .recommend_goods_title{
            padding: 10px;
            background-color: #f5f5f9;
            color: #666;
          }
          .recommend_goods_content{
            .recommend_goods_item{
              background-color: #fff;
              border-bottom: 1px solid #666;
              display: flex;
              .recommend_img_wrap{
                flex: 1;
                padding: 20px;
                img{}
              }
              .recommend_goods_name{
                flex: 6;
                display: flex;
                align-items: center;
                font-size: 14px;

                overflow: hidden;
                p{
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                }
              }
            }
          }
          `}
          </style>
        </div>
        {/* 推荐商品 结束 */}

        {/* 商品列表 开始 */}
          <div className="goods_group">
          {this.state.goodsGroupList.map(v1=>
               <div key={v1.level1cateid} className="goods_group_item">
               <div className="goods_group_item_title">{v1.catetitle}</div>
               <div className="goods_group_item_content">
                 {v1.datas.map(v2=> 
                  <a href="javascript:;" onClick={()=>this.props.history.push("/GoodsDetail/"+v2.artID)} key={v2.artID} className="goods_item" >
                    <img src={v2.img_url} alt=""/>
                    <div className="artTitle">{v2.artTitle}</div>                    
                    <div className="goods_price">
                      <span className="sell_price">{v2.sell_price}</span>
                      <span className="market_price">{v2.market_price}</span>
                    </div>
                    <div className="goods_num">
                      热卖中  <span className="stock_quantity">{v2.stock_quantity}</span>
                    </div>
                  </a>
                  )}
               </div>
             </div>
            )}

            <style jsx>
              {`
              .goods_group{
               .goods_group_item{
                 .goods_group_item_title{
                   padding: 10px;
                   background-color: #f5f5f9;
                   font-size: 14px;
                 }
                 .goods_group_item_content{
                   display: flex;
                   flex-wrap: wrap;
                   .goods_item{
                     width: 50%;
                     padding: 10px;
                     background-color: #fff;
                     border-bottom: 1px solid #666;
                     &:nth-child(odd){
                       border-right: 1px solid #666;
                     }
                    img{}
                    .artTitle{
                      font-size: 15px;
                      display: -webkit-box;
                      overflow: hidden;
                      white-space: normal!important;
                      text-overflow: ellipsis;
                      word-wrap: break-word;
                      -webkit-line-clamp: 2;
                      -webkit-box-orient: vertical; 
                    }
                    .goods_price{
                      display: flex;
                      justify-content: space-between;
                      .sell_price{
                        color: red;
                        font-size: 15px;
                      }
                      .market_price{
                        font-size: 13px;
                        color: #666;
                        text-decoration: line-through ;
                      }
                    }
                    .goods_num{
                      .stock_quantity{
                        font-size: 15px;
                        color: red;
                      }
                    }
                   }
                 }
               }
              }
              `}
            </style>
          </div>
        {/*  商品列表 介绍 */}
      </Fragment>
    );
  }
}

export default withRouter(Home);