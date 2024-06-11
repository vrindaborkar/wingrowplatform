import { LOGIN_SUCCESS, LOGOUT } from "../../action/auth/index";

const getInitialStateFromLocalStorage = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return {
    isLoggedIn: isLoggedIn === "true" ? true : false,
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
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
