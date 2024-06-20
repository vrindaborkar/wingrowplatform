import { LOGIN_SUCCESS, LOGOUT, USER_VERIFY } from "../../action/auth/index";

const getInitialStateFromLocalStorage = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isVerify = localStorage.getItem("isVerify");
  const userRole = localStorage.getItem("userRole");
  return {
    isLoggedIn: isLoggedIn === "true" ? true : false,
    isVerify: isVerify === "true" ? true : false,
    userRole: userRole ? userRole : "",
  };
};

const initialState = getInitialStateFromLocalStorage();

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    case USER_VERIFY:
      return {
        ...state,
        isVerify: true,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        isVerify: false,
      };
    default:
      return state;
  }
};

export default authReducer;
