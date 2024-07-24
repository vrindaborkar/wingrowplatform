import axios from "axios";
import { API_PATH } from "../../constant/urlConstant";
import { baseUrl } from "../PostAPI";

export const fetchFarmerList = async () => {
  try {
    const result = await axios.get(`${baseUrl}${API_PATH.FARMER.FETCH_LIST}`);
    console.log(result);
    if (result.status === 200) {
      return result;
    } else {
      return (result = {
        isError: true,
      });
    }
  } catch (error) {
    let result;
    return (result = {
      isError: true,
    });
  }
};

export const fetchCustomerList = async () => {
    try {
      const result = await axios.get(`${baseUrl}${API_PATH.CUSTOMER.FETCH_LIST}`);
      console.log(result);
      if (result.status === 200) {
        return result;
      } else {
        return (result = {
          isError: true,
        });
      }
    } catch (error) {
      let result;
      return (result = {
        isError: true,
      });
    }
  };

  export const fetchCancelledStallsList = async () => {
    try {
      const result = await axios.get(`${baseUrl}${API_PATH.CANCELLED_STALLS.FETCH_LIST}`);
      console.log(result);
      if (result.status === 200) {
        return result;
      } else {
        return (result = {
          isError: true,
        });
      }
    } catch (error) {
      let result;
      return (result = {
        isError: true,
      });
    }
  };


// export const fetchCancelledStallsList = async () => {
//     try {
//       const result = await axios.get(`${baseUrl}${API_PATH.CANCELLED_STALLS.FETCH_LIST}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(result);
//       if (result.status === 200) {
//         return result.data; // Use result.data to get the response body
//       } else {
//         return {
//           isError: true,
//           message: `Error: ${result.status}`,
//         };
//       }
//     } catch (error) {
//       console.error(error); // Log error for debugging
//       return {
//         isError: true,
//         message: error.message || 'An error occurred',
//       };
//     }
//   };