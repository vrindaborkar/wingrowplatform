import axios from "axios";
import { APIError, handleAPIError } from "../common/errorHandler";
import { postApiAsynWithoutToken } from "../PostAPI";
import { MSG91_BASE_URL } from "../../constant/msg91";

export const sendVerificationCode = async (payload) => {
  console.log(payload);
  // const url = getDecoratedTypesUrl({
   const  url= `${MSG91_BASE_URL}/otp?template_id=${payload.template_id}&mobile=${payload.mobile}&authkey=${payload.authkey}`
    // payload,
  // });
  try {
    let result = await postApiAsynWithoutToken(url);
    if (result?.error) {
      throw new APIError(result);
    }
    return result;
  } catch (error) {
    console.error(error);
    return handleAPIError(error); 
  }
};

export const sendLoginCode =async(payload)=>{
    try {
        const result = await axios.post("url",payload);
        return result;
    } catch (error) {
        return error;
    }
}
