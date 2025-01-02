export const getEmbeddedContentFromResponse = _embedded => {
  return _embedded?.content
}
export const extractData = (result, isEmbeddedContent = true) => {
  let modifiedResult = {
    ...result,
    content: getEmbeddedContentFromResponse(result?._embedded),
  }
  delete modifiedResult._embedded
  return modifiedResult
}

import Cookies from 'universal-cookie'
import { post, put } from 'axios'
import { getApiAsyn, deleteApi, baseUrl } from '../../PostAPI'
import { handleAPIError, APIError } from '../../common/errorHandler'
import { API_URL } from '../../../constants/urlConstants'
import { extractData } from '../../utils'
import { generateImageUrl, getDecoratedUrl } from '../../common/urlService'
import { asyncForEach } from '../../../utils/async'
import { getAllAttachment } from '../commonService'
const cookies = new Cookies()
export const fetchRole = async payload => {
  const url = getDecoratedUrl({
    url: API_URL.USERS.FETCH_ROLE,
  })
  try {
    let result = await getApiAsyn(url, cookies.get('authorization'))
    if (result?.error) {
      throw new APIError(result)
    }
    return result
    // return extractData(result, !payload?.filters);
  } catch (error) {
    console.error(error)
    return handleAPIError(error)
  }
}
export const fetchUser = async payload => {
  const url = getDecoratedUrl({
    url: API_URL.USERS.FETCH_USER,
    payload,
  })
  try {
    let result = await getApiAsyn(url, cookies.get('authorization'))
    if (result?.error) {
      throw new APIError(result)
    }
    return result
    // return extractData(result, !payload?.filters);
  } catch (error) {
    console.error(error)
    return handleAPIError(error)
  }
}
export const fetchUserByUserId = async payload => {
  const url = API_URL.USERS.FETCH_BY_USER_ID.replace(':id', payload?.id)
  try {
    let result = await getApiAsyn(url, cookies.get('authorization'))
    if (result?.error) {
      throw new APIError(result)
    }
    result = extractData(result, !payload?.filters)
    if (result?.files?.length) {
      await asyncForEach(result.files, async (file, index, array) => {
        // result.files[index].url = await generateImageUrl(file.url);
        result.files[index].s3Url = await generateImageUrl(file.url)
      })
    }
    return result
  } catch (error) {
    console.error(error)
    return handleAPIError(error)
  }
}
export const deleteUserRecord = async ({ userId }) => {
  try {
    let result = await deleteApi(
      `${API_URL.USERS.DELETE_USER}/${userId}`,
      cookies.get('authorization')
    )
    if (result?.error) {
      throw new APIError(result)
    }
    return result
  } catch (error) {
    console.error(error)
    return handleAPIError(error)
  }
}

const multipartDataUploadApi = (url, { files, data }, isEdit = false) => {
  const formPayload = new FormData()
  // data part of multipart data
  const json = JSON.stringify(data)
  const blobData = new Blob([json], {
    type: 'application/json',
  })
  formPayload.append('data', blobData)
  // file part of multipart data
  files?.forEach(file => {
    formPayload.append('file', file)
  })
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: cookies.get('authorization'),
    },
  }
  if (isEdit) {
    return put(baseUrl + url, formPayload, config)
  } else {
    return post(baseUrl + url, formPayload, config)
  }
}
const dataUploadApi = (url, data, isEdit = false) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: cookies.get('authorization'),
    },
  }
  if (isEdit) {
    return put(baseUrl + url, data, config)
  } else {
    return post(baseUrl + url, data, config)
  }
}
export const createUserRecord = async payload => {
  try {
    let result = await dataUploadApi(`${API_URL.USERS.CREATE_USER}`, payload)
    if (result?.error) {
      throw new APIError(result)
    }
    return result
  } catch (error) {
    console.error(error)
    return handleAPIError(error)
  }
}
export const editUserRecord = async payload => {
  const url = API_URL.USERS.EDIT_USERS.replace(':id', payload?.id)
  try {
    let result = await dataUploadApi(url, payload.data, true)
    if (result?.error) {
      throw new APIError(result)
    }
    return result
  } catch (error) {
    console.error(error)
    return handleAPIError(error)
  }
}
export const fetchUserAttachmentByUserId = async payload => {
  const url = API_URL.USERS.FETCH_BY_USER_ID.replace(':id', payload?.itemId)
  try {
    let result = await getApiAsyn(url, cookies.get('authorization'))
    if (result?.error) {
      throw new APIError(result)
    }
    if (result?.files?.length) {
      await asyncForEach(result.files, async (file, index, array) => {
        // result.files[index].url = await generateImageUrl(file.url);
        result.files[index].s3Url = await generateImageUrl(file.url)
      })
    }
    return result
  } catch (error) {
    console.error(error)
    return handleAPIError(error)
  }
}
export const downloadAllAttachment = async payload => {
  await getAllAttachment(API_URL.USERS.FETCH_USER_FILES, payload)
}
