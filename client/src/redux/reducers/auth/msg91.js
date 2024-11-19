import {
  RESEND_VERIFICATION_CODE,
  SEND_VERIFICATION_CODE,
  VERIFY_CODE,
} from "../../../constant/actionTypes/auth";

const getInitialStateFromLocalStorage = () => {
  const isVerify = localStorage.getItem("isVerify");
  return {
    isVerify: isVerify === "true" ? true : false,
    sendVerificationCodeSuccess: false,
  };
};

const initialState = getInitialStateFromLocalStorage();

const msg91Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_VERIFICATION_CODE.START:
    case VERIFY_CODE.START:
    case RESEND_VERIFICATION_CODE.START:
      return {
        ...state,
        // isLoggedIn: true,
      };
    case SEND_VERIFICATION_CODE.SUCCESS:
      return {
        ...state,
        // isLoggedIn: true,
        sendVerificationCodeSuccess: true,
      };
    case VERIFY_CODE.SUCCESS: {
      return {
        ...state,
        isVerify: true,
      };
    }
    case SEND_VERIFICATION_CODE.ERROR:
    case VERIFY_CODE.ERROR:
    case RESEND_VERIFICATION_CODE.ERROR:
      return {
        ...state,
        // isLoginError: true,
      };

    default:
      return state;
  }
};

export default msg91Reducer;
