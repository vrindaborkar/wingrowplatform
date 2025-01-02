import axios from "axios";
import { API_PATH } from "../../constant/urlConstant";
import { baseUrl } from "../PostAPI";

export const fetchFarmerList = async () => {
  try {
    const result = await axios.get(`${baseUrl}${API_PATH.FARMER.FETCH_LIST}`);
    
    if (result.status === 200) {
      return result;
    } else {
      // eslint-disable-next-line
      return (result = {
        isError: true,
      });
    }
  } catch (error) {
    // eslint-disable-next-line
    let result;
    // eslint-disable-next-line
    return (result = {
      isError: true,
    });
  }
};

export const fetchCustomerList = async () => {
    try {
      const result = await axios.get(`${baseUrl}${API_PATH.CUSTOMER.FETCH_LIST}`);
      
      if (result.status === 200) {
        return result;
      } else {
        // eslint-disable-next-line
        return (result = {
          isError: true,
        });
      }
    } catch (error) {
      let result;
      // eslint-disable-next-line
      return (result = {
        isError: true,
      });
    }
  };

  export const fetchCancelledStallsList = async () => {
    try {
      const result = await axios.get(`${baseUrl}${API_PATH.CANCELLED_STALLS.FETCH_LIST}`);
      
      if (result.status === 200) {
        return result;
      } else {
        // eslint-disable-next-line
        return (result = {
          isError: true,
        });
      }
    } catch (error) {
      let result;
      // eslint-disable-next-line
      return (result = {
        isError: true,
      });
    }
  };