import {
  INIT_LANGUAGE,
  LANGUAGE_CHANGE,
} from '../../../constant/actionTypes/translator'
import i18n from '../../../i18n'
export const initialTranlator = payload => {
  return {
    type: INIT_LANGUAGE,
    payload,
  }
}
export const changeLanguageStart = payload => {
  return {
    type: LANGUAGE_CHANGE.START,
    payload,
  }
}
export const changeLanguageSuccess = payload => {
  return {
    type: LANGUAGE_CHANGE.SUCCESS,
    payload,
  }
}
export const changeLanguageFail = payload => {
  return {
    type: LANGUAGE_CHANGE.FAIL,
    payload,
  }
}

export const changeLanguage = language => {
  return async dispatch => {
    dispatch(changeLanguageStart(language))
    try {
      await i18n.changeLanguage(language)
      dispatch(changeLanguageSuccess(language))
    } catch (error) {
      dispatch(changeLanguageFail(error))
    }
  }
}
