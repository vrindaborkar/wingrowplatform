export const ROUTE_PATH = {
  BASE: {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
  },
  CUSTOMER: {
    HOME: "/customer",
  },
  FARMER: {
    HOME: "/farmer",
    MARKET: "/market",
  },
  BOOKING:{
    STALL:"/stall/:id"
  }
};

export const API_PATH = {
  BASE: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
  MARKET: {
    FETCH_LIST: "/market",
    FETCH_DETAIL: "/market/:id",
  },
  STALL: {
    FETCH_LIST: "/stall",
    FETCH_DETAIL: "/stall/:id",
  },
  BOOKING_STALL: {
    FETCH_LIST: "/booking-stall",
    FETCH_DETAIL: "/booking-stall/:id",
  },
  USER_PROFILE: {
    FETCH_PROFILE: "/user-profile",
    UPDATE_PROFILE: "/update-profile",
  },
};
