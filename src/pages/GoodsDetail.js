import React, { Component, Fragment } from 'react';
import { NavBar, Icon, Carousel } from 'antd-mobile';
import { getGoodsInfo } from "../api";
class GoodsDetail extends Component {
  state = {
    imgHeight: 176,
    // 轮播图数组
    imglist: []
  }
  componentDidMount() {
    // 1 在路由对象上
    const { id } = this.props.match.params;
    getGoodsInfo(id)
      .then(res => {
        if (res.status === 0) {
          this.setState({
            imglist: res.message.imglist
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
      </Fragment>
    );
  }
}
export default GoodsDetail;