import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducers';
import { logout } from './../action/auth/login';

const inactivityTimeout = 10 * 60 * 1000; 
let inactivityTimer;

const resetInactivityTimer = (store) => {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
  }
  inactivityTimer = setTimeout(() => {
    store.dispatch(logout()); 
  }, inactivityTimeout);
};

const inactivityMiddleware = (store) => (next) => (action) => {
  resetInactivityTimer(store);
  return next(action); 
};

const logger = (store) => (next) => (action) => {
  console.log('action', action);
  let result = next(action);
  console.log('new state', store.getState());
  return result;
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, inactivityMiddleware),
});

resetInactivityTimer(store);

export default store;
