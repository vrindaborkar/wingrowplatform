import axios from "axios";
import { API_PATH } from "../../constant/urlConstant";
import { baseUrl } from "../PostAPI";

export const fetchMarketList = async () => {
  try {
    const result = await axios.get(`${baseUrl}${API_PATH.MARKET.FETCH_LIST}`);
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
