import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/iconfont.css';
import App from './App';

import store from "./store";
// react-redux 来产生联系
import { Provider } from "react-redux";


ReactDOM.render(<Provider store={store}> <App /> </Provider> , document.getElementById('root'));

