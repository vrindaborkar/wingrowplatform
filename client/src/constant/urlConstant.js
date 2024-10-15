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
    MY_BOOKING:"/my_bookings",
    DATA:"/market/data",
    INWARD:"/inward",
    OUTWARD:"/outward",
  },
  BOOKING:{
    STALL:"/stall/:id"
  },
  ADMIN:{
    HOME:"/admin"
  },
  FARMERS_LIST:{
    HOME:"/farmers-list"
  },
  CUSTOMER_LIST:{
    HOME:"/customer-list"
  },
};

export const API_PATH = {
  BASE: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
  MARKET: {
    FETCH_LIST: "/markets/markets",
    FETCH_DETAIL: "/market/:id",
  },
  STALL: {
    FETCH: "/stalls",
    // FETCH:"/api/stallStatus/stalls",
    BOOK:"/api/bookings/book-multiple-stalls",
    BOOK_BY_USER:"/bookedstalls",
    ADD: "/stall",
    EDIT: "/stall",
    DELETE: "/bookedstalls",
    FETCH_LIST: "/stall",
    FETCH_DETAIL: "/stall/:id",
  },
  INWARD: {
    FETCH: "/inward",
    ADD: "/inward",
    EDIT: "/inward",
    DELETE: "/inward",
  },
  OUTWARD: {
    FETCH: "/outward",
    ADD: "/outward",
    EDIT: "/outward",
    DELETE: "/outward",
  },

  BOOKING_STALL: {
    FETCH_LIST: "/booking-stall",
    FETCH_DETAIL: "/booking-stall/:id",
  },
  USER_PROFILE: {
    FETCH_PROFILE: "/user-profile",
    UPDATE_PROFILE: "/update-profile",
  },
  FARMER:{
    FETCH_LIST:"/farmer"
  },
  CUSTOMER:{
    FETCH_LIST:"/users"
  },
  CANCELLED_STALLS:{
    FETCH_LIST:"/cancelled-stalls"
  }
};
