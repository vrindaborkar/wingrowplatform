import { INIT_LOGIN, LOGIN, LOGOUT } from '../../../constant/actionTypes/auth'

const formFieldValueMapLogin = {
  username: '',
  password: '',
}

const getInitialStateFromLocalStorage = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const isVerify = localStorage.getItem('isVerify')
  const userRole = localStorage.getItem('role')
  return {
    isLoggedIn: isLoggedIn === 'true' ? true : false,
    isVerify: isVerify === 'true' ? true : false,
    userRole: userRole ? userRole : '',
    formFieldValueMapLogin,
    error: '',
    isLoading: false,
    isPageLevelError: false,
    isLoadingPage: false,
    isLoginSuccess: false,
    isLoginError: false,
    isLogoutSuccess: false,
    LogoutError: false,
    isLogoutError: false,
  }
}

const initialState = getInitialStateFromLocalStorage()
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_LOGIN:
      return {
        ...state,
        isLoginSuccess: false,
        isLoginError: false,
        isLoading: false,
      }
    case LOGIN.START:
    case LOGOUT.START:
      return {
        ...state,
        isLoading: true,
      }
    case LOGIN.SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
      }

    case LOGOUT.SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        isVerify: false,
        isLoading: false,
      }
    case LOGIN.ERROR: {
      return {
        ...state,
        error: action?.payload,
        isLoginError: true,
        isLoading: false,
      }
    }
    case LOGOUT.ERROR: {
      return {
        ...state,
        error: action?.payload,
        isLogoutError: true,
        isLoading: false,
      }
    }
    default:
      return state
  }
}

export default authReducer
