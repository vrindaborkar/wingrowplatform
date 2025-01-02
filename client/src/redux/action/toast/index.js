export const SUCCESS = 'SUCCESS'
export const FAILED = 'FAILED'

export const toastSuccess = payload => ({
  type: SUCCESS,
  payload,
})

export const toastFailed = payload => ({
  type: FAILED,
  payload,
})
