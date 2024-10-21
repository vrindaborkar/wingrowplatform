import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/rootReducers";
import { logout } from "./../action/auth/login";
import "react-toastify/dist/ReactToastify.css";

const inactivityTimeout = 5 * 1 * 1000;
let inactivityTimer;

const isUserLoggedIn = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

const resetInactivityTimer = (store) => {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
  }
  inactivityTimer = setTimeout(() => {
    if (isUserLoggedIn()) {
      store.dispatch(logout());
    }
  }, inactivityTimeout);
};

const inactivityMiddleware = (store) => (next) => (action) => {
  if (isUserLoggedIn()) {
    resetInactivityTimer(store);
  }
  return next(action);
};

const logger = (store) => (next) => (action) => {
  console.log("action", action);
  let result = next(action);
  console.log("new state", store.getState());
  return result;
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, inactivityMiddleware),
});

resetInactivityTimer(store);

export default store;
