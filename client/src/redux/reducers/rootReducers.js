import { combineReducers } from "redux";
import translatorReducer from "./translator";
import marketReducer from "./market";
import authReducer from "./auth";

const rootReducers = combineReducers({
  translatorReducer,
  marketReducer,
  authReducer,
});
export default rootReducers;
