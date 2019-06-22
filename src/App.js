import React, { Fragment } from 'react';
import './styles/App.css';
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Mine from "./pages/Mine";
import GoodsDetail from "./pages/GoodsDetail";
import MyLayout from "./components/MyLayout";

import { HashRouter as Router, Link, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Router>

          {/* 内容 */}
          {/* 1 直接在Home组件上传递 props 可以解决 Home组件中的路由信息获取的问题 */}
          {/* 2 只要 组件存在 于 Route标签中 都可以通过  withRouter（）来给 里面的组件传递 props 路由信息  */}
          {/* <Route path="/" exact render={(props) => <MyLayout {...props}><Home {...props} /></MyLayout>} /> */}
          <Route path="/" exact render={(props) => <MyLayout {...props}><Home /></MyLayout>} />
          <Route path="/Cart" render={(props) => <MyLayout  {...props}> <Cart /></MyLayout>} />
          <Route path="/Mine" render={(props) => <MyLayout  {...props}><Mine /></MyLayout>} />
          {/* 商品的详情 */}
          <Route path="/GoodsDetail/:id" component={GoodsDetail} />
        
        </Router>
      </Fragment>
    )
  }
}


export default App;
