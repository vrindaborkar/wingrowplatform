import {
  INIT_USER_PROFILE,
  FETCH_USER_PROFILE_RECORD,
} from '../../../constant/actionTypes/userProfile'

const INIT_STATE = {
  userProfile: null,
  isLoading: false,
  error: null,
}

const userProfileReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case INIT_USER_PROFILE:
      return {
        ...state,
      }
    case FETCH_USER_PROFILE_RECORD.START: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case FETCH_USER_PROFILE_RECORD.SUCCESS:
      return {
        ...state,

        isLoading: false,
      }
    case FETCH_USER_PROFILE_RECORD.ERROR:
      return {
        ...state,

        isLoading: false,
      }
    default:
      return state
  }
}
export default userProfileReducer
