export const SUCCESS = 'SUCCESS'
export const FAILED = 'FAILED'

export const Success = payload => ({
  type: SUCCESS,
  payload,
})

export const Failed = payload => ({
  type: FAILED,
  payload,
})
