import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "draft-js/dist/Draft.css"

import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import Redux from 'redux';
// import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store/index";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  ,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
