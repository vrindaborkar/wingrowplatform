import axios from "axios";
import {  handleAPIError } from "../common/errorHandler";
import { baseUrl } from "../PostAPI";
// import { PhoneNumberContext } from "twilio/lib/rest/trunking/v1/trunk/phoneNumber";

const MSG91_BASE_URL = process.env.REACT_APP_MSG91_BASE_URL;


const formatPhoneNumber = (phone) => {
  phone = phone.replace(/\D/g, ""); // Remove all non-numeric characters

  if (phone.length > 10) {
    phone = phone.slice(-10); // Keep only the last 10 digits
  }

  return `+91${phone}`; // Always return in +91XXXXXXXXXX format
};


export const sendVerificationCode = async (payload) => {
  const url = `http://localhost:4000/auth/sendOtp`;

  try {
    console.log("📌 Sending OTP request with payload:", payload);

    if (!payload?.phone) {
      throw new Error("❌ Phone number is missing in frontend payload");
    }

    let formattedPhone = formatPhoneNumber(payload.phone);
    console.log("✅ Formatted Phone Number being sent:", formattedPhone);

    // Make API call to send OTP
    const result = await axios.post(url, { phone: formattedPhone });

    console.log("✅ Response from backend:", result.data);

    if (result.status !== 200) {
      throw new Error("❌ Error sending OTP: " + (result?.data?.detail ?? "Unknown error"));
    }

    return result.data;
  } catch (error) {
    console.error("❌ Error sending OTP:", error.response?.data || error.message);
    alert("Failed to send OTP. Please try again.");
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
      phone: payload.phone,
    },
  };
  try {
    const result = await axios.request(options);
    if (result.status === 200 && result?.data?.type==="success") {
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


// export const verifyCode = async (payload) => {
//   try {
//     console.log("🔹 Sending OTP verification request with payload:", payload);
    
//     // Ensure phone number is formatted correctly
//     let formattedPhone = payload.phone.startsWith("+91")
//       ? payload.phone
//       : `+91${payload.phone.replace(/\D/g, "")}`;

    // Make API request to verify OTP
//     const response = await fetch(`http://localhost:4000/auth/verify`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({ otp: payload.otp, phone: formattedPhone }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || "Failed to verify OTP");
//     }

//     console.log("✅ OTP Verified Successfully:", data);
//     return data;
//   } catch (error) {
//     console.error("❌ Error verifying OTP:", error);
//     throw error;
//   }
// };


export const verifyCode = async (payload) => {
  const url = `http://localhost:4000/auth/verify`; // Adjust the endpoint if necessary

  try {
    console.log("📌 Sending OTP verification request:", payload);

    if (!payload?.otp || !payload?.phone) {
      throw new Error("❌ OTP or phone number is missing in frontend payload");
    }
    
    let formattedPhone = formatPhoneNumber(payload.phone);
    
    console.log("✅ Formatted Phone Number being sent for verification:", formattedPhone);

    // // Send the OTP verification request
    const response = await axios.post(url, { otp: payload.otp, phone: formattedPhone });



    console.log("✅ Backend Verification Response:", response.data);

    if (response.data?.type === "success") {  ///yaha
      return response.data; // OTP verified successfully
    } else {
      throw new Error(response.data?.message || "Invalid OTP. Please try again.");
    }
  } catch (error) {
    console.error("❌ Error verifying OTP:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Invalid OTP. Please try again.");
  }
};






// export const login = async payload => {
//   const url = `http://localhost:4000/auth/signin`
//   try {
//     const result = await axios.post(
//       url,
//       payload,
//     )
//     if (result.status !== 200) {
//       return handleAPIError(result?.data ?? '')
//     }
//     return result.data
//   } catch (error) {
//     console.error(error)
//     return handleAPIError(error?.response?.data?.message)
//   }
// }



export const login = async (payload) => {
  const formattedPhone = formatPhoneNumber(payload.phone); // Format before sending
  const url = "http://localhost:4000/auth/signin";

  try {
    const result = await axios.post(url, { phone: formattedPhone, role: payload.role });

    if (result.status !== 200) {
      return handleAPIError(result?.data?.detail ?? "Error during login");
    }

    return result.data;
  } catch (error) {
    console.error("❌ Error logging in:", error.response?.data || error.message);
    return handleAPIError(error?.response?.data?.detail || "Login failed");
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
