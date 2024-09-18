import {
  INIT_LOGIN,
  LOGIN,
  REGISTER,
  SEND_VERIFICATION_CODE,
  VERIFY_CODE,
  RESEND_VERIFICATION,
  LOGOUT,
} from "../../../constant/actionTypes/auth";
import { authService } from "../../../services";

export const init_login = () => {
  return {
    type: INIT_LOGIN,
  };
};
export const loginStart = (payload) => {
  return {
    type: LOGIN.START,
    payload,
  };
};
export const loginSuccess = (payload) => {
  return {
    type: LOGIN.SUCCESS,
    payload,
  };
};
export const loginError = (payload) => {
  return {
    type: LOGIN.ERROR,
    payload,
  };
};

export const login = (payload) => {
  return (dispatch) => {
    dispatch(loginStart());
    authService.login(payload).then((logindata) => {
      if (!logindata.isError) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", logindata.accessToken);
        localStorage.setItem("user", JSON.stringify(logindata));
        console.log("logindata", logindata);
        localStorage.setItem("role", "farmer");
        
        dispatch(loginSuccess(logindata));
      } else {
        dispatch(loginError(logindata));
      }
    });
  };
};

export const registerStart = (payload) => {
  return {
    type: REGISTER.START,
    payload,
  };
};
export const registerSuccess = (payload) => {
  return {
    type: REGISTER.SUCCESS,
    payload,
  };
};
export const registerError = (payload) => {
  return {
    type: REGISTER.ERROR,
    payload,
  };
};

export const register = (payload) => {
  return (dispatch) => {
    dispatch(registerStart());
    authService.register(payload).then((registerdata) => {
      if (!registerdata.isError) {
        dispatch(registerSuccess(registerdata));
      } else {
        dispatch(registerError(registerdata));
      }
    });
  };
};

export const sendVerificationCodeStart = (payload) => {
  return {
    type: SEND_VERIFICATION_CODE.START,
    payload,
  };
};
export const sendVerificationCodeSuccess = (payload) => {
  return {
    type: SEND_VERIFICATION_CODE.SUCCESS,
    payload,
  };
};

export const sendVerificationCodeError = (payload) => {
  return {
    type: SEND_VERIFICATION_CODE.ERROR,
    payload,
  };
};

export const sendVerificationCode = (payload) => {
  return (dispatch) => {
    dispatch(sendVerificationCodeStart());
    authService.sendVerificationCode(payload).then((registerdata) => {
      if (!registerdata.isError) {
        dispatch(sendVerificationCodeSuccess(registerdata));
      } else {
        dispatch(sendVerificationCodeError(registerdata));
      }
    });
  };
};

export const verifyCodeStart = (payload) => {
  return {
    type: VERIFY_CODE.START,
    payload,
  };
};
export const verifyCodeSuccess = (payload) => {
  return {
    type: VERIFY_CODE.SUCCESS,
    payload,
  };
};
export const verifyCodeError = (payload) => {
  return {
    type: VERIFY_CODE.ERROR,
    payload,
  };
};

export const verifyCode = (payload) => {
  return (dispatch) => {
    dispatch(verifyCodeStart());
    authService.verifyCode(payload).then((registerdata) => {
      if (!registerdata.isError) {
        // set isverfy to true
        localStorage.setItem("VERIFY_CODE", "true");
        // localStorage.setItem("isVerify", true);
        dispatch(verifyCodeSuccess(registerdata));
      } else {
        dispatch(verifyCodeError(registerdata));
      }
    });
  };
};
