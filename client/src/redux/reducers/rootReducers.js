import { combineReducers } from "redux";
import translatorReducer from "./translator";
import marketReducer from "./market";
import authReducer from "./auth";
import adminReducer from "./admin";

const rootReducers = combineReducers({
  translatorReducer,
  marketReducer,
  authReducer,
  adminReducer
});
export default rootReducers;
