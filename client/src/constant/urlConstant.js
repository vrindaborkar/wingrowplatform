export const ROUTE_PATH = {
  BASE: {
    HOME: "/",
    ABOUT: "/about",
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
    SUBCRIPTION: "/subscription",
  },
  BOOKING:{
    STALL:"/market/:id"
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
  STATE: {
    FETCH: "/api/bookings/states",
  },
  CITY: {
    FETCH: "/api/cities",
  },
  MARKET: {
    FETCH_LIST: "/api/markets",
    FETCH_DETAIL: "api/markets/:id",
  },
  STALL: {
    // FETCH: "/api/stallStatus/stalls",
    FETCH: "/api/stalls/availability",
    BOOK:"/api/bookings/multiple-stalls",
    // BOOK_BY_USER:"/bookedstalls",
    BOOK_BY_USER:"/api/bookings/booked-stalls",
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
  },
  OFFERS: {
    FETCH: "/api/offers",
    ADD: "/offers",
    EDIT: "/offers",
    DELETE: "/offers",
  },
  FEEDBACK: {
    POST: "/auth/feedback",
    FETCH: "/api/feedback",
  },
};
