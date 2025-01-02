import {
  INIT_VERIFICATION,
  VERIFY_CODE,
  SEND_VERIFICATION_CODE,
  RESEND_VERIFICATION_CODE,
} from '../../../constant/actionTypes/auth'

const getInitialStateFromLocalStorage = () => {
  const isVerify = localStorage.getItem('isVerify')
  return {
    isVerify: isVerify === 'true' ? true : false,
    isVerifyCodeError: false,
    sendVerificationCodeSuccess: false,
    isSendVerificationCodeError: false,
    isResendVerificationCodeSuccess: false,
    isResendVerificationCodeError: false,
    error: '',
  }
}
const initialState = getInitialStateFromLocalStorage()
const msg91Reducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_VERIFICATION:
      return {
        ...state,
        isVerify: false,
        isVerifyCodeError: false,
        sendVerificationCodeSuccess: false,
        isSendVerificationCodeError: false,
        isResendVerificationCodeSuccess: false,
        isResendVerificationCodeError: false,
      }
    case SEND_VERIFICATION_CODE.START:
    case VERIFY_CODE.START:
    case RESEND_VERIFICATION_CODE.START:
      return {
        ...state,
      }
    case SEND_VERIFICATION_CODE.SUCCESS:
      return {
        ...state,
        sendVerificationCodeSuccess: true,
      }
    case VERIFY_CODE.SUCCESS: {
      return {
        ...state,
        isVerify: true,
      }
    }
    case RESEND_VERIFICATION_CODE.SUCCESS:
      return {
        ...state,
        isResendVerificationCodeSuccess: true,
      }
    case VERIFY_CODE.ERROR: {
      return {
        ...state,
        isVerifyCodeError: true,
        error: action?.payload,
      }
    }
    case SEND_VERIFICATION_CODE.ERROR: {
      return {
        ...state,
        isSendVerificationCodeError: true,
        error: action?.payload,
      }
    }
    case RESEND_VERIFICATION_CODE.ERROR:
      return {
        ...state,
        isResendVerificationCodeError: true,
        error: action?.payload,
      }

    default:
      return state
  }
}

export default msg91Reducer
