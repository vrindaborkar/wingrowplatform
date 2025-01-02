import { INIT_LOGIN, LOGIN, LOGOUT } from '../../../constant/actionTypes/auth'
import { authService } from '../../../services'
import { Navigate } from 'react-router-dom'

export const init_login = () => {
  return {
    type: INIT_LOGIN,
  }
}
export const loginStart = payload => {
  return {
    type: LOGIN.START,
    payload,
  }
}
export const loginSuccess = payload => {
  return {
    type: LOGIN.SUCCESS,
    payload,
  }
}
export const loginError = payload => {
  return {
    type: LOGIN.ERROR,
    payload,
  }
}

export const login = payload => {
  return dispatch => {
    dispatch(loginStart())
    authService
      .login(payload)
      .then(logindata => {
        if (!logindata.isError) {
          try {
            localStorage.setItem('token', logindata?.accessToken ?? '')
            localStorage.setItem('user', JSON.stringify(logindata))
            const userRole = logindata?.role ?? ''
            localStorage.setItem('role', userRole)
            localStorage.setItem('isLoggedIn', true)
            dispatch(loginSuccess(logindata))
          } catch (error) {
            console.error('Error saving data to localStorage:', error)
            dispatch(
              loginError({
                message: 'Unable to store login details. Please try again.',
              })
            )
          }
        } else {
          dispatch(loginError(logindata))
        }
      })
      .catch(error => {
        dispatch(
          loginError({
            message: error.message || 'Login failed due to unexpected error.',
          })
        )
      })
  }
}

export const logoutStart = () => {
  return {
    type: LOGOUT.START,
  }
}

export const logoutSuccess = () => {
  return {
    type: LOGOUT.SUCCESS,
  }
}

export const logoutError = payload => {
  return {
    type: LOGOUT.ERROR,
    payload,
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(logoutStart())
    authService
      .postLogout()
      .then(response => {
        if (response) {
          localStorage.clear()
          dispatch(logoutSuccess())
          Navigate('/login')
          window.location.reload()
        } else {
          dispatch(logoutError(response))
        }
      })
      .catch(error => {
        dispatch(
          logoutError({
            message: error.message || 'Logout failed due to unexpected error',
          })
        )
      })
  }
}
