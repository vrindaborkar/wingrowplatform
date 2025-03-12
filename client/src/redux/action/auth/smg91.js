import {
  SEND_VERIFICATION_CODE,
  VERIFY_CODE,
  RESEND_VERIFICATION_CODE,
  INIT_VERIFICATION,
} from '../../../constant/actionTypes/auth'
import { authService } from '../../../services'

export const init_verification = () => {
  return {
    type: INIT_VERIFICATION,
  }
}

export const sendVerificationCodeStart = payload => {
  return {
    type: SEND_VERIFICATION_CODE.START,
    payload,
  }
}
export const sendVerificationCodeSuccess = payload => {
  return {
    type: SEND_VERIFICATION_CODE.SUCCESS,
    payload,
  }
}

export const sendVerificationCodeError = payload => {
  return {
    type: SEND_VERIFICATION_CODE.ERROR,
    payload,
  }
}

export const sendVerificationCode = payload => {
  return dispatch => {
    dispatch(sendVerificationCodeStart())
    authService.sendVerificationCode(payload).then(registerdata => {
      if (!registerdata.isError) {
        dispatch(sendVerificationCodeSuccess(registerdata))
      } else {
        dispatch(sendVerificationCodeError(registerdata))
      }
    })
  }
}

export const reSendVerificationCodeStart = payload => {
  return {
    type: RESEND_VERIFICATION_CODE.START,
    payload,
  }
}

export const reSendVerificationCodeSuccess = payload => {
  return {
    type: RESEND_VERIFICATION_CODE.SUCCESS,
    payload,
  }
}

export const reSendVerificationCodeError = payload => {
  return {
    type: RESEND_VERIFICATION_CODE.ERROR,
    payload,
  }
}

export const reSendVerificationCode = payload => {
  return dispatch => {
    dispatch(reSendVerificationCodeStart())
    authService.reSendVerificationCode(payload).then(response => {
      if (response?.type === 'success') {
        dispatch(reSendVerificationCodeSuccess(response))
      } else {
        dispatch(reSendVerificationCodeError(response))
      }
    })
  }
}

export const verifyCodeStart = payload => {
  return {
    type: VERIFY_CODE.START,
    payload,
  }
}
export const verifyCodeSuccess = payload => {
  return {
    type: VERIFY_CODE.SUCCESS,
    payload,
  }
}
export const verifyCodeError = payload => {
  return {
    type: VERIFY_CODE.ERROR,
    payload,
  }
}

export const verifyCode = payload => {
  return dispatch => {
    dispatch(verifyCodeStart())
    authService.verifyCode(payload).then(response => {
      if (response?.type==="success") {
        localStorage.setItem('isVerify', true)
        dispatch(verifyCodeSuccess(response))
      } else {
        dispatch(verifyCodeError(response))
      }
    })
  }
}
