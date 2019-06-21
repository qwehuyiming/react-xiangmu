import React from 'react';
import './styles/App.css';
import { TabBar } from 'antd-mobile';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: false,
    };
  }


  render() {
    return (
      <div style={ { position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          <TabBar.Item
            title="首页"
            key="Home"
            icon={<span className="iconfont icon-home" /> }
            selectedIcon={<span className="iconfont icon-home" /> }
            selected={this.state.selectedTab === 'blueTab'}
          
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
          >
           1
          </TabBar.Item>
          <TabBar.Item
            icon={ <span className="iconfont icon-gouwuche"  /> }
            selectedIcon={ <span className="iconfont icon-gouwuche"  /> }
            title="购物车"
            key="Cart"
            badge={1}
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
          >
            2
          </TabBar.Item>
          <TabBar.Item
            icon={<span className="iconfont icon-weibiaoti2fuzhi12" /> }
            selectedIcon={ <span className="iconfont icon-weibiaoti2fuzhi12" /> }
            title="我的"
            key="Mine"
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
           3
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}


export default App;
