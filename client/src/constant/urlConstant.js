export const ROUTE_PATH = {
  BASE: {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
  },
  CUSTOMER:{
    HOME:"/customer"
  },
  ADMIN:{
    HOME:"/admin"
  },
  FARMER:{
    Home:"/farmer"
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
  MARKET:{
    FETCH_LIST:"/market",
    
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
