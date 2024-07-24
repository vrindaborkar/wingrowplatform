import {
  INIT_LOGIN,
  INIT_REGISTRATION,
  LOGIN,
  LOGOUT,
  REGISTER,
  RESEND_VERIFICATION_CODE,
  SEND_VERIFICATION_CODE,
  VERIFY_CODE,
} from "../../../constant/actionTypes/auth";

const formFieldValueMapRegister = {
  username: "",
  password: "",
};
const formFieldValueMapLogin = {
  username: "",
  password: "",
};
const getInitialStateFromLocalStorage = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isVerify = localStorage.getItem("isVerify");
  const userRole = localStorage.getItem("userRole");
  return {
    isLoggedIn: isLoggedIn === "true" ? true : false,
    isVerify: isVerify === "true" ? true : false,
    userRole: userRole ? userRole : "",
    formFieldValueMapRegister,
    formFieldValueMapLogin,
    error: "",
    isLoading: false,
    isPageLevelError: false,
    isLoadingPage: false,
    isLoginSuccess: false,
    isLoginError: false,
    isLogoutSuccess: false,
    LogoutError: false,
    sendVerificationCodeSuccess:false

  };
};

const initialState = getInitialStateFromLocalStorage();

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_LOGIN:
    case INIT_REGISTRATION:
      return {
        ...state,
        initialState,
      };

    case LOGIN.START:
    case REGISTER.START:
    case SEND_VERIFICATION_CODE.START:
    case VERIFY_CODE.START:
    case LOGOUT.START:
    case RESEND_VERIFICATION_CODE.START:
      return {
        ...state,
        isLoggedIn: true,
      };

    case LOGIN.SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };

    case SEND_VERIFICATION_CODE.SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        sendVerificationCodeSuccess:true
      };

    case VERIFY_CODE: {
      return {
        ...state,
        isVerify: true,
      };
    }
    case LOGIN.ERROR:
    case REGISTER.ERROR:
    case SEND_VERIFICATION_CODE.ERROR:
    case VERIFY_CODE.ERROR:
    case LOGOUT.ERROR:
    case RESEND_VERIFICATION_CODE.ERROR:
      return {
        ...state,

        isLoginError: true,
      };

    default:
      return state;
  }
};

export default authReducer;

