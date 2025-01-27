// export const baseUrl = process.env.REACT_APP_API_URL;
export const baseUrl = `http://localhost:4000`;


export function loadingShow(hidden) {
  let loading = document.getElementById('loading')
  loading.style.display = hidden
}
export function loadingsShow(hidden) {
  let loading = document.getElementById('loadings')
  loading.style.display = hidden
}

export const postLogin = data => {
  loadingShow('block')
  loadingShow('none')
}

export async function postApiWithoutReq(type) {
  try {
    const response = await fetch(baseUrl + type, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'POST',
    })
    if (response.status === 401) {
      loadingShow('none')
      window.location.replace('/')
    }
    const responseJson = response
    loadingShow('none')
    return await responseJson.json()
  } catch (error) {
    throw error
  }
}

export const postApiWithoutReqAsyn = async type => {
  return await fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'POST',
  })
    .then(response => {
      if (response.status === 401) {
        loadingShow('none')
        window.location.replace('/')
      }
      return response
    })
    .then(responseJson => {
      loadingShow('none')
      return responseJson.json()
    })
    .catch(error => {
      loadingShow('none')
      throw error
    })
}

export function postApiFormData(type, data, token) {
  return fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: token,
    },
    method: 'POST',
    body: data,
  })
    .then(response => {
      if (response.status === 401) {
        loadingShow('none')
      }
      return response
    })
    .then(responseJson => {
      loadingShow('none')
      return responseJson.json()
    })
    .catch(error => {
      loadingShow('none')
      throw error
    })
}

export function postApi(type, data, token) {
  return fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: token,
    },
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.status === 401) {
        loadingShow('none')
      }

      return response
    })
    .then(responseJson => {
      loadingShow('none')
      return responseJson.json()
    })
    .catch(error => {
      loadingShow('none')
      throw error
    })
}

export function postApiLogin(type, data) {
  return fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.status === 401) {
        loadingShow('none')
      }
      return response
    })
    .then(responseJson => {
      loadingShow('none')
      return responseJson.json()
    })
    .catch(error => {
      loadingShow('none')
      throw error
    })
}

export function deleteApiBody(type, data) {
  return fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'DELETE',
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.status === 401) {
        loadingShow('none')
        window.location.replace('/')
      }
      return response
    })
    .then(responseJson => {
      loadingShow('none')
      return responseJson.json()
    })
    .catch(error => {
      loadingShow('none')
      throw error
    })
}

export function deleteApiOut(type, data) {
  return fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'DELETE',
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.status === 401) {
        loadingShow('none')
        window.location.replace('/')
      }
      return response
    })
    .then(responseJson => {
      if (responseJson.status === 200) {
        loadingShow('none')
        return responseJson
      } else {
        loadingShow('none')
        return responseJson.json()
      }
    })
    .catch(error => {
      loadingShow('none')
      throw error
    })
}

export function deleteApiOutRes(type, data) {
  return fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'DELETE',
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.status === 401) {
        loadingShow('none')
        window.location.replace('/')
      }
      return response
    })
    .then(responseJson => {
      if (responseJson.status === 200) {
        loadingShow('none')
        return responseJson.json()
      } else {
        loadingShow('none')
        return responseJson.json()
      }
    })
    .catch(error => {
      loadingShow('none')
      throw error
    })
}
export function putApi(type, data, token) {
  return fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: token,
    },
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.status === 401) {
        loadingShow('none')
        window.location.replace('/')
      }
      return response
    })
    .then(responseJson => {
      loadingShow('none')
      responseJson = {}
      return responseJson
    })
    .catch(error => {
      loadingShow('none')
      throw error
    })
}

export function putApiRes(type, data, token) {
  return fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: token,
    },
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.status === 401) {
        loadingShow('none')
        window.location.replace('/')
      }
      return response
    })
    .then(responseJson => {
      if (responseJson.status === 200) {
        loadingShow('none')
        return responseJson
      } else {
        loadingShow('none')
        return responseJson.json()
      }
    })
    .catch(error => {
      loadingShow('none')
      throw error
    })
}

export function deleteApi(type, token) {
  return fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: token,
    },
    method: 'DELETE',
  })
    .then(response => {
      if (response.status === 401) {
        loadingShow('none')
        window.location.replace('/')
      }
      return response
    })
    .then(responseJson => {
      if (responseJson.status === 200) {
        return responseJson
      } else {
        return responseJson.json()
      }
    })
    .catch(error => {
      throw error
    })
}

export const formatDate = date => {
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  let day = date.getDay()
  let month = date.getMonth() + 1
  const year = date.getFullYear()
  if (day < 10) {
    day = `0${day}`
  }
  if (month < 10) {
    month = `0${month}`
  }
  const formattedDate = `${day}-${month}-${year}-${time}`
  return formattedDate
}

export const putApiAsyn = async (type, data, token) => {
  let result = await fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: token,
    },
    method: 'PUT',
    body: JSON.stringify(data),
  })
    .then(resposne => {
      loadingShow('none')
      if (resposne.status === 401) {
        //
      }
      return resposne.json()
    })
    .then(data => {
      data['APIResult'] = 1
      return data
    })
    .catch(error => {
      loadingShow('none')
      error['APIResult'] = 0
      if (error.TypeError) {
        error['Message'] = 'Internal server error(' + error.TypeError + ')'
      }
      return error
    })
  return result
}

export const postApiAsyn = async (type, data, token) => {
  let result = await fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: token,
    },
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(resposne => {
      loadingShow('none')
      if (resposne.status === 401) {
        //
      }
      return resposne.json()
    })
    .then(data => {
      data['APIResult'] = 1
      return data
    })
    .catch(error => {
      loadingShow('none')
      error['APIResult'] = 0
      if (error.TypeError) {
        error['Message'] = 'Internal server error(' + error.TypeError + ')'
      }
      return error
    })
  return result
}

export const postApiAsynWithoutToken = async type => {
  let result = await fetch(type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'POST',
  })
    .then(resposne => {
      if (resposne.status === 401) {
      }
      return resposne.json()
    })
    .then(data => {
      data['APIResult'] = 1
      return data
    })
    .catch(error => {
      // loadingShow("none");
      error['APIResult'] = 0
      if (error.TypeError) {
        error['Message'] = 'Internal server error(' + error.TypeError + ')'
      }
      return error
    })
  return result
}

export const getApiAsyn = async (type, token, shouldPrependBaseUrl = true) => {
  const url = shouldPrependBaseUrl ? baseUrl + type : type
  let result = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: token,
    },
    method: 'GET',
  })
    .then(
      response => {
        loadingShow('none')
        if (response.status === 401) {
        }
        if (response.status === 400) {
          throw new Error(response)
        }
        return response.json()
      },
      error => {
        console.log('Error', error)
      }
    )
    .then(data => {
      data['APIResult'] = 1
      return data
    })
    .catch(error => {
      loadingShow('none')

      if (error.TypeError) {
        error['Message'] = 'Internal server error(' + error.TypeError + ')'
      }
      return error
    })
  return result
}

export const validationForSpecialchar = e => {
  var result = /[^a-z 0-9 A-Z\\,\\.\\;]/g
  if (!result.test(e)) {
    return false
  }
  return true
}

export const validateEmail = email => {
  const re = ''
  return re.test(email)
}

export const deleteApiAsyn = async (type, data, token) => {
  let result = await fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: token,
    },
    method: 'DELETE',
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.status === 401) {
      }
      return response.json()
    })
    .then(data => {
      data['APIResult'] = 1
      return data
    })
    .catch(error => {
      loadingShow('none')
      data['APIResult'] = 0
      if (error.TypeError) {
        error['Message'] = 'Internal server error(' + error.TypeError + ')'
      }
      return error
    })
  return result
}

export const postApiLoginAsyn = async (type, data) => {
  let result = await fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(response => {
      loadingShow('none')
      if (response.status === 401) {
      }
      return response
    })
    .then(data => {
      data['authorization'] = data.headers.get('authorization')
      data['APIResult'] = 1
      return data
    })
    .catch(error => {
      loadingShow('none')
      data['APIResult'] = 0
      if (error.TypeError) {
        error['Message'] = 'Internal server error(' + error.TypeError + ')'
      }
      return error
    })
  return result
}

export const formDataApiAsyn = async (type, data, token) => {
  let result = await fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: token,
    },
    method: 'POST',
    body: data,
  })
    .then(response => {
      loadingShow('none')
      if (response.status === 401) {
      }
      return response.json()
    })
    .then(data => {
      data['APIResult'] = 1
      return data
    })
    .catch(error => {
      loadingShow('none')
      data['APIResult'] = 0
      if (error.TypeError) {
        error['Message'] = 'Internal server error(' + error.TypeError + ')'
      }
      return error
    })
  return result
}