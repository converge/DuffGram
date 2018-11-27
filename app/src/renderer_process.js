import babelPolyfill from "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import PermanentDrawer from "./components/ComponentDrawer";
import "./global.css";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

const initialState = {
  ig_account_id: 0,
  active_ig_account: ""
};

// Redux
function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_ACTIVE_IG_ACCOUNT":
      return {
        ig_account_id: action.ig_account_id,
        active_ig_account: action.selected_ig_account
      };
    default:
      return {
        ig_account_id: 0,
        active_ig_account: "Select IG Account"
      };
  }
}

const store = createStore(reducer);

render(
  <Provider store={store}>
    <PermanentDrawer />
  </Provider>,
  document.getElementById("app")
);
