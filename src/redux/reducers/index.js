import { combineReducers } from "redux";

import sidebar from "./sidebarReducers";
import layout from "./layoutReducer";
import theme from "./themeReducer";
import authReducer from "./authReducer"
import projectReducer from "./projectReducer"
import taskReducer from "./taskReducer"
import { reducer as toastr } from "react-redux-toastr";

const appReducer = combineReducers({
  user: authReducer,
  project: projectReducer,
  task: taskReducer,
  sidebar,
  layout,
  theme,
  toastr
})

export default appReducer;
