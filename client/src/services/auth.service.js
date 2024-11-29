import axios from "axios";
import authHeader from "./auth.headers";
// const Feedback = require('../models/Feedback');
// const User = require('../models/User'); // Assuming User schema is already set up

// const API_URL = "https://wingrowagritech.herokuapp.com/auth/";
// const API_URL = "https://wingrowmarket.onrender.com/auth/";
// const API_URL1 = "https://wingrowmarket.com:8443/auth/";
 //const API_URL = "https://wingrowmarket.com/";
//const REACT_APP_API_URL="http://localhost:4000/";
const { REACT_APP_API_URL } = process.env;


const register = (
  phone,
  // password,
  firstname,
  lastname,
  role,
  farmertype,
  address,
  tags,
  // employeeID,
) => {
  return axios.post(REACT_APP_API_URL + "auth/signup", {
    phone,
    // password,
    firstname,
    lastname,
    role,
    farmertype,
    address,
    tags,
  // employeeID,
  });
};

const login = (phone, role) => {
  console.log({
    phone,
    role
    // password
  })
  return axios.post(REACT_APP_API_URL + "auth/signin", {
      phone,
      role
      // password
    }).then((response) => {
      if (response.data.accessToken) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const addAddress = (address) => {
  return axios
    .post(REACT_APP_API_URL + "auth/address", { address }, { headers: authHeader() })
    .then((response) => {
      console.log(response.data)
      return response.data;
    });
};

const addimage = (formData) => {
  return axios
    .put(REACT_APP_API_URL + "image", formData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const logout = () => {
  console.log("removed")
  sessionStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};

// const feedback = (message, stars) => {
//   const token = JSON.parse(sessionStorage.getItem("user"))?.accessToken;
//   return axios.post(
//     `http://localhost:4000/api/feedback`,
//     { message, stars },
//     {
//       headers: {
//         'x-access-token': token
//       }
//     }
//   );
// };
const feedback = (message, stars, userId) => {
  return axios.post(`https://localhost:4000/api/feedback`, {
    message,
    stars,
    userId,
  });
};

// const newpassword = (phone, password) => {
//   return axios.post(REACT_APP_API_URL + "newpassword", {
//     phone,
//     password,
//   });
// };

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  addAddress,
  addimage,
  feedback,
  // newpassword,
  // check
};

export default AuthService;
