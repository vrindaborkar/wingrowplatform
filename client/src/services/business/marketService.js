import axios from "axios";
import { API_PATH } from "../../constant/urlConstant";
import { baseUrl } from "../PostAPI";

export const fetchMarketList = async (city) => {
  try {
    const result = await axios.get(`${baseUrl}${API_PATH.MARKET.FETCH_LIST}?city=${city}`);
    console.log(result);
    if (result.status === 200) {
      return result.data;
    } else {
      return {
        // isError: true,
        message: "Failed to fetch markets",
      };
    }
  } catch (error) {
    console.error("Error fetching market list:", error);
    return {
      // isError: true,
      message: error.message || "Network error",
    };
  }
};

