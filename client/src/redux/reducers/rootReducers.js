import { combineReducers } from "redux";
import translatorReducer from "./translator";
import marketReducer from "./market";
import loginReducer from "./auth/login";
import registerReducer from "./auth/register";
import msg91Reducer from "./auth/msg91";
import stallReducer from "./stall"

const rootReducers = combineReducers({
  translatorReducer,
  marketReducer,
  loginReducer,
  registerReducer,
  msg91Reducer,
  stallReducer,
});
export default rootReducers;
