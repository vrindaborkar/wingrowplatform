const baseUrl = ''
function loadingShow(hidden) {
  let loading = document.getElementById('loading')
  loading.style.display = hidden
}

export function getApi(type, token) {
  return fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: token,
    },
    method: 'GET',
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
      throw error
    })
}

export function getApiDown(type, token) {
  return fetch(baseUrl + type, {
    headers: {
      authorization: token,
    },
    method: 'GET',
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
      throw error
    })
}

export function getApiParam(type, param, token) {
  return fetch(baseUrl + type + param, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: token,
    },
    method: 'GET',
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
      throw error
    })
}

export function getApiBody(type, userInput, token) {
  return fetch(baseUrl + type, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: token,
    },
    method: 'GET',
    body: JSON.stringify(userInput),
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
      throw error
    })
}
