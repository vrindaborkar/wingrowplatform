import {
  INIT_REGISTRATION,
  REGISTER,
  INIT_LOGIN,
  LOGIN,
  SEND_VERIFICATION_CODE,
  VERIFY_CODE,
  RESEND_VERIFICATION_CODE,
  LOGOUT,
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
  const userRole = localStorage.getItem("role");
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
    sendVerificationCodeSuccess: false,
    reSendVerificationCodeSuccess: false,
    isReSendVerificationCodeError:false,
    isLogoutError:false,
    isSendVerificationCodeError: false,
    isRegisterError:false,
    isVerifiyCodeError: false
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
        initialState
      };

    case LOGIN.SUCCESS:
      return {
        ...state,
        isLoggedIn: true
      };

    case SEND_VERIFICATION_CODE.SUCCESS:
      return {
        ...state,
        sendVerificationCodeSuccess: true,
      };

    case RESEND_VERIFICATION_CODE.SUCCESS:
      return {
        ...state,
        reSendVerificationCodeSuccess: true,
      };

    case VERIFY_CODE: {
      return {
        ...state,
        isVerify: true,
      };
    }
    case LOGOUT.SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        isVerify:false
      };
    case LOGIN.ERROR: {
      return {
        ...state,
        error: action?.payload,
        isLoginError: true,
      };
    }
    case REGISTER.ERROR: {
      return {
        ...state,
        error: action?.payload,
        isRegisterError: true,
      };
    }
    case SEND_VERIFICATION_CODE.ERROR: {
      return {
        ...state,
        error: action?.payload,
        isSendVerificationCodeError: true,
      };
    }
    case VERIFY_CODE.ERROR: {
      return {
        ...state,
        error: action?.payload,
        isVerifiyCodeError: true,
      };
    }
    case RESEND_VERIFICATION_CODE.ERROR: {
      console.log("here is action", action)
      return {
        ...state,
        error: action?.payload,
        isReSendVerificationCodeError: true,
      };
    }
    case LOGOUT.ERROR: {
      return {
        ...state,
        error: action?.payload,
        isLogoutError: true,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
