import {
  INIT_USER_PROFILE,
  FETCH_USER_PROFILE_RECORD,
} from '../../../constant/actionTypes/userProfile'

export const initialUserProfileScreen = () => {
  return {
    type: INIT_USER_PROFILE,
  }
}

export const userProfileFetchStart = payload => {
  return {
    type: FETCH_USER_PROFILE_RECORD.START,
    payload,
  }
}

export const userProfileFetchSuccess = payload => {
  return {
    type: FETCH_USER_PROFILE_RECORD.SUCCESS,
    payload,
  }
}

export const userProfileFetchError = payload => {
  return {
    type: FETCH_USER_PROFILE_RECORD.ERROR,
    payload,
  }
}

export const fetchUserProfile = payload => {
  return dispatch => {
    dispatch(userProfileFetchStart(payload))
    userProfileService.fetchUserProfile(payload).then(userProfileData => {
      if (!userProfileData.isError) {
        dispatch(userProfileFetchSuccess(userProfileData))
      } else {
        dispatch(userProfileFetchError(userProfileData))
      }
    })
  }
}
