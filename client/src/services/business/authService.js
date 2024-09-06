import axios from "axios";
import { APIError, handleAPIError } from "../common/errorHandler";
import { baseUrl, postApiAsyn, postApiAsynWithoutToken } from "../PostAPI";
import { MSG91_BASE_URL } from "../../constant/msg91";

export const sendVerificationCode = async (payload) => {
  console.log(payload);
  const url = `${MSG91_BASE_URL}/otp?template_id=${payload.template_id}&mobile=${payload.mobile}&authkey=${payload.authkey}`;
  // try {
  //   let result = await postApiAsynWithoutToken(url);
  //   if (result?.error) {
  //     throw new APIError(result);
  //   }
  //   return result;
  // } catch (error) {
  //   console.error(error);
  //   return handleAPIError(error);
  // }
  try {
    const result = await axios.post(url, {
      headers: {
        "Content-Type": "application/json",
      },
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

export const reSendVerificationCode = async (payload) => {
  console.log(payload);
  const url = `${MSG91_BASE_URL}/otp?template_id=${payload.template_id}&mobile=${payload.mobile}&authkey=${payload.authkey}`;
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

export const verifyCode = async (payload) => {
  const url = `${MSG91_BASE_URL}/otp?verify=${payload.otp}&mobile=${payload.mobile}`;
  try {
    const result = await axios.post(url, {
      headers: {
        "Content-Type": "application/json",
        authkey: payload.authkey,
      },
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

export const login = async (payload) => {
  const url = `${baseUrl}/auth/signin`;
  try {
    const result = await axios.post(url, {
      headers: {
        "Content-Type": "application/json",
      },
      payload,
    });
    console.log("result--------------------------------", result);

    if (result.status !== 200) {
      return handleAPIError(result?.data ?? "");
    }
    return result.data;
  } catch (error) {
    console.error(error);
    return handleAPIError(error.response.data.detail);
  }
};

export const register = async (payload) => {
  const url = `${baseUrl}/auth/signup`;
  try {
    const result = await axios.post(url, {
 
   ...payload,
    });
    if (result.status !== 200) {
      return handleAPIError(result?.data?.detail ?? "");
    }
    return result.data;
  } catch (error) {
    console.error(error);
    return handleAPIError(error.response.data.detail);
  }
};

export const postLogout = async () => {
  try {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isVerfiy");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("isLoggedIn");
    let result = "Logout Successfully";
    return result;
  } catch (error) {
    console.error(error);
    return handleAPIError(error);
  }
};
