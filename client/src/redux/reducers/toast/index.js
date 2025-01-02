import { TOAST_SEVERITY } from '../../../common/MzToast'
import { RESET_TOAST_NOTIFICATION } from '../../../constant/actionTypes/common/notification'
import { SUCCESS, FAILED } from '../../action/toast/index'

const INITIAL_STATE = {
  shouldShowToast: false,
}

const toastReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
        shouldShowToast: true,
        toastTitle: action.payload.toastTitle,
        severity: TOAST_SEVERITY.SUCCESS,
      }
    case FAILED:
      return {
        ...state,
        shouldShowToast: true,
        toastTitle: action.payload.toastTitle,
        severity: TOAST_SEVERITY.ERROR,
      }
    case RESET_TOAST_NOTIFICATION:
      return INITIAL_STATE
    default:
      return state
  }
}

export default toastReducer
