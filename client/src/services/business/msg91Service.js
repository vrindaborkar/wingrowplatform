import axios from 'axios'
import {  handleAPIError } from '../common/errorHandler'

const MSG91_BASE_URL = process.env.REACT_APP_MSG91_BASE_URL;
export const sendVerificationCode = async payload => {
  const url = `${MSG91_BASE_URL}/otp?template_id=${payload.template_id}&phone=${payload.phone}&authkey=${payload.authkey}`
  try {
    const result = await axios.post(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      referrerPolicy: 'strict-origin-when-cross-origin',
    })
    if (result.status !== 200) {
      return handleAPIError(result?.data?.detail ?? '')
    }
    return result.data
  } catch (error) {
    console.error(error)
    return handleAPIError(error?.response?.data?.detail)
  }
}

export const sendLoginCode = async payload => {
  try {
    const result = await axios.post('url', payload)
    return result
  } catch (error) {
    return error
  }
}
