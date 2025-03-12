import axios from 'axios'
import { API_PATH } from '../../constant/urlConstant'
import { handleAPIError } from '../common/errorHandler'
import { baseUrl } from '../PostAPI'

export const fetchStallList = async payload => {
  const url = `${baseUrl}${API_PATH.STALL.FETCH}`
  const token = localStorage.getItem('token')
  try {
    const result = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${token}`,
      },
    })
    if (result.data.error || result.status !== 200) {
      return handleAPIError(result.data.detail)
    }
    return result.data
  } catch (error) {
    console.error(error)
    return handleAPIError(error)
  }
}

export const fetchStallBookList = async payload => {
  const url = `${baseUrl}${API_PATH.STALL.BOOK}`
  const token = localStorage.getItem('token')
  try {
    const result = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (result.data.error || result.status !== 200) {
      return handleAPIError(result.data.detail)
    }
    return result.data
  } catch (error) {
    console.error(error)
    return handleAPIError(error)
  }
}

export const fetchStallBookByUserList = async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user?.id
  const url = `${baseUrl}${API_PATH.STALL.BOOK_BY_USER}/${userId}`
  const token = localStorage.getItem('token')
  try {
    const result = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${token}`,
      },
    })
    if (result.data.error || result.status !== 200) {
      return handleAPIError(result.data.detail)
    }
    return result.data
  } catch (error) {
    console.error(error)
    return handleAPIError(error)
  }
}

export const fetchStallRecord = async payload => {
  const url = `${baseUrl}${API_PATH.STALL.FETCH}/${payload}`
  const token = localStorage.getItem('token')
  try {
    const result = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (result?.data?.error || result.status !== 200) {
      return handleAPIError(result.data.detail)
    }
    return result.data
  } catch (error) {
    console.error(error)
    return handleAPIError(error)
  }
}

export const createStallRecord = async payload => {
  const url = `${baseUrl}${API_PATH.STALL.ADD}`
  const token = localStorage.getItem('token')
  try {
    const result = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    if (result?.data?.error || result.status !== 201) {
      return handleAPIError(result.data.detail)
    }
    return result.data
  } catch (error) {
    console.error(error)
    return handleAPIError(error.response.data.detail)
  }
}

export const updateStallRecord = async (payload, id) => {
  const url = `${baseUrl}${API_PATH.STALL.EDIT}/${id}`
  const token = localStorage.getItem('token')
  try {
    const result = await axios.put(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    if (result?.data?.error || result.status !== 200) {
      return handleAPIError(result.data.detail)
    }
    return result.data
  } catch (error) {
    console.error(error)
    return handleAPIError(error.response.data.detail)
  }
}

export const deleteStall = async id => {
  const data = {
    id: id,
  }
  const url = `${baseUrl}${API_PATH.STALL.DELETE}`
  const token = localStorage.getItem('token')
  try {
    const result = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${token}`,
      },
      data,
    })
    if (result?.data?.error || result.status !== 200) {
      return handleAPIError(result.data.detail)
    }
    return result.data
  } catch (error) {
    console.error(error)
    return handleAPIError(error.response.data.detail)
  }
}
