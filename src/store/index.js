// 1 引入管理员
import reducer from "./reducer";
// 2 仓库生成器来创建
import { createStore } from "redux";



export default createStore(reducer,
  // 给谷歌调试工具使用的
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);