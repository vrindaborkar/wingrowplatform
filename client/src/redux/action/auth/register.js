import { INIT_REGISTRATION, REGISTER } from '../../../constant/actionTypes/auth'
import { authService } from '../../../services'

export const init_register = () => {
  return {
    type: INIT_REGISTRATION,
  }
}
export const registerStart = payload => {
  return {
    type: REGISTER.START,
    payload,
  }
}
export const registerSuccess = payload => {
  return {
    type: REGISTER.SUCCESS,
    payload,
  }
}
export const registerError = payload => {
  return {
    type: REGISTER.ERROR,
    payload,
  }
}

export const register = payload => {
  return dispatch => {
    dispatch(registerStart())
    authService.register(payload).then(registerdata => {
      if (!registerdata.isError) {
        dispatch(registerSuccess(registerdata))
      } else {
        dispatch(registerError(registerdata))
      }
    })
  }
}
