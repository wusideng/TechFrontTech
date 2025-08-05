// src/reducers/index.js
import { combineReducers } from "redux";
import productReducer from "./productReducer";
import techUserReducer from "./userReducer";
import commonReducer from "./commonReducer";
import orderReducer from "./orderReducer";
import positionReducer from "./positionReducer";
import contractReducer from "./contractReducer";
import billReducer from "./billReducer";

const rootReducer = combineReducers({
  common: commonReducer,
  user: techUserReducer,
  product: productReducer,
  order: orderReducer,
  position: positionReducer,
  contract: contractReducer,
  bill: billReducer,
  // 其他 reducer...
});

export default rootReducer;
