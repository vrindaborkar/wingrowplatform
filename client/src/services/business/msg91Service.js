import axios from "axios";
import { APIError, handleAPIError } from "../common/errorHandler";
import { postApiAsynWithoutToken } from "../PostAPI";
import { MSG91_BASE_URL } from "../../constant/msg91";

export const sendVerificationCode = async (payload) => {
  const url = `${MSG91_BASE_URL}/otp?template_id=${payload.template_id}&mobile=${payload.mobile}&authkey=${payload.authkey}`;
  try {
    const result = await axios.post(url, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      referrerPolicy: "strict-origin-when-cross-origin",
    });
    if (result.status !== 200) {
      return handleAPIError(result?.data?.detail ?? "");
    }
    return result.data;
  } catch (error) {
    console.error(error);
    return handleAPIError(error?.response?.data?.detail);
  }
};

export const sendLoginCode = async (payload) => {
  try {
    const result = await axios.post("url", payload);
    return result;
  } catch (error) {
    return error;
  }
};
