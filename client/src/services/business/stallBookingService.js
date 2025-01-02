import { API_PATH } from '../../constant/urlConstant'
import { APIError, handleAPIError } from '../common/errorHandler'
import { postApi } from '../PostAPI'

export const fetchUserProfile = async payload => {
  const url = `${API_PATH.USER_PROFILE.FETCH_PROFILE}`
  const token = ''
  try {
    let result = await postApi(url, payload, token)
    if (result?.error) {
      throw new APIError(result)
    }
    return result
  } catch (error) {
    console.error(error)
    return handleAPIError(error)
  }
}

export const updateProfile = async payload => {
  const url = `${API_PATH.USER_PROFILE.UPDATE_PROFILE}`
  const token = ''
  try {
    let result = await postApi(url, payload, token)
    if (result?.error) {
      throw new APIError(result)
    }
    return result
  } catch (error) {
    console.error(error)
    return handleAPIError(error)
  }
}

export const bookMultipleStalls = async payload => {
  const url = `${API_PATH.STALL.BOOK}`
  const token = ''
  try {
    let result = await postApi(url, payload, token)
    if (result?.error) {
      throw new APIError(result)
    }
    return result
  } catch (error) {
    console.error(error)
    return handleAPIError(error)
  }
}
