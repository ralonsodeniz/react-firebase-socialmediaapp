import { combineReducers } from "redux";
// import reducers
import userReducer from "./reducers/userReducer";
import dataReducer from "./reducers/dataReducer";
import uiReducer from "./reducers/uiReducer";

const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
  ui: uiReducer
});

export default rootReducer;
