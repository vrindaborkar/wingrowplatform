import { INIT_LOGIN, LOGIN, LOGOUT } from "../../../constant/actionTypes/auth";

const formFieldValueMap = {
  phoneNumber: "",
  otp: "",
  role: "",
};
const getInitialStateFromLocalStorage = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userRole = localStorage.getItem("userRole");
  return {
    isLoggedIn: isLoggedIn === "true" ? true : false,
    userRole: userRole ? userRole : "",
    formFieldValueMap,
    error: "",
    isLoading: false,
    isPageLevelError: false,
    isLoadingPage: false,
    isLoginSuccess: false,
    isLoginError: false,
    isLogoutSuccess: false,
    LogoutError: false,
  };
};

const initialState = getInitialStateFromLocalStorage();

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_LOGIN:
      return {
        ...state,
        ...initialState,
      };
    case LOGIN.START:
    case LOGOUT.START:
      return {
        ...state,
        isLoading: true,
        isPageLevelError: false,
        isLoadingPage: false,
        isLoginSuccess: false,
        isLoginError: false,
        isLogoutSuccess: false,
        LogoutError: false,
      };
    case LOGIN.SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
      };
    case LOGIN.ERROR:
    case LOGOUT.ERROR:
      return {
        ...state,
        isLoading: true,
        isLoginError: true,
      };

    case LOGOUT.SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        isLogoutSuccess: true,
        isLogoutError: false,
      };

    default:
      return state;
  }
};

export default loginReducer;
