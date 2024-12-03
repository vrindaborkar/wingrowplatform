import axios from 'axios';
import authHeader from './auth.headers';
const moment = require('moment');


// const REACT_APP_API_URL = 'https://wingrowagritech.herokuapp.com/';
// const API_URL = "https://wingrowmarket.onrender.com/";
const { REACT_APP_API_URL } = process.env;

 const postInward = (commodity , purchase_quantity , purchase_rate , market , time,date) => {
    const formattedDate = moment(date, "DD/MM/YYYY").toDate();
    return axios.post(REACT_APP_API_URL + "inward", {
        commodity,
        purchase_quantity,
        purchase_rate,
        market,
        time,
        date
      } , { headers: authHeader() });
  }

const postOutward = (commodity, total_sales, sales_rate, market , time,date) => {
  const formattedDate = moment(date, "DD/MM/YYYY").toDate();
    return axios.post(REACT_APP_API_URL + "outward", {
        commodity,
        // sales_quantity,
        
        total_sales,
        sales_rate,
        market,
        time,
        date
      },{ headers: authHeader() });
  }

  const getInward = () => {
    return axios.get(REACT_APP_API_URL + 'inward', { headers: authHeader() });
  }

  const getOutward = () => {
    return axios.get(REACT_APP_API_URL + 'outward', { headers: authHeader() });
  }

  const getInwardData = () => {
    return axios.get(REACT_APP_API_URL + 'inwardData', { headers: authHeader() });
  }

  const getOutwardData = () => {
    return axios.get(REACT_APP_API_URL + 'outwardData', { headers: authHeader() });
  }

  const getMyStalls = () => {
    return axios.get(REACT_APP_API_URL + 'stalls', { headers: authHeader() });
  }

//changes************************//
const getMyStallsTemp = () => {
  return axios.get(REACT_APP_API_URL + 'stallsTemp', { headers: authHeader() });
}
const getBookedStallsTemp = () => {
  return axios.get(REACT_APP_API_URL + 'bookedstallsTemp', { headers: authHeader() });
}
//end***************************//
 
  const getBookedStalls = () => {
    //return axios.get(REACT_APP_API_URL + 'bookedstalls', { headers: authHeader() });
    return axios.get(REACT_APP_API_URL + 'bookedstalls');
  }

  const getcancelledStalls = () => {
    return axios.get(REACT_APP_API_URL + 'cancelledstalls', { headers: authHeader() });
  }


const FarmerService = {
    postInward,
    postOutward,
    getInward,
    getOutward,
    getMyStalls,
    getInwardData,
    getOutwardData,
    getBookedStalls,
    getcancelledStalls,
    
    //changes************************//
    getMyStallsTemp,
    getBookedStallsTemp,
    //end***************************//
    
  };
  
  export default FarmerService;
