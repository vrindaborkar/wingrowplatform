import axios from "axios";
import { APIError, handleAPIError } from "../common/errorHandler";
import { baseUrl, postApiAsyn, postApiAsynWithoutToken } from "../PostAPI";
import { MSG91_BASE_URL } from "../../constant/msg91";

export const sendVerificationCode = async (payload) => {
  const url = `${MSG91_BASE_URL}/otp?template_id=${payload.template_id}&mobile=${payload.mobile}&authkey=${payload.authkey}`;
  try {
    const result = await axios.post(url);
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
  const url = `${MSG91_BASE_URL}/otp/retry`;
  const options = {
    method: 'GET',
    url,
    params: {
      authkey: payload.authkey,
      retrytype: payload.retrytype,
      mobile: payload.mobile,
    },
  };
  try {
    const result = await axios.request(options);
    if (result.status == 200 && result?.data?.type==="success") {
      return result?.data;
    }
    else{
      return handleAPIError(result?.data);
    }
  } catch (error) {
    console.error(error);
    return handleAPIError(error?.response?.data?.detail);
  }
};

export const verifyCode = async (payload) => {
  console.log("Verification payload:", payload);
  const url = `${MSG91_BASE_URL}/otp/verify?otp=${payload.otp}&mobile=${payload.mobile}`;

  try {
    const result = await axios.get(url, {
      headers: {
        authkey: payload.authkey, 
      },
    });

    console.log(result);
    
   
    if (result.status === 200 && result.data?.type === 'success') {
      return { success: true, data: result.data };
    } else {
      return { success: false, message: result?.data || "Verification failed." };
    }
  } catch (error) {
    console.error("Error in verifyCode:", error);
    return { success: false, message: error?.response?.data?.detail || "An error occurred." };
  }
};


export const login = async payload => {
  const url = `${baseUrl}/auth/signin`
  try {
    const result = await axios.post(
      url,
      payload,
    )
    if (result.status !== 200) {
      return handleAPIError(result?.data ?? '')
    }
    return result.data
  } catch (error) {
    console.error(error)
    return handleAPIError(error?.response?.data?.message)
  }
}

export const register = async (payload) => {
  const url = `${baseUrl}/auth/signup`;
  try {
    const result = await axios.post(url, {
 
   ...payload,
    });
    if (result.status !== 200) {
      return handleAPIError(result?.data?.detail ?? "");
    }
    return result?.data;
  } catch (error) {
    console.error(error);
    return handleAPIError(error?.response?.data);
  }
};

export const postLogout = async () => {
  try {
    localStorage.clear();
    let result = true;
    return result;
  } catch (error) {
    console.error(error);
    return handleAPIError(error);
  }
};
