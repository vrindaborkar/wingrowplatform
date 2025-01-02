import axios from 'axios'
import { API_PATH } from '../../constant/urlConstant'
import { handleAPIError } from '../common/errorHandler'
import { baseUrl } from '../PostAPI'

export const fetchOutwardList = async () => {
  const url = `${baseUrl}${API_PATH.OUTWARD.FETCH}`
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

export const fetchOutwardRecord = async payload => {
  const url = `${baseUrl}${API_PATH.OUTWARD.FETCH}/${payload}`
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

export const createOutwardRecord = async payload => {
  const url = `${baseUrl}${API_PATH.OUTWARD.ADD}`
  const token = localStorage.getItem('token')
  try {
    const result = await axios.post(url, payload, {
      headers: {
        'x-access-token': `${token}`,
        'Content-Type': 'application/json',
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

export const updateOutwardRecord = async (payload, id) => {
  const url = `${baseUrl}${API_PATH.OUTWARD.EDIT}/${id}`
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

export const deleteOutward = async outwardId => {
  const url = `${baseUrl}${API_PATH.OUTWARD.DELETE}/${outwardId}`
  const token = localStorage.getItem('token')
  try {
    const result = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (result?.data?.error || result.status !== 204) {
      return handleAPIError(result.data.detail)
    }
    return result.data
  } catch (error) {
    console.error(error)
    return handleAPIError(error.response.data.detail)
  }
}

export const fetchInwardList = async () => {
  const url = `${baseUrl}${API_PATH.INWARD.FETCH}`
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

export const fetchInwardRecord = async payload => {
  const url = `${baseUrl}${API_PATH.INWARD.FETCH}/${payload}`
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

export const createInwardRecord = async payload => {
  const url = `${baseUrl}${API_PATH.INWARD.ADD}`
  const token = localStorage.getItem('token')
  try {
    const result = await axios.post(url, payload, {
      headers: {
        'x-access-token': `${token}`,
        'Content-Type': 'application/json',
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

export const updateInwardRecord = async (payload, id) => {
  const url = `${baseUrl}${API_PATH.INWARD.EDIT}/${id}`
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

export const deleteInward = async inwardId => {
  const url = `${baseUrl}${API_PATH.INWARD.DELETE}/${inwardId}`
  const token = localStorage.getItem('token')
  try {
    const result = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (result?.data?.error || result.status !== 204) {
      return handleAPIError(result.data.detail)
    }
    return result.data
  } catch (error) {
    console.error(error)
    return handleAPIError(error.response.data.detail)
  }
}
