import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers/rootReducers'
import { logout } from './../action/auth/login'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inactivityTimeout = 15 * 60 * 1000
let inactivityTimer

const isUserLoggedIn = () => {
  return localStorage.getItem('isLoggedIn') === 'true'
}

const resetInactivityTimer = store => {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer)
  }
  inactivityTimer = setTimeout(() => {
    if (isUserLoggedIn()) {
      store.dispatch(logout())
      toast.error('Session expired due to inactivity. Please log in again.')
    }
  }, inactivityTimeout)
}

const inactivityMiddleware = store => next => action => {
  if (isUserLoggedIn()) {
    resetInactivityTimer(store)
  }
  return next(action)
}

const logger = store => next => action => {
  return next(action)
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(logger, inactivityMiddleware),
})

resetInactivityTimer(store)

export default store
